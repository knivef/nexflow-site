/**
 * Form endpoint. Runs on demand, so it is the only route that is not prerendered.
 *
 * Accepts a POST from the partner, account or sales form, validates server side, applies a
 * rate limit and a honeypot, then hands the values to the adapter named by FORM_ADAPTER.
 *
 * Answers JSON when the browser asks for it, and redirects back to the page otherwise, so
 * the form still works with JavaScript turned off. The redirect carries a status flag only:
 * no submitted values ever go in a URL.
 */
import type { APIRoute } from 'astro';
import { forms } from '@/content/forms';
import {
  validate,
  deliver,
  rateLimited,
  clientKey,
  checkEligibility,
  HONEYPOT_FIELD,
} from '@/lib/submissions';

export const prerender = false;

const BY_ID = {
  'open-account': forms.openAccount,
  partner: forms.partner,
  sales: forms.sales,
} as const;

/** Where a no-script submission goes back to. */
const RETURN_TO: Record<string, string> = {
  'open-account': '/open-an-account',
  partner: '/partners#partner-form',
  sales: '/company/contact#sales-form',
};

function wantsJson(request: Request): boolean {
  return (request.headers.get('accept') ?? '').includes('application/json');
}

function back(id: string, status: 'ok' | 'error' | 'declined', reason?: string): string {
  const target = RETURN_TO[id] ?? '/';
  const [path, hash] = target.split('#');
  // Only the category travels in the URL, never the submitted value.
  const query = `submitted=${status}${reason ? `&reason=${reason}` : ''}`;
  return `${path}?${query}${hash ? `#${hash}` : ''}`;
}

export const POST: APIRoute = async ({ params, request }) => {
  const id = params.id ?? '';
  const form = BY_ID[id as keyof typeof BY_ID];

  if (!form) {
    return new Response(JSON.stringify({ ok: false, error: 'Unknown form.' }), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    });
  }

  if (rateLimited(`${clientKey(request)}:${id}`)) {
    const body = { ok: false, error: 'Too many submissions. Please try again later.' };
    return wantsJson(request)
      ? new Response(JSON.stringify(body), { status: 429, headers: { 'content-type': 'application/json' } })
      : new Response(null, { status: 303, headers: { location: back(id, 'error') } });
  }

  // A POST with no body, or a body that is not form data, is a malformed request, not a
  // server fault. Answer 400 rather than letting formData() throw into a 500.
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return wantsJson(request)
      ? new Response(JSON.stringify({ ok: false, error: 'Malformed submission.' }), {
          status: 400,
          headers: { 'content-type': 'application/json' },
        })
      : new Response(null, { status: 303, headers: { location: back(id, 'error') } });
  }

  // Honeypot: a bot fills the hidden field. Answer as if it worked, store nothing.
  if (String(data.get(HONEYPOT_FIELD) ?? '').trim() !== '') {
    console.log(`[form:${id}] honeypot triggered, discarded`);
    return wantsJson(request)
      ? new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } })
      : new Response(null, { status: 303, headers: { location: back(id, 'ok') } });
  }

  const result = validate(form.fields, data);

  if (!result.ok) {
    return wantsJson(request)
      ? new Response(JSON.stringify({ ok: false, errors: result.errors }), {
          status: 422,
          headers: { 'content-type': 'application/json' },
        })
      : new Response(null, { status: 303, headers: { location: back(id, 'error') } });
  }

  // Eligibility runs before delivery: a declined application is answered politely and
  // never stored as an application.
  const decline = checkEligibility(result.values);
  if (decline) {
    console.log(`[form:${id}] declined on ${decline.reason}`);
    return wantsJson(request)
      ? new Response(JSON.stringify({ ok: false, declined: decline }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      : new Response(null, { status: 303, headers: { location: back(id, 'declined', decline.reason) } });
  }

  let outcome: Awaited<ReturnType<typeof deliver>>;
  try {
    outcome = await deliver(id, result.values);
  } catch (error) {
    console.error(`[form:${id}] delivery threw`, error);
    outcome = { delivered: false, adapter: 'unknown', detail: 'delivery failed' };
  }

  // An adapter that is configured but failed is a real error. "none" is review mode and
  // counts as accepted, because nothing is meant to be stored yet.
  const accepted = outcome.adapter === 'none' || outcome.delivered;

  if (!accepted) {
    console.error(`[form:${id}] not delivered: ${outcome.detail ?? 'unknown reason'}`);
    return wantsJson(request)
      ? new Response(JSON.stringify({ ok: false, error: form.errorMessage }), {
          status: 502,
          headers: { 'content-type': 'application/json' },
        })
      : new Response(null, { status: 303, headers: { location: back(id, 'error') } });
  }

  return wantsJson(request)
    ? new Response(JSON.stringify({ ok: true, message: form.successMessage }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    : new Response(null, { status: 303, headers: { location: back(id, 'ok') } });
};
