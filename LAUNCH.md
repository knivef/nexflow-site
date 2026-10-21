# Launch checklist

Work top to bottom. Nothing here is optional, and the first section blocks the rest.

## 1. Facts and approvals

- [ ] Every row in [PLACEHOLDERS.md](PLACEHOLDERS.md) section 1, "Must fill before launch", is filled.
- [ ] Every row in section 2, "Must confirm before launch", has a yes, or the content it marks has been removed.
- [ ] `supportedCountries` is populated in `src/config/site.config.ts`. **Until it is, every account application is declined.**
- [ ] Legal pages carry real text from counsel, each with its own last updated date.
- [ ] Both regulator registry links open. FINTRAC could not be reached from the build machine, so it is unverified.

## 2. Pick the winning home version

- [ ] Decide between A, B and C.
- [ ] Move the winner's content to the `a` entry in `src/content/home.ts`, so it serves at `/`.
- [ ] Delete the other two entries, delete `src/pages/b.astro` and `src/pages/c.astro`, and remove their `id`s from the version enum.
- [ ] Remove the `noindex` and canonical override that the losing versions carried. The winner at `/` must have neither.
- [ ] Remove `Disallow: /b` and `Disallow: /c` from `src/pages/robots.txt.ts`.
- [ ] Simplify the sitemap filter in `astro.config.mjs`, which currently excludes `/b` and `/c`.
- [ ] Set `showVersionSwitcher: false` in `src/config/site.config.ts`. The review bar then disappears everywhere.
- [ ] Confirm `VersionText` still renders the one remaining version, or inline the copy and delete the component.

## 3. Analytics

- [ ] Confirm the provider. The loader targets a Plausible-compatible endpoint.
- [ ] Set `ANALYTICS_DOMAIN` in Vercel. **While it is unset, no analytics script is rendered at all.**
- [ ] Accept cookies on the live site and confirm events arrive, each carrying the active version.
- [ ] Reject cookies in a fresh browser and confirm no analytics request is made.

## 4. Forms

- [ ] Set `FORM_ADAPTER` to `webhook` or `notion`, with the matching variables.
- [ ] Create the Notion properties listed in the README, including a `title` property.
- [ ] Submit each of the three forms on the live site and confirm the submission arrives.
- [ ] Submit with JavaScript disabled and confirm the success state still shows.
- [ ] Decide whether the in-memory rate limit is enough, or move it to a shared store.

## 5. Assets and domain

- [ ] Set `SITE_URL` in Vercel, or canonical tags, the sitemap, robots.txt and llms.txt all point at the interim URL.
- [ ] Replace `public/favicon.svg` with the real icon set.
- [ ] Add the wordmark to the header, footer and card render.
- [ ] Add a 1200 by 630 social share image and restore the `og:image` and `twitter:image` tags.
- [ ] Add the LinkedIn and X URLs to `site.social` so they publish as `sameAs`.

## 6. Final gate

- [ ] `npm run build` passes, which runs `astro check`, the build and the copy guardrail.
- [ ] `node scripts/check-contrast.mjs` passes in both themes.
- [ ] Lighthouse on the production build: Performance, Accessibility, Best Practices and SEO.
- [ ] Re-read the editorial review in the project handover and apply or reject each suggestion.
- [ ] Confirm no `[PLACEHOLDER` or `[CONFIRM` text appears on any live page: `grep -ro "\[PLACEHOLDER\|\[CONFIRM" dist/client --include="*.html" | wc -l` returns 0.
