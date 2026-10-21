# Editorial review, for approval

Nothing here has been applied. Each item is a line that is live on the site today, why it is
worth a second look, and a suggested rewrite. Reject any of them freely: several are lines you
wrote and approved, and I am flagging them because you asked me to be honest, not because I
think you were wrong.

Ordered by risk, highest first.

---

## A. A regulator or a client could read these as a promise

### A1. "convert at transparent rates" and "Convert between major currencies at transparent rates"
`content/home.ts` offerings, `content/solutions/fx-multi-currency.md` sub-head

"Transparent rates" is a rate claim with no definition behind it, and it sits one step from
"best rates", which the guardrails ban outright. Nothing on the site says what transparency
means, so it reads as marketing rather than a term.

**Suggested:** "Hold balances in several currencies and see the rate before you convert."
**And:** "Convert between major currencies and see the rate before you confirm. Keep balances
where you need them."

### A2. "so you don't hold crypto price exposure"
`content/solutions/crypto-acceptance.md` sub-head

This is the single highest-risk sentence on the site. CLAUDE.md prescribes this exact wording,
so it is approved, and it already carries `[CONFIRM: partner converts at point of payment]`.
The residual risk is that it is stated without scope: a client who holds a balance between
payments, or whose payment fails conversion, does hold exposure.

**Suggested:** add two words of scope. "converted at the point of payment, so you do not hold
crypto price exposure on converted payments."

### A3. "at a rate you see before you confirm" / "Rate shown before you convert" / "Quoted rate before you confirm"
Home offerings, FX benefits, conversion benefits

Three phrasings of the same promise about partner behaviour, in three places. One
`[CONFIRM]` covers it. If the partner flow ever quotes after confirmation for some assets, all
three are wrong at once.

**Suggested:** keep the promise but make it conditional in one place rather than absolute in
three: "You see the rate in the dashboard before you confirm."

### A4. "One onboarding, one dashboard."
All three home sub-heads

A specific product claim, repeated three times, with nothing behind it on the site. If virtual
accounts, cards and conversion are delivered by different partners, a client may face more than
one verification step. **No marker covers this one.**

**Suggested:** either confirm it is true end to end and keep it, or soften to "One application,
one place to manage it." I recommend adding a `[CONFIRM: single onboarding across all partner
services]`.

### A5. "verified, compliant business clients" and "reach compliant, verified business clients"
`content/partners.ts` sub-head and the home partner band

Calling clients "compliant" asserts something about third parties that NexFlow cannot certify.
We verify clients and screen them; we do not make them compliant, and a partner could hold us
to that word.

**Suggested:** "verified business clients, screened under our compliance program."

### A6. "Clear client segments and volume forecasts"
`content/partners.ts`, what we offer partners

"Volume forecasts" promises a deliverable to a counterparty before any contract exists, and
"clear" is filler.

**Suggested:** "Named client segments, with volume forecasts shared under NDA."

### A7. "Turn digital assets into fiat, on your schedule."
`content/solutions/conversion-otc.md` H1

"On your schedule" implies availability whenever the client wants it. For an OTC desk with
hours, or a partner with cut-off times, that is a service-level claim.

**Suggested:** "Turn digital assets into fiat, when you choose to convert."

### A8. "Everything on this page is in place today."
`content/compliance.ts` intro

Keep it. It is the best sentence on the site and exactly the right posture. Flagging it only so
it is a conscious commitment: on launch day every line below it has to be literally true,
including the Chief Compliance Officer and the data security claims.

---

## B. Generic, salesy, or reads as written by a machine

### B1. "Everything your business needs to move between crypto and fiat"
`content/home.ts`, offerings heading

"Everything you need" is the most common SaaS heading in existence, and it is an absolute claim
on a page that lists six products and excludes a seventh.

**Suggested:** "Six products that move money between crypto and fiat." Concrete, countable,
and it tells the reader what follows.

### B2. "Ready to move money between crypto and fiat?" and its two variants
`content/home.ts`, final CTA headlines

You wrote these and they are serviceable. But "Ready to ...?" is the default closing-CTA
formula, and all three versions use it, so the A/B/C test cannot tell you anything about
closing copy. One differentiated headline per version would test more.

**Suggested for A:** "Start accepting crypto and settling in fiat."
**For B:** "Run crypto and fiat from one account."
**For C:** "Put collection, conversion and payout in one flow."

### B3. "Built for businesses that work across crypto and fiat"
`content/home.ts`, who we serve heading

"Built for" is a cliché, and the section is a list of seven industries, not a statement about
who the product was built for.

**Suggested:** "Seven industries we work with."

### B4. "Seller verification handled in the flow"
`content/solutions/platform-payments.md`, benefit

"Handled" is vague and implies it is effortless and automatic. The compliance note two sections
below says it plainly and better.

**Suggested:** "Sellers are verified before their first payout."

### B5. "One API"
`content/solutions/platform-payments.md`, benefit

Three words with no object. Every payments company says it.

**Suggested:** "One API for collection, splits and payouts."

### B6. "Shared or full onboarding, depending on your model"
`content/partners.ts`, what we offer partners

"Depending on your model" asks the reader to work out what is on offer.

**Suggested:** "Onboarding we run end to end, or onboarding we share with you."

### B7. "The industries we serve, each with a different mix of products."
`content/partners.ts`, client segments intro

Accurate but flat, and it repeats the heading above it.

**Suggested:** cut the line entirely. The list below says it.

### B8. "Hold, convert and pay in multiple currencies."
`content/solutions/fx-multi-currency.md` H1

Three verbs and no subject, which reads like a feature list rather than a sentence. It is also
the only solution H1 that does not say who it is for or what changes.

**Suggested:** "Hold several currencies. Convert when the rate suits you." (subject to A1 and
A3 above).

---

## C. One thing I would add, not change

Every solution page states what the service does. None states what it does not do, which is the
sharpest trust signal available to a company with no track record, and `/llms.txt` already
carries exactly that list for machines.

**Suggested:** a short "What this is not" line on crypto acceptance and conversion, for example
"This is not an exchange and not a trading service. We convert and settle, nothing else."
