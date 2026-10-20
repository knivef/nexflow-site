/** Picks the delivery adapter named by the FORM_ADAPTER env var. Server only. */
import {
  FORM_ADAPTER,
  FORM_ENDPOINT,
  FORM_WEBHOOK_SECRET,
  NOTION_TOKEN,
  NOTION_DATABASE_ID,
  FORM_EMAIL_TO,
} from 'astro:env/server';
import type { FormAdapter } from './types';
import { webhookAdapter } from './webhook';
import { notionAdapter } from './notion';
import { emailAdapter } from './email';

const noneAdapter: FormAdapter = {
  name: 'none',
  async deliver() {
    return { ok: false, reason: 'FORM_ADAPTER is "none": no delivery configured' };
  },
};

export function getAdapter(): FormAdapter {
  switch (FORM_ADAPTER) {
    case 'webhook':
      return webhookAdapter(FORM_ENDPOINT, FORM_WEBHOOK_SECRET);
    case 'notion':
      return notionAdapter(NOTION_TOKEN, NOTION_DATABASE_ID);
    case 'email':
      return emailAdapter(FORM_EMAIL_TO);
    default:
      return noneAdapter;
  }
}

export type { ApplicationRecord, DeliveryResult, FormAdapter } from './types';
