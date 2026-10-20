/**
 * In-page anchors (#how) only work on the home page. On any other page, point them back to the home page (/#how).
 * Used by the shared nav, announcement bar and footer, so new pages (/igaming, /guides/...) get working links.
 */
export function pageHref(href: string, pathname: string): string {
  const onHome = pathname === '/' || pathname === '';
  return href.startsWith('#') && !onHome ? `/${href}` : href;
}
