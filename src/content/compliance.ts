/**
 * Compliance and trust.
 *
 * Plain-text registration statements only: no regulator logo appears anywhere on this site.
 * Every line here describes something that is in place today. Anything not yet true is a
 * visible placeholder, not a softened claim.
 *
 * Registry links are the official public search pages, verified against the regulators'
 * own sites. They let a partner check our status rather than take our word for it.
 */
import { z } from 'astro/zod';
import { defineContent } from '@/lib/content';

const schema = z.object({
  page: z.object({
    title: z.string().min(1),
    seoTitle: z.string().min(1),
    description: z.string().min(1),
    intro: z.string().min(1),
    keywords: z.array(z.string().min(1)).min(1),
  }),

  regulatory: z.object({
    heading: z.string().min(1),
    registrations: z
      .array(
        z.object({
          id: z.string().min(1),
          regulator: z.string().min(1),
          statement: z.string().min(1),
          reference: z.string().min(1),
          registry: z.object({
            label: z.string().min(1),
            // Absolute https only: a registry link must leave the site, never be relative.
            href: z.string().regex(/^https:\/\/[^\s]+$/, 'Registry links must be absolute https URLs'),
          }),
        }),
      )
      .min(1),
    partnersNote: z.string().min(1),
    explainer: z.object({
      heading: z.string().min(1),
      paragraphs: z.array(z.string().min(1)).min(3).max(4),
      confirm: z.string().min(1),
    }),
  }),

  safety: z.object({
    heading: z.string().min(1),
    items: z.array(z.string().min(1)).min(1),
  }),

  dataSecurity: z.object({
    heading: z.string().min(1),
    body: z.string().min(1),
    certificationsLabel: z.string().min(1),
    certifications: z.string().min(1),
  }),

  prohibited: z.object({
    heading: z.string().min(1),
    body: z.string().min(1),
    link: z.object({ label: z.string().min(1), href: z.string().min(1) }),
  }),

  report: z.object({
    heading: z.string().min(1),
    body: z.string().min(1),
    mailbox: z.string().min(1),
  }),

  regulatoryBlock: z.object({ heading: z.string().min(1) }),
});

export const compliance = defineContent('compliance', schema, {
  page: {
    title: 'Compliance and trust',
    seoTitle: 'FINTRAC and Bank of Canada Registered Payments | NexFlow',
    description:
      'NexFlow is registered with FINTRAC as a Money Services Business and with the Bank of Canada as a payment service provider under the Retail Payment Activities Act. Services are delivered with regulated partners.',
    intro:
      'Partners and clients compare what we say here against our registrations and contracts. Everything on this page is in place today.',
    keywords: ['FINTRAC MSB and RPAA registered payment company'],
  },

  regulatory: {
    heading: 'Regulatory status',
    registrations: [
      {
        id: 'fintrac',
        regulator: 'Financial Transactions and Reports Analysis Centre of Canada (FINTRAC)',
        statement: 'Registered Money Services Business.',
        reference: 'Registration no. [PLACEHOLDER: M number]',
        registry: {
          // The registry landing page, not the deep search-app URL, which is more likely to move.
          label: 'Search the FINTRAC money services business registry',
          href: 'https://fintrac-canafe.canada.ca/msb-esm/reg-eng',
        },
      },
      {
        id: 'boc-rpaa',
        regulator: 'Bank of Canada',
        statement: 'Registered payment service provider under the Retail Payment Activities Act.',
        reference: 'Reference [PLACEHOLDER: Bank of Canada reference]',
        registry: {
          label: 'Search the Bank of Canada registry of payment service providers',
          href: 'https://www.bankofcanada.ca/regulatory-oversight/retail-payments/psp-registry/',
        },
      },
    ],
    partnersNote:
      "Services are delivered with regulated partners. Each partner's authorisation is named in the client terms.",
    explainer: {
      heading: 'What our two registrations mean',
      paragraphs: [
        'Our FINTRAC registration covers our anti-money-laundering obligations as a money services business, including client verification, record keeping and reporting.',
        'Our Bank of Canada registration covers our obligations as a payment service provider under the Retail Payment Activities Act, including operational risk management and the safeguarding of client funds.',
        'Each regulated partner that delivers a service holds its own authorisation in its own name, and the provider for each service is named in the client terms.',
        'Neither regulator licenses or endorses the businesses it registers. Registration means the legal requirements to register have been met, which is why both registries are linked above.',
      ],
      confirm: '[CONFIRM: legal review of this explainer]',
    },
  },

  safety: {
    heading: 'How we keep clients and partners safe',
    items: [
      'Identity and business verification for every client',
      'Sanctions and politically exposed person screening',
      'Ongoing transaction monitoring',
      'Wallet screening for crypto transactions',
      'A designated Chief Compliance Officer: [PLACEHOLDER: name, if approved for publication]',
    ],
  },

  dataSecurity: {
    heading: 'Data security',
    body:
      'Encryption in transit and at rest, access controls, and privacy practices in line with Canadian privacy law (PIPEDA).',
    certificationsLabel: 'Certifications',
    certifications: '[PLACEHOLDER: list or remove]',
  },

  prohibited: {
    heading: 'Prohibited businesses',
    body: 'Some business activities and countries are out of scope for us. The full list is kept with our legal terms.',
    link: {
      label: 'Prohibited businesses and restricted countries',
      href: '/legal/prohibited-businesses',
    },
  },

  report: {
    heading: 'Report a concern',
    body: 'If you have a compliance concern about NexFlow or about an account using our services, write to us.',
    mailbox: 'compliance',
  },

  regulatoryBlock: { heading: 'Regulatory information' },
});
