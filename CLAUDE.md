# NexFlow marketing website: project rules

These rules apply to every step of this project. Read them before writing any code or copy.

Repo: https://github.com/knivef/nexflow-site

## About NexFlow

NexFlow is a Canadian-registered payments company. It gives businesses one place to accept crypto, settle in fiat, hold virtual accounts and pay globally, delivered through a network of regulated banking, EMI and liquidity partners.

Regulatory basis (use these exact facts, numbers stay as placeholders until supplied):

- Registered Money Services Business with FINTRAC, registration no. [PLACEHOLDER: M number]
- Registered payment service provider with the Bank of Canada under the Retail Payment Activities Act, reference [PLACEHOLDER: Bank of Canada reference]
- Services delivered with regulated partners. Each partner's licence is theirs, never ours.

## Two audiences, one site

1. **Business clients:** crypto-native companies, fintechs, merchants, marketplaces, exporters, remote-first teams. They need clear offerings, how fast they can go live, and proof the company is regulated and safe. CTAs: "Open an account" (primary) and "Talk to sales".
2. **Prospective partners:** banks, EMIs, crypto liquidity and card-issuing providers. They need who we are, regulatory status, the client segments we bring, how we run compliance. CTA: "Become a partner".

## Core messages, in this order

1. **Crypto in, fiat out, fast.** Get paid in stablecoins or crypto and receive fiat in your account.
2. **Accounts in your name.** Dedicated virtual IBANs and multi-currency accounts to collect and pay.
3. **Global payouts.** Pay suppliers, contractors and teams across borders, in fiat or stablecoins.
4. **Cards.** Issue prepaid and crypto-funded cards for teams and customers.
5. **Built on regulated rails.** Registered in Canada with FINTRAC and the Bank of Canada; services delivered with licensed partners.

## Tone

Institutional fintech, not crypto hype. Confident, plain and precise. Short sentences. Business-to-business, never consumer. No promises about rates or speed that aren't contractually backed.

## Non-negotiable rules

- **No em dashes or en dashes anywhere:** copy, code comments, meta tags, alt text. Use commas, colons, full stops or hyphens.
- **Every claim must be true on launch day.** Only live services are listed. Never write "coming soon"; use a waitlist form instead.
- **Never invent facts:** no stats, client logos, testimonials, volumes, partner names, certifications or registration numbers. Use a visible `[PLACEHOLDER: description]` and log it in `PLACEHOLDERS.md`.
- **Never use regulator or card network logos** (FINTRAC, Bank of Canada, Visa, Mastercard). Use plain-text registration statements.
- **No live rates, calculators or volume figures** until a partner supplies an approved feed.
- **No stock photos of coins.** Show product: dashboard mock-ups, flow diagrams (crypto, conversion, fiat account), card renders.
- **Trust cue near every CTA:** registration line, "verified onboarding" or a security note.
- **All copy lives in content files**, never hardcoded in components.
- **Mobile-first. WCAG 2.2 AA. Semantic HTML. Keyboard navigable. Respects `prefers-reduced-motion`.**

## Copy guardrails (banned words and replacements)

| Never write | Write instead | Why |
| --- | --- | --- |
| bank, banking, bank account, neobank | payments company, business account, virtual account | "Bank" is restricted in Canada; we don't take deposits |
| deposit, savings, earn interest, yield | balance, funds held, collect | Deposits and yield need other licences |
| licensed bank, licensed in the EU or UK | our own registrations; "provided in partnership with [partner], authorised by [regulator]" | Only claim our own registrations |
| instant, guaranteed, zero fees, best rates | fast, same-day where supported, transparent fees | Must be backed by partner service levels |
| invest, trade, buy crypto, crypto exchange | convert, settle, pay | Trading falls under securities law |
| custody, store your crypto, our wallet | crypto balances held with our regulated partner | We don't hold client crypto ourselves |
| anonymous, no KYC, no questions asked | fast, verified onboarding | Anonymous accounts are prohibited |
| available worldwide | available to businesses in supported countries (link the list) | Some countries are restricted |
| coming soon | leave it off, or a waitlist form | Partners treat listed services as live |

"Wallet" is allowed only for the client's own wallet (e.g. "send from a verified wallet").

### Extra guardrails from the brief review

- Do not write "no price risk" or "no crypto on your balance sheet" as absolutes. Write "converted at the point of payment, so you don't hold crypto price exposure" and add `[CONFIRM: partner converts at point of payment]`.
- The OTC desk and crypto-funded cards carry `[CONFIRM: live at launch]`. If not live, they come off the site before launch.
- "Affiliate networks" as a payouts use case carries `[CONFIRM: compliance approval]`.
- Video game studios are in scope. Copy must never mention gambling, betting, casinos, loot boxes or skins trading.
- Excluded industries: gambling, adult content, unlicensed financial services. Never list or imply them.
- Virtual accounts are always "provided in partnership with [PLACEHOLDER: regulated EMI or bank partner]". Never call them bank accounts.
- Cards: "Cards are issued by [PLACEHOLDER: issuing partner] under licence from [PLACEHOLDER: card network]." Network logo only after issuer approval.

## Footer disclosure (every page, visible on mobile)

> [PLACEHOLDER: LEGAL ENTITY NAME] is registered with the Financial Transactions and Reports Analysis Centre of Canada (FINTRAC) as a Money Services Business, registration no. [PLACEHOLDER: M number], and with the Bank of Canada as a payment service provider under the Retail Payment Activities Act. [PLACEHOLDER: LEGAL ENTITY NAME] is not a bank and does not accept deposits. Virtual accounts, card and crypto conversion services are provided in partnership with third-party regulated providers; the provider for each service is named in the client terms. Services are available to businesses only, in supported jurisdictions, subject to verification and approval.

## Site map

- Home (three versions, see below)
- Solutions (7 pages, one template): Crypto acceptance, Crypto-to-fiat conversion and OTC, Virtual IBANs and business accounts, Global payouts, FX and multi-currency, Cards, Platform and marketplace payments
- Industries (one page, 7 sections)
- Partners
- Compliance and trust
- Company: About, Contact and sales, Support
- Open an account (qualifying form)
- Legal (footer only): Terms, Privacy, Cookies, Regulatory information, Prohibited businesses and restricted countries, Complaints procedure

## Navigation

Top bar: Solutions (menu of 7), Industries, Partners, Compliance, Company, Open an account (primary button).

No "Log in" link. Client login is out of scope and will be added later behind a config flag (`showLogin: false`).

## Three home page versions (one per pitch line)

- **Version A** at `/`: "Accept crypto. Settle in fiat. Pay anywhere."
- **Version B** at `/b`: "One account for digital-asset and fiat payments."
- **Version C** at `/c`: "Business payments that move between crypto and fiat in one flow."

Inner pages are shared. The selected version is remembered and carried across the site (details in Step 3). Versions B and C are noindex with canonical to `/` until a winner is chosen.

## SEO map (from SERP research, 21 Oct 2026)

- **Home A:** crypto payment gateway Canada, accept crypto payments and settle in fiat
- **Crypto acceptance:** accept crypto payments for business, crypto payment gateway for business, stablecoin payment gateway
- **Conversion and OTC:** crypto to fiat conversion for business, convert USDT to EUR for business, OTC desk for businesses
- **Virtual IBANs:** virtual IBAN for crypto companies, business account for crypto companies
- **Global payouts:** stablecoin payouts, pay contractors in USDC, global payouts in crypto and fiat
- **FX:** multi-currency account for crypto businesses
- **Cards:** stablecoin-funded card program, white-label crypto card for fintechs
- **Platform:** marketplace payouts in crypto and fiat, split payments API
- **Compliance:** FINTRAC MSB and RPAA registered payment company

Never target "crypto bank", "crypto bank account", "buy crypto" or "crypto exchange" (banned by the guardrails).

## Config flags (one config file)

`showVersionSwitcher` (true during review), `showLogin` (false), `cookieConsentRequired` (true), `showLeadership` (false until bios exist), plus `supportedCountries` and `acceptedIndustries` lists used by the account form.

## Working style

Build one step at a time. At the end of each step, list what you built and any new placeholders, then stop for review.
