# Nexflow marketing site: project rules

These rules apply to every step of this project. Read them before writing any code or copy.

## About Nexflow

Nexflow is a new B2B payments brand. It signs partnerships with acquirers and gives other payment companies (PSPs, payfacs, ISOs, gateways, orchestrators) access to them. Nexflow does NOT sell to merchants. Its customers are other payment companies only.

The page has three jobs:

1. Make it clear within 5 seconds that Nexflow is infrastructure for PSPs, not a merchant processor.
2. Build trust for a brand with no track record, no famous logos and no volume stats yet.
3. Turn qualified PSPs into partner applications through a qualification form.

## Design

Design references and design instructions are supplied separately (Step 2). Follow them for layout, visual style, typography, colour, spacing, motion and components. These rules cover structure, content, copy, functionality and technical requirements. If anything here conflicts with the design instructions, the design instructions win for anything visual.

**This is the v2 branch.** v2 uses a different design from v1 (main).

Design source files live in `design/` (v2, "editorial finance desk"). v1's design files are kept in `design/v1/` for reference only.

- `design/DESIGN.md`: warm off-white Bone canvas, white cards with 1px hairline borders, no shadows, one typeface at weight 400 only, 6px buttons and tags, 10px inputs, 16px cards, left-aligned layouts, no gradients or illustrations, Highlighter Yellow (#e4f222) only on primary actions and active states, Obsidian (#1a1919) for inverted bands, nav panels and footer.
- `design/tokens.json`, `design/variables.css`, `design/theme.css`

Implemented in `src/styles/tokens.css`. Decisions made on top of the design files:

- Font: Inter (self-hosted) as the substitute for licensed Lausanne, with `font-feature-settings: 'ss01' on`. `--font-serif` and `--font-mono` are aliases of `--font-sans` so shared components need no changes.
- Micro-labels use 12px instead of the design's 10px, for legibility.
- AA fixes: labels on Obsidian use #a1a09f (Ash is 3.35:1 there); form controls use #8d8b89 borders (the design's 10% border is about 1.1:1); focus rings are Ink, not Yellow.
- The hero panel is an illustration of how a merchant file moves through placement, captioned as such. It shows no data and implies no product dashboard.
- Decorative motion from v1 (flowing dashed lines) is removed; v2 only animates colour changes.

**v2 content scope (differs from v1):** no `#founding-partners` section or founding references; no testimonials component; no company and regulatory facts module in `#trust`; FAQ shows the six ids in `site.faq.featured`; the form shows only `site.apply.visibleFields`. The removed content stays in `site.ts` unused so merges from `main` stay simple.

## Non-negotiable rules

- **No em dashes anywhere:** copy, code comments, meta tags, alt text. Use commas, colons, full stops or hyphens.
- **Never invent facts.** No made-up stats, customer logos, testimonials, licence numbers, acquirer names, certifications or volumes. Wherever a real fact is needed, insert a visible placeholder in the format `[PLACEHOLDER: description]` and log it in `PLACEHOLDERS.md`.
- **No fake social proof.** No stock testimonials, no "trusted by 500+ companies", no logo walls of brands we haven't worked with. Never render empty testimonial UI.
- **Copy voice:** direct, plain, operator-to-operator, like one payments person talking to another.
- **Banned words:** seamless, unlock, empower, revolutionise, elevate, game-changer, cutting-edge, "in today's fast-paced world".
- **Be specific:** name scheme programmes, MCCs, settlement models and timelines. Specificity is how a new brand earns credibility.
- **Accessibility and build quality:** WCAG 2.2 AA, semantic HTML, keyboard navigable, responsive, respects `prefers-reduced-motion`.
- **All copy lives in a content file**, never hardcoded in components.

## Positioning

**One-liner:** Nexflow connects PSPs to acquirers that actually want their merchants. One partnership, many acquiring relationships, built for the verticals mainstream acquirers turn away.

**Category label** (use this exact wording everywhere: copy, schema, llms.txt):
"Nexflow is an acquiring partner network for PSPs, payfacs and ISOs."

**Never** call Nexflow a "payment gateway" or "payment processor". Those terms signal a merchant-facing product.

**Pillars:**

1. PSP-only, by design. We never compete with you for merchants.
2. Acquiring appetite matched to your book: the right acquirer for each MCC, geography and risk profile.
3. Speed to live: pre-packaged underwriting, so MIDs go live in days instead of months.
4. Transparent economics: wholesale pricing, IC++ pass-through, clear reserve terms.

## Competitor context (do not copy their wording)

- Clearhaus started partner-only but its homepage now speaks to merchants. Being strictly PSP-only is a gap we can own.
- Paynetics is broad embedded finance with no depth in iGaming or other high-risk verticals.
- Paystrax builds trust without customer logos, using licences, people and media coverage.
- PPRO speaks to PSPs as "we handle local complexity".
- Finix publishes a status page, docs and a sandbox, which builds trust without big customer names.
- PSPs buy on: speed to live MIDs, approval rates, vertical appetite (especially high-risk), and economics and control.

## SEO keyword rules (from a live SERP analysis)

- **Primary cluster:** acquiring for PSPs, acquiring partner for PSPs, high-risk acquiring for PSPs, acquiring as a service.
- **Secondary:** iGaming acquiring, MCC 7995 acquiring, local acquiring, sponsor acquiring for payfacs and ISOs, multi-acquiring, backup acquirer.
- **Never** use "wholesale acquiring" or "iGaming acquirer" as headings (Google reads them as non-payments or M&A queries).
- **Never** target merchant terms like "merchant account" or "high risk merchant account".

## Section order (anchor IDs)

1. `#top` nav
2. Announcement bar
3. `#hero`
4. `#who`
5. `#problem`
6. `#how`
7. `#network`
8. `#features`
9. `#verticals`
10. `#partners`
11. `#trust`
12. `#founding-partners` (v1 only; not in v2)
13. `#compare`
14. `#merchants`
15. `#faq`
16. `#apply`
17. Footer

## Config flags (single config file)

| Flag | Default |
|------|---------|
| `showAnnouncementBar` | (set per step) |
| `showTestimonials` | `false` |
| `showFoundingProgress` | (set per step) |
| `foundingSpotsTotal` | (set per step) |
| `foundingSpotsFilled` | (set per step) |
| `merchantReferralForm` | `false` |
| `showResources` | `false` |

## Delivery and stack

- **Final output:** a GitHub repo that deploys to Vercel with zero extra setup (import repo, click deploy).
- **Stack:** Astro with the `@astrojs/vercel` adapter, TypeScript, plain CSS using the design tokens as CSS custom properties. Pages are prerendered static HTML; only `src/pages/api/apply.ts` runs on demand (`prerender = false`). No client-side framework; small interactions use vanilla JS.
- **Content and config:** all copy in `src/content/site.ts` (single content file), all flags in `src/config/site.config.ts` (single config file).
- **Form:** `#apply` posts to `/api/apply`, which validates with `src/lib/apply.ts` (shared with the browser) and delivers through the adapter named by `FORM_ADAPTER` (`webhook`, `notion`, `email` stub, `none`). Field names in `ApplyFieldName` are fixed; copy is free to change.
- **Placeholders in links:** never put a placeholder in an `href`. Use `isReal()` from `src/lib/placeholder.ts` and render placeholder text instead.
- **Repo hygiene:** `README.md` with local dev and Vercel deploy steps, `.gitignore`, `PLACEHOLDERS.md`, `public/llms.txt`, `public/robots.txt`, sitemap.
- **Git and versions:** private repo `knivef/nexflow-site`, Vercel project `nexflow-site` (v1 at nexflow-site-one.vercel.app) (team knivef-1268s-projects). `main` is v1 (tag `v1` = first approved version); branches `v2` and `v3` are alternative versions, each with its own Vercel URL (see README "Versions"). Shared changes go on `main`, then merge into `v2` and `v3`. Only v1 is indexable. Commit and push only when the user asks.

## Working style

Build one step at a time. At the end of each step:

1. List what was built.
2. List any new placeholders (and confirm they are logged in `PLACEHOLDERS.md`).
3. Stop for review. Do not start the next step until the user approves.
