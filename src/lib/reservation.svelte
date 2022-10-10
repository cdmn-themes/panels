<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  let form
  onMount(() => {
    // inject opentable script
    const script = document.createElement('script');
    script.src = `https://www.opentable.com/widget/reservation/loader?rid=${$page.data.site.content.reservation_link}&domain=com&type=standard&theme=standard&overlay=true&iframe=true`
    
    form.appendChild(script);
  })
</script>


<div transition:fade class="fixed top-0 w-full h-full bg-dark/60 flex items-center justify-center" on:click|self>
  <div bind:this={form}></div>

</div>


