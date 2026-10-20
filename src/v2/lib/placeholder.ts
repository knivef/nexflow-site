/**
 * Turns [PLACEHOLDER: description] markers into visible, highlighted spans.
 * Input is trusted copy from src/content/site.ts, never user input.
 */
const PATTERN = /\[PLACEHOLDER:[^\]]*\]/g;

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function hasPlaceholder(value: string): boolean {
  return value.includes('[PLACEHOLDER:');
}

/** Returns HTML with placeholders wrapped in <mark class="placeholder">. Plain text is escaped. */
export function renderPlaceholders(value: string): string {
  let html = '';
  let last = 0;
  for (const match of value.matchAll(PATTERN)) {
    html += escape(value.slice(last, match.index));
    html += `<mark class="placeholder">${escape(match[0])}</mark>`;
    last = (match.index ?? 0) + match[0].length;
  }
  return html + escape(value.slice(last));
}

/** True when a value is filled in with real data: not empty and not a placeholder. Use before rendering links. */
export function isReal(value: string | null | undefined): value is string {
  return Boolean(value && value.trim() && !hasPlaceholder(value));
}
