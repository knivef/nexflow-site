// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import { loadEnv } from 'vite';

const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

export default defineConfig({
  site: SITE_URL || 'http://localhost:4321',
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
