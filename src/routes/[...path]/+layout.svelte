<script>
  export let data
</script>

<svelte:head>
  <title>{data.content.title}</title>
</svelte:head>
  

<main>
<slot />
</main>

<footer class="uppercase">
  {data.content.title}
</footer>



<style>
    main {
    color: white;
    flex-grow: 1;
  }

  footer {
    height: 2rem;
    /* border-top: 1px solid black; */
  }
</style>