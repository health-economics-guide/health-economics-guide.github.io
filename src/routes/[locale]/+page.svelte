<script lang="ts">
  import { ArticleLayout, SectionHeading, Badge } from '@lilydesignsystem/svelte-headless';
  import { PARTS, SOURCE_REPO, SKILLS_REPO, ROUTABLE_LOCALE_SLUGS } from '#lib/book.js';
  import { ui } from '#lib/i18n.js';
  import { HERO, ENDONYMS } from '#lib/hero.js';

  let { data } = $props();

  const parts = $derived(
    PARTS.map((part) => ({
      ...part,
      chapters: data.toc.filter((chapter) => chapter.part === part.number)
    }))
  );

  const preface = $derived(data.toc.find((chapter) => chapter.part === 0));
  const chapterCount = $derived(data.toc.filter((chapter) => chapter.part > 0).length);
  const t = $derived(ui(data.locale));
  const hero = $derived(HERO[data.locale] ?? HERO['en-001']);
  const translations = ROUTABLE_LOCALE_SLUGS.filter((code) => code in ENDONYMS);
</script>

<svelte:head>
  <title>{t.siteName}</title>
  <meta name="description" content="{hero.tagline} {hero.intro}" />
</svelte:head>

<ArticleLayout class="page page-home">
  <header class="page-hero">
    <h1>{t.siteName}</h1>
    <p class="page-hero-lead">{hero.tagline}</p>
    <p>{hero.intro}</p>
    <p class="page-hero-actions">
      {#if preface}
        <a
          class="page-action page-action-primary"
          href="/{data.locale}/topics/{preface.slug}/"
        >
          {hero.start}
        </a>
      {/if}
      <a class="page-action" href="/{data.locale}/contents/"
        >{hero.browse.replace('{n}', String(chapterCount))}</a
      >
      <a class="page-action" href="/{data.locale}/glossary/">{t.glossary}</a>
    </p>
    <p class="page-hero-translations">
      {hero.translations}{#each translations as code, i (code)}{i ? ', ' : ''}<a
          href="/{code}/"
          aria-current={code === data.locale ? 'page' : undefined}>{ENDONYMS[code]}</a
        >{/each}
    </p>
  </header>

  <section class="page-section">
    <SectionHeading
      heading="How the book is organized"
      subtitle="Five parts, {chapterCount} topics. Any topic can be read on its own — the night before the decision."
    />

    <div class="part-list">
      {#each parts as part (part.number)}
        <div class="part-block">
          <h3 class="part-block-heading">Part {part.number} — {part.title}</h3>
          <p class="part-block-tagline">{part.tagline}</p>
          <ol class="contents-chapters">
            {#each part.chapters as chapter (chapter.slug)}
              <li>
                <a href="/{data.locale}/topics/{chapter.slug}/">
                  <span class="site-contents-number">{chapter.number}</span>
                  {chapter.title}
                </a>
              </li>
            {/each}
          </ol>
        </div>
      {/each}
    </div>
  </section>

  <section class="page-section">
    <SectionHeading heading="Reference" />
    <ul class="reference-list">
      <li>
        <a href="/{data.locale}/glossary/">Glossary</a>
        <Badge type="info">A–Z</Badge>
        — plain-English definitions of every key term, each pointing at its home chapter.
      </li>
      <li>
        <a href="/{data.locale}/index/">Index</a>
        <Badge type="info">by topic</Badge>
        — concepts and frameworks mapped to the topics that cover them.
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
        — routes a question to the right topic, answers grounded in the book's own text, runs
        team workshops from a topic's discussion questions, and applies the maturity model and
        checklists to a reader's own organization.
      </li>
      <li>
        <a href="{SKILLS_REPO}/health-economics-guide-maintainer-skill" rel="noopener"
          >health-economics-guide-maintainer</a
        >
        <Badge type="info">maintainers</Badge>
        — encodes the book's authoring, review, and cross-file consistency rules for anyone writing,
        reviewing, or reorganizing topics.
      </li>
    </ul>
  </section>
</ArticleLayout>
