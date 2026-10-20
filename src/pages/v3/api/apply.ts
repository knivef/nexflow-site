/**
 * POST /api/apply: partner application endpoint. Runs on demand as a Vercel function; every other page is static.
 * Accepts JSON (the enhanced form) or url-encoded form posts (no JavaScript), validates with the same rules as the
 * browser, filters bots, rate limits per IP, then hands the record to the adapter chosen by FORM_ADAPTER.
 */
import type { APIRoute } from 'astro';
import { site } from '@v3/content/site';
import {
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  STARTED_AT_FIELD,
  finaliseApply,
  parseFormData,
  parseJson,
  rulesFromContent,
  validateApply,
} from '@v3/lib/apply';
import { getAdapter, type ApplicationRecord } from '@v3/lib/adapters';
import { basePath } from '@v3/lib/version';

export const prerender = false;

const MAX_BODY_BYTES = 32 * 1024;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };

// Best-effort rate limit. Serverless instances don't share memory, so this slows down a single noisy client
// rather than enforcing a global limit. Put Vercel Firewall rate limiting in front for anything stronger.
const hits = new Map<string, number[]>();

function rateLimited(key: string, now: number): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT.max;
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

function labelFor(field: 'companyType' | 'volume' | 'licenceStatus' | 'verticals' | 'geographies' | 'needs', value: string) {
  return site.apply.fields[field].options?.find((option) => option.value === value)?.label ?? value;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const isJson = (request.headers.get('content-type') ?? '').includes('application/json');
  // Without JavaScript the browser posts the form directly, so answer with a redirect back to the page.
  const respond = (status: number, body: Record<string, unknown>, outcome: 'success' | 'invalid' | 'error' | 'limited') =>
    isJson
      ? json(status, body)
      : new Response(null, { status: 303, headers: { location: `${basePath()}?apply=${outcome}#apply` } });

  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
    return respond(413, { ok: false, message: 'Request too large' }, 'error');
  }

  let raw: Record<string, unknown>;
  let data;
  try {
    if (isJson) {
      raw = (await request.json()) as Record<string, unknown>;
      data = parseJson(raw);
    } else {
      const form = await request.formData();
      raw = Object.fromEntries(form.entries());
      data = parseFormData(form);
    }
  } catch {
    return respond(400, { ok: false, message: 'Could not read the form' }, 'error');
  }

  // Bot checks: a filled honeypot or an impossibly fast submission gets a quiet "success" and is dropped.
  const now = Date.now();
  const startedAt = Number(raw[STARTED_AT_FIELD] ?? 0);
  if (String(raw[HONEYPOT_FIELD] ?? '').trim() || (startedAt > 0 && now - startedAt < MIN_FILL_MS)) {
    return respond(200, { ok: true }, 'success');
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'unknown';
  if (rateLimited(ip, now)) {
    return respond(429, { ok: false, message: site.apply.errors.rateLimited }, 'limited');
  }

  const errors = validateApply(data, rulesFromContent(site.apply));
  if (Object.keys(errors).length > 0) {
    return respond(422, { ok: false, errors }, 'invalid');
  }

  const clean = finaliseApply(data);
  const record: ApplicationRecord = {
    type: 'partner_application',
    version: 1,
    submittedAt: new Date(now).toISOString(),
    data: clean,
    labels: {
      companyType: labelFor('companyType', clean.companyType),
      volume: labelFor('volume', clean.volume),
      licenceStatus: labelFor('licenceStatus', clean.licenceStatus),
      verticals: clean.verticals.map((v) => labelFor('verticals', v)),
      geographies: clean.geographies.map((v) => labelFor('geographies', v)),
      needs: clean.needs.map((v) => labelFor('needs', v)),
    },
  };

  const adapter = getAdapter();
  const result = await adapter.deliver(record);
  if (!result.ok) {
    // Log the reason, never the applicant's details.
    console.error(`[apply] delivery failed via ${adapter.name}: ${result.reason}`);
    return respond(502, { ok: false, message: 'Delivery failed' }, 'error');
  }

  return respond(200, { ok: true }, 'success');
};

export const ALL: APIRoute = () => json(405, { ok: false, message: 'Method not allowed' });
