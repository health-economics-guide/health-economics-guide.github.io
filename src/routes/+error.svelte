<script lang="ts">
  import { page } from '$app/state';
  import ArticleLayout from '$lib/lily/ArticleLayout.svelte';
</script>

<svelte:head>
  <title>{page.status} — Health Economics Guide</title>
</svelte:head>

<ArticleLayout class="page">
  <header class="page-header">
    <p class="page-eyebrow">Error {page.status}</p>
    <h1>{page.status === 404 ? 'That page is not here' : 'Something went wrong'}</h1>
    <p class="page-lead">{page.error?.message ?? 'Unknown error'}</p>
  </header>

  <p>
    Try the <a href="/contents/">table of contents</a>, the
    <a href="/glossary/">glossary</a>, or the <a href="/index/">index</a>.
  </p>
</ArticleLayout>
