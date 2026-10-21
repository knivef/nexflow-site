/**
 * Form submission handling: validation, a basic rate limit, and the adapters that decide
 * where a submission goes.
 *
 * Nothing here trusts the browser. The client-side validation in Form.astro is there to
 * give fast, accessible feedback; these checks are the ones that actually gate a write.
 */
import {
  FORM_ADAPTER,
  FORM_ENDPOINT,
  NOTION_TOKEN,
  NOTION_DB_PARTNERS,
  NOTION_DB_ACCOUNTS,
  NOTION_DB_SALES,
} from 'astro:env/server';
import { siteConfig } from '@/config/site.config';

export type FieldDef = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  errorMessage?: string;
  showWhen?: { field: string; hasAnyOf: string[] };
};

/** Why an application cannot be accepted. Not an error: a polite decline. */
export type Decline = { reason: 'country' | 'industry'; value: string };

export type ValidationResult = { ok: true; values: Record<string, string> } | { ok: false; errors: Record<string, string> };

/** Field name of the honeypot. Bots fill it in, people never see it. */
export const HONEYPOT_FIELD = 'company_role_hp';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** True when a conditional field does not apply to what was submitted. */
function isHidden(field: FieldDef, form: FormData): boolean {
  if (!field.showWhen) return false;
  const chosen = form.getAll(field.showWhen.field).map((entry) => String(entry));
  return !field.showWhen.hasAnyOf.some((value) => chosen.includes(value));
}

export function validate(fields: FieldDef[], form: FormData): ValidationResult {
  const errors: Record<string, string> = {};
  const values: Record<string, string> = {};

  for (const field of fields) {
    // A field the applicant was never shown is never required and never stored.
    if (isHidden(field, form)) continue;

    const raw = form.getAll(field.name).map((entry) => String(entry).trim()).filter(Boolean);
    const value = field.type === 'checkbox-group' ? raw.join(', ') : (raw[0] ?? '');
    const fallback = field.errorMessage ?? `${field.label} is required.`;

    if (field.required && value === '') {
      errors[field.name] = fallback;
      continue;
    }

    if (value !== '') {
      if (field.type === 'email') {
        if (!EMAIL.test(value)) {
          errors[field.name] = field.errorMessage ?? 'Enter a valid email address.';
          continue;
        }
        if (isFreeEmail(value)) {
          errors[field.name] = FREE_EMAIL_MESSAGE;
          continue;
        }
      }
      if (field.type === 'url' && !/^https?:\/\/.+\..+/i.test(value)) {
        errors[field.name] = field.errorMessage ?? 'Enter a full URL, including https://';
        continue;
      }
      // A single hard cap, so an oversized paste cannot be forwarded to a partner system.
      if (value.length > 5000) {
        errors[field.name] = 'This is too long.';
        continue;
      }
    }

    values[field.name] = value;
  }

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, values };
}

/** Free mail refusal. The wording explains why, rather than just rejecting the address. */
export const FREE_EMAIL_MESSAGE = 'Please use your company email so we can verify your business.';

export function isFreeEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase().trim();
  if (!domain) return false;
  return siteConfig.freeEmailDomains.includes(domain);
}

/**
 * Eligibility. A country or industry outside the approved lists is declined politely,
 * never treated as a validation error, and never stored as an application.
 *
 * "other" always declines: it means the applicant could not find themselves in the list.
 */
export function checkEligibility(values: Record<string, string>): Decline | null {
  const country = values.country;
  if (country !== undefined && country !== '') {
    const supported = siteConfig.supportedCountries.map((entry) => entry.code);
    if (!supported.includes(country)) {
      const named = siteConfig.supportedCountries.find((entry) => entry.code === country);
      return { reason: 'country', value: named?.name ?? 'that country' };
    }
  }

  const industry = values.industry;
  if (industry !== undefined && industry !== '') {
    const accepted = siteConfig.acceptedIndustries.map((entry) => entry.id);
    if (!accepted.includes(industry)) {
      const named = siteConfig.acceptedIndustries.find((entry) => entry.id === industry);
      return { reason: 'industry', value: named?.label ?? 'that industry' };
    }
  }

  return null;
}

/**
 * Rate limit, in memory. A serverless instance holds this for as long as it lives, so it
 * stops a burst from one address but is not a durable control. A shared store is needed
 * before launch if abuse becomes a real concern.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

/** Sends a validated submission wherever FORM_ADAPTER says it goes. */
export async function deliver(
  formId: string,
  values: Record<string, string>,
): Promise<{ delivered: boolean; adapter: string; detail?: string }> {
  const adapter = FORM_ADAPTER;

  if (adapter === 'none') {
    // Review mode: accept and log, store nothing. Nothing leaves the machine.
    console.log(`[form:${formId}] accepted, adapter "none", fields: ${Object.keys(values).join(', ')}`);
    return { delivered: false, adapter };
  }

  if (adapter === 'webhook') {
    if (!FORM_ENDPOINT) return { delivered: false, adapter, detail: 'FORM_ENDPOINT is not set' };
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ form: formId, submittedAt: new Date().toISOString(), values }),
    });
    return { delivered: response.ok, adapter, detail: response.ok ? undefined : `webhook returned ${response.status}` };
  }

  if (adapter === 'notion') {
    const databases: Record<string, string | undefined> = {
      partner: NOTION_DB_PARTNERS,
      'open-account': NOTION_DB_ACCOUNTS,
      sales: NOTION_DB_SALES,
    };
    const database = databases[formId];
    if (!NOTION_TOKEN || !database) {
      return { delivered: false, adapter, detail: 'NOTION_TOKEN or the database id is not set' };
    }
    const properties: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(values)) {
      properties[key] = { rich_text: [{ text: { content: value.slice(0, 2000) } }] };
    }
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${NOTION_TOKEN}`,
        'notion-version': '2022-06-28',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ parent: { database_id: database }, properties }),
    });
    return { delivered: response.ok, adapter, detail: response.ok ? undefined : `Notion returned ${response.status}` };
  }

  return { delivered: false, adapter, detail: `adapter "${adapter}" is not implemented` };
}
