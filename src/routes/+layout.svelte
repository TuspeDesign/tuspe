<script lang="ts">
  import {page} from '$app/state'
  import {Image} from '@tuspe/components'
  import Icon from '@iconify/svelte'
  import {lang, waLink} from '$lib/store'
  import ButtonLink from '$lib/ButtonLink.svelte'
  import LangButton from '$lib/langButton.svelte'
  import '$lib/app.css'
  import type {MenuLinks} from '$lib/types'

  let {children} = $props()

  const menu: MenuLinks = {
    fi: [
      {id: 1, title: 'Etusivu', href: '/', icon: 'round-home'},
      {id: 2, title: 'Verkkosivut', href: '/verkkosivut', icon: 'round-code'},
      {id: 3, title: 'Urheiluseurat', href: '/urheilu', icon: 'round-sports-hockey'},
      {id: 4, title: 'Yhteystiedot', href: '/yhteys', icon: 'outline-chat'}
    ],
    en: [
      {id: 1, title: 'Home', href: '/en', icon: 'round-home'},
      {id: 2, title: 'Websites', href: '/en/websites', icon: 'round-code'},
      {id: 3, title: 'Sport', href: '/en/sport', icon: 'round-sports-hockey'},
      {id: 4, title: 'Contact', href: '/en/contact', icon: 'outline-chat'}
    ]
  }

  let colorState = $state<'light' | 'dark'>('dark')
  let menuOpen = $state(false)

  const footerText = $derived($lang === 'fi' ? 'Luodaan mahtavia ja unohtumattomia kokemuksia yhdessä.' : "We are at your service. Let's create great websites and memorable digital experiences together!")
</script>

<a class="hidden" href="#content">Jump to the content</a>
<a class="hidden" href="#menu">Jump to the navigation</a>

<div id="tuspe" class={colorState}>
  <header id="head" class="min-h-[95px] py-4 relative text-center w-full">
    <a class="absolute inline-block left-6 no-underline text-center top-5 uppercase z-50" href="/" rel="home" aria-label="Tuspe Design Logo">
      <span class="block font-bold text-[1.5rem]">Tuspe</span>
      <span class="block font-normal text-[1.3rem]">Design</span>
    </a>

    <button onclick={() => (menuOpen = !menuOpen)} class={`absolute border-surface ${menuOpen ? 'nav-active' : 'bg-surface-menu'} flex h-14 items-center lg:hidden right-[9.5rem] top-5 rounded-full xs:px-6 xs:w-auto w-14 z-50`} aria-label="Open and close the main navigation / menu" aria-expanded={menuOpen} aria-controls="menu" aria-haspopup="true">
      <Icon icon="ic:round-menu" class={`${menuOpen ? 'hidden' : 'inline-block'} mx-auto text-3xl xs:mr-2`} />
      <Icon icon="ic:round-close" class={`${!menuOpen ? 'hidden' : 'inline-block'} mx-auto text-3xl xs:mr-2`} />
      <span class="hidden xs:inline-block text-lg uppercase"><strong>Menu</strong></span>
    </button>

    <nav id="menu" class={`${menuOpen ? 'block' : 'hidden lg:inline-block'} absolute bg-surface-menu border-surface lg:relative lg:right-0 lg:rounded-full lg:top-0 px-4 py-3 right-24 rounded-2xl shadow-lg top-24`}>
      <ul class="m-0 p-0">
        {#each menu[$lang] as item}
          <li class="block lg:inline-block">
            <a class="flex items-center nav-link no-underline px-6 py-3 rounded-full w-full" href={item.href} class:nav-active={page.url.pathname === item.href} onclick={() => (menuOpen = false)}>
              <Icon icon={`ic:${item.icon}`} class="mr-2 text-3xl" />
              {item.title}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <div id="topButtons" class="absolute flex right-6 top-5 z-50">
      <LangButton lang={$lang} {menu} />
      <button onclick={() => (colorState = colorState === 'dark' ? 'light' : 'dark')} class="bg-surface-menu border-surface h-14 ml-2 p-0 rounded-full w-14" aria-label={`Switch to ${colorState === 'dark' ? 'light' : 'dark'} mode`}>
        <Icon icon={colorState === 'dark' ? 'ic:outline-light-mode' : 'ic:outline-dark-mode'} class="block mx-auto text-3xl" />
      </button>
    </div>
  </header>

  <main id="content" class="min-h-screen">
    {@render children?.()}
  </main>

  <footer class="max-w-96 mb-8 mx-auto px-4 text-center">
    <h3 class="leading-tight m-0">Tuspe Design Oy</h3>
    <p class="max-w-88 mx-auto">{footerText}</p>
    <p class="leading-normal">
      moro@tuspe.com<br />
      +358 45 311 1786<br />
      3129423-2
    </p>

    <div class="mt-8">
      <ButtonLink icon="round-whatsapp" link={waLink} title="WhatsApp" />
    </div>

    <div class="mt-8 text-center">
      <a class="inline-block m-1" href="https://www.linkedin.com/company/tuspe" title="Tuspe Design on LinkedIn" rel="me">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" aria-hidden="true">
          <title>LinkedIn</title>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>

      <a class="inline-block m-1" href="https://github.com/tuspedesign" title="Tuspe Design on GitHub" rel="me">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" aria-hidden="true">
          <title>GitHub</title>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z" />
        </svg>
      </a>
    </div>
  </footer>

  <div class="bg-white flex items-center justify-center py-4">
    <Image image={{alt: 'Funded by the EU', height: 47, src: '/hanke/fi-funded-by-the-eu.webp', width: 200}} />
    <Image image={{alt: 'Leader Satasilta', height: 80, src: '/hanke/leader-satasilta.webp', width: 140}} />
  </div>

  <a class="border border-gray-300 border-solid bottom-4 fixed grid h-16 items-center nav-active no-underline p-1 right-4 rounded-full text-center w-16 z-50" href={waLink}>
    <Icon icon="ic:round-whatsapp" class="mx-auto text-5xl" />
  </a>
</div>
