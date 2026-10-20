/**
 * FAQ data for structured data (FAQPage schema) and any other export.
 * The answer text is the direct answer followed by the detail, as plain text.
 */
import { site } from '@/content/site';
import type { FaqItem } from '@/content/types';
import { hasPlaceholder } from '@/lib/placeholder';

/** The questions shown on the page. If `featured` is set, only those, in that order. Schema must match what's visible. */
export const faqItems: FaqItem[] = site.faq.featured
  ? site.faq.featured
      .map((id) => site.faq.items.find((item) => item.id === id))
      .filter((item): item is FaqItem => Boolean(item))
  : site.faq.items;

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
