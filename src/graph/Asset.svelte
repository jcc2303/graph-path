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
    let { x, y } = item
    let radius = 10
    context.beginPath()
    context.arc(x, y, radius, 0, 2 * Math.PI, false)
    context.fillStyle = 'green'
    context.fill()
    context.lineWidth = 5
    context.strokeStyle = '#003300'
    context.stroke()
  }

  const unsubscribe = contextStore.subscribe((value) => {
    value && repaint(value)
  })
</script>
