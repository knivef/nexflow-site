#!/usr/bin/env node
/**
 * Copy guardrail check. Fails the build on anything CLAUDE.md forbids.
 *
 * Checks, over both the content source files and the rendered pages:
 *   1. em dashes (U+2014) and en dashes (U+2013), which are banned outright;
 *   2. banned words from the guardrails table, matched as whole words, case-insensitive;
 *   3. every [PLACEHOLDER and [CONFIRM marker is listed in PLACEHOLDERS.md.
 *
 * Required phrases are allow-listed: the site has to be able to say "Bank of Canada" and
 * "not a bank and does not accept deposits". An allow-listed phrase is blanked out before
 * matching, so a banned word inside it cannot hide a real violation elsewhere on the line.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();

/* Built from code points so this file does not itself contain the characters it bans. */
const EM_DASH = String.fromCharCode(0x2014);
const EN_DASH = String.fromCharCode(0x2013);

/* Banned as whole words. Several appear in the table as phrases; the single words are the
   strict reading, which is what a guardrail should be. */
const BANNED = [
  'bank', 'banking', 'neobank', 'deposit', 'deposits', 'savings', 'interest', 'yield',
  'instant', 'instantly', 'guaranteed', 'invest', 'investment', 'trade', 'trading',
  'custody', 'anonymous', 'worldwide',
  'gambling', 'betting', 'casino', 'casinos',
];

/* Phrases banned as a unit. */
const BANNED_PHRASES = [
  'zero fees', 'best rates', 'buy crypto', 'crypto exchange', 'no kyc', 'coming soon',
  'loot box', 'loot boxes', 'skins trading',
];

/* Required phrases. Blanked before matching so they cannot mask a violation. */
const ALLOWED = [
  'Bank of Canada',
  'not a bank and does not accept deposits',
  'Banks, EMIs',
  'EMI or bank partner',
  'regulated banking, EMI and liquidity partners',
  'is not a bank and does not accept deposits',
  // User-specified FAQ question on the virtual IBANs page. It denies rather than claims,
  // and it is the question people actually search for. Remove this line to re-flag it.
  'Is this a bank account?',
  // The full disclosure, allow-listed as one block.
  'is registered with the Financial Transactions and Reports Analysis Centre of Canada (FINTRAC) as a Money Services Business, registration no.',
  'and with the Bank of Canada as a payment service provider under the Retail Payment Activities Act.',
  'Virtual accounts, card and crypto conversion services are provided in partnership with third-party regulated providers; the provider for each service is named in the client terms.',
  'Services are available to businesses only, in supported jurisdictions, subject to verification and approval.',
];

/* Files and routes where an otherwise banned term is required. */
const EXEMPT = [
  // The prohibited businesses page must name what we refuse to serve.
  { match: /prohibited-businesses/, terms: ['gambling', 'betting', 'casino', 'casinos', 'adult content'] },
  { match: /site\.config\.ts$/, terms: ['gambling', 'betting', 'casino', 'casinos'] },
  // The guardrail script and the rules file quote the banned list itself.
  { match: /check-copy\.mjs$/, terms: 'all' },
  { match: /CLAUDE\.md$/, terms: 'all' },
  { match: /PLACEHOLDERS\.md$/, terms: 'all' },
];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (['node_modules', '.git', '.astro', '.vercel', 'dist'].includes(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function stripAllowed(text) {
  let out = text;
  for (const phrase of ALLOWED) {
    out = out.split(phrase).join(' '.repeat(phrase.length));
  }
  return out;
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ');
}

function exemptTerms(file) {
  const terms = [];
  for (const rule of EXEMPT) {
    if (rule.match.test(file)) {
      if (rule.terms === 'all') return 'all';
      terms.push(...rule.terms);
    }
  }
  return terms;
}

const hits = [];

function isComment(line) {
  const t = line.trim();
  return t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('*/');
}

function scan(file, text, { isHtml = false } = {}) {
  const exempt = exemptTerms(file);
  if (exempt === 'all') return;
  const body = isHtml ? visibleText(text) : text;
  const lines = body.split('\n');

  lines.forEach((rawLine, index) => {
    const line = stripAllowed(rawLine);
    const where = `${relative(ROOT, file)}:${index + 1}`;

    if (line.includes(EM_DASH)) hits.push({ where, term: 'em dash (U+2014)', line: rawLine.trim() });
    if (line.includes(EN_DASH)) hits.push({ where, term: 'en dash (U+2013)', line: rawLine.trim() });

    // Banned words are checked against copy, not against comments that quote the rules.
    // Dashes are still checked in comments, because CLAUDE.md bans them there too.
    if (!isHtml && isComment(rawLine)) return;

    for (const word of BANNED) {
      if (exempt.includes(word)) continue;
      const re = new RegExp(`\\b${word}\\b`, 'i');
      if (re.test(line)) hits.push({ where, term: word, line: rawLine.trim().slice(0, 140) });
    }
    for (const phrase of BANNED_PHRASES) {
      if (exempt.includes(phrase)) continue;
      if (new RegExp(phrase.replace(/ /g, '\\s+'), 'i').test(line)) {
        hits.push({ where, term: phrase, line: rawLine.trim().slice(0, 140) });
      }
    }
  });
}

/* 1 and 2: content source files. */
const contentFiles = walk(join(ROOT, 'src')).filter(
  (f) => /\/(content|config)\//.test(f) && /\.(ts|md)$/.test(f),
);
for (const file of contentFiles) scan(file, readFileSync(file, 'utf8'));

/* 1 and 2: rendered pages. */
const distDir = join(ROOT, 'dist', 'client');
if (existsSync(distDir)) {
  for (const file of walk(distDir).filter((f) => f.endsWith('.html'))) {
    scan(file, readFileSync(file, 'utf8'), { isHtml: true });
  }
} else {
  console.warn('check-copy: dist/client not found, rendered pages were not scanned. Run the build first.');
}

/* 3: placeholder coverage. */
const markerRe = /\[(?:PLACEHOLDER|CONFIRM): [^\]]+\]/g;
const inSource = new Set();
for (const file of walk(join(ROOT, 'src')).filter((f) => /\.(ts|md|astro|css)$/.test(f))) {
  for (const marker of readFileSync(file, 'utf8').match(markerRe) ?? []) inSource.add(marker);
}
const logged = new Set(
  (readFileSync(join(ROOT, 'PLACEHOLDERS.md'), 'utf8').match(/`(\[(?:PLACEHOLDER|CONFIRM): [^\]]+\])`/g) ?? []).map(
    (m) => m.slice(1, -1),
  ),
);
const unlogged = [...inSource].filter((m) => !logged.has(m)).sort();

/* Report. */
console.log('check-copy');
console.log(`  content files scanned: ${contentFiles.length}`);
console.log(`  rendered pages scanned: ${existsSync(distDir) ? walk(distDir).filter((f) => f.endsWith('.html')).length : 0}`);
console.log(`  banned term and dash hits: ${hits.length}`);
for (const hit of hits) console.log(`    ${hit.where}  [${hit.term}]  ${hit.line}`);
console.log(`  markers in source: ${inSource.size}, logged in PLACEHOLDERS.md: ${logged.size}`);
console.log(`  unlogged markers: ${unlogged.length}`);
for (const marker of unlogged) console.log(`    ${marker}`);

if (hits.length > 0 || unlogged.length > 0) {
  console.error('\ncheck-copy FAILED');
  process.exit(1);
}
console.log('\ncheck-copy passed');
