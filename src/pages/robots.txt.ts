/**
 * /robots.txt: allow all crawlers (search and AI) on v1, keep the review versions (/v2/, /v3/)
 * and the form endpoints out, point to the sitemap.
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap-index.xml', site ?? 'http://localhost:4321').href;
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /v2/',
    'Disallow: /v3/',
    '',
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
