<script>

    import {start} from './stores'
    import { onMount } from "svelte";

    // export 
    export let graph 
    
    // {
    //     'A': {id:'A', children: ['b'] },
    //     'b': {id:'b', children: ['B'] },
    //     'B': {id:'B', children: [] }
    // }
    //-MA1551S-odms4rVbJ8D




    $: paths = graph && graph[$start] && traverse(graph[$start]) || []
    
    let paths = []

    function traverse(node = graph[$start], path = []) {        
        if(path.includes(node.id)) return path
        path = [...path, node.id]
    
        let childPaths = node.children.map(c => {
            return traverse(graph[c], [...path])
        }).flat()
    
        return (path.length === 1) ?  [...childPaths ] : [path, ...childPaths ]
    }


    onMount(() => {
        // $start = 'A'
        // paths = traverse(graph[$start])
        console.log(paths);
    })

</script>

<p>Graph path start{$start}</p>


<!-- <p>{JSON.stringify(paths, null, 2)}</p> -->
<div>

    {#each paths as path}
        <div>
        {path.map(x => x.slice(-1)).join(' > ')}
        </div>
    {:else}
    <p>empty paths</p>
    {/each}
</div>


