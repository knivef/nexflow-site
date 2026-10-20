# Nexflow marketing site

Single-page marketing site for Nexflow, an acquiring partner network for PSPs, payfacs and ISOs.

Built with [Astro](https://astro.build). Every page is prerendered to static HTML; the only server code is the partner application endpoint (`/api/apply`), which runs as a Vercel function. Project rules for content, copy and accessibility are in `CLAUDE.md`.

## Local development

Requires Node 22.22 or later.

```bash
npm install
cp .env.example .env
npm run dev
```

The site runs at http://localhost:4321.

## Where things live

| What | Where |
|------|-------|
| All copy | `src/content/site.ts` (types in `src/content/types.ts`) |
| Feature flags | `src/config/site.config.ts` |
| Design tokens | `src/styles/tokens.css` (source files in `design/`) |
| Base components | `src/components/ui/` |
| Page sections | `src/components/sections/` |
| Application endpoint | `src/pages/api/apply.ts` |
| Form validation (browser and server) | `src/lib/apply.ts` |
| Form delivery adapters | `src/lib/adapters/` |
| FAQ data for schema | `src/lib/faq.ts` |
| Open placeholders | `PLACEHOLDERS.md` |

## Partner application form

The `#apply` form validates in the browser and again on the server with the same rules (`src/lib/apply.ts`). It also:

- blocks free-mail domains (Gmail, Outlook, Yahoo, Proton, iCloud and similar);
- drops bot submissions quietly (a hidden honeypot field, and submissions made in under 3 seconds);
- rate limits to 5 submissions per IP per 10 minutes. This is per function instance, so it is best-effort. Add a Vercel Firewall rate limit rule for a hard limit;
- works without JavaScript: the form posts directly and the page shows the result;
- pre-selects "Founding partner" when opened with `?partnership=founding` (the founding programme CTA adds this).

Where applications go is set by `FORM_ADAPTER`:

| `FORM_ADAPTER` | Status | Needs |
|---|---|---|
| `webhook` | Complete | `FORM_ENDPOINT`, optional `FORM_WEBHOOK_SECRET` |
| `notion` | Complete | `NOTION_TOKEN`, `NOTION_DATABASE_ID` |
| `email` | Stub, always fails | `FORM_EMAIL_TO`, plus a provider (see `src/lib/adapters/email.ts`) |
| `none` (default) | Rejects | Nothing. The visitor sees the fallback email address. |

If delivery fails, the visitor sees the fallback email address from `site.apply.failure.email`, and the function logs the reason (never the applicant's details).

### Webhook

Each application is sent as `POST` with a JSON body:

```json
{
  "type": "partner_application",
  "version": 1,
  "submittedAt": "2026-10-20T11:56:10.059Z",
  "data": { "fullName": "...", "workEmail": "...", "companyType": "founding", "verticals": ["igaming"], "...": "..." },
  "labels": { "companyType": "Founding partner", "verticals": ["iGaming"], "...": "..." }
}
```

`data` holds the coded values; `labels` holds the human-readable versions of the select and multi-select fields. If `FORM_WEBHOOK_SECRET` is set, the request carries `X-Nexflow-Signature`: the hex HMAC-SHA256 of the raw body using that secret. Verify it on the receiving side. Any non-2xx response, or no response within 8 seconds, counts as a failed delivery.

### Notion

1. Create an internal integration at https://www.notion.so/my-integrations and copy its token into `NOTION_TOKEN`.
2. Create a database with exactly these properties (names are case-sensitive):

| Property | Type |
|---|---|
| Name | Title |
| Email | Email |
| Company | Text |
| Website | URL |
| Company type | Select |
| Monthly volume | Select |
| Licence status | Select |
| Licence details | Text |
| Verticals | Multi-select |
| Geographies | Multi-select |
| Needs | Multi-select |
| Current acquirers | Text |
| Message | Text |
| Consent | Checkbox |
| Submitted at | Date |

3. Share the database with the integration (database menu > Connections).
4. Copy the database ID from its URL into `NOTION_DATABASE_ID`.

Select options are created automatically from the form labels. The list above lives in code as `NOTION_PROPERTIES` in `src/lib/adapters/notion.ts`; keep the two in sync.

## SEO and AI discoverability

- `<head>` tags, favicons, Open Graph and Twitter cards: `src/layouts/BaseLayout.astro`, copy in `site.seo`.
- JSON-LD: `src/lib/schema.ts`. Organization is on every page; the home page adds Service and FAQPage. Placeholder values are never output, and FAQ answers that still contain a placeholder are left out of FAQPage until they're filled in.
- `/llms.txt` and `/robots.txt` are generated from the content file (`src/pages/llms.txt.ts`, `src/pages/robots.txt.ts`).
- The sitemap is generated automatically for every page. `/sitemap.xml` redirects to `/sitemap-index.xml`.
- Set `SITE_URL` in Vercel: canonical URLs, Open Graph URLs, the sitemap and schema all use it.

## Adding pages

Every page uses `src/layouts/PageLayout.astro`, which brings the nav, announcement bar, footer, metadata and Organization schema. Links in the shared nav and footer point back to the home page sections automatically when used on another page.

- **Guides** (`/guides/[slug]`): add a `.md` or `.mdx` file to `src/content/guides/` with `title`, `description`, `publishedAt` and optionally `updatedAt` and `draft`. It is built as a page, added to the sitemap and given Article schema. Drafts are not built.
- **Vertical or audience pages** (`/igaming`, `/affiliates`): create `src/pages/igaming.astro`, wrap it in `PageLayout`, and reuse the section components or the vertical data in `site.verticals.items` (each item's `id` is already a URL-friendly slug).

## Versions (v1, v2, v3)

All three versions live on the `main` branch and are served from one Vercel deployment:

| Version | URL | Code | Design |
|---|---|---|---|
| v1 (primary) | https://nexflow-site-one.vercel.app/ | `src/` (pages in `src/pages/`) | `design/` |
| v2 | https://nexflow-site-one.vercel.app/v2/ | `src/v2/` (pages in `src/pages/v2/`) | `design/v2/` |
| v3 | https://nexflow-site-one.vercel.app/v3/ | `src/v3/` (pages in `src/pages/v3/`) | `design/` (v3 starts as a copy of v1) |

- Each version is a self-contained tree with its own components, styles, content file, config and form endpoint (`/api/apply`, `/v2/api/apply`, `/v3/api/apply`). Imports use `@/` (v1), `@v2/` and `@v3/`, so the trees never share styles by accident.
- The version list is in `src/shared/versions.ts`. The floating switcher (bottom-left) links the versions and keeps the visitor on the same section. Turn it off per version with `showVersionSwitcher: false` before launch.
- Only v1 can be indexed. v2 and v3 send `noindex`, are disallowed in robots.txt and left out of the sitemap.
- To change a version, edit its tree on `main` and push. The old `v2` and `v3` branches are superseded by `src/v2/` and `src/v3/` and are no longer used.
- The `v1` git tag marks the first approved version.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, import the repo. The Astro preset is detected automatically, no build settings needed.
3. Add the variables from `.env.example` under Project Settings > Environment Variables. At minimum set `SITE_URL` and the variables for your chosen `FORM_ADAPTER`.
4. Deploy.

`npm run build` runs a type check before the build, so type errors fail the deploy. The build writes Vercel's output to `.vercel/output`.
