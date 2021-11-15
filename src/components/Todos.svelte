<script>
	export let todos;
</script>

<!-- <script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/api/todos.json');
		if (res.ok) {
			const { todos } = await res.json();
			return { props: { todos } };
		}
	};
</script> -->

<svelte:head>
	<title>Mike's Blog</title>
</svelte:head>

{#each Object.keys(todos) as todo}
    {todo}
{/each}
{todos}