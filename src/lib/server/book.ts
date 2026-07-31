// Server-only access to the book's markdown.
//
// Living under `$lib/server/` means SvelteKit refuses to bundle this into
// client code, which matters here: the vendored content is several megabytes of
// prose. The site is fully prerendered, so this module runs at build time and
// each page ships only its own rendered HTML.

import { parse, type Document, type Heading } from '$lib/markdown';
import { PARTS, type ChapterRef } from '$lib/book';

/** Raw markdown for every chapter, keyed by module path. */
const chapterFiles = import.meta.glob('../../content/chapters/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

const glossaryFile = import.meta.glob('../../content/GLOSSARY.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

const indexFile = import.meta.glob('../../content/INDEX.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

/** A chapter: its table-of-contents entry plus its markdown source. */
type Chapter = ChapterRef & { markdown: string };

/**
 * Turn a content filename into a URL slug.
 *
 * Files are named `NN-NN-kebab-title.md`, where the leading numbers order the
 * book on disk. URLs keep the chapter number (readers cite chapters by number)
 * but drop the zero padding: `01-01-market-failure` becomes `1-1-market-failure`.
 * Front matter has no chapter number, so `00-preface` becomes just `preface`.
 */
function slugFor(stem: string): string {
  const numbered = stem.match(/^(\d+)-(\d+)-(.+)$/);
  if (numbered) {
    const [, part, chapter, rest] = numbered;
    return `${Number(part)}-${Number(chapter)}-${rest}`;
  }
  // Front matter is numbered for ordering only — `00-preface` — and reads
  // better without the digits.
  const frontMatter = stem.match(/^\d+-(.+)$/);
  return frontMatter ? frontMatter[1] : stem;
}

/**
 * Split a document title into its number and its title.
 *
 * Chapter files open with `# Chapter 1.1 — Introduction to Health Economics`;
 * front matter opens with a bare `# Preface`.
 */
function splitTitle(heading: string): { number: string; title: string } {
  const match = heading.match(/^Chapter\s+([\d.]+)\s*[—–-]\s*(.+)$/);
  if (match) return { number: match[1], title: match[2].trim() };
  return { number: '', title: heading.trim() };
}

/**
 * Every chapter in reading order: front matter first, then chapters ascending
 * by part and number. The content filenames already sort that way, so sorting
 * the glob keys is enough.
 */
const chapters: Chapter[] = Object.entries(chapterFiles)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, markdown]) => {
    const stem = path.split('/').pop()!.replace(/\.md$/, '');
    const heading = markdown.match(/^#\s+(.+)$/m)?.[1] ?? stem;
    const { number, title } = splitTitle(heading);
    return {
      slug: slugFor(stem),
      number,
      title,
      part: number ? Number(number.split('.')[0]) : 0,
      markdown
    };
  });

/** Table-of-contents entries — metadata only, safe to send to the client. */
export function toc(): ChapterRef[] {
  return chapters.map(({ slug, number, title, part }) => ({ slug, number, title, part }));
}

/** The parts, each with its chapters, for rendering the full contents. */
export function contents(): Array<{
  number: number;
  title: string;
  tagline: string;
  chapters: ChapterRef[];
}> {
  return PARTS.map((part) => ({
    ...part,
    chapters: toc().filter((chapter) => chapter.part === part.number)
  }));
}

/** Front matter — chapters with no part, such as the preface. */
export function frontMatter(): ChapterRef[] {
  return toc().filter((chapter) => chapter.part === 0);
}

/** A rendered chapter plus its neighbours, or `null` if the slug is unknown. */
export function chapter(slug: string): {
  ref: ChapterRef;
  doc: Document;
  previous: ChapterRef | null;
  next: ChapterRef | null;
} | null {
  const at = chapters.findIndex((candidate) => candidate.slug === slug);
  if (at === -1) return null;

  const { markdown, ...ref } = chapters[at];
  const neighbour = (offset: number): ChapterRef | null => {
    const found = chapters[at + offset];
    if (!found) return null;
    const { markdown: _omit, ...rest } = found;
    return rest;
  };

  return { ref, doc: parse(markdown), previous: neighbour(-1), next: neighbour(1) };
}

/** Every chapter slug, for prerender entry generation. */
export function slugs(): string[] {
  return chapters.map((chapter) => chapter.slug);
}

/**
 * Render a reference document (the glossary or the index).
 *
 * Both files carry one relative link to `spec/index.md`, which exists in the
 * source repository but not on this site; repoint it at GitHub so the link
 * still resolves for readers who follow it.
 */
function reference(markdown: string): Document & { letters: Heading[] } {
  const repointed = markdown.replace(
    /\]\(spec\/index\.md\)/g,
    '](https://github.com/health-economics-guide/health-economics-guide/blob/main/spec/index.md)'
  );
  const doc = parse(repointed);
  return { ...doc, letters: doc.headings.filter((heading) => heading.depth === 2) };
}

/** The A–Z glossary. */
export function glossary() {
  return reference(Object.values(glossaryFile)[0]);
}

/** The concept index. */
export function conceptIndex() {
  return reference(Object.values(indexFile)[0]);
}
