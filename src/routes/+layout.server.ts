import { toc } from '$lib/server/book';

/**
 * The table of contents is needed by the sidebar on every page. It is metadata
 * only — slugs, numbers, and titles — so sending it to the client is cheap,
 * unlike the chapter prose it points at.
 */
export function load() {
  return { toc: toc() };
}
