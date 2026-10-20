/**
 * /llms.txt: a plain-language summary for AI assistants (https://llmstxt.org).
 * Built from the content file, so it stays in sync with the page. Placeholder text is never included:
 * any line still containing a [PLACEHOLDER: ...] is left out until it is real.
 */
import type { APIRoute } from 'astro';
import { BOOKING_URL } from 'astro:env/server';
import { site } from '@/content/site';
import { hasPlaceholder, isReal } from '@/lib/placeholder';

export const GET: APIRoute = ({ site: siteUrl }) => {
  const base = siteUrl ?? new URL('http://localhost:4321');
  const url = (path: string) => new URL(path, base).href;
  const { seo, verticals, trust, footer, faq } = site;
  const { llms } = seo;
  const keep = (line: string) => !hasPlaceholder(line);

  const email = [footer.contact.email, trust.contact.email, site.apply.failure.email].find(isReal);
  const booking = isReal(BOOKING_URL) ? BOOKING_URL : undefined;
  const notAcquirer = trust.corporate.licences.length === 0;

  const lines = [
    `# ${site.nav.brand}`,
    '',
    `> ${seo.categoryLabel}`,
    '',
    llms.summary,
    ...(notAcquirer ? ['', llms.notAcquirerLine] : []),
    '',
    `## ${llms.servesHeading}`,
    '',
    ...llms.serves.filter(keep).map((line) => `- ${line}`),
    '',
    `## ${llms.verticalsHeading}`,
    '',
    ...verticals.items
      .map((v) => `- [${v.name}](${url(`/#verticals-${v.id}`)}): ${v.subheading}`)
      .filter(keep),
    `- ${verticals.other.title}`,
    '',
    `## ${llms.doesNotHeading}`,
    '',
    ...llms.doesNot.filter(keep).map((line) => `- ${line}`),
    '',
    `## ${llms.contactHeading}`,
    '',
    `- ${llms.applyLine}: ${url('/#apply')}`,
    ...(email ? [`- Email: ${email}`] : []),
    ...(booking ? [`- Book a call: ${booking}`] : []),
    '',
    `## ${llms.pagesHeading}`,
    '',
    `- [${site.nav.brand}](${url('/')}): ${seo.description}`,
    `- [${site.how.heading}](${url('/#how')})`,
    `- [${faq.heading}](${url('/#faq')})`,
    '',
  ];

  return new Response(lines.join('\n'), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
