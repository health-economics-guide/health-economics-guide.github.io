# health-economics-guide.github.io

This repository is a **deploy-only shim**, not the site's source. It exists
because GitHub Pages serves the bare `health-economics-guide.github.io`
domain only from a repository with that exact name — a repo named
`health-economics-guide` can serve Pages only at a project-page URL
(`health-economics-guide.github.io/health-economics-guide/`), not the org
root. This repo's [deploy workflow](.github/workflows/deploy.yml) checks
out the monorepo, builds its nested `health-economics-guide.github.io/`
subdirectory, and publishes that — so the live URL stays stable while the
monorepo is the real source of truth.

**The site's source, and the book's, both live in one place:**
<https://github.com/health-economics-guide/health-economics-guide>, the
site under its `health-economics-guide.github.io/` subdirectory.

Do not add application source here — there is nothing to edit in this
repository except the deploy workflow itself.
