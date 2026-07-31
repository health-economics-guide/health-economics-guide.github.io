// Shared book types and the part manifest.
//
// This module holds no chapter prose — only the small metadata that both the
// server load functions and the Svelte components need, so it is safe to import
// from either side. The prose lives in `$lib/server/book.ts`, which is
// server-only and therefore never reaches a client bundle.

/** One entry in the table of contents. */
export type ChapterRef = {
  /** URL slug, e.g. `1-1-introduction-to-health-economics` or `preface`. */
  slug: string;
  /** Chapter number as printed, e.g. `1.1`. Empty for front matter. */
  number: string;
  /** Chapter title without the `Chapter N.N — ` prefix. */
  title: string;
  /** Part number this chapter belongs to; 0 for front matter. */
  part: number;
};

/** One of the book's five parts. */
export type Part = {
  number: number;
  title: string;
  /** The one-line framing shown under the part title. */
  tagline: string;
};

/**
 * The five parts, in reading order. Kept in sync by hand with the source repo's
 * README — the chapter files themselves record only their own number, not the
 * part groupings or taglines.
 */
export const PARTS: Part[] = [
  {
    number: 1,
    title: 'Foundations',
    tagline: 'why health is economically different, and the models that explain it'
  },
  {
    number: 2,
    title: 'Evaluation and Evidence',
    tagline: "the analyst's toolkit: valuing outcomes, building models, testing claims"
  },
  {
    number: 3,
    title: 'Systems, Policy and Priorities',
    tagline: 'how societies organize, fund, and share out healthcare'
  },
  {
    number: 4,
    title: 'Global and Societal Issues',
    tagline:
      'health beyond one system: behaviour, global trade and financing, the planet, and the public conversation'
  },
  {
    number: 5,
    title: 'Digital, Software, and Technology',
    tagline:
      'the economics of health technology: innovation, digital care, artificial intelligence, software, robotics, and data'
  }
];

/** Where the book's source lives, for "edit this page" and provenance links. */
export const SOURCE_REPO = 'https://github.com/health-economics-guide/health-economics-guide';
