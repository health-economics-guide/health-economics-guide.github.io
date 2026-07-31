<script lang="ts">
  import ArticleLayout from '$lib/lily/ArticleLayout.svelte';
  import SectionHeading from '$lib/lily/SectionHeading.svelte';
  import BreadcrumbNav from '$lib/lily/BreadcrumbNav.svelte';
  import BreadcrumbList from '$lib/lily/BreadcrumbList.svelte';
  import BreadcrumbListItem from '$lib/lily/BreadcrumbListItem.svelte';
  import { PARTS } from '$lib/book';

  let { data } = $props();

  const frontMatter = $derived(data.toc.filter((chapter) => chapter.part === 0));
  const parts = $derived(
    PARTS.map((part) => ({
      ...part,
      chapters: data.toc.filter((chapter) => chapter.part === part.number)
    }))
  );
</script>

<svelte:head>
  <title>Contents — Health Economics Guide</title>
  <meta name="description" content="The full table of contents of the Health Economics Guide." />
</svelte:head>

<ArticleLayout class="page">
  <BreadcrumbNav label="Breadcrumb" class="page-breadcrumb">
    <BreadcrumbList>
      <BreadcrumbListItem><a href="/">Home</a></BreadcrumbListItem>
      <BreadcrumbListItem current>Contents</BreadcrumbListItem>
    </BreadcrumbList>
  </BreadcrumbNav>

  <header class="page-header">
    <h1>Contents</h1>
    <p class="page-lead">
      Every chapter is self-contained. Read straight through for a course in health economics, or
      go directly to the chapter that matches the decision in front of you.
    </p>
  </header>

  {#if frontMatter.length}
    <section class="page-section">
      <SectionHeading heading="Front matter" />
      <ol class="contents-chapters">
        {#each frontMatter as chapter (chapter.slug)}
          <li><a href="/chapters/{chapter.slug}/">{chapter.title}</a></li>
        {/each}
      </ol>
    </section>
  {/if}

  {#each parts as part (part.number)}
    <section class="page-section">
      <SectionHeading
        eyebrow="Part {part.number}"
        heading={part.title}
        subtitle={part.tagline}
      />
      <ol class="contents-chapters">
        {#each part.chapters as chapter (chapter.slug)}
          <li>
            <a href="/chapters/{chapter.slug}/">
              <span class="site-contents-number">{chapter.number}</span>
              {chapter.title}
            </a>
          </li>
        {/each}
      </ol>
    </section>
  {/each}

  <section class="page-section">
    <SectionHeading heading="Reference" />
    <ol class="contents-chapters">
      <li><a href="/glossary/">Glossary</a></li>
      <li><a href="/index/">Index</a></li>
    </ol>
  </section>
</ArticleLayout>
