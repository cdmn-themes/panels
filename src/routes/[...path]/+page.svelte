<script>
  import { page } from '$app/stores'
  import { cubicInOut } from 'svelte/easing'
  import { fade, slide, fly } from 'svelte/transition'
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
    if (data.schema_name == 'children_as_panels') panels = data.children
    else if (data) panels = [data]
    else panels = []
  }

  let isTouch = false
  function setHovered(e) {
    if (isTouch) return
    clearHovered()
    e.currentTarget.classList.add('active')
  }

  function clearHovered() {
    if (transitioning) return
    document.querySelectorAll('.active').forEach((el) => {
      el.classList.remove('active')
    })
  }
</script>

<div class="relative h-full" class:transitioning>
  <div class="absolute w-full h-full flex flex-col md:flex-row gap-1px">
    
    {#each panels || [] as panel (panel.path)}
      <div transition:css|local
        on:introstart={() => transitioning = true} on:introend={() => transitioning = false}
        on:outrostart={() => transitioning = true} on:outroend={() => transitioning = false}
        on:mouseenter={setHovered}
        on:mouseleave={clearHovered}
        on:blur
        on:touchstart={() => isTouch = true}
        class="relative panel text-center overflow-hidden">
    
        <img src="API_URL/attachments/{panel.content.image}?w=1920" class="centered object-center object-cover h-screen w-screen" alt="">
        {#if data.schema_name == 'children_as_panels'}
          <a transition:fade href={panel.path} class="centered w-screen overflow-hidden h-full flex items-center justify-center uppercase !text-white">
            <h2 class="relative">{panel.content.title}</h2>
          </a>
        {:else if data.schema_name = 'white_sections'}
          <div out:slide in:slide={{delay: 1000}} class="absolute flex flex-col w-132 max-w-full centered-x bottom-1 text-black gap-1">
            <h1 class=" bg-light/90  uppercase text-sm p-2">{panel.content.title}</h1>
            <div class="flex gap-1">
              {#each panel.content.sections || [] as section}
                {@const active = $page.url.hash == '#'+section.hash}
                <a href={active ? '#' : `#${section.hash}`} class="relative grow text-xl bg-light/90 uppercase p-2 cursor-pointer">
                  {section.title}
                  <span class="absolute right-4 top-3 i-akar-icons:chevron-up transition-all" class:rotate-180={active}></span>
                </a>
                {/each}
              </div>
              {#each panel.content.sections || [] as section}
                {#if $page.url.hash == ('#'+section.hash)}
                  <!-- {#key activeSection} -->
                    <div transition:slide class="bg-light/90 p-8 text-left">
                      {@html section.content}
                    </div>
                  <!-- {/key} -->
                {/if}
              {/each}
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

