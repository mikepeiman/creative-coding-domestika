<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/quotes.json');
		if (res.ok) {
			const { quotes } = await res.json();
			return { props: { quotes } };
		}
	};
</script>

<script>
	import Quotes from "$components/Quotes.svelte";
	import ParseQuotes from "./parseQuotes.svelte";
	export let quotes
</script>

<ParseQuotes />
<div class="quotes">
	<!-- <Quotes {quotes}/> -->
</div>