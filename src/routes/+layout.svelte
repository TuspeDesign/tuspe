<script lang="ts">
  import Icon from '@iconify/svelte'
  import { page } from '$app/stores'
  import { lang, waLink } from '$lib/store'
  import LangButton from '$lib/langButton.svelte'
  import '$lib/app.css'
  import type { MenuLinks } from '$lib/types'

  const menu: MenuLinks = {
    fi: [
      { id: 1, title: 'Etusivu', href: '/', icon: 'round-home' },
      { id: 2, title: 'Verkkosivut', href: '/verkkosivut', icon: 'round-code' },
      { id: 3, title: 'Urheiluseurat', href: '/urheilu', icon: 'round-sports-hockey' },
      { id: 4, title: 'Yhteystiedot', href: '/yhteys', icon: 'outline-chat' },
    ],
    en: [
      { id: 1, title: 'Home', href: '/en', icon: 'round-home' },
      { id: 2, title: 'Websites', href: '/en/websites', icon: 'round-code' },
      { id: 3, title: 'Sport', href: '/en/sport', icon: 'round-sports-hockey' },
      { id: 4, title: 'Contact', href: '/en/contact', icon: 'outline-chat' },
    ],
  }

  let colorState: 'light' | 'dark' = 'dark'
  let menuOpen: boolean = false
</script>

<a class="hidden" href="#content">Jump to the content</a>
<a class="hidden" href="#menu">Jump to the navigation</a>

<div id="tuspe" class={colorState}>
  <header id="head" class="min-h-[95px] py-4 relative text-center w-full">
    <a class="absolute inline-block left-6 no-underline text-center top-5 uppercase z-50" href="/" rel="home" aria-label="Tuspe Design Logo">
      <span class="block font-bold text-[1.5rem]">Tuspe</span>
      <span class="block font-normal text-[1.3rem]">Design</span>
    </a>

    <button on:click={() => (menuOpen = !menuOpen)} class={`absolute border-surface ${menuOpen ? 'nav-active' : 'bg-surface-menu'} flex h-14 items-center lg:hidden right-[9.5rem] top-5 rounded-full xs:px-6 xs:w-auto w-14 z-50`} aria-label="Open and close the main navigation / menu" aria-expanded={menuOpen} aria-controls="menu" aria-haspopup="true">
      <Icon icon="ic:round-menu" class={`${menuOpen ? 'hidden' : 'inline-block'} mx-auto text-3xl xs:mr-2`} />
      <Icon icon="ic:round-close" class={`${!menuOpen ? 'hidden' : 'inline-block'} mx-auto text-3xl xs:mr-2`} />
      <span class="hidden xs:inline-block text-lg uppercase"><strong>Menu</strong></span>
    </button>

    <nav id="menu" class={`${menuOpen ? 'block' : 'hidden lg:inline-block'} absolute bg-surface-menu border-surface lg:relative lg:right-0 lg:rounded-full lg:top-0 px-4 py-3 right-24 rounded-2xl shadow-lg top-24`}>
      <ul class="m-0 p-0">
        {#each menu[$lang] as item}
          <li class="block lg:inline-block">
            <a class="flex items-center nav-link no-underline px-6 py-3 rounded-full w-full" href={item.href} class:nav-active={$page.url.pathname === item.href} on:click={() => (menuOpen = false)}>
              <Icon icon={`ic:${item.icon}`} class="mr-2 text-3xl" />
              {item.title}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <div id="topButtons" class="absolute flex right-6 top-5 z-50">
      <LangButton lang={$lang} {menu} />
      <button on:click={() => (colorState = colorState === 'dark' ? 'light' : 'dark')} class="bg-surface-menu border-surface h-14 ml-2 p-0 rounded-full w-14" aria-label={`Switch to ${colorState === 'dark' ? 'light' : 'dark'} mode`}>
        <Icon icon={colorState === 'dark' ? 'ic:outline-light-mode' : 'ic:outline-dark-mode'} class="block mx-auto text-3xl" />
      </button>
    </div>
  </header>

  <main id="content" class="min-h-screen">
    <slot />
  </main>

  <a class="border border-gray-300 border-solid bottom-4 fixed grid h-16 items-center nav-active no-underline p-1 right-4 rounded-full text-center w-16 z-50" href={waLink}>
    <Icon icon="ic:round-whatsapp" class="mx-auto text-5xl" />
  </a>
</div>
