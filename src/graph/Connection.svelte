<script>
  import { onMount } from 'svelte'

  import {
    width,
    height,
    canvas as canvasStore,
    context as contextStore,
    pixelRatio,
  } from '../stores'

  export let item

  const repaint = (context) => {
    let { from, to } = item
    context.beginPath()
    context.moveTo(from.x, from.y)
    context.lineTo(to.x, to.y)
    context.stroke()
  }

  const unsubscribe = contextStore.subscribe((value) => {
    value && repaint(value)
  })
</script>
