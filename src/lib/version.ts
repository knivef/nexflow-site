/**
 * Which site version this build is. Order of precedence:
 * 1. SITE_VERSION env var (explicit override),
 * 2. the git branch Vercel is building (VERCEL_GIT_COMMIT_REF), matched against config.versions,
 * 3. the local git branch, so `npm run dev` on the v2 branch shows v2,
 * 4. the first (primary) version.
 */
import { execSync } from 'node:child_process';
import { config } from '@/config/site.config';

function localBranch(): string {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return '';
  }
}

export function currentVersionId(): string {
  const primary = config.versions[0]?.id ?? 'v1';
  const explicit = process.env.SITE_VERSION;
  if (explicit && config.versions.some((v) => v.id === explicit)) return explicit;
  const branch = process.env.VERCEL_GIT_COMMIT_REF || localBranch();
  return config.versions.find((v) => v.branch === branch)?.id ?? primary;
}

/** Only the primary version may be indexed. Other versions are review copies. */
export function isPrimaryVersion(): boolean {
  return currentVersionId() === (config.versions[0]?.id ?? 'v1');
}
