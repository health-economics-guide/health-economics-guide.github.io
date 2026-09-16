<script lang="ts">
  import { page } from '$app/state';
  import SkipLink from '$lib/lily/SkipLink.svelte';
  import GrailLayout from '$lib/lily/GrailLayout.svelte';
  import GrailLayoutTopHeader from '$lib/lily/GrailLayoutTopHeader.svelte';
  import GrailLayoutCenterMain from '$lib/lily/GrailLayoutCenterMain.svelte';
  import GrailLayoutBottomFooter from '$lib/lily/GrailLayoutBottomFooter.svelte';
  import PickerBar from '$lib/helpers/PickerBar.svelte';
  import { SOURCE_REPO } from '$lib/book';

  let { children } = $props();

  const THEMES = [
    'light',
    'dark',
    'nord',
    'dracula',
    'united-kingdom-national-health-service-england-for-patients',
    'united-kingdom-government-digital-service',
    'united-states-web-design-system'
  ];

  const THEME_LABELS: Record<string, string> = {
    light: 'Light',
    dark: 'Dark',
    nord: 'Nord',
    dracula: 'Dracula',
    'united-kingdom-national-health-service-england-for-patients': 'NHS England',
    'united-kingdom-government-digital-service': 'UK Government',
    'united-states-web-design-system': 'US Web Design System'
  };

  const siteLinks = [
    { href: '/contents/', label: 'Contents' },
    { href: '/glossary/', label: 'Glossary' },
    { href: '/index/', label: 'Index' }
  ];
</script>

<SkipLink href="#main" label="Skip to main content" />

<GrailLayout class="site">
  <GrailLayoutTopHeader class="site-header">
    <a class="site-brand" href="/">
      <span class="site-brand-icon" aria-hidden="true">⚕</span>
      <span class="site-brand-title">Health Economics Guide</span>
    </a>

    <nav class="site-nav" aria-label="Site">
      {#each siteLinks as link (link.href)}
        <a href={link.href} aria-current={page.url.pathname === link.href ? 'page' : undefined}>
          {link.label}
        </a>
      {/each}
      <a href={SOURCE_REPO} rel="noopener">Source</a>
    </nav>

    <PickerBar
      class="site-controls"
      labels={{ theme: 'Theme', locale: 'Language', textSize: 'Text size', share: 'Share' }}
      themesUrl="/assets/themes/"
      themes={THEMES}
      themeProps={{
        themeLabels: THEME_LABELS,
        defaultValue: 'light',
        detectFromSystem: true,
        storageKey: 'health-economics-guide-theme'
      }}
      locales={['en']}
      localeProps={{ storageKey: 'health-economics-guide-locale' }}
      textSizeProps={{ storageKey: 'health-economics-guide-text-size' }}
      shareProps={{
        copyLabel: 'Copy link',
        copiedLabel: 'Copied!',
        copyFailedLabel: 'Copy failed — copy the address bar instead'
      }}
    />
  </GrailLayoutTopHeader>

  <GrailLayoutCenterMain class="site-main" id="main">
    {@render children()}
  </GrailLayoutCenterMain>

  <GrailLayoutBottomFooter class="site-footer">
    <p>
      <strong>Health Economics Guide</strong> — a practical handbook of best practices for health
      economics, worldwide in scope.
    </p>
    <p>
      Source and contributions: <a href={SOURCE_REPO} rel="noopener">github.com/health-economics-guide</a
      >. Built with the
      <a href="https://github.com/LilyDesignSystem" rel="noopener">Lily Design System™</a>.
    </p>
  </GrailLayoutBottomFooter>
</GrailLayout>
