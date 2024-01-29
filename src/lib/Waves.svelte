<script lang="ts">
  import Button from '$lib/Button.svelte'
  import HeroImage from '$lib/HeroImage.svelte'

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
    image: string
    imageFull?: boolean
    imageHeight?: number
    imageWidth?: number
    items: Reference[]
    title: string
  }

  export let data: WaveContent
</script>

<section>
  <div class="h-fit max-w-full relative z-20">
    <svg class="block h-fit max-w-full" viewBox="0 0 2400 300" width="100%" height="300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
      <rect x="0" y="0" width="2400" height="300" class="fill-transparent" />
      <path
        d="M0 92L50 91.8C100 91.7 200 91.3 300 112.7C400 134 500 177 600 175.5C700 174 800 128 900 118.5C1000 109 1100 136 1200 151.8C1300 167.7
  1400 172.3 1500 158C1600 143.7 1700 110.3 1800 97.7C1900 85 2000 93 2100 114.8C2200 136.7 2300 172.3 2350 190.2L2400 208L2400 301L2350 301C2300
  301 2200 301 2100 301C2000 301 1900 301 1800 301C1700 301 1600 301 1500 301C1400 301 1300 301 1200 301C1100 301 1000 301 900 301C800 301 700 301
  600 301C500 301 400 301 300 301C200 301 100 301 50 301L0 301Z"
        class="fill-surface-wave"
      />
    </svg>
  </div>

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
          <div><HeroImage height={Number(data.imageHeight)} image={data.image} title={data.title} /></div>
          <div>
            <h2 class="mb-6 mt-0 wave">{data.title}</h2>
            <div class="text-xl">{@html data.content}</div>

            {#if data.buttonText}
              <div class="mt-6">
                <Button icon="outline-chat" link="/yhteys" title={data.buttonText} />
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </div>

  <div class="h-fit max-w-full rotate-180">
    <svg class="block h-fit max-w-full" viewBox="0 0 2400 300" width="100%" height="300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
      <rect x="0" y="0" width="2400" height="300" class="fill-transparent" />
      <path
        d="M0 92L50 91.8C100 91.7 200 91.3 300 112.7C400 134 500 177 600 175.5C700 174 800 128 900 118.5C1000 109 1100 136 1200 151.8C1300 167.7
  1400 172.3 1500 158C1600 143.7 1700 110.3 1800 97.7C1900 85 2000 93 2100 114.8C2200 136.7 2300 172.3 2350 190.2L2400 208L2400 301L2350 301C2300
  301 2200 301 2100 301C2000 301 1900 301 1800 301C1700 301 1600 301 1500 301C1400 301 1300 301 1200 301C1100 301 1000 301 900 301C800 301 700 301
  600 301C500 301 400 301 300 301C200 301 100 301 50 301L0 301Z"
        class="fill-surface-wave"
      />
    </svg>
  </div>
</section>
