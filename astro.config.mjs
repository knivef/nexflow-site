// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import { loadEnv } from 'vite';

import { config } from './src/config/site.config';

const { SITE_URL, SITE_VERSION } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// Public URL: SITE_URL if set, otherwise the URL of the version Vercel is building (matched by git branch),
// so v1, v2 and v3 each get correct canonical URLs, sitemap and schema without per-branch env vars.
const branch = process.env.VERCEL_GIT_COMMIT_REF;
const version = config.versions.find((v) => (SITE_VERSION ? v.id === SITE_VERSION : v.branch === branch));
const siteUrl = SITE_URL || (process.env.VERCEL ? version?.url : undefined) || 'http://localhost:4321';

export default defineConfig({
  site: siteUrl,
  // Pages are prerendered to static HTML. Only /api/apply runs on demand, as a Vercel function.
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/api/') })],
  // The sitemap integration writes /sitemap-index.xml; /sitemap.xml redirects there for crawlers that guess.
  redirects: { '/sitemap.xml': '/sitemap-index.xml' },
  env: {
    schema: {
      SITE_URL: envField.string({ context: 'server', access: 'public', optional: true }),
      FORM_ADAPTER: envField.enum({
        context: 'server',
        access: 'public',
        values: ['none', 'webhook', 'notion', 'email'],
        default: 'none',
      }),
      FORM_ENDPOINT: envField.string({ context: 'server', access: 'secret', optional: true }),
      FORM_WEBHOOK_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
      NOTION_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      NOTION_DATABASE_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      FORM_EMAIL_TO: envField.string({ context: 'server', access: 'secret', optional: true }),
      BOOKING_URL: envField.string({ context: 'server', access: 'public', optional: true }),
      ANALYTICS_DOMAIN: envField.string({ context: 'server', access: 'public', optional: true }),
    },
  },
});
