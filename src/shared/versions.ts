/**
 * The site versions, all served from one deployment of the main branch:
 * v1 at /, v2 at /v2/, v3 at /v3/. Each version's code lives in its own tree (src/ for v1, src/v2/, src/v3/).
 * Only the primary version may be indexed by search engines.
 */
export const VERSIONS = [
  { id: 'v1', label: 'V1', path: '/' },
  { id: 'v2', label: 'V2', path: '/v2/' },
  { id: 'v3', label: 'V3', path: '/v3/' },
] as const;

export type VersionId = (typeof VERSIONS)[number]['id'];

export const PRIMARY_VERSION: VersionId = 'v1';

/** Public URL of the deployment, used when SITE_URL is not set on Vercel. */
export const PRODUCTION_URL = 'https://nexflow-site-one.vercel.app';

export function versionPath(id: VersionId): string {
  return VERSIONS.find((v) => v.id === id)?.path ?? '/';
}
