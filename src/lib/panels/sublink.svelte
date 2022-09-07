<script>
  import { fly } from 'svelte/transition'
  export let panel
</script>

<a transition:fly|local href={panel.path} class="absolute w-full h-full flex items-center justify-center">
  <h2 class="relative">{panel.path}</h2>
</a>