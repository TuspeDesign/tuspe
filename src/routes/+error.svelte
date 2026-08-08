<script lang="ts">
  import {page} from '$app/state'
  const title = `Error ${page.status}`
</script>

<svelte:head>
  <title>{title} | Tuspe Design</title>
  <meta property="og:title" content={title} />
  <meta name="description" property="og:description" content={`Looks like you're lost - status ${page.status}.`} />
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="mx-auto max-w-screen-md px-4 py-10">
  <h1 class="mt-0 mb-6 text-center uppercase">Looks Like You're Lost!</h1>

  <div class="font-content mb-10 leading-normal">
    <p>We apologize for the inconvenience, but it seems you've stumbled upon an uncharted digital territory. The page you were looking for appears to have taken a detour or decided to play hide-and-seek. Don't worry, though - the internet is vast, and there's always another virtual adventure awaiting.</p>
    <p>Why not retreat back to our <a href="/" rel="home">homepage</a> and start your journey anew? There's a world of articles just a click away.</p>
  </div>

  <img class="mx-auto block h-auto max-w-full" src="/images/error.webp" alt="Error 404." height="400" width="362" loading="lazy" decoding="async" aria-hidden="true" />
</div>
