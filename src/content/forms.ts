/**
 * Form definitions: open an account (qualifying), become a partner, talk to sales.
 *
 * Fields are data, not markup, so the same renderer serves all three and the copy stays
 * in this file. Country and industry options come from siteConfig, never from a hardcoded
 * list, so a country cannot appear as supported before compliance approves it.
 */
import { z } from 'astro/zod';
import { defineContent } from '@/lib/content';

const fieldSchema = z.object({
  name: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(['text', 'email', 'url', 'tel', 'textarea', 'select', 'checkbox', 'checkbox-group']),
  required: z.boolean().default(false),
  autocomplete: z.string().min(1).optional(),
  help: z.string().min(1).optional(),
  /** Link rendered inside the label, for example the privacy notice on a consent box. */
  link: z.object({ label: z.string().min(1), href: z.string().min(1) }).optional(),
  /** Message shown when the field fails validation. */
  errorMessage: z.string().min(1).optional(),
  /**
   * Show this field only when another field holds one of these values. Enforced on the
   * client for display and on the server for validation, so a hidden field is never
   * required and never silently dropped.
   */
  showWhen: z.object({ field: z.string().min(1), hasAnyOf: z.array(z.string().min(1)).min(1) }).optional(),
  /** Appends an "Other" option to a list that comes from config. */
  allowOther: z.boolean().default(false),
  /** Pulls <option> values from a config list instead of inline options. */
  optionsFrom: z.enum(['supportedCountries', 'acceptedIndustries', 'partnerTypes']).optional(),
  options: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).optional(),
});

const formSchema = z.object({
  id: z.enum(['open-account', 'partner', 'sales']),
  title: z.string().min(1),
  seoTitle: z.string().min(1),
  description: z.string().min(1),
  /** Which site.trustCues key renders beside the submit button. */
  trustCue: z.enum(['registration', 'rpaa', 'onboarding', 'security']),
  submitLabel: z.string().min(1),
  successMessage: z.string().min(1),
  errorMessage: z.string().min(1),
  fields: z.array(fieldSchema).min(1),
});

const schema = z.object({
  openAccount: formSchema,
  partner: formSchema,
  sales: formSchema,
});

/** The seven solutions, used by both forms as a multi-select. */
const PRODUCT_OPTIONS = [
  { value: 'crypto-acceptance', label: 'Crypto acceptance' },
  { value: 'conversion-otc', label: 'Conversion and OTC' },
  { value: 'virtual-ibans', label: 'Virtual IBANs and accounts' },
  { value: 'global-payouts', label: 'Global payouts' },
  { value: 'fx-multi-currency', label: 'FX and multi-currency' },
  { value: 'cards', label: 'Cards' },
  { value: 'platform-payments', label: 'Platform payments' },
];

/** Products that involve crypto, so the source of crypto question applies. */
export const CRYPTO_PRODUCTS = ['crypto-acceptance', 'conversion-otc', 'cards'];

const VOLUME_OPTIONS = [
  { value: 'under-50k', label: 'Under $50k' },
  { value: '50k-250k', label: '$50k to $250k' },
  { value: '250k-1m', label: '$250k to $1M' },
  { value: '1m-5m', label: '$1M to $5M' },
  { value: 'over-5m', label: 'Over $5M' },
];

export const forms = defineContent('forms', schema, {
  openAccount: {
    id: 'open-account',
    title: 'Open a NexFlow account',
    seoTitle: 'Open a Business Account | NexFlow',
    description: "Tell us about your business. We'll check eligibility before full verification.",
    trustCue: 'onboarding',
    submitLabel: 'Submit application',
    successMessage:
      "Thanks. We've received your details. Next, we'll email you a secure link to complete business verification. [CONFIRM: actual next step]",
    errorMessage: 'Your application could not be submitted. Please try again, or contact sales.',
    fields: [
      {
        name: 'companyName',
        label: 'Registered company name',
        type: 'text',
        required: true,
        autocomplete: 'organization',
        errorMessage: 'Enter your registered company name.',
      },
      {
        name: 'country',
        label: 'Country of incorporation',
        type: 'select',
        required: true,
        optionsFrom: 'supportedCountries',
        allowOther: true,
        help: 'Accounts are available to businesses in supported countries.',
        errorMessage: 'Choose your country of incorporation.',
      },
      {
        name: 'website',
        label: 'Company website',
        type: 'url',
        required: true,
        autocomplete: 'url',
        help: 'Include https://',
        errorMessage: 'Enter your website, including https://',
      },
      {
        name: 'industry',
        label: 'Industry',
        type: 'select',
        required: true,
        optionsFrom: 'acceptedIndustries',
        allowOther: true,
        errorMessage: 'Choose the industry that fits your business best.',
      },
      {
        name: 'products',
        label: 'Products needed',
        type: 'checkbox-group',
        required: true,
        options: PRODUCT_OPTIONS,
        errorMessage: 'Choose at least one product.',
      },
      {
        name: 'volume',
        label: 'Expected monthly volume',
        type: 'select',
        required: true,
        options: VOLUME_OPTIONS,
        errorMessage: 'Choose your expected monthly volume.',
      },
      {
        name: 'cryptoSource',
        label: 'Source of crypto',
        type: 'select',
        required: true,
        showWhen: { field: 'products', hasAnyOf: CRYPTO_PRODUCTS },
        options: [
          { value: 'mining', label: 'Mining' },
          { value: 'business-revenue', label: 'Business revenue' },
          { value: 'treasury', label: 'Treasury' },
          { value: 'client-funds', label: 'Client funds' },
          { value: 'other', label: 'Other' },
        ],
        errorMessage: 'Tell us where the crypto comes from.',
      },
      {
        name: 'contactName',
        label: 'Your name',
        type: 'text',
        required: true,
        autocomplete: 'name',
        errorMessage: 'Enter your name.',
      },
      {
        name: 'email',
        label: 'Work email',
        type: 'email',
        required: true,
        autocomplete: 'email',
        help: 'Use your company email address.',
        errorMessage: 'Enter a work email address we can reply to.',
      },
      {
        name: 'consent',
        label: 'I have read the privacy notice and agree to be contacted about this application.',
        type: 'checkbox',
        required: true,
        link: { label: 'Privacy policy', href: '/legal/privacy' },
        errorMessage: 'Please confirm you have read the privacy notice.',
      },
    ],
  },

  partner: {
    id: 'partner',
    title: 'Become a partner',
    seoTitle: 'Become a NexFlow partner | NexFlow',
    description:
      'For account and IBAN providers, crypto liquidity and conversion providers, card issuers and program managers, and payout and FX providers.',
    trustCue: 'registration',
    submitLabel: 'Send partner enquiry',
    successMessage:
      'Thanks. Our partnerships team will reply within [PLACEHOLDER: response time] at the email you gave us.',
    errorMessage: 'Your enquiry could not be sent. Please try again, or email the partnerships address above.',
    fields: [
      {
        name: 'companyName',
        label: 'Company name',
        type: 'text',
        required: true,
        autocomplete: 'organization',
        errorMessage: 'Enter your company name.',
      },
      {
        name: 'website',
        label: 'Website',
        type: 'url',
        required: true,
        autocomplete: 'url',
        help: 'Include https://',
        errorMessage: 'Enter your website, including https://',
      },
      {
        name: 'regulatorAndLicenceType',
        label: 'Regulator and licence type',
        type: 'text',
        required: true,
        help: 'Your own licence, held in your name.',
        errorMessage: 'Enter the regulator and the type of licence you hold.',
      },
      { name: 'licenceNumber', label: 'Licence number', type: 'text' },
      {
        name: 'services',
        label: 'Services offered',
        type: 'checkbox-group',
        required: true,
        errorMessage: 'Choose at least one service.',
        options: [
          { value: 'accounts-ibans', label: 'Accounts and IBANs' },
          { value: 'crypto-liquidity', label: 'Crypto liquidity and conversion' },
          { value: 'card-issuing', label: 'Card issuing' },
          { value: 'payouts-fx', label: 'Payouts and FX' },
          { value: 'other', label: 'Other' },
        ],
      },
      { name: 'regionsServed', label: 'Regions served', type: 'text' },
      {
        name: 'contactName',
        label: 'Your name',
        type: 'text',
        required: true,
        autocomplete: 'name',
        errorMessage: 'Enter your name.',
      },
      {
        name: 'email',
        label: 'Work email',
        type: 'email',
        required: true,
        autocomplete: 'email',
        errorMessage: 'Enter a work email address we can reply to.',
      },
      { name: 'message', label: 'Message', type: 'textarea' },
      {
        name: 'consent',
        label: 'I have read the privacy notice and agree to be contacted about this enquiry.',
        type: 'checkbox',
        required: true,
        link: { label: 'Privacy policy', href: '/legal/privacy' },
        errorMessage: 'Please confirm you have read the privacy notice.',
      },
    ],
  },

  sales: {
    id: 'sales',
    title: 'Talk to sales',
    seoTitle: 'Talk to sales | NexFlow',
    description:
      'Tell us what you need and the NexFlow sales team will get back to you. For businesses in supported countries.',
    trustCue: 'registration',
    submitLabel: 'Send message',
    successMessage: 'Thanks. Your message has been received and our team will be in touch.',
    errorMessage: 'Your message could not be sent. Please try again, or email the sales address above.',
    fields: [
      {
        name: 'companyName',
        label: 'Company name',
        type: 'text',
        required: true,
        autocomplete: 'organization',
        errorMessage: 'Enter your company name.',
      },
      {
        name: 'website',
        label: 'Company website',
        type: 'url',
        required: true,
        autocomplete: 'url',
        help: 'Include https://',
        errorMessage: 'Enter your website, including https://',
      },
      {
        name: 'country',
        label: 'Country of incorporation',
        type: 'select',
        required: true,
        optionsFrom: 'supportedCountries',
        allowOther: true,
        errorMessage: 'Choose your country of incorporation.',
      },
      {
        name: 'industry',
        label: 'Industry',
        type: 'select',
        required: true,
        optionsFrom: 'acceptedIndustries',
        allowOther: true,
        errorMessage: 'Choose the industry that fits your business best.',
      },
      {
        // A solution page CTA can pre-select this with ?products=<value>.
        name: 'products',
        label: 'Products needed',
        type: 'checkbox-group',
        required: true,
        options: PRODUCT_OPTIONS,
        errorMessage: 'Choose at least one product.',
      },
      {
        name: 'volume',
        label: 'Expected monthly volume',
        type: 'select',
        options: VOLUME_OPTIONS,
      },
      {
        name: 'contactName',
        label: 'Your name',
        type: 'text',
        required: true,
        autocomplete: 'name',
        errorMessage: 'Enter your name.',
      },
      {
        name: 'email',
        label: 'Work email',
        type: 'email',
        required: true,
        autocomplete: 'email',
        errorMessage: 'Enter a work email address we can reply to.',
      },
      { name: 'message', label: 'How can we help', type: 'textarea' },
      {
        name: 'consent',
        label: 'I have read the privacy notice and agree to be contacted about this enquiry.',
        type: 'checkbox',
        required: true,
        link: { label: 'Privacy policy', href: '/legal/privacy' },
        errorMessage: 'Please confirm you have read the privacy notice.',
      },
    ],
  },
});

/** All three forms share one schema, so one type serves them all. */
export type FormDefinition = typeof forms.openAccount;
