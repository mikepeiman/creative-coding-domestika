<!-- <script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/todo.json');
		if (res.ok) {
			const { todos } = await res.json();
			return { props: { todos } };
		}
	};
</script> -->
<script>
	import { gql, operationStore, query } from '@urql/svelte';
	// import { client } from '$lib/dgraph-client';
	import { initClient } from '@urql/svelte';
	const VITE_DGRAPH_ENDPOINT = import.meta.env['VITE_DGRAPH_ENDPOINT'];
	console.log(`🚀 ~ file: dgraph-client.js ~ line 4 ~ VITE_DGRAPH_ENDPOINT`, VITE_DGRAPH_ENDPOINT);
	initClient({
		url: `${VITE_DGRAPH_ENDPOINT}`
	});

	const todosQuery = `query MyQuery {
	    aggregateTask
	    queryUser
	  }`;
	// console.log(`🚀 ~ file: dgraph-client.js ~ line 7 ~ client`, client);
	// client()
	let todos = operationStore(todosQuery);
	query(todos);

	import Todos from '$components/Todos.svelte';
	// export let todos;
	console.log(`🚀 ~ file: index.svelte ~ line 14 ~ todos`, todos);
</script>

Hello
{#if $todos.fetching}
	... loading
{:else if $todos.error}
	{error}
{:else}
	<div class="todos">
		<Todos {todos} />
	</div>
{/if}
