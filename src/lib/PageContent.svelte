<script lang="ts">
  import {page} from '$app/state'
  import {validateArray} from '@tuspe/components'
  import {lang, waLink} from '$lib/store'
  import ButtonLink from '$lib/ButtonLink.svelte'
  import Contact from '$lib/Contact.svelte'
  import HeroImage from '$lib/HeroImage.svelte'
  import Waves from '$lib/Waves.svelte'
  import type {PageContent} from '$lib/types'

  let {data}: {data: PageContent} = $props()

  $effect(() => {
    if (data.language !== $lang) {
      $lang = data.language
    }
  })

  const canonicalUrl = $derived(page.url.origin + page.url.pathname),
    host = 'https://tuspe.com',
    siteName = 'Tuspe Design',
    ldjson = $derived(
      data?.title !== siteName
        ? `<script type="application/ld+json">${JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {'@type': 'ListItem', position: 1, name: siteName, item: host},
              {'@type': 'ListItem', position: 2, name: data.title, item: canonicalUrl}
            ]
          })}${'<'}/script>`
        : ''
    )
</script>

<svelte:head>
  {#if data?.title}
    <title>{data.title !== siteName ? `${data.title} | ${siteName}` : `${siteName} | ${data.slogan}`}</title>
    <meta property="og:title" content={data.title} />
    <meta name="description" property="og:description" content={data.description} />
    <meta name="canonical" property="og:url" content={canonicalUrl} />
    {#if ldjson}
      {@html ldjson}
    {/if}
  {/if}
</svelte:head>

{#if data.title}
  <div class="flex items-center px-6 py-10 xl:h-157">
    <div class="mx-auto grid max-w-screen-xl items-center gap-6 xl:grid-cols-2">
      <div class="order-0 xl:order-last" aria-hidden="true">
        <HeroImage height={data.imageHeight} image={data.image} loading="eager" title={data.title} />
      </div>

      <div class="mx-auto max-w-screen-md">
        <div class="line text-norm relative text-2xl uppercase">{data.subtitle}</div>
        <h1 class="mt-0 mb-4">{data.headline}</h1>
        <div class="text-norm text-2xl">{data.description}</div>

        {#if validateArray(data.buttons)}
          <div id="buttons" class="mt-6">
            {#each data.buttons as item}
              <ButtonLink icon={item.icon} link={item.link} title={item.title} />
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>

  {#if data.contact}
    <Contact data={data.waves} whatsapp={waLink} />
  {:else}
    {#if data.waves}
      <Waves data={data.waves} />
    {/if}

    {#if data.main}
      <section id={data.main.id} class={`grid gap-10 ${data.main.cols === 3 ? 'xl:grid-cols-3' : 'lg:grid-cols-2'} mx-auto max-w-screen-xl px-6`}>
        <div class:xl:col-span-2={data.main.cols === 3}>
          <h2 class="mt-0 mb-6">{data.main.title}</h2>
          {@html data.main.content}

          {#if data.faq}
            <h2>{data.faq.title}</h2>
            {#each data.faq.items as item}
              <details class="text-norm relative mt-4 overflow-hidden rounded-2xl border-solid border-surface">
                <summary class="hover:bg-surface-50-900-token p-4"><h3 class="m-0 inline-block">{item.title}</h3></summary>
                <div class="border-x-0 border-t-2 border-b-0 border-solid p-4 border-surface">{@html item.content}</div>
              </details>
            {/each}
          {/if}
        </div>

        {#if data.main.aside}
          <aside>
            <h2 class="mt-0 mb-6">{data.main.aside.title}</h2>
            <ul class="list-circle mt-4 mb-0 pl-4">
              {#each data.main.aside.items as item}
                <li>{item}</li>
              {/each}
            </ul>

            {#if data.main.progression}
              <h2>{data.main.progression.title}</h2>
              <div class="mt-4 grid gap-4">
                {#each data.main.progression.items as item}
                  <div class="content">
                    <h3>{item.title}</h3>
                    <p>{@html item.content}</p>
                  </div>
                {/each}
              </div>
            {/if}
          </aside>
        {/if}
      </section>
    {/if}

    {#if data.references}
      <Waves data={data.references} />
    {/if}
  {/if}
{/if}
