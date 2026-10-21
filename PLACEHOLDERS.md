# Placeholders and confirmations

Every visible `[PLACEHOLDER: ...]` and `[CONFIRM: ...]` in the codebase is listed here, grouped
by when it has to be resolved. `npm run build` fails if a marker exists in the source without a
row in this file, so the two cannot drift.

A placeholder needs a real fact. A confirmation needs a yes from the person who can give it, or
the content comes off the site.

**Status: 47 markers in the source, 47 rows below, plus 9 tracked items that have no inline
marker (listed in their own table at the end).** Counts reconciled on 22 October 2026.

---

## 1. Must fill before launch

The site cannot go live with any of these unresolved. Most appear on every page.

| Placeholder | Where | What's needed | Status |
| --- | --- | --- | --- |
| `[PLACEHOLDER: LEGAL ENTITY NAME]` | `content/site.ts`. Footer disclosure on every page, compliance, regulatory information | Registered legal entity name, exactly as filed | Open |
| `[PLACEHOLDER: M number]` | `content/site.ts`, `content/compliance.ts`. Footer, compliance, trust strip, every trust cue | FINTRAC Money Services Business registration number | Open |
| `[PLACEHOLDER: Bank of Canada reference]` | `content/compliance.ts`. Compliance, regulatory information | Bank of Canada RPAA registration reference | Open |
| `[PLACEHOLDER: Canadian address on the FINTRAC and Bank of Canada registrations]` | `content/site.ts`. Footer, contact, regulatory information | Registered address exactly as it appears on both registrations | Open |
| `[PLACEHOLDER: domain]` | `content/site.ts`. Footer mailboxes on every page, partners, compliance, support | Mailbox domain for sales@, support@, compliance@ and partners@. The four render as selectable text, not links, until it lands | Open |
| `[PLACEHOLDER: regulated EMI or bank partner]` | `content/solutions/virtual-ibans.md`. Virtual IBANs | The account partner, once contracted and cleared for naming. The "provided in partnership with" wording is already in place around it | Open |
| `[PLACEHOLDER: regulator]` | `content/solutions/virtual-ibans.md`. Virtual IBANs compliance note and FAQ | The regulator that authorises the account partner | Open |
| `[PLACEHOLDER: issuing partner]` | `content/solutions/cards.md`. Cards | Card issuer name, once cleared for naming | Open |
| `[PLACEHOLDER: card network]` | `content/solutions/cards.md`. Cards | Network name in plain text. The logo may only follow after issuer approval | Open |
| `[PLACEHOLDER: supported countries list]` | `config/site.config.ts`, `components/Field.astro`. Account and sales forms | Countries where an account can be opened. **Until this lands every application is declined**, because the only country option is "Other" | Open |
| `[PLACEHOLDER: restricted countries list]` | `config/site.config.ts`, legal template. Prohibited businesses page | Countries where services are not available | Open |
| `[PLACEHOLDER: full prohibited business list from the AML policy]` | `config/site.config.ts`, legal template. Prohibited businesses page | The full list. Three activities are already listed from config | Open |
| `[PLACEHOLDER: assets and networks]` | `content/solutions/crypto-acceptance.md`, `conversion-otc.md`. Hero panels and FAQs | The coins, stablecoins and networks supported on launch day | Open |
| `[PLACEHOLDER: settlement currencies]` | `content/solutions/crypto-acceptance.md`, `conversion-otc.md`. Hero panels and FAQs | Fiat currencies clients can settle and withdraw in | Open |
| `[PLACEHOLDER: supported currencies from partner contracts]` | `content/solutions/fx-multi-currency.md`. Hero panel, the on-page list its CTA points at, and the FAQ | Currencies that can be held and converted | Open |
| `[PLACEHOLDER: payout countries]` | `content/solutions/global-payouts.md`. FAQ | Countries payouts can reach | Open |
| `[PLACEHOLDER: OTC minimum ticket size]` | `content/solutions/conversion-otc.md`. FAQ | Minimum ticket for the desk, or confirmation there is none | Open |
| `[PLACEHOLDER: security statement, for example encryption and access controls]` | `content/site.ts`. Trust cue beside CTAs | One or two sentences on security that are contractually true | Open |
| `[PLACEHOLDER: response time]` | `content/forms.ts`. Partner enquiry success message | How quickly partnerships replies. Only state it if the team can hold to it | Open |
| `[PLACEHOLDER: date]` | All 6 legal pages | Last updated date. Each page carries its own | Open |
| `[PLACEHOLDER: terms of service, supplied by legal]` | `content/legal/terms.md` | Terms of service from counsel | Open |
| `[PLACEHOLDER: privacy policy, supplied by legal, referencing PIPEDA]` | `content/legal/privacy.md` | Privacy policy from counsel, referencing PIPEDA | Open |
| `[PLACEHOLDER: cookie table, supplied by legal, listing each cookie set by analytics and consent with its purpose and lifetime]` | `content/legal/cookies.md` | Cookie table. It must match the cookies the live site actually sets | Open |
| `[PLACEHOLDER: how to change or withdraw consent, supplied by legal]` | `content/legal/cookies.md` | How a visitor changes or withdraws consent | Open |
| `[PLACEHOLDER: how to raise a complaint, supplied by legal]` | `content/legal/complaints.md` | How to complain | Open |
| `[PLACEHOLDER: acknowledgement and resolution times, supplied by legal]` | `content/legal/complaints.md` | Response times, only if they can be met | Open |
| `[PLACEHOLDER: escalation route, supplied by legal]` | `content/legal/complaints.md` | Where a complaint goes if the client is not satisfied | Open |
| `[PLACEHOLDER: approved mission line]` | `content/company.ts`. About | The mission sentence, approved. A suggested draft is on the page beside a "Not approved" badge | Open |

---

## 2. Must confirm before launch

Content that is already written and visible. Each needs a yes, or it comes off the site.

| Confirmation | Where | What's needed | Status |
| --- | --- | --- | --- |
| `[CONFIRM: partner converts at point of payment]` | `content/solutions/crypto-acceptance.md`, `conversion-otc.md`. Rendered as a badge | The whole "you don't hold crypto price exposure" claim rests on this. If the partner does not convert at the point of payment, the wording is wrong | Open |
| `[CONFIRM: OTC desk live at launch]` | `content/solutions/conversion-otc.md`. Badge in the hero and in a benefit | If the desk is not live, the page comes off the site | Open |
| `[CONFIRM: crypto-funded cards live at launch]` | `content/solutions/cards.md`. Badge in the hero | If not live, that part comes off the site | Open |
| `[CONFIRM: compliance approval for affiliate networks as a payouts use case]` | `content/solutions/global-payouts.md`. Badge in the hero, chip in the audience list | Compliance approval before affiliate networks appear as a use case | Open |
| `[CONFIRM: legal review of this explainer]` | `content/compliance.ts`. Badge under "What our two registrations mean" | Counsel to review the plain-English explanation of what each registration covers | Open |
| `[CONFIRM: compliance approval of the accepted industry list]` | `config/site.config.ts`. Drives the account form's industry list | Approval of the 7 industries the form accepts | Open |
| `[CONFIRM: actual next step]` | `content/forms.ts`. Account application success screen | The copy promises a secure verification link by email. Confirm that is the real next step | Open |
| `[CONFIRM: the free mail domain list]` | `config/site.config.ts`. Account and sales forms | The list of free mail domains the forms refuse. A judgement list, not a regulatory one | Open |
| `[CONFIRM: analytics provider]` | `components/Analytics.astro` | The loader targets a Plausible-compatible endpoint, which is what a bare domain implies. Confirm the provider or swap the script src | Open |
| `[PLACEHOLDER: name, if approved for publication]` | `content/compliance.ts`. Safeguards list | The Chief Compliance Officer's name, only if they agree to be named. The role itself is stated without it | Open |

---

## 3. Can fill after launch

The site is honest and complete without these. Each is additive.

| Placeholder | Where | What's needed | Status |
| --- | --- | --- | --- |
| `[PLACEHOLDER: leadership names, titles, photos and short bios]` | `content/company.ts`. About, hidden while `showLeadership` is false | Names, titles, photos and bios. The section does not render until the flag is turned on | Open |
| `[PLACEHOLDER: founding story, two or three sentences]` | `content/company.ts`. About | How the company started. Left blank rather than invented | Open |
| `[PLACEHOLDER: list or remove]` | `content/compliance.ts`. Data security, certifications | Certifications actually held, with evidence. If none are held, the line comes off the page entirely rather than being softened | Open |
| `[PLACEHOLDER: typical onboarding time, if contractually backed]` | `content/home.ts`. Live in three steps | A typical onboarding time, only if a partner service level backs it. Otherwise the line comes off | Open |
| `[PLACEHOLDER: expected response time]` | `content/company.ts`. Support | How long a support reply takes | Open |
| `[PLACEHOLDER: Canadian office address]` | `content/company.ts`. About | The office address, which may differ from the registered address | Open |
| `[PLACEHOLDER: LinkedIn company page URL]` | `content/site.ts`. Organization structured data, `sameAs` | LinkedIn page URL. Left out of the published schema until it exists, because a placeholder there would be read as a real profile | Open |
| `[PLACEHOLDER: X profile URL]` | `content/site.ts`. Organization structured data, `sameAs` | X profile URL, on the same basis | Open |
| `[PLACEHOLDER: option list]` | `components/Field.astro` | A safety net for any config-fed dropdown that is empty. It should never render while the industry list is populated. If it appears, a config list has been emptied | Open |

---

## Tracked items with no inline marker

Real work that does not appear as a marker in the source, so the build check cannot see it.

| Item | Where | What's needed | Status |
| --- | --- | --- | --- |
| Production domain | `astro.config.mjs`, every canonical tag, robots.txt, llms.txt | The real domain. The build falls back to the interim Vercel URL | Open |
| Logo and wordmark | Header, footer, card render | The NexFlow wordmark asset. The header renders the brand name as type | Open |
| Favicon and app icons | `public/favicon.svg` | A placeholder mark is in place to stop a 404. Replace with the real icon set | Open |
| Social share image | Head of every page, `og:image` and `twitter:image` | One 1200 by 630 image. The tags are omitted rather than pointing at a missing file | Open |
| `[CONFIRM: rate shown before you confirm]` | Home offerings grid, conversion card | The card says customers see a rate before confirming. Confirm the partner flow works that way | Open |
| `[CONFIRM: designated Chief Compliance Officer in post]` | Home, Compliance first paragraph | The copy states a designated CCO oversees the program. Confirm the role is filled on launch day | Open |
| `[CONFIRM: example dashboard figures approved for display]` | Home version B hero | Balances are illustrative, labelled Example and captioned as not a real account. Confirm that is acceptable | Open |
| `[CONFIRM: both regulator registry links open correctly]` | Compliance, regulatory status | Click both. The Bank of Canada link returned HTTP 200 from the build machine; FINTRAC could not be reached from it | Open |
| `[CONFIRM: the seven industry segments]` | Home "Who we serve", Industries, account form | The seven names are used as anchors and as the form's industry list | Open |

---

## Removed on 22 October 2026

These rows were superseded when the content around them was rewritten, and no longer match
anything in the source: sales email address, business phone number, registered office address,
support email address, support hours and time zone (replaced by the `[PLACEHOLDER: domain]`
mailbox pattern and the registered address); compliance programme detail, summary of the
compliance programme, partner requirements (replaced when the compliance and partners pages
were written); leadership bios (replaced by a more specific row); form endpoint not yet
connected (resolved, the endpoint is built and tested).
