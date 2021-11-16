<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/todos.json');
        console.log(`🚀 ~ file: todos index.svelte ~ line 4 ~ load ~ res`, res)
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
    console.log(`🚀 ~ file: TODOS index.svelte ~ line 15 ~ todos`, todos)
</script>

<ParseQuotes />
<div class="todos">
	<Todos {todos}/>
</div>