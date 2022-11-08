<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  let form
  onMount(() => {
    // inject opentable script
    const script = document.createElement('script');
    script.src = `https://www.opentable.com/widget/reservation/loader?rid=${$page.data.site.content.reservation_link}&domain=de&lang=de-DE&type=standard&theme=standard&overlay=true&iframe=true`
    
    form.appendChild(script);
  })
</script>


<div  class="fixed top-0 z-10 w-full h-full bg-dark/60 flex items-center justify-center" on:click|self>
  <div transition:fly={{y: 20}} class="bg-white/50 p-2 text-center">
    <div class="bg-white p-8 text-center">
      <h2>Ihre Reservierung</h2>
      <p class="mb-2">Telefonische Reservierung unter <b><a href="tel:+4922894556556">0228 94 556 556</a></b></p>
      <p>Gerne können Sie auch online eine Reservierung durchführen.<br>Nutzen Sie dazu das folgende Formular.</p>
    <div bind:this={form}></div>
  </div>
  
</div>

</div>

<style>
  :global(iframe) {
    display: inline-block;
  }
</style>