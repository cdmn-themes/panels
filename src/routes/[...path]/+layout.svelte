<script>
  import './global.css'
  import 'virtual:uno.css'
  export let data
</script>

<svelte:head>
  <title>{data.title}</title>
  <link rel="icon" href="API_URL/blobs/{data.favicon}" />
</svelte:head>

<header>
  <a href="/" class="h-full block">
    <img src="$lib/images/logo.svg" class="h-full p-2" alt="">
  </a>
</header>

<main>
  <slot />
</main>

<footer>
  <a href="/">HOME</a>
  <a href="/menu">MENU</a>
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