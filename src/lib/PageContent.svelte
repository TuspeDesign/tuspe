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

  const host = 'https://tuspe.com',
    site = 'Tuspe Design'

  const ldjson = $derived(
    data?.title !== site
      ? `<script type="application/ld+json">${JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {'@type': 'ListItem', position: 1, name: site, item: host},
            {'@type': 'ListItem', position: 2, name: data.title, item: String(page.url)}
          ]
        })}${'<'}/script>`
      : ''
  )
</script>

<svelte:head>
  {#if data?.title}
    <title>{data.title !== site ? `${data.title} | ${site}` : `${site} | ${data.slogan}`}</title>
    <meta property="og:title" content={data.title} />
    <meta name="description" property="og:description" content={data.description} />
    <meta name="canonical" property="og:url" content={String(page.url)} />
    {#if ldjson}
      {@html ldjson}
    {/if}
  {/if}
</svelte:head>

{#if data.title}
  <div class="flex xl:h-157 items-center px-6 py-10">
    <div class="gap-6 grid xl:grid-cols-2 items-center max-w-screen-xl mx-auto">
      <div class="order-0 xl:order-last" aria-hidden="true">
        <HeroImage height={data.imageHeight} image={data.image} loading="eager" title={data.title} />
      </div>

      <div class="max-w-screen-md mx-auto">
        <div class="line relative text-2xl text-norm uppercase">{data.subtitle}</div>
        <h1 class="mb-4 mt-0">{data.headline}</h1>
        <div class="text-2xl text-norm">{data.description}</div>

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
      <section id={data.main.id} class={`gap-10 grid ${data.main.cols === 3 ? 'xl:grid-cols-3' : 'lg:grid-cols-2'} max-w-screen-xl mx-auto px-6`}>
        <div class:xl:col-span-2={data.main.cols === 3}>
          <h2 class="mb-6 mt-0">{data.main.title}</h2>
          {@html data.main.content}

          {#if data.faq}
            <h2>{data.faq.title}</h2>
            {#each data.faq.items as item}
              <details class="border-surface border-solid mt-4 overflow-hidden relative rounded-2xl text-norm">
                <summary class="hover:bg-surface-50-900-token p-4"><h3 class="inline-block m-0">{item.title}</h3></summary>
                <div class="border-surface border-solid border-t-2 border-x-0 border-b-0 p-4">{@html item.content}</div>
              </details>
            {/each}
          {/if}
        </div>

        {#if data.main.aside}
          <aside>
            <h2 class="mb-6 mt-0">{data.main.aside.title}</h2>
            <ul class="list-circle mb-0 mt-4 pl-4">
              {#each data.main.aside.items as item}
                <li>{item}</li>
              {/each}
            </ul>

            {#if data.main.progression}
              <h2>{data.main.progression.title}</h2>
              <div class="gap-4 grid mt-4">
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
