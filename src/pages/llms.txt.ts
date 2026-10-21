/**
 * /llms.txt: a plain-text summary for AI crawlers and assistants.
 *
 * Generated from the same content the site renders, so it cannot drift from the pages.
 * It states what NexFlow does and, just as importantly, what it does not do, because the
 * failure mode for an assistant summarising a payments company is inventing a capability.
 *
 * The same rule as the structured data applies: nothing here is invented. Where a fact is
 * still a placeholder, the placeholder text is shown so a reader can see it is pending
 * rather than read a guess as fact.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '@/content/site';
import { industries } from '@/content/industries';
import { compliance } from '@/content/compliance';
import { siteConfig } from '@/config/site.config';

export const GET: APIRoute = async ({ site: siteUrl }) => {
  const origin = siteUrl?.origin ?? '';
  const abs = (path: string) => `${origin}${path}`;

  const solutions = (await getCollection('solutions')).sort((a, b) => a.data.order - b.data.order);

  const lines: string[] = [];

  lines.push(`# ${site.brand.name}`);
  lines.push('');
  lines.push(site.footer.aboutLine);
  lines.push('');

  lines.push('## Registrations');
  lines.push('');
  for (const registration of compliance.regulatory.registrations) {
    lines.push(`- ${registration.regulator}: ${registration.statement} ${registration.reference}`);
  }
  lines.push(`- ${compliance.regulatory.partnersNote}`);
  lines.push('');

  lines.push('## Solutions');
  lines.push('');
  for (const solution of solutions) {
    lines.push(`- [${solution.data.navLabel}](${abs(`/solutions/${solution.id}`)}): ${solution.data.navSummary}`);
  }
  lines.push('');

  lines.push('## Industries served');
  lines.push('');
  for (const section of industries.sections) {
    lines.push(`- [${section.title}](${abs(`/industries#${section.id}`)}): ${section.problem}`);
  }
  lines.push('');

  lines.push('## What NexFlow does not do');
  lines.push('');
  lines.push('- NexFlow is not a bank and does not accept deposits.');
  lines.push('- NexFlow does not offer trading or investment services, and does not operate an exchange.');
  lines.push('- NexFlow does not offer consumer accounts. Services are for businesses only.');
  lines.push('- NexFlow does not hold client crypto itself: crypto balances are held with a regulated partner.');
  lines.push('- NexFlow does not serve these businesses:');
  for (const prohibited of siteConfig.prohibitedBusinesses) {
    lines.push(`  - ${prohibited}`);
  }
  lines.push('- Services are available in supported countries only, subject to verification and approval.');
  lines.push('');

  lines.push('## Contact');
  lines.push('');
  for (const mailbox of site.contact.mailboxes) {
    lines.push(`- ${mailbox.label}: ${mailbox.user}@${site.contact.emailDomain}`);
  }
  lines.push('');

  lines.push('## Key pages');
  lines.push('');
  lines.push(`- [Compliance and trust](${abs('/compliance')})`);
  lines.push(`- [Partners](${abs('/partners')})`);
  lines.push(`- [Open an account](${abs('/open-an-account')})`);
  lines.push(`- [Prohibited businesses and restricted countries](${abs('/legal/prohibited-businesses')})`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
