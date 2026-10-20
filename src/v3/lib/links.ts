/**
 * In-page anchors (#how) only work on this version's home page. On any other page, point them back to it
 * (e.g. /v2/#how). Used by the shared nav, announcement bar and footer.
 */
import { basePath } from '@v3/lib/version';

export function pageHref(href: string, pathname: string): string {
  const base = basePath();
  const onHome = pathname === base || pathname === base.replace(/\/$/, '') || (base === '/' && pathname === '');
  return href.startsWith('#') && !onHome ? `${base}${href}` : href;
}
