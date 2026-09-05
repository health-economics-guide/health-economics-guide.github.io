<script lang="ts">
  import ArticleLayout from '$lib/lily/ArticleLayout.svelte';
  import SectionHeading from '$lib/lily/SectionHeading.svelte';
  import Card from '$lib/lily/Card.svelte';
  import Badge from '$lib/lily/Badge.svelte';
  import { PARTS, SOURCE_REPO, SKILLS_REPO } from '$lib/book';

  let { data } = $props();

  const parts = $derived(
    PARTS.map((part) => ({
      ...part,
      chapters: data.toc.filter((chapter) => chapter.part === part.number)
    }))
  );

  const preface = $derived(data.toc.find((chapter) => chapter.part === 0));
  const chapterCount = $derived(data.toc.filter((chapter) => chapter.part > 0).length);
</script>

<svelte:head>
  <title>Health Economics Guide</title>
  <meta
    name="description"
    content="A practical handbook of best practices for health economics, written for the people who run health and care organizations. Worldwide in scope, free and open."
  />
</svelte:head>

<ArticleLayout class="page page-home">
  <header class="page-hero">
    <h1>Health Economics Guide</h1>
    <p class="page-hero-lead">A practical handbook of best practices for health economics.</p>
    <p>
      This guide is for the people who run health and care organizations — chief executives and
      senior leaders, directors of digital and transformation, product and programme leads, clinical
      and care professionals, and operational managers. Its premise: in health, economics provides
      the frameworks for strategy, resourcing, equity, and public trust — not merely efficiency.
    </p>
    <p>
      The scope is worldwide. Tax-funded, social-insurance, private-insurance, and mixed systems —
      in low-, middle-, and high-income settings — are all first-class citizens here. Named systems
      appear as exemplars of patterns, not as defaults.
    </p>
    <p class="page-hero-actions">
      {#if preface}
        <a class="page-action page-action-primary" href="/chapters/{preface.slug}/">
          Start with the preface
        </a>
      {/if}
      <a class="page-action" href="/contents/">Browse all {chapterCount} chapters</a>
      <a class="page-action" href="/glossary/">Glossary</a>
    </p>
  </header>

  <section class="page-section">
    <SectionHeading
      heading="How the book is organized"
      subtitle="Five parts, {chapterCount} chapters. Any chapter can be read on its own — the night before the decision."
    />

    <div class="part-grid">
      {#each parts as part (part.number)}
        <Card class="part-card" heading="Part {part.number} — {part.title}" headingLevel={3}>
          <p class="part-card-tagline">{part.tagline}</p>
          <ol class="part-card-chapters">
            {#each part.chapters as chapter (chapter.slug)}
              <li>
                <a href="/chapters/{chapter.slug}/">
                  <span class="site-contents-number">{chapter.number}</span>
                  {chapter.title}
                </a>
              </li>
            {/each}
          </ol>
        </Card>
      {/each}
    </div>
  </section>

  <section class="page-section">
    <SectionHeading heading="Reference" />
    <ul class="reference-list">
      <li>
        <a href="/glossary/">Glossary</a>
        <Badge type="info">A–Z</Badge>
        — plain-English definitions of every key term, each pointing at its home chapter.
      </li>
      <li>
        <a href="/index/">Index</a>
        <Badge type="info">by chapter</Badge>
        — concepts and frameworks mapped to the chapters that cover them.
      </li>
      <li>
        <a href={SOURCE_REPO} rel="noopener">Source repository</a>
        — the markdown behind this site, its specification, and the contribution guide.
      </li>
    </ul>
  </section>

  <section class="page-section">
    <SectionHeading
      heading="Use with Claude"
      subtitle="Two Claude Code skills teach an AI assistant to work with this guide."
    />
    <ul class="reference-list">
      <li>
        <a href="{SKILLS_REPO}/health-economics-guide-skill" rel="noopener">health-economics-guide</a>
        <Badge type="info">readers</Badge>
        — routes a question to the right chapter, answers grounded in the book's own text, runs
        team workshops from a chapter's discussion questions, and applies the maturity model and
        checklists to a reader's own organization.
      </li>
      <li>
        <a href="{SKILLS_REPO}/health-economics-guide-maintainer-skill" rel="noopener"
          >health-economics-guide-maintainer</a
        >
        <Badge type="info">maintainers</Badge>
        — encodes the book's authoring, review, and cross-file consistency rules for anyone writing,
        reviewing, or reorganizing chapters.
      </li>
    </ul>
  </section>
</ArticleLayout>
