<script>
  import {slide} from 'svelte/transition';
  import { page } from '$app/stores'
  export let sections
</script>

{#if sections?.length >= 1}
  <div class="flex gap-1">
    {#each sections || [] as section}
      {@const active = $page.url.hash == '#'+section.hash}
      <a href={active ? '#' : `#${section.hash}`} class="relative grow bg-light/90 uppercase p-2 cursor-pointer">
        {section.title}
        <span class="absolute right-4 top-3 i-akar-icons:chevron-up transition-all" class:rotate-180={active}></span>
      </a>
    {/each}
  </div>
  {#each sections || [] as section}
    {#if $page.url.hash == ('#'+section.hash)}
      <div transition:slide class="bg-light/90 p-8 text-left">
        {@html section.content}
      </div>
    {/if}
  {/each}
{:else if sections?.length == 1}
  <div class="bg-light/90 p-8 text-left">
    {@html sections[0].content}
  </div>
{/if}