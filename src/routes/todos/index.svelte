<script>
	import { gql, initClient, operationStore, query } from '@urql/svelte';

	const QUERY = operationStore(`
		query MyQuery {
			aggregateTask {
				count
				titleMin
				titleMax
			}
			queryUser {
				name
			}
		}
	`);
		export let todos
	export async function load({ page, fetch, session, context }) {
		// const client = createClient({
		// 	url: import.meta.env['VITE_DGRAPH_ENDPOINT'],
		// 	fetch,
		// 	exchanges: [fetchExchange]
		// });
		initClient({
			url: import.meta.env['VITE_DGRAPH_ENDPOINT']
		})

		todos = await query(QUERY).toPromise();
		return {
			props: {
				todos: todos
			}
		};
		// const res = await fetch('/todos.json');
		// if (res.ok) {
		// 	const { todos } = await res.json();
		// 	return { props: { todos } };
		// }
	}


</script>
<!-- 
<script>
	// import { gql, operationStore, query } from '@urql/svelte';
	import { client } from '$lib/dgraph-client';
	// import { initClient } from '@urql/svelte';
	// const VITE_DGRAPH_ENDPOINT = import.meta.env['VITE_DGRAPH_ENDPOINT'];
	// initClient({
	// 	url: `${VITE_DGRAPH_ENDPOINT}`
	// });

	// const todosQuery = gql`
	// 	query MyQuery {
	// 		aggregateTask {
	// 			count
	// 			titleMin
	// 			titleMax
	// 		}
	// 		queryUser {
	// 			name
	// 		}
	// 	}
	// `;
	// console.log(`🚀 ~ file: dgraph-client.js ~ line 7 ~ client`, client);
	// client()
	// let todos = operationStore(todosQuery);
	// query(todos);

	import Todos from '$components/Todos.svelte';
	import { createClient, fetchExchange } from '@urql/core';
	export let todos;
	console.log(`🚀 ~ file: index.svelte ~ line 14 ~ todos`, todos);
</script> -->

Hello todos index.svelte:
{#if todos.fetching}
	... loading
{:else if todos.error}
	{todos.error}
{:else}
	<div class="todos">
		<Todos {todos} />
	</div>
{/if}
