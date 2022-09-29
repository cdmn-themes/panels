<script>
  
  import { cubicInOut } from 'svelte/easing'
  import { fade, slide, fly } from 'svelte/transition'
  import Preload from '$lib/preload.svelte';
  import Sections from '$lib/sections.svelte'

  export let data

  let transitioning = false

  function css(node, {
    delay = 0,
    duration = 1220,
    easing = cubicInOut}) {

    return {
      delay,
      duration,
      easing,
      css: t => `flex-basis: calc(${t *100}% * var(--scale, 1));`
    };
  }

  let panels
  $: {
    if (data.schema_name == 'children_as_panels') panels = data.children
    else if (data.siblings?.length) panels = data.siblings
    else if (data) panels = [data]
    else panels = []
  }

  let isTouch = false
  function setHovered(e) {
    if (isTouch) return
    clearHovered()
    e.currentTarget.classList.add('activepanel')
  }

  function clearHovered() {
    if (transitioning) return
    document.querySelectorAll('.activepanel').forEach((el) => {
      el.classList.remove('activepanel')
    })
  }
</script>

<div class="relative h-full" class:transitioning>
  <div class="absolute w-full h-full flex flex-col md:flex-row gap-1px">
    
    {#each panels || [] as panel (panel.path)}
      {@const image = panel.content.images?.length ? panel.content.images[0] : panel.content.image}
      <div transition:css|local
        on:introstart={() => transitioning = true} on:introend={() => transitioning = false}
        on:outrostart={() => transitioning = true} on:outroend={() => transitioning = false}
        on:mouseenter={setHovered}
        on:mouseleave={clearHovered}
        on:blur
        on:touchstart={() => isTouch = true}
        class="relative panel text-center overflow-hidden"
        class:collapsed={data.schema_name !== 'children_as_panels' && panel.path !== data.path}>

        <Preload let:src src="API_URL/attachments/{image}?w=1920">
          <video in:fade|local={{duration: 600}} loop playsinline muted autoplay poster={src} class="centered object-center object-cover h-screen w-screen" alt="">
            <source src="API_URL/attachments/{image}" type="video/mp4">
          </video>
        </Preload>

        {#if data.schema_name == 'children_as_panels'}
          <a transition:fade href={panel.path} class="centered w-screen overflow-hidden h-full flex flex-col items-center justify-center uppercase !text-white">
            <h2 class="relative md:text-size-8 font-normal">{panel.content.title}</h2>
            {#if panel.content.subtitle}
              <h3 class="relative text-size-4">{panel.content.subtitle}</h3>
            {/if}
          </a>
          <div out:slide in:slide={{duration: 650, delay: 1000}} class="fixed flex flex-col w-132 max-w-full centered-x bottom-3.6rem text-black gap-1">
            <Sections sections={data.content.sections} expandable />
          </div>
        {:else if data.path == panel.path}
          <div out:slide in:slide={{duration: 650, delay: 1000}} class="fixed flex flex-col w-132 max-w-full centered-x bottom-3.6rem text-black gap-1">
            <h1 class=" bg-light/90  text-sm uppercase text- p-2">{panel.content.title}</h1>
            <Sections sections={panel.content.sections} />
          </div>
        {/if}
      </div>
    {:else}
      <div in:fly={{delay: 500, y:30, duration: 900}} class="color-black flex flex-col relative w-full h-full items-center justify-center text-center">
        <h1>404: Not found</h1>
        <p>
          Hoppla, diese Seite ist noch nicht ganz fertiggestellt.<br>Bitte versuchen Sie es später noch einmal.
        </p>
      </div>

    {/each}
  </div>
</div>

<style>
  .panel {
    transition: flex-basis 1s cubic-bezier(0.175, 0.885, 0.32, 1.0);
    flex-basis: calc(100% * var(--scale, 1));
  }
  
  :global(.panel.activepanel){
    --scale: 3;
  }

  .panel.collapsed {
    transition: flex-basis 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.0);
    --scale: 0;
  }
  
  .transitioning {
    pointer-events: none;
  }

</style>

