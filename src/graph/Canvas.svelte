<script>
  /**
   * canvas to be shared with other components
   */

  import { onMount } from 'svelte'
  import {
    width,
    height,
    canvas as canvasStore,
    context as contextStore,
    pixelRatio,
  } from '../stores'

  // export let killLoopOnError = true;
  export let attributes = {}

  let canvas
  let frame
  let context

  onMount(() => {
    // prepare canvas stores
    context = canvas.getContext('2d', attributes)
    canvasStore.set(canvas)
    contextStore.set(context)

    return // createLoop ()
  })

  function handleResize() {
    width.set(window.innerWidth)
    height.set(window.innerHeight)
    pixelRatio.set(window.devicePixelRatio)
  }

  function createLoop(fn) {
    let elapsed = 0
    let lastTime = performance.now()
    ;(function loop() {
      frame = requestAnimationFrame(loop)
      const beginTime = performance.now()
      const dt = (beginTime - lastTime) / 1000
      lastTime = beginTime
      elapsed += dt
      fn(elapsed, dt)
    })()
    return () => {
      cancelAnimationFrame(frame)
    }
  }
</script>

<div class="overflow-auto h-64">
  <canvas
    bind:this={canvas}
    width={$width * $pixelRatio}
    height={$height * $pixelRatio}
    style="width: {$width}px; height: {$height}px;"
  />
</div>
<svelte:window on:resize|passive={handleResize} />
<slot />
