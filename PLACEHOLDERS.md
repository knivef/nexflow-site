# Placeholders

Every `[PLACEHOLDER: description]` in `src/content/site.ts` (or anywhere else on the site) is logged here.
Nothing ships to production while a row is still Open.

| Placeholder | Section | What's needed | Status |
|-------------|---------|---------------|--------|
| `[PLACEHOLDER: regions, e.g. EU, UK, LatAm]` | `#hero` subheading | The regions where Nexflow has signed acquirer relationships today. Only regions with a signed agreement. | Open |
| `[PLACEHOLDER: X] acquiring partners` | `#hero` proof strip | Number of acquirers Nexflow has signed agreements with. Signed only, not in negotiation. | Open |
| `[PLACEHOLDER: Y] markets` | `#hero` proof strip | Number of countries or markets those acquirers can board merchants in. | Open |
| `Target MID go-live: [PLACEHOLDER: X] business days` | `#hero` proof strip | Realistic target from complete application to live MID, in business days. Must match what ops can deliver and the timeline in `#how`. | Open |
| `Partner due diligence: [PLACEHOLDER: X] days` | `#how` onboarding timeline | Target days to complete Nexflow's due diligence on a new PSP partner. Confirm whether the three timeline numbers are cumulative (days from first contact) or per stage, and label accordingly. | Open |
| `First merchant placed: [PLACEHOLDER: X] days` | `#how` onboarding timeline | Target days until a partner's first merchant is placed with an acquirer. | Open |
| `Live processing: [PLACEHOLDER: X] days` | `#how` onboarding timeline | Target days until that merchant is live and processing. Must be consistent with the hero's "Target MID go-live" number. | Open |
| `[PLACEHOLDER: regions and local acquiring availability]` | `#network` coverage diagram and table | Real regions where Nexflow can place merchants, and whether each has local (domestic) acquiring. The diagram is generated from the table rows, so filling the rows fills both. | Open |
| `[PLACEHOLDER: Region 1]` to `[PLACEHOLDER: Region 4]` (4 example rows) | `#network` table | Replace all four seeded rows with real ones: region, local acquiring Yes/No, verticals accepted, settlement currencies, typical go-live in days. Add or remove rows as needed. The example verticals (iGaming, Ecommerce, Affiliate) are illustrative only and render highlighted until replaced. | Open |
| `[PLACEHOLDER: Y/N]` | `#network` table, Local acquiring column | Yes or No per region. "Yes" shows a "Local acquiring" badge on the diagram, "No" shows "Cross-border". | Open |
| `[PLACEHOLDER: currencies]` | `#network` table, Settlement currencies column | Settlement currencies available per region. | Open |
| `[PLACEHOLDER: X] days` | `#network` table, Typical go-live column | Typical go-live per region. Must be consistent with the hero and `#how` timeline. | Open |
| `MGA, UKGC, Curaçao and [PLACEHOLDER: others]` | `#features` Underwriting and compliance | Any other gambling licence regimes Nexflow verifies (e.g. Isle of Man, Kahnawake, Ontario). Only list ones the network accepts. | Open |
| `Settlement in [PLACEHOLDER: currencies]` | `#features` Settlement and economics | Settlement currencies available across the network. | Open |
| `Optional stablecoin settlement (USDC, USDT, EURC) ... [PLACEHOLDER: confirm]` | `#features` Settlement and economics | Confirm at least one acquirer supports stablecoin settlement and which coins. Remove the line if none do. | Open |
| `via API and dashboard [PLACEHOLDER: confirm]` | `#features` Settlement and economics | Confirm Nexflow offers both an API and a dashboard for reconciliation and reporting. Edit to match what exists at launch. | Open |
| `MGA, UKGC, Curaçao, [PLACEHOLDER: other licences]` | `#verticals-igaming` capabilities | Other gambling licence regimes the network places. Keep in sync with the same list in `#features`. | Open |
| `Local acquiring in [PLACEHOLDER: markets]` | `#verticals-ecommerce` | Markets where the network offers local (domestic) acquiring for ecommerce. Must match the "Yes" rows in the `#network` table. | Open |
| `[PLACEHOLDER: referral terms]` | `#verticals-affiliate` referral partner block | Revenue share terms for consultants, agencies and ISOs who refer PSPs or portfolios (share, duration, payout basis). | Open |
| `[PLACEHOLDER: regulators accepted, e.g. CySEC, FCA, ASIC]` | `#verticals-trading` capabilities | Which financial regulators' licences the network's acquirers accept for forex and CFD brokers. Only list confirmed ones. | Open |
| `MCC 6051 [PLACEHOLDER: confirm appetite]` | `#verticals-crypto` | Confirm at least one acquirer in the network accepts MCC 6051 card-to-crypto. If none do, remove this tab. | Open |
| `[PLACEHOLDER: confirm non-solicit clause]` | `#partners` callout | Confirm the partner agreement contains a non-solicit / no-direct-contact clause covering partners' merchants. If not, change the copy before launch. | Open |
| `[PLACEHOLDER: team bios]` (3 placeholder team cards) | `#trust` The people | Real team members: full name, photo (in `/public/team/`), role, years in payments, real previous companies, LinkedIn URL. Add or remove cards to match the real team. | Open |
| `[PLACEHOLDER: advisors]` | `#trust` Advisors | Named advisors with background and LinkedIn. Module is hidden while the list is empty, so leaving it empty is safe. | Open |
| `[PLACEHOLDER: legal entity name]`, `company number`, `registered address`, `jurisdiction`, `link to company registry entry` | `#trust` Company and regulatory facts | Exact details as they appear on the company registry, plus the registry URL. | Open |
| `[PLACEHOLDER: entity and licence status]` | `#trust` Company and regulatory facts | Confirm Nexflow holds no licence (keep the "not an acquirer" statement) or add each licence/registration with regulator, number and register link. Also confirm all acquiring partners hold Visa and Mastercard principal membership. | Open |
| `[PLACEHOLDER: other exclusions set by acquiring partners]` | `#trust` Partner criteria, What we can't place | Any further exclusions from acquirer partner agreements. Also review the criteria and exclusions I drafted. | Open |
| `30 days' notice ... [PLACEHOLDER: confirm]` | `#trust` Partner charter | Confirm 30 days is what the partner agreement says. | Open |
| `PCI DSS`, `GDPR`, `ISO 27001`, `SOC 2` statuses | `#trust` Security and compliance | Honest status for each: PCI DSS level or "In progress", GDPR position, ISO 27001 and SOC 2 status. Remove any that don't apply. | Open |
| `[PLACEHOLDER: memberships and events]` | `#trust` Industry presence | Real memberships and confirmed events only (e.g. MRC, EPSM, ETA, SiGMA, ICE, Money20/20 Europe, iGB Affiliate if attending). | Open |
| Resources: 3 summaries and 3 URLs | `#trust` Resources (hidden, `showResources: false`) | One-line summary and published URL for each article. Only turn the flag on once all three are live. | Open |
| Contact: name, role, email, Telegram handle, calendar link | `#trust` Talk to a human | A real named person and their contact details. If `BOOKING_URL` is set in env, it is used as the calendar link. | Open |
| `Founding partner cohort: [PLACEHOLDER: number] spots` | `#founding-partners` H2 | Number of founding spots. Set `foundingSpotsTotal` in `src/config/site.config.ts` and the heading fills itself. | Open |
| `[PLACEHOLDER: e.g. preferential wholesale rates ...]` | `#founding-partners` What founding partners get | The actual founding benefits, one per line. Only offer what can be honoured. | Open |
| `[PLACEHOLDER: e.g. minimum monthly volume ...]` | `#founding-partners` What we ask | The actual asks of founding partners, one per line. | Open |
| `foundingSpotsFilled` (config) | `#founding-partners` progress bar | Real count of founding spots taken. The bar stays hidden until `showFoundingProgress` is true and both numbers are set. | Open |
| `Target: [PLACEHOLDER: X] business days` | `#compare` Time to first live MID | Same number as the hero's "Target MID go-live". | Open |
| `[PLACEHOLDER: privacy note and link to privacy policy]` | `#merchants` referral form (hidden, `merchantReferralForm: false`) | Privacy note for the merchant referral form. Needed only if the form is switched on. | Open |
| `[PLACEHOLDER: entity and licence status]` | `#faq` Is Nexflow an acquirer? | Same fact as the `#trust` corporate block. Fill both together. | Open |
| `[PLACEHOLDER: X] acquiring partners across [PLACEHOLDER: Y] markets` | `#faq` Who are your acquiring partners? | Same numbers as the hero proof strip. | Open |
| `[PLACEHOLDER: other licences]` (x2) | `#faq` MCC 7995 and unlicensed gambling answers | Same list as `#features` and `#verticals-igaming`. | Open |
| `MCC 6051, [PLACEHOLDER: confirm appetite]` | `#faq` Which verticals and MCCs | Same as `#verticals-crypto`. | Open |
| `[PLACEHOLDER: X] business days` and `[PLACEHOLDER: X] days` | `#faq` How long to get a live MID | Same numbers as the hero and the `#how` timeline. | Open |
| `30 days' notice ... [PLACEHOLDER: confirm]` | `#faq` How does pricing work | Same as the partner charter. | Open |
| `[PLACEHOLDER: any pricing detail you are willing to publish]` | `#faq` How does pricing work | Optional: setup fees, typical margin range, minimums. Delete the sentence if nothing will be published. | Open |
| `[PLACEHOLDER: confirm non-solicit clause]` | `#faq` Who owns the merchant relationship | Same as the `#partners` callout. | Open |
| `[PLACEHOLDER: direct answer once the technical model is confirmed]` | `#faq` Do you require technical integration? | The direct 1 to 2 sentence answer: does a PSP integrate with Nexflow, the acquirer, or neither? | Open |
| `[PLACEHOLDER: supported gateways and platforms]` | `#faq` Do you require technical integration? | Gateways and platforms that already connect to the network's acquirers. | Open |
| `via API and dashboard [PLACEHOLDER: confirm]` | `#faq` Do you require technical integration? | Same as `#features` settlement group. | Open |
| `[PLACEHOLDER: typical acquirer notice period]` | `#faq` What happens if an acquirer exits a vertical? | Typical notice an acquirer gives before exiting a vertical, from the acquirer agreements. | Open |
| `USDC, USDT or EURC [PLACEHOLDER: confirm]`, `[PLACEHOLDER: currencies]` | `#faq` Can you settle in stablecoins? | Same as `#features` settlement group. | Open |
| `[PLACEHOLDER: confirm OCT coverage]` | `#faq` Payouts and withdrawals (OCT) | Confirm which acquirers, regions and verticals support Visa Direct and Mastercard Move payouts. | Open |
| `[PLACEHOLDER: full due diligence document list]` | `#faq` What do you need to start due diligence? | The complete document checklist sent to new partners. | Open |
| `[PLACEHOLDER: referral terms]` | `#faq` Referral programme | Same as `#verticals-affiliate`. | Open |
| `[PLACEHOLDER: privacy notice URL]` | `#apply` consent checkbox | URL of the privacy notice. The consent text shows the placeholder until a real URL is set. | Open |
| `Thanks. [PLACEHOLDER: contact name] will reply within 24 hours.` | `#apply` success message | Name of the person who replies to applications. Same person as `#trust` Talk to a human. | Open |
| `[PLACEHOLDER: partnerships email]` | `#apply` failure message | Fallback email shown when the form can't be sent. Must be monitored. | Open |
| `FORM_ADAPTER` and its credentials (env) | `#apply` delivery | Choose webhook or Notion for production and set its env vars in Vercel. Until then the form shows the fallback email on every submission. | Open |
| `[PLACEHOLDER: privacy policy URL]`, `terms URL`, `cookie policy URL`, `responsible gambling statement URL` | Footer, Legal column | The four legal pages. They don't exist on this site yet: either link to hosted versions or add pages. | Open |
| `[PLACEHOLDER: contact email]` | Footer, Contact column | Public contact email. | Open |
| `[PLACEHOLDER: LinkedIn URL]`, `X URL`, `Telegram URL` | Footer, Contact column | Company social profiles. Remove any that won't exist at launch. | Open |
| `[PLACEHOLDER: legal entity name, company number, registered address]` | Footer | Same facts as the `#trust` corporate block. | Open |
| `[PLACEHOLDER: adjust to actual status]` | Footer disclaimer | Confirm "Nexflow is not a bank or card acquirer. Acquiring services are provided by our regulated partners." matches the real regulatory position. | Open |
| `/og/nexflow-og.png` (labelled placeholder image) | `<head>` Open Graph and Twitter image | Final 1200 x 630 social image. Replace the file at the same path, or change `site.seo.ogImage`. | Open |
| Favicons: `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | `<head>`, web manifest, Organization logo | Final brand mark in each size. The current files are a plain dark circle. | Open |
| `[PLACEHOLDER: X handle]` | `<head>` twitter:site | Company X handle without the @. The tag is left out until set. | Open |
| `[PLACEHOLDER: LinkedIn company URL]`, `Crunchbase URL`, `X profile URL` | Organization schema `sameAs` | Real profile URLs. Left out of schema until set. Same LinkedIn and X URLs as the footer. | Open |
| `[PLACEHOLDER: legal entity name]` | Organization schema `legalName` | Same as the `#trust` corporate block. Left out of schema until set. | Open |
| `SITE_URL` (env) | Canonical, Open Graph URLs, sitemap, robots.txt, schema, llms.txt | Production URL, set in Vercel. Without it everything points at localhost. | Open |
| `vamp-2026-threshold.mdx` (draft guide) | `/guides/vamp-2026-threshold` | Write the article, fill in the description, set `draft: false`. Then point the matching Resources card at it. | Open |
