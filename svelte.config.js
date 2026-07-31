import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      strict: true
    }),
    prerender: {
      // Chapter prose carries anchors into headings that live on other
      // chapter pages, and the glossary cross-links chapters by name.
      // Demote the missing-id check so a cross-reference typo warns
      // rather than failing the whole build.
      handleMissingId: 'warn'
    }
  }
};

export default config;
