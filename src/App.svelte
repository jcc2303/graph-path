<script>
  /* component logic will go here */
  import { onMount } from 'svelte'

  import './Tailwind.svelte'
  import { project, start } from './stores'
  import ProjectGraph from './graph/ProjectGraph'

  import ExampleJson from './project-idx.json'
  // to env
  const projectId = '-MA1551S-odms4rVbJ8A'
  const subProjectId = '-MA1551S-odms4rVbJ8B'

  let token

  $start = '-MA1551S-odms4rVbJ8K'

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

  /* call demo for dev mode useDemo() */
  onMount(() => {})
</script>

<div class="text-align-center antialiased w-full h-full p-4">
  <header>
    {#if token}
      {#if $project}
        <ProjectGraph />
      {:else}
        <p>retrieving data...</p>
      {/if}
    {:else}
      <div class="flex">
        copy token:<input type="text" bind:value={token} />
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
