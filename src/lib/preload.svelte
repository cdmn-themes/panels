<script>
  // import { browser } from '$app/environment'
  import { onMount } from "svelte";
  export let src
  
  let loaded = false
  
  onMount(function() {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      loaded = true
    }
  })
</script>

{#if loaded}
  <slot {src} />
{/if}