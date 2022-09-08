<script>
  import { fly } from 'svelte/transition'
  export let data
</script>


<div in:fly|local={{duration: 600, delay: 300, y: 20}} class="absolute h-full w-full flex items-center justify-center">
  Here is panel content...
</div>