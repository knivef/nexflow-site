/**
 * This tree is v2. Versions are served by path from one deployment (see src/shared/versions.ts).
 */
import { PRIMARY_VERSION, versionPath, type VersionId } from '@shared/versions';

export const VERSION_ID: VersionId = 'v2';

export function currentVersionId(): VersionId {
  return VERSION_ID;
}

/** Only the primary version may be indexed. Other versions are review copies. */
export function isPrimaryVersion(): boolean {
  return VERSION_ID === PRIMARY_VERSION;
}

/** Base path of this version, e.g. "/" or "/v2/". */
export function basePath(): string {
  return versionPath(VERSION_ID);
}
