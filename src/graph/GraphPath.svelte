<script>
  import { start, slice } from '../stores'
  import { onMount } from 'svelte'

  export let graph

  $: paths = (graph && graph[$start] && traverse(graph[$start])) || []

  let paths = []

  /**
   * traverse the graph to discover all the path from any starting point
   */
  function traverse(node = graph[$start], path = []) {
    if (path.includes(node.id)) return path
    path = [...path, node.id]

    let childPaths = node.children
      .map((c) => {
        return traverse(graph[c], [...path])
      })
      .flat()

    return path.length === 1 ? [...childPaths] : [path, ...childPaths]
  }
</script>

<div class="w-full">
  <div>
    <div class="text-lg">Graph path</div>
    <span>start: {$start.slice(-$slice)}</span>
  </div>

  <div>
    {#each paths as path}
      <div>
        {path.map((x) => x.slice(-$slice)).join(' > ')}
      </div>
    {:else}
      <p>empty paths</p>
    {/each}
  </div>
</div>
