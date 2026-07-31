import { toc } from '$lib/server/book';

/** The home page lists every chapter grouped by part. */
export function load() {
  return { toc: toc() };
}
