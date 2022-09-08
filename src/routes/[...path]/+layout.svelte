<script>
  import {scale,fade} from 'svelte/transition'
  import '$lib/global.css'
  import 'virtual:uno.css'

  export let data
  
  let open = true
</script>

<svelte:head>
  <title>{data.content.title}</title>
  <link rel="icon" href="API_URL/blobs/{data.content.favicon}" />
</svelte:head>
  
{#if open}
  <div transition:fade={{duration: 600}} on:click|self={() => open = false} class="fixed bg-dark/60 z-1 w-full h-full"></div>
  <div transition:scale={{duration: 660, start: 0.9}} class="centered absolute z-2 flex flex-col gap-1px w-92 max-w-full uppercase text-center font-light">
    <a href="/restaurant" on:click={() => open = !open} class="bg-light p-5">
      Restaurant
    </a>
    <a href="/unsere_karten" on:click={() => open = !open} class="bg-light p-5">
      Unsere Karten
    </a>
    <a href="/reservierung" on:click={() => open = !open} class="bg-light p-5">
      Reservierung
    </a>
    <a href="/karriere" on:click={() => open = !open} class="bg-light p-5">
      Karriere
    </a>
    <div class="grid grid-cols-3 text-white w-full text-xs">
      <a href="/" on:click={() => open = !open} class="p-3 text-left">
        Home
      </a>
      <a href="/kontakt" on:click={() => open = !open} class="p-3 text-center">
        Kontakt
      </a>
      <a href="/impressum" on:click={() => open = !open} class="p-3 text-right">
        Impressum
      </a>
    </div>
  </div>
{/if}

<header>
  <a href="#" class="p-2 absolute left-2 tracking-4px cursor-pointer transition-all" on:click|preventDefault={() => open = !open} >
    MENU
  </a>
  <a href="/" class="h-full">
    <img src="API_URL/blobs/{data.content.logo}" class="h-full p-2" alt="">
  </a>
</header>

<main>
  <slot />
</main>

<footer class="uppercase">
  {data.content.title}
</footer>


<style>
  header {
    height: 3rem;
  }
  header, footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  main {
    color: white;
    flex-grow: 1;
  }

  footer {
    height: 2rem;
    /* border-top: 1px solid black; */
  }
</style>