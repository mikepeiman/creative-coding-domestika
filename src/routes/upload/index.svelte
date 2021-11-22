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

	import ParseQuotes from '../quotes/parseQuotes.svelte';

	import { initClient, operationStore, query, mutation } from '@urql/svelte';
	const VITE_DGRAPH_ENDPOINT = import.meta.env['VITE_DGRAPH_ENDPOINT'];
	initClient({
		url: VITE_DGRAPH_ENDPOINT
	});
	import { gql, request } from 'graphql-request';
	import About from '../about.svelte';
	export let id;
	let quoteBody = '';
	let quoteAuthor = '';
	let quoteContext = '';
	let quoteTags = '';
	let quoteSource = '';
	let quote = {
		body: quoteBody,
		author: quoteAuthor,
		context: quoteContext,
		source: quoteSource,
		tags: quoteTags
	};
	const mutateQuotes = mutation({
		query: `
		mutation addQuotes($data: [AddQuoteInput!]!) {
			addQuote(input: $data) {
			numUids
			quote {
				id
				quoteBody
			}
			}
		}`
	});

	const addNewQuote = mutation({
		query: `
		mutation addNewQuote {
			addQuote(input: {quoteBody: "", author: {name: ""}}) {
				numUids
			}
			}`
	});

	const getQuotes = operationStore(`query getQuotes {
		queryQuote {
			quoteBody
			author {
			name
			}
		}
		}
		`);

	const deleteTestQuotes = mutation({
		query: `
		mutation deleteTestQuotes {
			deleteQuote(filter: {quoteBody: {anyoftext: "test"}})
			}
		`
	});

	let res = query(getQuotes);
	// let res = query(deleteTestQuotes)

	console.log(`🚀 ~ file: index.json.js ~ line 38 ~ res`, res);

	// export let data;

	function submitQuote() {
		console.log(`🚀 ~ file: index.svelte ~ line 74 ~ submitQuote ~ quote`, quote);
		try {
			let data = [];
			data = [...data, quote];
			mutateQuotes({ data }).then((res) => {
				console.log(res.data, res.error);
			});
		} catch (error) {
			console.log(`🚀 ~ file: index.svelte ~ line 80 ~ submitQuote ~ error`, error);
		}

		addNewQuote({ quoteBody: quote.quoteBody, authorName: quote.quoteAuthor }).then((res) => {
			console.log(`addNewQuote: `, res.data, res.error);
		});
		// const res1 = mutateQuotes({ quote });
		// console.log(`🚀 ~ file: index.svelte ~ line 78 ~ submitQuote ~ res1`, res1)
		// try {
		// 	deleteTestQuotes({});
		// } catch (error) {
		// 	console.log(`🚀 ~ file: index.svelte ~ line 87 ~ submitQuote ~ error`, error);
		// }
		// const res2 = deleteTestQuotes({})
		// console.log(`🚀 ~ file: index.svelte ~ line 80 ~ submitQuote ~ res2`, res2)
	}

	const data = {
		"data": [
			{
				"quoteBody": 'Test 777',
				"author": {
					"name": 'A',
					"titleLong": ''
				},
				"context": 'apples',
				"tags": {
					"tag": 'apples'
				}
			},
			{
				"quoteBody": 'Test 888',
				"author": {
					"name": 'B',
					"titleLong": ''
				},
				"context": 'oranges',
				"tags": {
					"tag": 'oranges'
				}
			}
		]
	}

	function endpoint() {
		const fire = async () => {
			const res = await fetch(`/upload.json?data=${JSON.stringify(data)}`);
			console.log(`🚀 ~ file: index.svelte ~ line 112 ~ fire ~ res`, res);
			if (res.ok) {
				const { data } = await res.json();
				console.log(`🚀 ~ file: index.svelte ~ line 114 ~ fire ~ data`, data);
				return { props: { data } };
			} else {
				return 'there was an error';
			}
		};
		fire();
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
	<button type="submit" class="btn btn-outline" on:click={() => endpoint()}
		>Hit .json endpoint</button
	>
</div>

<h1>{quoteBody} - {quoteAuthor}</h1>


<div class="quotes">
	{#if $getQuotes.fetching}
		<p>Loading...</p>
	{:else if $getQuotes.error}
		<p>Error: {$getQuotes.Error.message}</p>
	{:else}
		{#each $getQuotes.data.queryQuote as item, i}
			<ul>
				<li><h1>{i + 1}: {item.quoteBody} - {item.author.name}</h1></li>
			</ul>
		{/each}
	{/if}
</div>

