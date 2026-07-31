import { toc } from '$lib/server/book';

/** The contents page is the full table of contents. */
export function load() {
  return { toc: toc() };
}
