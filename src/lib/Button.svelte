<script lang="ts">
  import Icon from '@iconify/svelte'
  export let link: string
  export let title: string
  export let icon: string
</script>

<a class="border border-gray-300 border-solid inline-block nav-active no-underline py-3 pl-6 pr-8 rounded-full" href={link}>
  <span class="flex h-full items-center w-full">
    <Icon icon={`ic:${icon}`} class="mr-2 text-3xl" />
    <strong>{title}</strong>
  </span>
</a>
