<script lang="ts">
  import {page} from '$app/stores'
  import {lang, waLink} from '$lib/store'
  import Button from '$lib/Button.svelte'
  import Contact from '$lib/Contact.svelte'
  import HeroImage from '$lib/HeroImage.svelte'
  import Waves from '$lib/Waves.svelte'

  export let data: any
  $lang = data.language

  const host = 'https://tuspe.com'
  const site = 'Tuspe Design'
  let ldjson = ''

  $: if (data?.title !== site) {
    const ldjsonBreadcrumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: site,
          item: host
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: data.title,
          item: String($page.url)
        }
      ]
    }

    ldjson = `<script type="application/ld+json">${JSON.stringify(ldjsonBreadcrumbs)}${'<'}/script>`
  }

  $: footerText = data.language === 'fi' ? 'Luodaan mahtavia ja unohtumattomia kokemuksia yhdessä.' : "We are at your service. Let's create great websites and memorable digital experiences together!"
</script>

<svelte:head>
  {#if data?.title}
    <title>{data.title !== site ? `${data.title} | ${site}` : `${site} | ${data.slogan}`}</title>
    <meta property="og:title" content={data.title} />
    <meta name="description" property="og:description" content={data.description} />
    <meta name="canonical" property="og:url" content={String($page.url)} />
    {#if ldjson}
      {@html ldjson}
    {/if}
  {/if}
</svelte:head>

{#if data.title}
  <div class="flex xl:h-[628px] items-center px-6 py-10">
    <div class="gap-6 grid xl:grid-cols-2 items-center max-w-screen-xl mx-auto">
      <div class="order-none xl:order-last" aria-hidden="true">
        <HeroImage height={data.imageHeight} image={data.image} loading="eager" title={data.title} />
      </div>

      <div class="max-w-screen-md mx-auto">
        <div class="line relative text-2xl text-norm uppercase">{data.subtitle}</div>
        <h1 class="mb-4 mt-0">{data.headline}</h1>
        <div class="text-2xl text-norm">{data.description}</div>

        {#if Array.isArray(data.buttons)}
          <div id="buttons" class="mt-6">
            {#each data.buttons as item}
              <Button icon={item.icon} link={item.link} title={item.title} />
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
              {#each data.main.progression.items as item}
                <div>
                  <h3>{item.title}</h3>
                  <p>{@html item.content}</p>
                </div>
              {/each}
            {/if}
          </aside>
        {/if}
      </section>
    {/if}

    {#if data.references}
      <Waves data={data.references} />
    {/if}

    <footer class="max-w-sm mb-8 mx-auto px-4 text-center">
      <h3 class="leading-tight m-0">Tuspe Design Oy</h3>
      <p>{footerText}</p>
      <p class="leading-normal">
        moro@tuspe.com<br />
        +358 45 311 1786<br />
        3129423-2
      </p>

      <div class="mt-8">
        <Button icon="round-whatsapp" link={waLink} title="WhatsApp" />
      </div>

      <div class="mt-8 text-center">
        <a class="inline-block m-1" href="https://www.linkedin.com/company/tuspe" title="Tuspe Design on LinkedIn" rel="me">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" aria-hidden="true">
            <title>LinkedIn</title>
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>

        <a class="inline-block m-1" href="https://github.com/tuspedesign" title="Tuspe Design on Instagram" rel="me">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" aria-hidden="true">
            <title>GitHub</title>
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z" />
          </svg>
        </a>
      </div>
    </footer>
  {/if}
{/if}
