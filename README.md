# NexFlow marketing site

Astro 7 and TypeScript. Static by default, with three server-rendered pages and one form
endpoint. Every rule the copy has to follow is in [CLAUDE.md](CLAUDE.md), and the build
enforces the mechanical ones.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check, astro build, then the copy guardrail
npm run preview   # serve the production build
npm run check-copy
```

If `npm install` fails with `EACCES` on `~/.npm/_cacache`, point the cache somewhere writable:
`npm install --cache /tmp/npm-cache`.

---

## Where the copy lives

**No copy is written in a component.** Everything a visitor reads comes from `src/content/`,
and the build fails if a content file breaks a guardrail.

| File | What it holds |
| --- | --- |
| `src/content/site.ts` | Brand, the three CTAs, trust cues, navigation, footer, the regulatory disclosure, mailboxes, social profiles |
| `src/content/home.ts` | The three home versions and all nine home sections |
| `src/content/solutions/*.md` | One file per solution page. Frontmatter drives the whole template |
| `src/content/legal/*.md` | One file per legal page. Sections drive the contents list |
| `src/content/industries.ts` | The seven industry sections, their problems and the solutions each uses |
| `src/content/partners.ts`, `compliance.ts`, `company.ts` | Those pages |
| `src/content/forms.ts` | All three forms: fields, labels, validation messages, success and error copy |
| `src/config/site.config.ts` | Feature flags and the approved lists |

Everything is validated with Zod at build time, so a typo in a content file fails the build
with the field path rather than rendering a broken page.

### Changing a solution page

Edit its file in `src/content/solutions/`. The slug is the filename, so renaming the file
changes the URL, and the navigation, footer, sitemap, related cards and industry links all
follow automatically. Two build-time guards catch the rest: `/industries` fails the build if
anything links to an anchor that does not exist, and a solution page fails if it references a
slug with no page.

### Adding or changing a home version

Versions live in `src/content/home.ts` under `versions`. Each carries its pitch line,
sub-head, offerings order, hero visual, final CTA headline and meta tags. To add one:

1. Add an entry with a new `id` and `path`, and extend the `id` enum in the schema.
2. Create the route, copying `src/pages/b.astro` (three lines).
3. Set `noindex: true` and `canonicalPath: '/'` while it is under test.
4. Add the path to `Disallow` in `src/pages/robots.txt.ts`, and to the sitemap filter in
   `astro.config.mjs`.

The active version is a `data-version` attribute on `<html>`, set before the body paints.
Version-dependent copy renders all variants and CSS shows the active one, so it is correct
with JavaScript off. See `src/components/VersionText.astro`.

---

## Environment variables

Copy `.env.example` to `.env`. All are optional; the site builds and runs with none of them.

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Public URL. Drives canonical tags, the sitemap, robots.txt and llms.txt |
| `FORM_ADAPTER` | `none`, `webhook`, `notion` or `email`. `none` accepts and logs without storing |
| `FORM_ENDPOINT` | Webhook URL when `FORM_ADAPTER=webhook` |
| `NOTION_TOKEN` | Notion integration token when `FORM_ADAPTER=notion` |
| `NOTION_DB_ACCOUNTS` | Database for account applications |
| `NOTION_DB_PARTNERS` | Database for partner enquiries |
| `NOTION_DB_SALES` | Database for sales enquiries |
| `ANALYTICS_DOMAIN` | Analytics domain. **Unset means no analytics script is rendered at all** |

---

## Config flags

In `src/config/site.config.ts`.

| Flag | Default | Effect |
| --- | --- | --- |
| `showVersionSwitcher` | `true` | The review bar fixed to the bottom of every page. **Turn off before launch** |
| `showLogin` | `false` | Adds a log in link to the top bar. Client login is out of scope |
| `cookieConsentRequired` | `true` | Renders the consent banner. Analytics cannot load without it |
| `showLeadership` | `false` | Renders the leadership section on About. Leave off until real bios exist |
| `supportedCountries` | `[]` | Countries the account form accepts. **While empty, every application is declined** |
| `acceptedIndustries` | 7 entries | Industries the form accepts |
| `prohibitedBusinesses` | 3 entries | Listed on the prohibited businesses page |
| `restrictedCountries` | `[]` | Listed on the prohibited businesses page |
| `freeEmailDomains` | 24 entries | Refused by the account and sales forms |

---

## Forms

One endpoint, `src/pages/api/forms/[id].ts`, serves all three forms. It validates on the
server, applies a rate limit and a honeypot, checks eligibility, then hands the values to the
adapter named by `FORM_ADAPTER`.

- **Works without JavaScript.** The form posts normally and the endpoint redirects back with a
  status flag. That is why `/partners`, `/open-an-account` and `/company/contact` carry
  `export const prerender = false`: a prerendered page is built once with no query string, so
  the success, error and decline states could never appear.
- **Honeypot** is the field `company_role_hp`. A filled honeypot gets a success response and
  stores nothing.
- **Rate limit** is 5 submissions per 10 minutes per address, held in memory. On serverless
  that is per instance, so it stops a burst but is not durable. Move it to a shared store
  before launch if abuse matters.
- **Eligibility.** A country outside `supportedCountries` or an industry outside
  `acceptedIndustries` is declined politely and never stored. `other` always declines.

### Notion property names

The adapter writes one rich text property per form field, named exactly as the field. Create
these properties in each database, or the write is rejected.

| Database | Properties |
| --- | --- |
| `NOTION_DB_ACCOUNTS` | `companyName`, `country`, `website`, `industry`, `products`, `volume`, `cryptoSource`, `contactName`, `email`, `consent` |
| `NOTION_DB_PARTNERS` | `companyName`, `website`, `regulatorAndLicenceType`, `licenceNumber`, `services`, `regionsServed`, `contactName`, `email`, `message`, `consent` |
| `NOTION_DB_SALES` | `companyName`, `website`, `country`, `industry`, `products`, `volume`, `contactName`, `email`, `message`, `consent` |

Notion needs a `title` property on every page. Add one and map it, or extend `deliver()` in
`src/lib/submissions.ts`. **The webhook and Notion adapters have not been tested against a
live endpoint**, because no credentials exist in this repository.

---

## The guardrail script

`scripts/check-copy.mjs` runs as part of `npm run build` and **fails the build** on:

1. em dashes (U+2014) and en dashes (U+2013), anywhere, including code comments;
2. banned words from the CLAUDE.md guardrails table, matched as whole words,
   case-insensitive, across content files and rendered pages;
3. any `[PLACEHOLDER` or `[CONFIRM` marker in the source with no row in PLACEHOLDERS.md.

Required phrases are allow-listed and blanked before matching, so a permitted "Bank of Canada"
cannot hide a real violation on the same line. Code comments are exempt from the word checks
but not the dash checks. Two other scripts are run by hand:

```bash
node scripts/check-contrast.mjs      # WCAG AA, both themes, exits non-zero on failure
npm i --no-save lighthouse chrome-launcher
node scripts/lighthouse.mjs http://localhost:4444/
```

Run Lighthouse against the **production build**, not the dev server: the Astro dev toolbar
injects a link that fails the descriptive-link audit.

```bash
npm run build
cd dist/client && python3 -m http.server 4444
```

---

## Deploying

Vercel, project `nexflow-site`, which builds on push to `main`.

The `@astrojs/vercel` adapter is configured. Static pages are prerendered to `dist/client`;
the three form pages and `/api/forms/[id]` run as functions. Set every environment variable
above in the Vercel project, including `SITE_URL`, or canonical tags and the sitemap will
point at the interim fallback URL.

Before the first production deploy, work through the launch checklist in
[PLACEHOLDERS.md](PLACEHOLDERS.md) and [LAUNCH.md](LAUNCH.md).
