<script>
  export let data
  console.log(data)
  $: image = data.content.images?.length ? data.content.images[0] : data.content.image
</script>

<svelte:head>
  <title>{data.content.title}</title>
  {#if image}
    <meta name="og:image" content="API_URL/attachments/{image}?w=1200" />
    <meta name="twitter:image" content="API_URL/attachments/{image}?w=1200" />
  {/if}
</svelte:head>
  

<main>
<slot />
</main>

<footer class="uppercase relative flex text-sm md:text-base">
  {#if data.siblings?.length > 1}
    {#each data.siblings as sibling}
      <a class="p-1 md:p-2" class:active={data.path == sibling.path} href={sibling.path}>{sibling.content.title}</a>
    {/each}
  {:else}
    {#each data.children || [] as child}
      <a class="p-1 md:p-2" class:active={data.path == child.path} href={child.path}>{child.content.title}</a>
    {/each}
  {/if}
</footer>

<style>
  main {
    color: white;
    flex-grow: 1;
    margin-bottom: 3.5rem;
  }
  
  footer {
    background-color: white;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 3.5rem;
    /* border-top: 1px solid black; */
  }
  footer a.active {
    font-weight: bold;
  }
</style>