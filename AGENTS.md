# AGENTS.md

Guidance for AI agents working on this repository. Read `README.md` first for the layout and the commands.

## What this repository is, and is not

This is the **website** for the Health Economics Guide. It is not the book.

The prose lives in <https://github.com/health-economics-guide/health-economics-guide>. `src/content/` is a vendored copy of it.

**Never edit `src/content/`.** An edit there is lost the next time anyone runs `pnpm sync`, and it silently forks the book from its source of truth. To fix a typo in a chapter, fix it in the book repository, then run `pnpm sync` here.

## Conventions

- **Prerendered, always.** `src/routes/+layout.ts` sets `prerender = true`. Every route must be prerenderable: no runtime server code, no request-time data. A new dynamic route needs an `entries()` export so adapter-static knows what to emit.
- **Content stays server-side.** Anything that reads `src/content/` belongs in `src/lib/server/`, which SvelteKit refuses to bundle into client code. The content is several megabytes; a stray client-side import would ship all of it to every reader.
- **Lily components are vendored, not imported from npm.** They live in `src/lib/lily/` and `src/lib/helpers/`, copied from the Lily Design System repository. To add a component, copy its `.svelte` file across rather than reaching outside this repository.
- **Lily components are headless.** They carry class names and no styles. Put styling in `static/assets/style.css`, never in a component `<style>` block, so that all of the site's appearance is in one file and every theme keeps working.
- **The theme wins by default.** The active Lily theme states nearly everything inside `:where()`, which has zero specificity, so a plain class selector in `style.css` overrides it. If a rule seems not to apply, check whether the theme is styling a *parent* — `.section-heading`, for instance, is sized and bolded on the container, so `em` units on its children compound off that.
- **Sizes scale from `--text-base`,** which the `TextSizePicker` drives via `data-text-size` on `<html>`. Use `em` or that variable; a hard-coded `px` font size ignores the reader's choice.

## Before committing

```sh
pnpm check    # svelte-check: must report 0 errors
pnpm build    # must complete; watch for prerender warnings
```

Then check the built site rather than trusting the build log. Serve `build/` as a plain static directory — that is what GitHub Pages does, and `vite preview` can disagree with it:

```sh
cd build && python3 -m http.server 4190
```

Verify at 1440px and at 390px that no page scrolls horizontally, that the theme and text-size pickers work, and that the console is clean.

## Things that have bitten before

- **Wide tables.** Chapters compare four or five columns of systems and payment models. Tables are wrapped in a scrolling `.prose-scroll` region by the markdown renderer; do not remove the wrapper to "fix" a table's appearance.
- **Bare URLs.** The references section of every chapter ends in autolinked URLs with no spaces to break at. `.prose a { overflow-wrap: anywhere }` is what keeps them from setting the page width on a phone.
- **Front matter has no chapter number.** `slugFor` and the templates both special-case it. A layout that assumes every entry has a number will break on the preface.
