/**
 * Content collections. Guides are MDX or Markdown files in src/content/guides/ and become /guides/[slug].
 * Add a file, push, and Vercel builds the new page. Set draft: true to keep a guide unpublished.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guides = defineCollection({
  loader: glob({ base: './src/content/guides', pattern: '**/[^_]*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { guides };
