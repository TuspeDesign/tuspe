<script lang="ts">
  interface Props {
    decoding?: 'async' | 'auto' | 'sync'
    height: number
    image: string
    loading?: 'eager' | 'lazy'
    title: string
  }
  let {decoding = 'async', height, image, loading = 'lazy', title}: Props = $props()
</script>

<img srcset={`/images/${image}-320.webp 320w, /images/${image}-450.webp 450w, /images/${image}-628.webp 628w`} sizes="(max-width:767px) 360px, (max-width:1280px) 450px, 628px" src={`/images/${image}-628.webp`} class="block h-auto xl:w-full max-w-full md:w-[450px] mx-auto w-80" alt={title} {height} width="628" {decoding} {loading} />
