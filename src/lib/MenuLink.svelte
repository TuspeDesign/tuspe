<script lang="ts">
  import Icon from '@iconify/svelte'
  export let link: { title: string; href: string; icon: string }
  export let isActive: boolean
</script>

<li class={`flex h-16 ${isActive ? 'flex-col nav-active relative' : 'item-center'}`}>
  {#if isActive}
    <svg width="32" height="32" viewBox="0 0 32 32" fill="transparent" xmlns="http://www.w3.org/2000/svg" class="absolute corner flex-shrink-0 h-6 l-0 rotate-90 -top-6 w-6"><path d="M32 0C32 16 16 32 0 32L32 32V0Z" /></svg>
  {/if}

  <a href={link.href} class:nav-active={isActive}>
    <Icon icon={`mdi:${link.icon}`} />
    {link.title}
  </a>

  {#if isActive}
    <svg width="32" height="32" viewBox="0 0 32 32" fill="transparent" xmlns="http://www.w3.org/2000/svg" class="absolute corner flex-shrink-0 h-6 l-0 rotate-180 -bottom-5 w-6"><path d="M32 0C32 16 16 32 0 32L32 32V0Z" /></svg>
  {/if}
</li>
