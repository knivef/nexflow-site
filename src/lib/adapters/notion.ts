/**
 * Notion adapter: creates one page per application in a Notion database.
 * Needs NOTION_TOKEN (an internal integration token) and NOTION_DATABASE_ID (a database shared with that integration).
 * The database must have the properties listed in NOTION_PROPERTIES, with these exact names and types.
 * See README.md for setup.
 */
import type { ApplicationRecord, FormAdapter } from './types';

const NOTION_VERSION = '2022-06-28';
const TIMEOUT_MS = 8000;
// Notion limits a single rich text object to 2,000 characters.
const MAX_TEXT = 2000;

/** Property name -> Notion property type. Keep README.md in sync with this list. */
export const NOTION_PROPERTIES = {
  Name: 'title',
  Email: 'email',
  Company: 'rich_text',
  Website: 'url',
  'Company type': 'select',
  'Monthly volume': 'select',
  'Licence status': 'select',
  'Licence details': 'rich_text',
  Verticals: 'multi_select',
  Geographies: 'multi_select',
  Needs: 'multi_select',
  'Current acquirers': 'rich_text',
  Message: 'rich_text',
  Consent: 'checkbox',
  'Submitted at': 'date',
} as const;

const text = (value: string) => [{ type: 'text', text: { content: value.slice(0, MAX_TEXT) } }];
// Notion select options cannot contain commas.
const option = (value: string) => ({ name: value.replace(/,/g, ' ').slice(0, 100) });

export function notionProperties(record: ApplicationRecord) {
  const { data, labels } = record;
  return {
    Name: { title: text(data.fullName) },
    Email: { email: data.workEmail },
    Company: { rich_text: text(data.company) },
    Website: { url: data.website || null },
    'Company type': { select: labels.companyType ? option(labels.companyType) : null },
    'Monthly volume': { select: labels.volume ? option(labels.volume) : null },
    'Licence status': { select: labels.licenceStatus ? option(labels.licenceStatus) : null },
    'Licence details': { rich_text: text(data.licenceDetails) },
    Verticals: { multi_select: labels.verticals.map(option) },
    Geographies: { multi_select: labels.geographies.map(option) },
    Needs: { multi_select: labels.needs.map(option) },
    'Current acquirers': { rich_text: text(data.currentAcquirers) },
    Message: { rich_text: text(data.message) },
    Consent: { checkbox: data.consent },
    'Submitted at': { date: { start: record.submittedAt } },
  };
}

export function notionAdapter(token: string | undefined, databaseId: string | undefined): FormAdapter {
  return {
    name: 'notion',
    async deliver(record) {
      if (!token || !databaseId) return { ok: false, reason: 'NOTION_TOKEN or NOTION_DATABASE_ID is not set' };
      try {
        const response = await fetch('https://api.notion.com/v1/pages', {
          method: 'POST',
          headers: {
            authorization: `Bearer ${token}`,
            'content-type': 'application/json',
            'notion-version': NOTION_VERSION,
          },
          body: JSON.stringify({ parent: { database_id: databaseId }, properties: notionProperties(record) }),
          signal: AbortSignal.timeout(TIMEOUT_MS),
        });
        if (!response.ok) {
          // Notion explains schema mismatches (e.g. a missing property) in the message field.
          const detail = await response.json().catch(() => ({}) as { message?: string });
          return { ok: false, reason: `notion responded ${response.status}: ${(detail as { message?: string }).message ?? ''}` };
        }
        return { ok: true };
      } catch (error) {
        return { ok: false, reason: `notion request failed: ${(error as Error).message}` };
      }
    },
  };
}
