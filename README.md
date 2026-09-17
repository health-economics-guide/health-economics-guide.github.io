# health-economics-guide.github.io

The public website for the [Health Economics Guide](https://github.com/health-economics-guide/health-economics-guide) at <https://health-economics-guide.github.io>.

The book itself — 33 chapters plus a preface, a glossary, and an index — lives in the source repository. This repository turns that markdown into a reading site.

## What's here

A SvelteKit project using `@sveltejs/adapter-static` that prerenders every page to plain HTML, styled with the [Lily Design System™](https://github.com/LilyDesignSystem), and deployed by GitHub Actions.

```
health-economics-guide.github.io/
├── src/
│   ├── app.html                  Document shell; loads the Lily theme and site CSS
│   ├── content/                  Vendored copy of the book's markdown
│   │   ├── chapters/*.md         34 files: the preface and 33 chapters
│   │   ├── GLOSSARY.md
│   │   └── INDEX.md
│   ├── lib/
│   │   ├── book.ts               Part manifest and shared types (client-safe)
│   │   ├── markdown.ts           Markdown to HTML, run at build time
│   │   ├── ReferencePage.svelte  Shared layout for the glossary and the index
│   │   └── server/book.ts        Server-only: loads and parses the content
│   └── routes/
│       ├── +layout.svelte        Grail layout: header, reading column, footer
│       ├── +page.svelte          Home
│       ├── contents/             Full table of contents
│       ├── chapters/[slug]/      One prerendered page per chapter
│       ├── glossary/
│       ├── index/
│       └── sitemap.xml/
├── static/
│   ├── .nojekyll                 Stop GitHub Pages running Jekyll over the build
│   ├── robots.txt
│   └── assets/
│       ├── style.css             The site stylesheet, layered over the Lily theme
│       ├── favicon.svg
│       └── themes/               Lily theme stylesheets the reader can switch between
├── scripts/sync-content.sh       Re-copy the book's markdown from the source repo
├── .github/workflows/deploy.yml  CI: build and deploy on push to main
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Develop

```sh
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # produces build/ for deploy
pnpm preview      # production-mode preview
pnpm check        # type-check
```

## How the book gets here

The markdown is **vendored** — `src/content/` holds a copy, so this repository builds and previews on its own without a checkout of the book beside it. The copy goes stale when the book changes; refresh it with:

```sh
pnpm sync                                   # assumes the repos are siblings
./scripts/sync-content.sh /path/to/the/book  # or point at it explicitly
```

then review and commit the result. The script deletes `src/content/chapters/` before copying, so a chapter removed upstream is removed here too.

Chapters are discovered from the filenames, which carry the ordering (`03-07-insurance-and-risk-protection.md`), and the chapter number and title are read from each file's `#` heading. Adding a chapter upstream and re-running the sync is therefore the whole job — no route, no list, and no navigation entry needs editing. The one thing kept by hand is the five-part grouping and its taglines, in `src/lib/book.ts`, because the chapter files do not record which part they belong to.

## Design

The site uses the Lily Design System's Svelte packages from npm, under the `@lilydesignsystem/` org — nothing vendored except theme CSS (below):

- **[`@lilydesignsystem/svelte-headless`](https://www.npmjs.com/package/@lilydesignsystem/svelte-headless)**: `GrailLayout` and its header, main, and footer regions for the page frame, `ArticleLayout`, `ContentsNav`, `BreadcrumbNav`, `PaginationNav`, `SectionHeading`, `Card`, `Badge`, and `SkipLink`. They ship no CSS — every rule comes from the active theme plus `static/assets/style.css`.
- **[`@lilydesignsystem/svelte-picker-bar`](https://www.npmjs.com/package/@lilydesignsystem/svelte-picker-bar)**: `PickerBar` in the header, composing `ThemePicker`, `LocalePicker`, `TextSizePicker`, and `SharePicker` (each its own `@lilydesignsystem/svelte-*-picker` package, installed transitively). All three stateful pickers persist to `localStorage`; the theme picker also honours `prefers-color-scheme`, and the share picker offers copy-link plus email, LinkedIn, Reddit, Bluesky, and Mastodon. The locale picker currently offers only English — it's wired up ready for translations, not doing anything yet.

Readers can switch between all 45 Lily reference themes, including six NHS variants, UK Government Digital Service, and US Web Design System. There is no published theme package, so `static/assets/themes/` stays a vendored copy of `lilydesignsystem/lily-design-system`'s `themes/` directory — refresh it by re-copying when it drifts. Each theme file is standalone: it declares its tokens and inlines the component CSS, so switching is a single stylesheet swap.

Content rendering happens entirely at build time. `src/lib/server/book.ts` is server-only, so the prose never enters a client bundle; each page ships its own HTML and a shared ~200 KB of app JavaScript.

## Deploy

GitHub Actions builds and deploys on every push to `main`, via `.github/workflows/deploy.yml`. The repository's **Settings → Pages → Source** must be set to **GitHub Actions**.

## Licence

The site code is available under the same terms as the [Health Economics Guide](https://github.com/health-economics-guide/health-economics-guide). Lily Design System components are used under their own licence; Lily™ and Lily Design System™ are trademarks.
