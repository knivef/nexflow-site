/**
 * Webhook adapter: POSTs the application as JSON to FORM_ENDPOINT.
 * Works with Zapier, Make, n8n, Slack workflows or your own API.
 * If FORM_WEBHOOK_SECRET is set, the request carries X-Nexflow-Signature: hex HMAC-SHA256 of the raw body,
 * so the receiver can check the request came from this site.
 */
import { createHmac } from 'node:crypto';
import type { FormAdapter } from './types';

const TIMEOUT_MS = 8000;

export function webhookAdapter(endpoint: string | undefined, secret: string | undefined): FormAdapter {
  return {
    name: 'webhook',
    async deliver(record) {
      if (!endpoint) return { ok: false, reason: 'FORM_ENDPOINT is not set' };

      const body = JSON.stringify(record);
      const headers: Record<string, string> = {
        'content-type': 'application/json',
        'user-agent': 'nexflow-site/1.0',
      };
      if (secret) headers['x-nexflow-signature'] = createHmac('sha256', secret).update(body).digest('hex');

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers,
          body,
          signal: AbortSignal.timeout(TIMEOUT_MS),
        });
        if (!response.ok) return { ok: false, reason: `webhook responded ${response.status}` };
        return { ok: true };
      } catch (error) {
        return { ok: false, reason: `webhook request failed: ${(error as Error).message}` };
      }
    },
  };
}
