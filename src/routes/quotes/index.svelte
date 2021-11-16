<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/todos.json');
		if (res.ok) {
			const { todos } = await res.json();
			return { props: { todos } };
		}
	};
</script>

<script>
	import Todos from "$components/Todos.svelte";
	import ParseQuotes from "./parseQuotes.svelte";
	export let todos
</script>

<ParseQuotes />
<div class="todos">
	<!-- <Todos {todos}/> -->
</div>