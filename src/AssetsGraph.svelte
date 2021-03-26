<script>
  import { start } from './stores'

  export let project

  export let graph = []

  $: graph = generate(project)

  function generate({ stagedAssets, connections }) {
    let assetsTo = Object.keys(stagedAssets).reduce(
      (a, n, i) => (a[n] = { id: n, children: [] }) && a,
      {}
    )
    let connectsTo = Object.keys(connections).reduce(
      (a, n, i) => (a[n] = { id: n, children: [] }) && a,
      {}
    )
    let nodesTo = Object.assign({}, assetsTo, connectsTo)
    Object.entries(connections).map(([id, { from, to }]) => {
      nodesTo[from].children = [...nodesTo[from].children, id]
      nodesTo[id].children = [...nodesTo[id].children, to]
    })
    // let nodeFrom = [] // Object.entries(stagedAssets).map(([id, value]) => value.connectionsAsFrom )
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

{#each Object.entries(graph) as [id, node]}
  <div
    class="hover:bg-gray-300 cursor-pointer"
    on:click={() => changeStart(id)}
  >
    <span>{node.id.slice(-1)}</span>
    {#if node.children}
      <span> --> {node.children.map((c) => c.slice(-1)).join(', ')}</span>
    {/if}
  </div>
{:else}
  <p>No graph found</p>
{/each}
