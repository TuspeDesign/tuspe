<script lang="ts">
  import ButtonLink from '$lib/ButtonLink.svelte'
  import HeroImage from '$lib/HeroImage.svelte'
  import Wave from '$lib/Wave.svelte'

  interface Reference {
    image: string
    link: string
    title: string
  }

  interface WaveContent {
    buttonIcon?: string
    buttonText?: string
    content: string
    id?: string
    image?: string
    imageFull?: boolean
    imageHeight?: number
    imageWidth?: number
    items?: Reference[]
    title: string
  }

  let {data}: {data: WaveContent} = $props()
</script>

<section>
  <Wave />

  <div class="bg-surface-wave">
    <div id={data.id ? data.id : ''} class="max-w-screen-xl mx-auto px-6 text-black">
      {#if data.items}
        <header class="block max-w-screen-md mb-10 mx-auto text-center">
          <h2 class="mb-4 mt-0 wave">{data.title}</h2>
          <p>{data.content}</p>
        </header>

        {#if !data.imageFull}
          <div class="text-center">
            {#each data.items as item}
              <a href={item.link} class="align-middle h-36 inline-block m-2 mx-auto p-2 rounded-xl shadow-lg">
                <div class="bg-white flex h-full items-center p-2 rounded-xl">
                  <img class="inline-block h-auto max-h-full max-w-full xs:max-w-80 w-auto" src={`/references/${item.image}.webp`} alt={item.title} decoding="async" loading="lazy" />
                </div>
              </a>
            {/each}
          </div>
        {:else}
          <div class="gap-4 grid xs:grid-cols-2 md:grid-cols-3">
            {#each data.items as item}
              <a class="inline-block rounded-xl" href={item.link} target="_blank" aria-label={`${data.id}: ${item.title}`}>
                <img src={`/references/${item.image}-400.webp`} class="bg-white block h-auto p-1 rounded-xl shadow-lg w-full" alt={item.title} height="250" width="400" decoding="async" loading="lazy" />
              </a>
            {/each}
          </div>
        {/if}
      {:else}
        <div class="gap-6 grid lg:grid-cols-2 items-center">
          <div><HeroImage height={Number(data.imageHeight)} image={data.image!} title={data.title} /></div>
          <div>
            <h2 class="mb-6 mt-0 wave">{data.title}</h2>
            <div class="text-xl">{@html data.content}</div>

            {#if data.buttonText}
              <div class="mt-6">
                <ButtonLink icon="outline-chat" link="/yhteys" title={data.buttonText} />
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </div>

  <Wave flip />
</section>
