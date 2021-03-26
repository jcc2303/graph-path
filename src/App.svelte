<script>
  /* component logic will go here */
  import { onMount } from 'svelte'

  import './Tailwind.svelte'
  import { project, start } from './stores'
  import GraphPath from './GraphPath.svelte'
  import AssetsGraph from './AssetsGraph.svelte'

  import ExampleJson from './project-idx.json'
  // to env
  const projectId = '-MA1551S-odms4rVbJ8A'
  const subProjectId = '-MA1551S-odms4rVbJ8B'

  let token

  $start = '-MA1551S-odms4rVbJ8K'

  let graph

  // $: debugger;
  $: if (!$project && token) {
    getProject()
  }

  function useDemo() {
    $project = ExampleJson
    token = '-'
  }

  function getProject() {
    const host = 'backend.qa.fieldap.com'
    //const url = `https://legacyapi.qa.fieldap.com/API/v1.9/${projectId}`;
    const url = `https://${host}/API/v1.9/${projectId}`

    const options = {
      credentials: 'include',
      headers: {
        accept: '*/*',
        'accept-language': 'en-GB,en;q=0.9,en-US;q=0.8,es;q=0.7',
        authorization: '',
        'cache-control': 'no-cache',
        'only-active': 'False',
        pragma: 'no-cache',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        token,
      },
      referrer: 'https://apidocs.fieldap.com/',
      referrerPolicy: 'no-referrer-when-downgrade',
      body: null,
      method: 'GET',
      mode: 'cors',
    }
    fetch(`${url}/subProject/${subProjectId}`, options)
      .then((response) => response.json())
      .then((json) => ($project = json))
  }

  onMount(() => {})
</script>

<div class="text-align-center antialiased w-full h-full p-4">
  <header>
    {#if token}
      <div class="flex justify-between container mx-auto px-4 space-x-4">
        {#if $project}
          <div class="flex-1">
            <AssetsGraph project={$project} bind:graph />
          </div>
        {/if}

        <div class="flex-1 bg-blue-100">
          <GraphPath {graph} />
        </div>
      </div>
    {:else}
      <div class="flex">
        token:<input type="text" bind:value={token} />
        <p
          class="no-underline hover:underline cursor-pointer"
          on:click={useDemo}
        >
          use demo
        </p>
      </div>
    {/if}
  </header>
</div>

<style>
  /* css will go here */
</style>
