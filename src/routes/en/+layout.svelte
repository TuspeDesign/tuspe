<script lang="ts">
  import {lang} from '$lib/store'
  import type {Snippet} from 'svelte'
  let {children}: {children: Snippet} = $props()
  $lang = 'en'
</script>

{@render children()}
