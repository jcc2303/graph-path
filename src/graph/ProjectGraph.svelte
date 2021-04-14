<script>
  /**
   * Container for all project and config for other components
   */

  import { onMount } from 'svelte'
  import { project, start, slice } from '../stores'

  import Canvas from './Canvas.svelte'
  import GraphPath from './GraphPath.svelte'
  import AssetsGraph from './AssetsGraph.svelte'
  import Asset from './Asset.svelte'
  import Connection from './Connection.svelte'

  let graph
  let minx = 0
  let maxx = 0
  let miny = 0
  let maxy = 0

  let assets = getAssets($project)
  let connections = getConnections($project)

  /**
   * Define the canvas side and do redimension for stagedAssets for canvas
   */
  function getAssets({ stagedAssets }) {
    let xs = [],
      ys = []
    let entries = Object.entries(stagedAssets)
    let positions = entries.map(
      ([k, a]) => xs.push(a.initialState.x) & ys.push(a.initialState.y)
    )
    minx = Math.min(...xs) - 20
    maxx = Math.max(...xs) - 20
    miny = Math.min(...ys) - 20
    maxy = Math.max(...ys) - 20

    return entries.map(([k, a]) => ({
      x: a.initialState.x - minx,
      y: a.initialState.y - miny,
      key: k,
    }))
  }

  /**
   * Do the redimension for connections for canvas
   */
  function getConnections({ connections }) {
    let dicAssets = assets.reduce((a, c) => (a[c.key] = c) && a, {})

    let c = Object.entries(connections).map(([k, v]) => ({
      from: dicAssets[v.from],
      to: dicAssets[v.to],
    }))

    return c
  }

  function onChange(event) {
    slice.update((x) => (x = event.target.value))
  }
</script>

<Canvas>
  {#each connections as item}
    <Connection {item} />
  {/each}
  {#each assets as item}
    <Asset {item} />
  {/each}
</Canvas>
length id:
<input
  type="range"
  value={$slice}
  on:change={onChange}
  id="vol"
  name="vol"
  min="1"
  max="20"
/>
<div class="flex justify-between container mx-auto px-4 space-x-4">
  <div class="flex-1">
    <AssetsGraph project={$project} bind:graph />
  </div>
  <div class="flex-1 bg-blue-100">
    <GraphPath {graph} />
  </div>
</div>
