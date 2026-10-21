/**
 * Content collections.
 *
 * solutions: the 7 solution pages, one schema, rendered by /solutions/[slug].
 * legal: the 6 footer-only legal pages, rendered by /legal/[slug].
 *
 * Singleton content (site, home, industries, partners, compliance, company, forms) lives in
 * src/content/*.ts as Zod-validated TypeScript, because it is structured data rather than
 * per-page documents.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const seo = {
  /** Page H1. */
  title: z.string().min(1),
  /** <title> tag. May differ from the H1 to carry the search term. */
  seoTitle: z.string().min(1),
  /** Meta description. */
  description: z.string().min(1),
  /** Position in navigation and listings. */
  order: z.number().int().positive(),
};

const solutions = defineCollection({
  loader: glob({ base: './src/content/solutions', pattern: '**/[^_]*.md' }),
  schema: z.object({
    ...seo,
    /** Short label for the mega menu. */
    navLabel: z.string().min(1),
    /** One line under the nav label in the mega menu. */
    navSummary: z.string().min(1),
    /** Target search term from the SEO map in CLAUDE.md. */
    primaryKeyword: z.string().min(1),
    secondaryKeywords: z.array(z.string().min(1)).default([]),
    /**
     * Open confirmations that must be closed before launch. The page stays visible during
     * review with its markers rendered, and comes off the site before launch if the
     * confirmation fails. CLAUDE.md holds the list.
     */
    confirmations: z.array(z.string().min(1)).default([]),
    /**
     * Partner attribution line, required wherever a regulated partner delivers the service.
     * Rendered verbatim next to the service description.
     */
    partnerAttribution: z.string().min(1).optional(),

    /* ---------------------------------------------------------------
       Template fields. A page with these filled renders the full
       template; one without still renders as a shell, so the four
       solutions not yet written do not break the build.
       --------------------------------------------------------------- */

    subHead: z.string().min(1).optional(),
    /** Primary call to action. Falls back to the site-wide one when absent. */
    cta: z.object({ label: z.string().min(1), href: z.string().min(1) }).optional(),
    /** Hero product visual: a labelled panel of facts, never a photograph. */
    heroPanel: z
      .object({
        label: z.string().min(1),
        rows: z.array(z.object({ term: z.string().min(1), value: z.string().min(1) })).min(2),
      })
      .optional(),
    benefits: z.array(z.object({ title: z.string().min(1) })).length(3).optional(),
    /**
     * Heading for the benefits section. Carries the page's primary keyword, which the H1
     * and meta title cannot because those are fixed approved copy.
     */
    benefitsHeading: z.string().min(1).optional(),
    howItWorks: z
      .object({
        label: z.string().min(1),
        steps: z.array(z.object({ label: z.string().min(1), note: z.string().min(1).optional() })).min(2),
      })
      .optional(),
    /** Audience chips. href points at an Industries anchor where one matches. */
    whoItsFor: z.array(z.object({ label: z.string().min(1), href: z.string().min(1).optional() })).min(1).optional(),
    /** Service-specific compliance note, shown near the end of the page. */
    complianceNote: z.string().min(1).optional(),
    /** Optional link rendered with the compliance note, for example to restricted countries. */
    complianceLink: z.object({ label: z.string().min(1), href: z.string().min(1) }).optional(),
    /**
     * An extra on-page section, used where a CTA points at a list on the same page rather
     * than at another route.
     */
    extraSection: z
      .object({ id: z.string().min(1), heading: z.string().min(1), body: z.string().min(1) })
      .optional(),
    /**
     * Card render for the hero, used instead of heroPanel. Carries the NexFlow mark only:
     * no card network logo appears anywhere until the issuer approves it.
     */
    heroCard: z
      .object({ label: z.string().min(1), holder: z.string().min(1), caption: z.string().min(1) })
      .optional(),
    /** Exactly two related solution slugs. */
    related: z.array(z.string().min(1)).length(2).optional(),
    /**
     * FAQ. Rendered on the page as well as carried for Step 12 schema: FAQ structured data
     * has to match content the visitor can actually see.
     */
    faq: z
      .array(z.object({ question: z.string().min(1), answer: z.string().min(1) }))
      .min(3)
      .max(4)
      .optional(),
  }),
});

const legal = defineCollection({
  loader: glob({ base: './src/content/legal', pattern: '**/[^_]*.md' }),
  schema: z.object({
    ...seo,
    /** Legal pages are linked from the footer only, never from the top bar. */
    footerLabel: z.string().min(1),
    /** Shown under the heading on every legal page. */
    lastUpdated: z.string().min(1),
    /** One line under the title, before the table of contents. */
    intro: z.string().min(1).optional(),
    /**
     * Sections in document order. The table of contents is built from these, and only
     * renders when there is more than one, because a one item contents list helps nobody.
     */
    sections: z
      .array(
        z.object({
          id: z.string().min(1),
          heading: z.string().min(1),
          /** Body text. Absent where the section is generated from config instead. */
          body: z.string().min(1).optional(),
          /**
           * Pulls its content from config or site content rather than from this file, so
           * the legal page and the rest of the site cannot disagree.
           */
          generated: z
            .enum(['registrations', 'disclosure', 'prohibited-businesses', 'restricted-countries'])
            .optional(),
        }),
      )
      .min(1),
  }),
});

export const collections = { solutions, legal };
