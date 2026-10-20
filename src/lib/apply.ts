/**
 * Partner application: shared parsing and validation.
 * Runs in the browser (inline errors) and in the /api/apply function (never trust the client).
 * It takes its rules as data so the browser bundle does not pull in the whole content file.
 */
import type { ApplyContent, ApplyFieldName } from '@/content/types';

export const MULTI_FIELDS = ['verticals', 'geographies', 'needs'] as const;
export const SELECT_FIELDS = ['companyType', 'volume', 'licenceStatus'] as const;

/** Honeypot and timing field names. Bots fill the honeypot; humans take more than a few seconds. */
export const HONEYPOT_FIELD = 'faxNumber';
export const STARTED_AT_FIELD = 'startedAt';
export const MIN_FILL_MS = 3000;

const MAX_LENGTH: Partial<Record<ApplyFieldName, number>> = {
  fullName: 120,
  workEmail: 200,
  company: 160,
  website: 300,
  licenceDetails: 300,
  currentAcquirers: 500,
  message: 3000,
};

/** Free-mail providers. Matched on the registrable name, so yahoo.co.uk and hotmail.fr are caught too. */
const FREE_MAIL_NAMES = new Set([
  'gmail',
  'googlemail',
  'yahoo',
  'ymail',
  'rocketmail',
  'outlook',
  'hotmail',
  'live',
  'msn',
  'windowslive',
  'proton',
  'protonmail',
  'icloud',
  'aol',
  'gmx',
  'yandex',
  'zohomail',
  'tutanota',
  'tuta',
  'fastmail',
  'qq',
  '163',
  '126',
  'mailinator',
  'seznam',
  'libero',
  'laposte',
  'wanadoo',
  't-online',
  'rediffmail',
]);
// Providers whose name is too generic to match on its own (orange.com is a company, orange.fr is free mail).
const FREE_MAIL_DOMAINS = new Set([
  'pm.me',
  'me.com',
  'mac.com',
  'mail.com',
  'mail.ru',
  'web.de',
  'hey.com',
  'tuta.io',
  'orange.fr',
]);

export interface ApplyData {
  fullName: string;
  workEmail: string;
  company: string;
  website: string;
  companyType: string;
  licenceStatus: string;
  licenceDetails: string;
  volume: string;
  verticals: string[];
  geographies: string[];
  currentAcquirers: string;
  needs: string[];
  message: string;
  consent: boolean;
}

export type ApplyErrors = Partial<Record<ApplyFieldName | 'consent', string>>;

export interface ApplyRules {
  options: Record<(typeof SELECT_FIELDS)[number] | (typeof MULTI_FIELDS)[number], string[]>;
  required: Record<ApplyFieldName, boolean>;
  errors: ApplyContent['errors'];
}

/** Build the rules from the content file. Server-side, or at build time for the browser. */
export function rulesFromContent(apply: ApplyContent): ApplyRules {
  const optionValues = (name: ApplyFieldName) => (apply.fields[name].options ?? []).map((o) => o.value);
  const required = Object.fromEntries(
    Object.entries(apply.fields).map(([name, field]) => [name, field.required]),
  ) as Record<ApplyFieldName, boolean>;
  return {
    options: {
      companyType: optionValues('companyType'),
      volume: optionValues('volume'),
      licenceStatus: optionValues('licenceStatus'),
      verticals: optionValues('verticals'),
      geographies: optionValues('geographies'),
      needs: optionValues('needs'),
    },
    required,
    errors: apply.errors,
  };
}

/** Read a FormData (browser form or url-encoded POST) into ApplyData. */
export function parseFormData(form: FormData): ApplyData {
  const text = (name: string) => String(form.get(name) ?? '').trim();
  const many = (name: string) => form.getAll(name).map((value) => String(value).trim()).filter(Boolean);
  return {
    fullName: text('fullName'),
    workEmail: text('workEmail').toLowerCase(),
    company: text('company'),
    website: text('website'),
    companyType: text('companyType'),
    licenceStatus: text('licenceStatus'),
    licenceDetails: text('licenceDetails'),
    volume: text('volume'),
    verticals: many('verticals'),
    geographies: many('geographies'),
    currentAcquirers: text('currentAcquirers'),
    needs: many('needs'),
    message: text('message'),
    consent: ['on', 'true', '1', 'yes'].includes(text('consent')),
  };
}

/** Coerce an untrusted JSON body into ApplyData. Unknown keys are dropped. */
export function parseJson(body: unknown): ApplyData {
  const source = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  const text = (name: string) => (typeof source[name] === 'string' ? (source[name] as string).trim() : '');
  const many = (name: string) =>
    Array.isArray(source[name])
      ? (source[name] as unknown[]).filter((v): v is string => typeof v === 'string').map((v) => v.trim())
      : [];
  return {
    fullName: text('fullName'),
    workEmail: text('workEmail').toLowerCase(),
    company: text('company'),
    website: text('website'),
    companyType: text('companyType'),
    licenceStatus: text('licenceStatus'),
    licenceDetails: text('licenceDetails'),
    volume: text('volume'),
    verticals: many('verticals'),
    geographies: many('geographies'),
    currentAcquirers: text('currentAcquirers'),
    needs: many('needs'),
    message: text('message'),
    consent: source.consent === true || source.consent === 'on',
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isFreeMail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  if (!domain) return false;
  if (FREE_MAIL_DOMAINS.has(domain)) return true;
  // Registrable name: the label before the public suffix. "mail.yahoo.co.uk" -> "yahoo", "gmail.com" -> "gmail".
  const labels = domain.split('.');
  const suffixLength = labels.length >= 3 && labels[labels.length - 2]!.length <= 3 ? 2 : 1;
  const name = labels[labels.length - 1 - suffixLength] ?? '';
  return FREE_MAIL_NAMES.has(name);
}

/** Accepts "acme.com", "www.acme.com" or a full URL. Returns an https URL, or null if it isn't a website. */
export function normaliseWebsite(value: string): string | null {
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(candidate);
    if (!/^https?:$/.test(url.protocol)) return null;
    if (!/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i.test(url.hostname)) return null;
    return url.href;
  } catch {
    return null;
  }
}

export function validateApply(data: ApplyData, rules: ApplyRules): ApplyErrors {
  const errors: ApplyErrors = {};
  const { errors: messages, required, options } = rules;

  const textFields: ApplyFieldName[] = ['fullName', 'workEmail', 'company', 'website', 'licenceDetails', 'currentAcquirers', 'message'];
  for (const name of textFields) {
    const value = data[name] as string;
    const max = MAX_LENGTH[name];
    if (max && value.length > max) errors[name] = messages.tooLong;
  }

  for (const name of ['fullName', 'company'] as const) {
    if (required[name] && !data[name]) errors[name] = messages.required;
  }

  if (!errors.workEmail) {
    if (!data.workEmail) errors.workEmail = messages.required;
    else if (!EMAIL_PATTERN.test(data.workEmail)) errors.workEmail = messages.email;
    else if (isFreeMail(data.workEmail)) errors.workEmail = messages.freeEmail;
  }

  if (!errors.website) {
    if (!data.website) {
      if (required.website) errors.website = messages.required;
    } else if (!normaliseWebsite(data.website)) errors.website = messages.url;
  }

  for (const name of SELECT_FIELDS) {
    const value = data[name];
    if (!value) {
      if (required[name]) errors[name] = messages.required;
    } else if (!options[name].includes(value)) errors[name] = messages.invalidOption;
  }

  // Licence details are required unless the applicant has no licence.
  if (!errors.licenceDetails && data.licenceStatus && data.licenceStatus !== 'none' && !data.licenceDetails) {
    errors.licenceDetails = messages.licenceDetails;
  }

  for (const name of MULTI_FIELDS) {
    const values = data[name];
    if (values.some((value) => !options[name].includes(value))) errors[name] = messages.invalidOption;
    else if (required[name] && values.length === 0) errors[name] = messages.minOne;
  }

  if (!data.consent) errors.consent = messages.consent;

  return errors;
}

/** Clean data for delivery: normalised website, no details when there is no licence. */
export function finaliseApply(data: ApplyData): ApplyData {
  return {
    ...data,
    website: normaliseWebsite(data.website) ?? data.website,
    licenceDetails: data.licenceStatus === 'none' ? '' : data.licenceDetails,
  };
}
