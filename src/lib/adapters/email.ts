/**
 * Email adapter: STUB. Not implemented yet, so it always reports failure and the form shows the fallback email.
 *
 * To implement, pick a transactional email provider (e.g. Resend, Postmark, Amazon SES), add its API key
 * as a secret in astro.config.mjs and .env.example, and send a plain-text summary of the record to FORM_EMAIL_TO.
 * Keep the body plain text: it contains applicant input.
 */
import type { FormAdapter } from './types';

export function emailAdapter(to: string | undefined): FormAdapter {
  return {
    name: 'email',
    async deliver() {
      return { ok: false, reason: to ? 'email adapter is a stub and not implemented yet' : 'FORM_EMAIL_TO is not set' };
    },
  };
}
