/**
 * Site-wide content: brand, calls to action, trust cues, navigation and footer.
 * No component hardcodes any of these strings.
 */
import { z } from 'astro/zod';
import { defineContent } from '@/lib/content';

const linkSchema = z.object({ label: z.string().min(1), href: z.string().min(1) });

const navItemSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('link'), label: z.string().min(1), href: z.string().min(1) }),
  z.object({
    kind: z.literal('menu'),
    label: z.string().min(1),
    href: z.string().min(1).optional(),
    items: z.array(linkSchema.extend({ summary: z.string().min(1).optional() })).min(1),
  }),
  z.object({
    // Pulls its entries from a content collection so the menu cannot drift from the pages.
    // href is optional: there is no /solutions index route, so the label is a menu trigger
    // only and the panel links straight to the 7 pages.
    kind: z.literal('collection'),
    label: z.string().min(1),
    href: z.string().min(1).optional(),
    collection: z.enum(['solutions', 'legal']),
  }),
]);

const schema = z.object({
  brand: z.object({
    name: z.string().min(1),
    legalName: z.string().min(1),
    tagline: z.string().min(1),
  }),
  ctas: z.object({
    primary: linkSchema,
    secondary: linkSchema,
    partner: linkSchema,
  }),
  /** A trust cue sits beside every call to action. CLAUDE.md requires it. */
  trustCues: z.object({
    registration: z.string().min(1),
    rpaa: z.string().min(1),
    onboarding: z.string().min(1),
    security: z.string().min(1),
  }),
  nav: z.object({
    skipLinkLabel: z.string().min(1),
    menuButtonLabel: z.string().min(1),
    items: z.array(navItemSchema).min(1),
  }),
  /** Reusable trust strip: three plain-text badges, never a regulator logo. */
  trustStrip: z.object({
    label: z.string().min(1),
    items: z.array(z.string().min(1)).length(3),
  }),
  /** Final CTA band, used on every page. The headline comes from the active version. */
  finalCta: z.object({
    trustLine: z.string().min(1),
  }),
  contact: z.object({
    /** Mailbox domain. Addresses render as selectable text, not links, while it is a placeholder. */
    emailDomain: z.string().min(1),
    mailboxes: z.array(z.object({ id: z.string().min(1), label: z.string().min(1), user: z.string().min(1) })).min(1),
    registeredAddressLabel: z.string().min(1),
    registeredAddress: z.string().min(1),
  }),
  cookies: z.object({
    title: z.string().min(1),
    body: z.string().min(1),
    accept: z.string().min(1),
    reject: z.string().min(1),
    manage: z.string().min(1),
    save: z.string().min(1),
    essentialLabel: z.string().min(1),
    essentialNote: z.string().min(1),
    analyticsLabel: z.string().min(1),
    analyticsNote: z.string().min(1),
    policyLinkLabel: z.string().min(1),
    policyHref: z.string().min(1),
  }),
  /** Public profiles, published as sameAs once the handles exist. */
  social: z.array(z.object({ label: z.string().min(1), url: z.string().min(1) })).default([]),
  footer: z.object({
    /** One plain sentence describing the company, written to be quotable by AI search. */
    aboutLine: z.string().min(1),
    groups: z
      .array(
        z.object({
          title: z.string().min(1),
          collection: z.enum(['solutions', 'legal']).optional(),
          links: z.array(linkSchema).default([]),
        }),
      )
      .min(1),
    disclosure: z.string().min(1),
    copyrightPrefix: z.string().min(1),
  }),
});

export const site = defineContent('site', schema, {
  brand: {
    name: 'NexFlow',
    legalName: '[PLACEHOLDER: LEGAL ENTITY NAME]',
    tagline: 'One place to accept crypto, settle in fiat and pay globally.',
  },

  ctas: {
    primary: { label: 'Open an account', href: '/open-an-account' },
    secondary: { label: 'Talk to sales', href: '/company/contact' },
    partner: { label: 'Become a partner', href: '/partners' },
  },

  trustCues: {
    registration:
      'Registered with FINTRAC as a Money Services Business, registration no. [PLACEHOLDER: M number].',
    rpaa:
      'Registered with the Bank of Canada as a payment service provider under the Retail Payment Activities Act.',
    onboarding: 'Verified onboarding. Available to businesses only, in supported countries.',
    security: '[PLACEHOLDER: security statement, for example encryption and access controls]',
  },

  nav: {
    skipLinkLabel: 'Skip to main content',
    menuButtonLabel: 'Menu',
    items: [
      { kind: 'collection', label: 'Solutions', collection: 'solutions' },
      { kind: 'link', label: 'Industries', href: '/industries' },
      { kind: 'link', label: 'Partners', href: '/partners' },
      { kind: 'link', label: 'Compliance', href: '/compliance' },
      {
        kind: 'menu',
        label: 'Company',
        items: [
          { label: 'About', href: '/company/about' },
          { label: 'Contact and sales', href: '/company/contact' },
          { label: 'Support', href: '/company/support' },
        ],
      },
    ],
  },

  trustStrip: {
    label: 'Regulatory status',
    items: [
      'Registered Money Services Business with FINTRAC (no. [PLACEHOLDER: M number])',
      'Registered payment service provider with the Bank of Canada',
      'Services delivered with regulated partners',
    ],
  },

  finalCta: {
    trustLine: 'Verified onboarding. Registered with FINTRAC and the Bank of Canada.',
  },

  contact: {
    emailDomain: '[PLACEHOLDER: domain]',
    mailboxes: [
      { id: 'sales', label: 'Sales', user: 'sales' },
      { id: 'support', label: 'Support', user: 'support' },
      { id: 'compliance', label: 'Compliance', user: 'compliance' },
      { id: 'partners', label: 'Partners', user: 'partners' },
    ],
    registeredAddressLabel: 'Registered address',
    registeredAddress:
      '[PLACEHOLDER: Canadian address on the FINTRAC and Bank of Canada registrations]',
  },

  cookies: {
    title: 'Cookies on this site',
    body:
      'Essential cookies keep the site working. Analytics cookies help us understand how the site is used, and load only if you accept them.',
    accept: 'Accept',
    reject: 'Reject',
    manage: 'Manage choices',
    save: 'Save choices',
    essentialLabel: 'Essential',
    essentialNote: 'Always on. Needed for the site to work.',
    analyticsLabel: 'Analytics',
    analyticsNote: 'Helps us understand how the site is used. Nothing loads until you accept.',
    policyLinkLabel: 'Cookie policy',
    policyHref: '/legal/cookies',
  },

  social: [
    { label: 'LinkedIn', url: '[PLACEHOLDER: LinkedIn company page URL]' },
    { label: 'X', url: '[PLACEHOLDER: X profile URL]' },
  ],

  footer: {
    aboutLine:
      'NexFlow is a Canadian-registered payments company. Businesses use NexFlow to accept crypto, settle in fiat, hold virtual accounts and pay globally, through regulated partners.',

    groups: [
      { title: 'Solutions', collection: 'solutions', links: [] },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/company/about' },
          { label: 'Contact and sales', href: '/company/contact' },
          { label: 'Support', href: '/company/support' },
        ],
      },
      {
        title: 'Who we work with',
        links: [
          { label: 'Industries', href: '/industries' },
          { label: 'Partners', href: '/partners' },
          { label: 'Compliance and trust', href: '/compliance' },
          { label: 'Open an account', href: '/open-an-account' },
        ],
      },
      { title: 'Legal', collection: 'legal', links: [] },
    ],

    // Verbatim from CLAUDE.md. Shown on every page, including mobile.
    disclosure:
      '[PLACEHOLDER: LEGAL ENTITY NAME] is registered with the Financial Transactions and Reports Analysis Centre of Canada (FINTRAC) as a Money Services Business, registration no. [PLACEHOLDER: M number], and with the Bank of Canada as a payment service provider under the Retail Payment Activities Act. [PLACEHOLDER: LEGAL ENTITY NAME] is not a bank and does not accept deposits. Virtual accounts, card and crypto conversion services are provided in partnership with third-party regulated providers; the provider for each service is named in the client terms. Services are available to businesses only, in supported jurisdictions, subject to verification and approval.',

    copyrightPrefix: 'Copyright',
  },
});
