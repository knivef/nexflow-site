import type { z } from 'astro/zod';

/**
 * Validates a content file against its schema at build time. A typo in a content file
 * fails the build with the field path, rather than rendering a broken page.
 */
export function defineContent<S extends z.ZodType>(name: string, schema: S, data: unknown): z.output<S> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n');
    throw new Error(`Content file "${name}" does not match its schema:\n${issues}`);
  }
  return result.data;
}
