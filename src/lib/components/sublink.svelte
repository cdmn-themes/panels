<script>
  import { fly } from 'svelte/transition'
  export let data
</script>

<a transition:fly|local href={data.path} class="absolute w-full h-full flex items-center justify-center">
  <h2 class="relative">{data.path}</h2>
</a>