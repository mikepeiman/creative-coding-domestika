<script context="module">
	// export const load = async ({ fetch }) => {
	// 	const res = await fetch('/upload.json');
	// 	if (res.ok) {
	// 		const { data } = await res.json();
	// 		return { props: { data } };
	// 	}
	// };
</script>

<script>
	import Quotes from '$components/Quotes.svelte';
	import { each } from 'svelte/internal';
	import ParseQuotes from '../quotes/parseQuotes.svelte';

	import { initClient, operationStore, query, mutation } from '@urql/svelte';
	const VITE_DGRAPH_ENDPOINT = import.meta.env['VITE_DGRAPH_ENDPOINT'];
	initClient({
		url: VITE_DGRAPH_ENDPOINT
	});
	import { gql, request } from 'graphql-request';
import About from '../about.svelte';
	export let id;
	let quotesBody = '';
	let author = '';
	let context = '';
	let tag = '';
	let source = '';

	const mutateQuotes = operationStore(`
		mutation addQuotes($data: [AddQuoteInput!]!) {
			addQuote(input: $data) {
			numUids
			quote {
				id
				quoteBody
			}
			}
		}`);

	const getQuotes = operationStore(`query getQuotes {
  queryQuote {
    quoteBody
    author {
      name
    }
  }
}
`);

	let res = query(getQuotes);
	console.log(`🚀 ~ file: index.json.js ~ line 38 ~ res`, res);

	export let data;
	console.log(`🚀 ~ file: index.svelte ~ line 16 ~ data`, data);
	let quoteAuthor, quoteBody, quoteContext, quoteSource, quoteTags;

	function submitQuote() {
		let quote = {
			body: quoteBody,
			author: quoteAuthor,
			context: quoteContext,
			source: quoteSource,
			tags: quoteTags
		};
		console.log(`🚀 ~ file: index.svelte ~ line 27 ~ submitQuote ~ quote`, quote);
	}
</script>

<!-- <ParseQuotes /> -->
<!-- <div class="quotes">
	{#each data.data as item}
		<ul>
			<li>{item.quoteBody}</li>
		</ul>
	{/each}
</div> -->

<div class="quotes">

	{#if $getQuotes.fetching}
	<p>Loading...</p>
	{:else if $getQuotes.error}
	<p>Error: {$getQuotes.Error.message}</p>
	{:else}

	{#each $getQuotes.data.queryQuote as item, i}
		<ul>
			<li><h1>{i+1}: {item.quoteBody} - {item.author.name}</h1>
			</li>
		</ul>
	{/each}
	{/if}
</div>

<div class="p-10 card bg-base-200 container">
	<div class="form-control flex">
		<label class="label max-w-xs">
			<span>Quote</span>
		</label>
		<input
			bind:value={quoteBody}
			type="text"
			placeholder="Quote"
			class="input input-group max-w-xs"
		/>
		<label class="label">
			<span class="label-text">Author</span>
		</label>
		<input bind:value={quoteAuthor} type="text" placeholder="Author" class="input" />
		<label class="label">
			<span class="label-text">Context</span>
		</label>
		<input bind:value={quoteContext} type="text" placeholder="Context" class="input" />
		<label class="label">
			<span class="label-text">Tags</span>
		</label>
		<input bind:value={quoteTags} type="text" placeholder="Tags" class="input" />
		<label class="label">
			<span class="label-text">Source</span>
		</label>
		<input bind:value={quoteSource} type="text" placeholder="Source" class="input" />
	</div>
	<button type="submit" class="btn btn-outline" on:click={() => submitQuote()}>SUBMIT</button>
</div>

<h1>{quoteBody} - {quoteAuthor}</h1>
