/**
 * Industries: one page, 7 sections.
 *
 * The section ids are anchor targets. The home page tiles and the "Who it's for" chips on
 * the solution pages link straight to them, and src/pages/industries.astro fails the build
 * if any of those links points at an anchor that does not exist here.
 *
 * Products are referenced by solution slug, not by URL, so a slug change follows through
 * automatically and a slug that does not exist fails the build.
 *
 * Excluded industries are never listed or implied. The video game section must never
 * mention gambling, betting, casinos, loot boxes or skins trading.
 */
import { z } from 'astro/zod';
import { defineContent } from '@/lib/content';

/** Every solution page slug. Used to validate product references. */
export const SOLUTION_SLUGS = [
  'crypto-acceptance',
  'conversion-otc',
  'virtual-ibans',
  'global-payouts',
  'fx-multi-currency',
  'cards',
  'platform-payments',
] as const;

const schema = z.object({
  page: z.object({
    title: z.string().min(1),
    seoTitle: z.string().min(1),
    description: z.string().min(1),
    intro: z.string().min(1),
  }),
  jumpListLabel: z.string().min(1),
  sections: z
    .array(
      z.object({
        /** Anchor id. Changing one means changing every link that points at it. */
        id: z.string().min(1),
        title: z.string().min(1),
        problem: z.string().min(1),
        products: z
          .array(
            z.object({
              slug: z.enum(SOLUTION_SLUGS),
              /** Appended in brackets after the product name, for example "white-label". */
              note: z.string().min(1).optional(),
            }),
          )
          .min(1),
      }),
    )
    .length(7),
  closing: z.object({
    note: z.string().min(1),
    salesLink: z.object({ label: z.string().min(1), href: z.string().min(1) }),
    prohibitedLink: z.object({ label: z.string().min(1), href: z.string().min(1) }),
  }),
});

export const industries = defineContent('industries', schema, {
  page: {
    title: 'Payments for businesses that work across crypto and fiat',
    seoTitle: 'Crypto and Fiat Payments by Industry | NexFlow',
    description:
      'Crypto and Web3, e-commerce, video game studios, marketplaces, remote-first companies, import and export businesses and fintechs. Each uses a different mix of NexFlow products.',
    intro:
      'Each industry below uses a different mix of NexFlow products. We work only with industries our compliance policy accepts.',
  },

  jumpListLabel: 'Jump to an industry',

  sections: [
    {
      id: 'crypto-web3',
      title: 'Crypto and Web3 companies',
      problem:
        'Fiat payment access is hard to get, and salaries and vendors still need paying in fiat.',
      products: [
        { slug: 'virtual-ibans' },
        { slug: 'conversion-otc' },
        { slug: 'global-payouts' },
      ],
    },
    {
      id: 'ecommerce',
      title: 'E-commerce and digital goods',
      problem: 'Customers want to pay in crypto. You want fiat.',
      products: [{ slug: 'crypto-acceptance' }, { slug: 'fx-multi-currency' }],
    },
    {
      id: 'video-games',
      title: 'Video game studios and digital entertainment',
      problem: 'A global player base pays in many currencies.',
      products: [
        { slug: 'crypto-acceptance' },
        { slug: 'global-payouts' },
        { slug: 'cards' },
      ],
    },
    {
      id: 'marketplaces',
      title: 'Marketplaces and platforms',
      problem: 'Paying thousands of sellers across borders.',
      products: [{ slug: 'platform-payments' }, { slug: 'global-payouts' }],
    },
    {
      id: 'remote-teams',
      title: 'Remote-first companies',
      problem: 'Contractors in many countries, each wanting to be paid differently.',
      products: [
        { slug: 'global-payouts', note: 'including stablecoin payouts' },
        { slug: 'cards' },
      ],
    },
    {
      id: 'import-export',
      title: 'Import and export businesses',
      problem: 'Collecting in EUR and GBP while paying suppliers abroad.',
      products: [
        { slug: 'virtual-ibans' },
        { slug: 'fx-multi-currency' },
        { slug: 'global-payouts' },
      ],
    },
    {
      id: 'fintechs',
      title: 'Fintechs and crypto platforms',
      problem: 'You want to offer accounts or cards to your own users.',
      products: [{ slug: 'cards', note: 'white-label' }, { slug: 'virtual-ibans' }],
    },
  ],

  closing: {
    note: "Don't see your industry? Tell us about your business and we'll confirm whether we can support it.",
    salesLink: { label: 'Tell us about your business', href: '/company/contact#sales-form' },
    prohibitedLink: {
      label: 'Prohibited businesses and restricted countries',
      href: '/legal/prohibited-businesses',
    },
  },
});

export type IndustrySection = (typeof industries.sections)[number];
