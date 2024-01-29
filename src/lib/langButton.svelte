<script lang="ts">
  import { browser } from '$app/environment'
  import { page } from '$app/stores'
  import type { Link, MenuLinks } from '$lib/types'

  export let menu: MenuLinks
  export let lang: 'fi' | 'en'
  let langLink: Link | undefined = undefined
  let newLang: 'fi' | 'en' = 'fi'

  $: {
    const currentLink = menu[lang].find((e) => e.href === $page.url.pathname)
    if (currentLink?.id) {
      newLang = lang === 'fi' ? 'en' : 'fi'
      langLink = menu[newLang].find((e) => e.id === currentLink.id)
    }

    if (browser) {
      document.documentElement.setAttribute('lang', lang)
    }
  }
</script>

<svelte:head>
  {#if langLink}
    <link rel="alternate" href={langLink.href} hreflang={newLang} type="text/html" />
    <link rel="alternate" href={$page.url.pathname} hreflang={lang} type="text/html" />
    <link rel="alternate" href={lang === 'en' ? $page.url.pathname : langLink.href} hreflang="x-default" />
  {/if}
</svelte:head>

{#if langLink?.id}
  <a href={langLink.href} id="langLink" class="align-top bg-surface-menu border-surface flex font-bold h-14 items-center no-underline p-0 rounded-full w-14">
    <span class="block mx-auto uppercase">
      {newLang}
    </span>
  </a>
{/if}
