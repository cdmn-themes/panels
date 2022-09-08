<script>
  import { cubicInOut } from 'svelte/easing'
  import { fade, slide } from 'svelte/transition'
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
      css: t => `--transitionProgress: ${t};`
    };
  }

  let panels
  $: {
    if (data.schema_name == 'children_as_panels') {
      panels = data.children
    }
    else {
      panels = [data]
    }
  }

  let isTouch = false
  function setHovered(e) {
    if (isTouch) return
    clearHovered()
    e.currentTarget.classList.add('active')
  }

  function clearHovered() {
    document.querySelectorAll('.active').forEach((el) => {
      el.classList.remove('active')
    })

  }
</script>

<div class="relative h-full" class:transitioning>
  <div class="absolute w-full h-full flex flex-col md:flex-row gap-1px">
    {#each panels as panel (panel.path)}
      <div transition:css|local
        on:introstart={() => transitioning = true} on:introend={() => transitioning = false}
        on:outrostart={() => transitioning = true} on:outroend={() => transitioning = false}
        on:mouseenter={setHovered}
        on:mouseout|self={clearHovered}
        on:blur
        on:touchstart={() => isTouch = true}
        class="relative panel text-center overflow-hidden">
    
        <img src="API_URL/blobs/{panel.content.image}" class="centered object-center object-cover h-screen w-screen" alt="">
        {#if data.schema_name == 'children_as_panels'}
          <a transition:fade href={panel.path} class="absolute w-full h-full flex items-center justify-center uppercase !text-white">
            <h2 class="relative">{panel.content.title}</h2>
          </a>
        {:else}
          <div transition:slide class="absolute grid grid-cols-2 w-108 max-w-full centered-x bottom-0 text-black gap-1">
            <h2 class=" bg-light/80 col-span-2 uppercase">{panel.content.title}</h2>
            <div class="bg-light/80 col-span-2 p-8 text-left">
              {@html panel.content.html}
            </div>
            
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .panel {
    transition: flex-grow 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.0);
    flex-grow: calc(var(--transitionProgress, 1) * var(--scale, 1));
  }
  
  :global(.panel.active){
    --scale: 3;
  }
  
  .transitioning {
    pointer-events: none;
  }

</style>

