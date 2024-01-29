<script lang="ts">
  import { page } from '$app/stores'
  import PageContent from '$lib/PageContent.svelte'

  $: data = {}

  $: if ($page.params.page) {
    fetchData($page.params.page)
  }

  const fetchData = async (slug: string) => {
    try {
      const module = await import(`../../../lib/i18n/en/${slug}.json`)
      data = module.default
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }
</script>

{#if data.title}
  <PageContent {data} />
{/if}
