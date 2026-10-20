/**
 * /robots.txt: on the primary version, allow all crawlers (search and AI), keep the form endpoint out,
 * point to the sitemap. Review versions (v2, v3) disallow everything.
 */
import type { APIRoute } from 'astro';
import { isPrimaryVersion } from '@/lib/version';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap-index.xml', site ?? 'http://localhost:4321').href;
  const body = isPrimaryVersion()
    ? ['User-agent: *', 'Allow: /', 'Disallow: /api/', '', `Sitemap: ${sitemap}`, ''].join('\n')
    : ['User-agent: *', 'Disallow: /', ''].join('\n');
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
