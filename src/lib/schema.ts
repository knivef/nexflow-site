/**
 * JSON-LD structured data. Nodes share @ids so they link up in one @graph.
 * Placeholder values are never output: anything not yet real is left out.
 */
import { site } from '@/content/site';
import { faqSchemaEntries } from '@/lib/faq';
import { isReal } from '@/lib/placeholder';

type Node = Record<string, unknown>;

const absolute = (path: string, base: URL) => new URL(path, base).href;

export function organizationNode(base: URL): Node {
  const { organization } = site.seo;
  const sameAs = organization.sameAs.map((profile) => profile.url).filter(isReal);
  const email = [site.footer.contact.email, site.trust.contact.email].find(isReal);
  return {
    '@type': 'Organization',
    '@id': absolute('/#organization', base),
    name: site.nav.brand,
    ...(isReal(organization.legalName) && { legalName: organization.legalName }),
    url: absolute('/', base),
    logo: absolute(organization.logo, base),
    description: site.seo.categoryLabel,
    ...(sameAs.length > 0 && { sameAs }),
    ...(email && { email }),
  };
}

export function serviceNode(base: URL): Node {
  const { service } = site.seo;
  return {
    '@type': 'Service',
    '@id': absolute('/#service', base),
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    provider: { '@id': absolute('/#organization', base) },
    audience: { '@type': 'BusinessAudience', audienceType: service.audienceType },
  };
}

/** FAQPage from the FAQ data. Answers that still contain a placeholder are skipped. */
export function faqPageNode(base: URL): Node | null {
  const entries = faqSchemaEntries().filter((entry) => !entry.hasPlaceholder);
  if (entries.length === 0) return null;
  return {
    '@type': 'FAQPage',
    '@id': absolute('/#faq', base),
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      url: absolute(`/#faq-${entry.id}`, base),
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };
}

export function graph(nodes: (Node | null)[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) });
}
