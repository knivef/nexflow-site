/**
 * Partners page. Audience: account and IBAN providers, crypto liquidity and conversion
 * providers, card issuers and program managers, and payout and FX providers.
 *
 * No partner is ever named here before approval, and NexFlow never claims a partner's
 * licence: each partner holds its own.
 */
import { z } from 'astro/zod';
import { defineContent } from '@/lib/content';

const schema = z.object({
  page: z.object({
    title: z.string().min(1),
    seoTitle: z.string().min(1),
    description: z.string().min(1),
    subHead: z.string().min(1),
  }),
  offer: z.object({
    heading: z.string().min(1),
    items: z.array(z.string().min(1)).min(1),
  }),
  partnerTypes: z.object({
    heading: z.string().min(1),
    items: z.array(z.object({ id: z.string().min(1), label: z.string().min(1) })).min(1),
  }),
  segments: z.object({
    heading: z.string().min(1),
    intro: z.string().min(1),
    /** Anchors on /industries. Validated at build time by the page. */
    items: z.array(z.object({ label: z.string().min(1), href: z.string().min(1) })).length(7),
  }),
  howItWorks: z.object({
    heading: z.string().min(1),
    steps: z.array(z.object({ label: z.string().min(1), note: z.string().min(1).optional() })).min(2),
  }),
  regulatory: z.object({
    heading: z.string().min(1),
    body: z.string().min(1),
    linkLabel: z.string().min(1),
    href: z.string().min(1),
  }),
  contact: z.object({
    heading: z.string().min(1),
    mailbox: z.string().min(1),
  }),
});

export const partners = defineContent('partners', schema, {
  page: {
    title: 'Partner with NexFlow.',
    seoTitle: 'Partner With a Canadian-Registered Payments Company | NexFlow',
    description:
      'NexFlow brings verified, compliant business clients to regulated providers, under our brand and our compliance program. For account, liquidity, card and payout partners.',
    subHead:
      'We bring verified, compliant business clients to regulated providers, under our brand and our compliance program.',
  },

  offer: {
    heading: 'What we offer partners',
    items: [
      'Pre-verified business clients',
      'A Canadian-registered MSB and payment service provider as counterparty',
      'Shared or full onboarding, depending on your model',
      'Clear client segments and volume forecasts',
    ],
  },

  partnerTypes: {
    heading: 'Who we partner with',
    items: [
      { id: 'accounts-ibans', label: 'Account and IBAN providers' },
      { id: 'crypto-liquidity', label: 'Crypto liquidity and conversion providers' },
      { id: 'card-issuing', label: 'Card issuers and program managers' },
      { id: 'payouts-fx', label: 'Payout and FX providers' },
    ],
  },

  segments: {
    heading: 'Client segments we bring',
    intro: 'The industries we serve, each with a different mix of products.',
    items: [
      { label: 'Crypto and Web3 companies', href: '/industries#crypto-web3' },
      { label: 'E-commerce and digital goods', href: '/industries#ecommerce' },
      { label: 'Video game studios and digital entertainment', href: '/industries#video-games' },
      { label: 'Marketplaces and platforms', href: '/industries#marketplaces' },
      { label: 'Remote-first companies', href: '/industries#remote-teams' },
      { label: 'Import and export businesses', href: '/industries#import-export' },
      { label: 'Fintechs and crypto platforms', href: '/industries#fintechs' },
    ],
  },

  howItWorks: {
    heading: 'How it works',
    steps: [
      { label: 'Introductory call', note: 'What you offer and where we fit' },
      { label: 'Mutual due diligence', note: 'Our onboarding pack is available on request' },
      { label: 'Integration and launch', note: 'Technical and commercial go-live' },
    ],
  },

  regulatory: {
    heading: 'Our regulatory standing',
    body:
      'NexFlow is registered with FINTRAC as a Money Services Business and with the Bank of Canada as a payment service provider under the Retail Payment Activities Act. Each partner holds its own licence, and the provider for each service is named in the client terms.',
    linkLabel: 'Read about compliance and trust',
    href: '/compliance',
  },

  contact: {
    heading: 'Partnerships contact',
    mailbox: 'partners',
  },
});
