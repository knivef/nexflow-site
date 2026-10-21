/**
 * Company pages: About, Contact and sales, Support.
 *
 * Leadership stays hidden behind siteConfig.showLeadership until real names, titles and
 * bios exist. The mission line and founding story are placeholders: writing a plausible
 * origin story would be inventing facts about the company.
 */
import { z } from 'astro/zod';
import { defineContent } from '@/lib/content';

const pageSchema = z.object({
  title: z.string().min(1),
  seoTitle: z.string().min(1),
  description: z.string().min(1),
});

const schema = z.object({
  about: pageSchema.extend({
    mission: z.object({
      heading: z.string().min(1),
      line: z.string().min(1),
      /** Shown as a review suggestion, clearly marked as not yet approved. */
      suggestedDraft: z.string().min(1),
    }),
    story: z.object({ heading: z.string().min(1), body: z.string().min(1) }),
    leadership: z.object({ heading: z.string().min(1), body: z.string().min(1) }),
    office: z.object({ heading: z.string().min(1), address: z.string().min(1) }),
  }),

  contact: pageSchema.extend({
    intro: z.string().min(1),
    support: z.object({ heading: z.string().min(1), body: z.string().min(1), mailbox: z.string().min(1) }),
    complaints: z.object({
      heading: z.string().min(1),
      body: z.string().min(1),
      link: z.object({ label: z.string().min(1), href: z.string().min(1) }),
    }),
    address: z.object({ heading: z.string().min(1) }),
  }),

  support: pageSchema.extend({
    intro: z.string().min(1),
    mailbox: z.string().min(1),
    responseTime: z.object({ label: z.string().min(1), value: z.string().min(1) }),
    links: z
      .array(z.object({ label: z.string().min(1), href: z.string().min(1), note: z.string().min(1) }))
      .min(1),
  }),
});

export const company = defineContent('company', schema, {
  about: {
    title: 'About NexFlow',
    seoTitle: 'About NexFlow',
    description:
      'NexFlow is a Canadian-registered payments company. Businesses use NexFlow to accept crypto, settle in fiat, hold virtual accounts and pay globally, through regulated partners.',
    mission: {
      heading: 'What we are here to do',
      line: '[PLACEHOLDER: approved mission line]',
      suggestedDraft:
        'Suggested draft for review: "We make it simple for businesses to move money between crypto and fiat, on regulated rails."',
    },
    story: {
      heading: 'How NexFlow started',
      body: '[PLACEHOLDER: founding story, two or three sentences]',
    },
    leadership: {
      heading: 'Leadership',
      body: '[PLACEHOLDER: leadership names, titles, photos and short bios]',
    },
    office: {
      heading: 'Our office',
      address: '[PLACEHOLDER: Canadian office address]',
    },
  },

  contact: {
    title: 'Contact and sales',
    seoTitle: 'Talk to Sales | NexFlow',
    description:
      'Talk to the NexFlow sales team about crypto acceptance, conversion, virtual accounts, global payouts and card programs for your business.',
    intro:
      'Tell us about your business and what you need. For support with an existing account, use the support address below.',
    support: {
      heading: 'Support',
      body: 'Already a client, or have a question about an existing application?',
      mailbox: 'support',
    },
    complaints: {
      heading: 'Complaints',
      body: 'If something has gone wrong, our complaints procedure sets out how to raise it and what happens next.',
      link: { label: 'Complaints procedure', href: '/legal/complaints' },
    },
    address: { heading: 'Registered address' },
  },

  support: {
    title: 'Support',
    seoTitle: 'Support | NexFlow',
    description:
      'Support for NexFlow business clients: how to reach us, how long a reply takes, and where to raise a complaint or a compliance concern.',
    intro: 'Write to us and include your company name and, where relevant, the account or payment reference.',
    mailbox: 'support',
    responseTime: {
      label: 'Expected response time',
      value: '[PLACEHOLDER: expected response time]',
    },
    links: [
      {
        label: 'Complaints procedure',
        href: '/legal/complaints',
        note: 'How to raise a complaint and what happens next.',
      },
      {
        label: 'Report a compliance concern',
        href: '/compliance#report',
        note: 'For concerns about NexFlow or about an account using our services.',
      },
    ],
  },
});
