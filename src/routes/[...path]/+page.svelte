<script>
  import { cubicInOut } from 'svelte/easing'
  export let data
  
  const components = import.meta.glob(`$lib/components/*.svelte`, {import: 'default', eager: true})

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
    panels = []
    if (data.children) {
      data.children.forEach((child) => {
        panels.push({...child, component: 'sublink'})
      })
    }
    else {
      panels.push(data)
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

        <img src="API_URL/blobs/{panel.image}" class="centered object-center object-cover h-screen w-screen" alt="">
        
        <svelte:component this={components[`/src/lib/components/${panel.component}.svelte`]} data={panel}/>
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

