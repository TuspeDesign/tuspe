<script lang="ts">
  let {flip = false}: {flip?: boolean} = $props()
</script>

<div class={`h-fit max-w-full ${flip ? 'rotate-180' : 'relative z-20'}`}>
  <svg class="block h-fit max-w-full" viewBox="0 0 2400 300" width="100%" height="300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
    <rect x="0" y="0" width="2400" height="300" class="fill-transparent" />
    <path d="M0 92L50 91.8C100 91.7 200 91.3 300 112.7C400 134 500 177 600 175.5C700 174 800 128 900 118.5C1000 109 1100 136 1200 151.8C1300 167.7 1400 172.3 1500 158C1600 143.7 1700 110.3 1800 97.7C1900 85 2000 93 2100 114.8C2200 136.7 2300 172.3 2350 190.2L2400 208L2400 301L2350 301C2300 301 2200 301 2100 301C2000 301 1900 301 1800 301C1700 301 1600 301 1500 301C1400 301 1300 301 1200 301C1100 301 1000 301 900 301C800 301 700 301 600 301C500 301 400 301 300 301C200 301 100 301 50 301L0 301Z" class="fill-surface-wave" />
  </svg>
</div>
