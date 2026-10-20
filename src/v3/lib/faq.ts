/**
 * FAQ data for structured data (FAQPage schema) and any other export.
 * The answer text is the direct answer followed by the detail, as plain text.
 */
import { site } from '@v3/content/site';
import type { FaqItem } from '@v3/content/types';
import { hasPlaceholder } from '@v3/lib/placeholder';

export const faqItems: FaqItem[] = site.faq.items;

export interface FaqSchemaEntry {
  id: string;
  question: string;
  answer: string;
  /** True while any part still contains a [PLACEHOLDER: ...]. Schema should skip these entries. */
  hasPlaceholder: boolean;
}

export function faqAnswerText(item: FaqItem): string {
  return [item.lead, ...item.detail, ...(item.list ?? []).map((line) => `- ${line}`)].join('\n\n');
}

export function faqSchemaEntries(): FaqSchemaEntry[] {
  return faqItems.map((item) => {
    const answer = faqAnswerText(item);
    return {
      id: item.id,
      question: item.question,
      answer,
      hasPlaceholder: hasPlaceholder(item.question) || hasPlaceholder(answer),
    };
  });
}
