import { error } from '@sveltejs/kit';
import { chapter, slugs } from '$lib/server/book';

/** Prerender one page per chapter; adapter-static needs the list up front. */
export function entries() {
  return slugs().map((slug) => ({ slug }));
}

export function load({ params }) {
  const found = chapter(params.slug);
  if (!found) error(404, `No chapter named "${params.slug}"`);
  return found;
}
