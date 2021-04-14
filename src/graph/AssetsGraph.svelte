<script>
  import { start, slice } from '../stores'

  export let project

  export let graph = []

  $: graph = generate(project)

  $: points = Object.keys(graph).map((k) => graph[k])

  /**
   * generate a graph from stagedAssets, connections of project
   */
  function generate({ stagedAssets, connections }) {
    let assetsTo = Object.keys(stagedAssets).reduce(
      (a, n, i) => (a[n] = { id: n, children: [], type: 'a' }) && a,
      {}
    )
    let connectsTo = Object.keys(connections).reduce(
      (a, n, i) => (a[n] = { id: n, children: [], type: 'c' }) && a,
      {}
    )
    let nodesTo = Object.assign({}, assetsTo, connectsTo)
    Object.entries(connections).map(([id, { from, to }]) => {
      nodesTo[from].children = [...nodesTo[from].children, id]
      nodesTo[id].children = [...nodesTo[id].children, to]
    })
    return nodesTo
  }

  function changeStart(id) {
    $start = id
  }
</script>

<div class="flex text-lg">
  <span class="p-1">Adjacency List: </span>
  <span class="p-1">{Object.entries(project.stagedAssets).length} </span>
  <span class="p-1">{Object.entries(project.connections).length}</span>
</div>

{#each points.filter((p) => p.type == 'a') as node}
  <div
    class="hover:bg-gray-300 cursor-pointer"
    on:click={() => changeStart(node.id)}
  >
    <span>{node.id.slice(-$slice)}</span>
    {#if node.children.length}
      <span class="px-3">
        ->
        {#each node.children.map((c) => c.slice(-$slice)) as node}
          <span class="mx-1 px-1 border border-gray-300">{node}</span>
        {/each}
      </span>
    {/if}
  </div>
{:else}
  <p>No graph found</p>
{/each}
