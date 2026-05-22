<script lang="ts">
  import type {PageData} from './$types'
  import PageContent from '$lib/PageContent.svelte'
  let {data}: {data: PageData} = $props()
</script>

{#if data?.title}
  <PageContent {data} />
{/if}
