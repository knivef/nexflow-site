// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { loadEnv } from 'vite';

const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// Interim production host until a real domain is confirmed. See PLACEHOLDERS.md.
const INTERIM_PRODUCTION_URL = 'https://nexflow-site-one.vercel.app';

const siteUrl =
  SITE_URL || (process.env.VERCEL ? INTERIM_PRODUCTION_URL : undefined) || 'http://localhost:4321';

export default defineConfig({
  site: siteUrl,
  // Every page is prerendered. The account, partner and sales form endpoints will run on
  // demand as Vercel functions when they are built.
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'ignore',
  integrations: [
    // Home versions B and C are noindex while the pitch line is under test, so they stay
    // out of the sitemap along with any form endpoints.
    sitemap({ filter: (page) => !/\/(api|b|c)\/?$/.test(new URL(page).pathname) }),
  ],
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
      NOTION_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      NOTION_DB_ACCOUNTS: envField.string({ context: 'server', access: 'secret', optional: true }),
      NOTION_DB_PARTNERS: envField.string({ context: 'server', access: 'secret', optional: true }),
      NOTION_DB_SALES: envField.string({ context: 'server', access: 'secret', optional: true }),
      ANALYTICS_DOMAIN: envField.string({ context: 'server', access: 'public', optional: true }),
    },
  },
});
