import { slugs } from '$lib/server/book';

export const prerender = true;

const SITE = 'https://health-economics-guide.github.io';

/**
 * A sitemap for a book that search engines should index chapter by chapter —
 * readers arrive from a search for one concept, not for the front page.
 */
export function GET() {
  const paths = [
    '/',
    '/contents/',
    '/glossary/',
    '/index/',
    ...slugs().map((slug) => `/chapters/${slug}/`)
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${SITE}${path}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(body, { headers: { 'content-type': 'application/xml' } });
}
