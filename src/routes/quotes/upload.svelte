<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/todos.json');
		if (res.ok) {
			const { file } = await res.json();
			return { props: { file } };
		}
	};
</script>

<script>
	import ParseQuotes from "./parseQuotes.svelte";
	export let file
</script>

<ParseQuotes />
<div class="todos">
	<!-- <Todos {todos}/> -->
</div>