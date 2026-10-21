/**
 * robots.txt, generated so the sitemap URL always matches SITE_URL rather than a hardcoded
 * host. The home page versions under test are disallowed as well as noindexed: noindex stops
 * them being listed, Disallow stops them being crawled in the first place.
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? '';
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Home page versions under test. Noindex with a canonical to "/" as well.',
    'Disallow: /b',
    'Disallow: /c',
    '',
    '# Form endpoints are not content.',
    'Disallow: /api/',
    '',
    `Sitemap: ${origin}/sitemap-index.xml`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
