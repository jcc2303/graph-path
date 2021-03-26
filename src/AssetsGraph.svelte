<script>
    import {start} from './stores'

    export let project

    export let graph = []

  //console.log('project', project);
  $: graph = generate(project);
    //     $: connectionTypes = graph.connectionTypes
    // $: stagedAssets = graph.stagedAssets
    // $: connections = graph.connections
    // $: debugger

    function generate({stagedAssets, connections}){
        console.log(stagedAssets, connections);
        let assetsTo = Object.keys(stagedAssets).reduce((a, n, i) => (a[n] = {id: n, children: []}) && a, {})
        let connectsTo = Object.keys(connections).reduce((a, n, i) => (a[n] = {id: n, children: []}) && a, {})
        let nodesTo = Object.assign({}, assetsTo, connectsTo)
        Object.entries(connections).map(([id,{from, to}]) => { 
            nodesTo[from].children = [...nodesTo[from].children,id] 
            nodesTo[id].children = [...nodesTo[id].children,to] 
        })
        console.log('assetsTo1', nodesTo);
        // let nodeFrom = [] // Object.entries(stagedAssets).map(([id, value]) => value.connectionsAsFrom )
        return nodesTo
    }

    function changeStart(id) {
        console.log(id);
        $start = id
    }

</script>

<br>
<div>
<span>Adjacency List: </span>
<span>{Object.entries(project.stagedAssets).length} </span>
<span>{Object.entries(project.connections).length}</span>
</div>

{#each Object.entries(graph) as [id, node] }
    <div on:click={() => changeStart(id)}>
    <!-- {JSON.stringify(node, null, 2)} -->
        <span>{node.id.slice(-1)}</span>
        {#if node.children}
            <span> --> {node.children.map(c => c.slice(-1)).join(', ')}</span>
             <!-- content here -->
        {/if}
    </div>
{:else}
    <p >Graph: {JSON.stringify(graph, null, 2)}</p>
{/each}
    
    <!-- <p>{JSON.stringify(connectionTypes, null, 2)}</p> -->
    <!-- <p>{JSON.stringify(stagedAssets, null, 2)}</p> -->
    <!-- <p>{JSON.stringify(connections, null, 2)}</p> -->
