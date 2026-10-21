/**
 * Home page content: the three versions and the nine shared sections.
 *
 * The three versions run through one component tree and differ only through the fields
 * below. B and C are noindex with a canonical to "/" until a winner is chosen.
 */
import { z } from 'astro/zod';
import { defineContent } from '@/lib/content';

/** The six offerings shown on the home grid. Platform payments has a page but is not here. */
export const OFFERING_IDS = [
  'crypto-acceptance',
  'conversion-otc',
  'virtual-ibans',
  'global-payouts',
  'fx-multi-currency',
  'cards',
] as const;

const versionSchema = z.object({
  id: z.enum(['a', 'b', 'c']),
  path: z.string().min(1),
  label: z.string().min(1),
  /** The H1. */
  pitchLine: z.string().min(1),
  subHead: z.string().min(1),
  /** Order of the six offering cards on this version. */
  offeringsOrder: z
    .array(z.enum(OFFERING_IDS))
    .length(6)
    .refine((ids) => new Set(ids).size === ids.length, {
      message: 'offeringsOrder must list each offering exactly once',
    }),
  heroVisual: z.enum(['crypto-to-fiat-flow', 'balances-dashboard', 'four-step-flow']),
  finalCtaHeadline: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  noindex: z.boolean(),
  canonicalPath: z.string().min(1),
});

const sectionsSchema = z.object({
  hero: z.object({
    eyebrow: z.string().min(1),
  }),
  /**
   * Hero visuals: product, never a stock photo of coins. Keyed by the version's heroVisual.
   * The dashboard figures are illustrative only and carry a visible Example label, because
   * no real balance, rate or volume may appear on the site.
   */
  heroVisuals: z.object({
    'crypto-to-fiat-flow': z.object({
      label: z.string().min(1),
      steps: z.array(z.object({ label: z.string().min(1), note: z.string().min(1).optional() })).min(2),
    }),
    'four-step-flow': z.object({
      label: z.string().min(1),
      steps: z.array(z.object({ label: z.string().min(1), note: z.string().min(1).optional() })).min(2),
    }),
    'balances-dashboard': z.object({
      label: z.string().min(1),
      exampleBadge: z.string().min(1),
      caption: z.string().min(1),
      accountLabel: z.string().min(1),
      rows: z.array(z.object({ currency: z.string().min(1), amount: z.string().min(1) })).length(4),
    }),
  }),
  offerings: z.object({
    heading: z.string().min(1),
    learnMoreLabel: z.string().min(1),
    items: z
      .array(
        z.object({
          id: z.enum(OFFERING_IDS),
          title: z.string().min(1),
          line: z.string().min(1),
          href: z.string().min(1),
          icon: z.enum(['accept', 'convert', 'account', 'payout', 'currencies', 'card']),
        }),
      )
      .length(6),
  }),
  howItWorks: z.object({
    heading: z.string().min(1),
    steps: z.array(z.string().min(1)).length(3),
    note: z.string().min(1),
  }),
  whoWeServe: z.object({
    heading: z.string().min(1),
    tiles: z.array(z.object({ label: z.string().min(1), href: z.string().min(1) })).length(7),
  }),
  compliance: z.object({
    heading: z.string().min(1),
    body: z.string().min(1),
    linkLabel: z.string().min(1),
    href: z.string().min(1),
  }),
  partner: z.object({
    body: z.string().min(1),
  }),
});

const schema = z.object({
  versions: z.array(versionSchema).length(3),
  sections: sectionsSchema,
});

export const home = defineContent('home', schema, {
  versions: [
    {
      id: 'a',
      path: '/',
      label: 'A',
      pitchLine: 'Accept crypto. Settle in fiat. Pay anywhere.',
      subHead:
        'Accept crypto, settle in fiat, hold virtual accounts and pay globally. One onboarding, one dashboard.',
      offeringsOrder: [
        'crypto-acceptance',
        'conversion-otc',
        'virtual-ibans',
        'global-payouts',
        'fx-multi-currency',
        'cards',
      ],
      heroVisual: 'crypto-to-fiat-flow',
      finalCtaHeadline: 'Ready to move money between crypto and fiat?',
      metaTitle: 'Accept Crypto, Settle in Fiat | NexFlow',
      metaDescription:
        'Accept stablecoins and crypto from customers and settle in fiat. Virtual IBANs, global payouts and cards from a FINTRAC-registered payments company.',
      noindex: false,
      canonicalPath: '/',
    },
    {
      id: 'b',
      path: '/b',
      label: 'B',
      pitchLine: 'One account for digital-asset and fiat payments.',
      subHead:
        'Virtual IBANs, crypto conversion, global payouts and cards for your business, from one Canadian-registered provider. One onboarding, one dashboard.',
      offeringsOrder: [
        'virtual-ibans',
        'conversion-otc',
        'global-payouts',
        'crypto-acceptance',
        'fx-multi-currency',
        'cards',
      ],
      heroVisual: 'balances-dashboard',
      finalCtaHeadline: 'Ready to run crypto and fiat from one account?',
      metaTitle: 'Business Accounts for Crypto and Fiat Payments | NexFlow',
      metaDescription:
        'One business account for crypto and fiat: virtual IBANs, conversion, payouts and cards from a FINTRAC-registered payments company.',
      noindex: true,
      canonicalPath: '/',
    },
    {
      id: 'c',
      path: '/c',
      label: 'C',
      pitchLine: 'Business payments that move between crypto and fiat in one flow.',
      subHead:
        'Collect in stablecoins, convert to EUR, GBP or USD, and pay suppliers and teams in supported countries without switching providers. One onboarding, one dashboard.',
      offeringsOrder: [
        'conversion-otc',
        'global-payouts',
        'crypto-acceptance',
        'virtual-ibans',
        'fx-multi-currency',
        'cards',
      ],
      heroVisual: 'four-step-flow',
      finalCtaHeadline: 'Ready to move money between crypto and fiat in one flow?',
      metaTitle: 'Crypto to Fiat Business Payments in One Flow | NexFlow',
      metaDescription:
        'Collect in crypto, convert to fiat and pay out from one provider. Registered with FINTRAC and the Bank of Canada. Built for businesses.',
      noindex: true,
      canonicalPath: '/',
    },
  ],

  sections: {
    hero: {
      eyebrow: 'Payments for businesses, registered in Canada',
    },

    heroVisuals: {
      'crypto-to-fiat-flow': {
        label: 'How a crypto payment reaches your account in fiat',
        steps: [
          { label: 'Customer pays in USDC', note: 'From a verified wallet' },
          { label: 'Converted to EUR', note: 'Converted at the point of payment' },
          { label: 'EUR settled to an account in your name', note: 'Virtual IBAN' },
        ],
      },
      'four-step-flow': {
        label: 'Collect, convert, hold, pay out',
        steps: [
          { label: 'Collect', note: 'Stablecoins, crypto and fiat' },
          { label: 'Convert', note: 'Into EUR, GBP or USD' },
          { label: 'Hold', note: 'Balances in your own accounts' },
          { label: 'Pay out', note: 'Suppliers, contractors and teams' },
        ],
      },
      'balances-dashboard': {
        label: 'Example account balances',
        exampleBadge: 'Example',
        caption: 'Illustration only. Figures are an example, not a real account.',
        accountLabel: 'Balances',
        rows: [
          { currency: 'EUR', amount: '48,250.00' },
          { currency: 'GBP', amount: '12,480.00' },
          { currency: 'USD', amount: '96,300.00' },
          { currency: 'USDC', amount: '25,000.00' },
        ],
      },
    },

    offerings: {
      heading: 'Everything your business needs to move between crypto and fiat',
      learnMoreLabel: 'Learn more',
      items: [
        {
          id: 'crypto-acceptance',
          title: 'Crypto acceptance',
          line: 'Get paid in stablecoins and crypto. Receive fiat in your account.',
          href: '/solutions/crypto-acceptance',
          icon: 'accept',
        },
        {
          id: 'conversion-otc',
          title: 'Crypto-to-fiat conversion',
          line: 'Convert digital assets into EUR, GBP, USD and more, at a rate you see before you confirm.',
          href: '/solutions/conversion-otc',
          icon: 'convert',
        },
        {
          id: 'virtual-ibans',
          title: 'Virtual IBANs and accounts',
          line: "Dedicated IBANs in your company's name to collect and pay in EUR and GBP.",
          href: '/solutions/virtual-ibans',
          icon: 'account',
        },
        {
          id: 'global-payouts',
          title: 'Global payouts',
          line: 'Pay suppliers, contractors and teams in fiat or stablecoins, one at a time or in bulk.',
          href: '/solutions/global-payouts',
          icon: 'payout',
        },
        {
          id: 'fx-multi-currency',
          title: 'FX and multi-currency',
          line: 'Hold balances in several currencies and convert at transparent rates.',
          href: '/solutions/fx-multi-currency',
          icon: 'currencies',
        },
        {
          id: 'cards',
          title: 'Cards',
          line: 'Prepaid and crypto-funded cards for your team and your customers.',
          href: '/solutions/cards',
          icon: 'card',
        },
      ],
    },

    howItWorks: {
      heading: 'Live in three steps',
      steps: [
        'Apply online and complete business verification.',
        'Get your accounts and wallets set up.',
        'Start collecting, converting and paying out.',
      ],
      note: 'Onboarding time depends on your business and the services you need. [PLACEHOLDER: typical onboarding time, if contractually backed]',
    },

    whoWeServe: {
      heading: 'Built for businesses that work across crypto and fiat',
      tiles: [
        { label: 'Crypto and Web3', href: '/industries#crypto-web3' },
        { label: 'E-commerce and digital goods', href: '/industries#ecommerce' },
        { label: 'Video game studios', href: '/industries#video-games' },
        { label: 'Marketplaces and platforms', href: '/industries#marketplaces' },
        { label: 'Remote-first companies', href: '/industries#remote-teams' },
        { label: 'Import and export', href: '/industries#import-export' },
        { label: 'Fintechs and crypto platforms', href: '/industries#fintechs' },
      ],
    },

    compliance: {
      heading: 'Compliance first',
      body:
        'Every client goes through identity and business verification. We screen against sanctions and politically exposed person lists, monitor transactions on an ongoing basis, screen wallets on crypto transactions, and protect data with encryption and access controls. A designated Chief Compliance Officer oversees the program.',
      linkLabel: 'Read about compliance and trust',
      href: '/compliance',
    },

    partner: {
      body:
        'Banks, EMIs, liquidity and card providers: reach compliant, verified business clients.',
    },
  },
});

export const defaultVersion = home.versions[0]!;
export type HomeVersion = (typeof home.versions)[number];
export type HomeVersionId = HomeVersion['id'];
export type OfferingId = (typeof OFFERING_IDS)[number];

export function versionById(id: HomeVersionId): HomeVersion {
  return home.versions.find((version) => version.id === id) ?? defaultVersion;
}

/** Offering cards in the order this version wants them. */
export function offeringsFor(version: HomeVersion) {
  return version.offeringsOrder.map(
    (id) => home.sections.offerings.items.find((item) => item.id === id)!,
  );
}
