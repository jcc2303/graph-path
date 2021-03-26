<script>
  /* component logic will go here */
  import { onMount } from "svelte";
  import {project, start} from './stores'
  import GraphPath from './GraphPath.svelte'
  import AssetsGraph from './AssetsGraph.svelte'

  import ExampleJson from './project-idx.json'
  // to env
  const projectId = "-MA1551S-odms4rVbJ8A";
  const subProjectId = "-MA1551S-odms4rVbJ8B";

  let token;

  $start = '-MA1551S-odms4rVbJ8K'

  let graph 

  // $: debugger;
  $: if(!$project && token) {
      getProject()
  }

  function useDemo(){
      $project = ExampleJson
      token = '-'
      console.log(ExampleJson);
  }

  function getProject(){
    const host = "backend.qa.fieldap.com";
    //const url = `https://legacyapi.qa.fieldap.com/API/v1.9/${projectId}`;
    const url = `https://${host}/API/v1.9/${projectId}`;

    const options = {
      credentials: "include",
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en;q=0.9,en-US;q=0.8,es;q=0.7",
        authorization: "",
        "cache-control": "no-cache",
        "only-active": "False",
        pragma: "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        token,
      },
      referrer: "https://apidocs.fieldap.com/",
      referrerPolicy: "no-referrer-when-downgrade",
      body: null,
      method: "GET",
      mode: "cors"
    };
    // fetch(url, options).then(response =>  response.json() ).then(json => console.log(json) & (graph = json) )
    fetch(`${url}/subProject/${subProjectId}`, options)
      .then(response => response.json())
      .then(json => console.log(json) & ($project = json));      
  }

  onMount(() => {

  });
</script>

<style>
  /* css will go here */
</style>

<div class="App">
  <header class="App-header">
  {#if token}
    <p>
      Result JSON
    </p>
    <GraphPath {graph} />


    {#if $project}
         <!-- content here -->
        <AssetsGraph project={$project} bind:graph={graph}></AssetsGraph>
    {/if}
  {:else}
    token:<input type="text" bind:value={token} >
    <p on:click={useDemo}>use demo</p>
  {/if}
  </header>
</div>
