<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/upload.json');
		if (res.ok) {
			const { data } = await res.json();
			return { props: { data } };
		}
	};
</script>

<script>
	import Quotes from "$components/Quotes.svelte";
import { each } from "svelte/internal";
	import ParseQuotes from "../quotes/parseQuotes.svelte";
	export let data
    console.log(`🚀 ~ file: index.svelte ~ line 16 ~ data`, data)
	let quoteAuthor, quoteBody, quoteContext, quoteSource, quoteTags

	function submitQuote() {
		let quote = {
			"body": quoteBody,
			"author": quoteAuthor,
			"context": quoteContext,
			"source": quoteSource,
			"tags": quoteTags
		}
        console.log(`🚀 ~ file: index.svelte ~ line 27 ~ submitQuote ~ quote`, quote)
	}
</script>

<!-- <ParseQuotes /> -->
<div class="quotes">
{#each data.data as item}
	<ul>
		<li>{item.quoteBody}</li>
	</ul>
{/each}
</div>



<div class="p-10 card bg-base-200 container">
    <div class="form-control flex">
      <label class="label max-w-xs">
        <span>Quote</span>
      </label> 
      <input bind:value={quoteBody} type="text" placeholder="Quote" class="input input-group max-w-xs">
      <label class="label">
        <span class="label-text">Author</span>
      </label> 
      <input bind:value={quoteAuthor} type="text" placeholder="Author" class="input">
      <label class="label">
        <span class="label-text">Context</span>
      </label> 
      <input bind:value={quoteContext} type="text" placeholder="Context" class="input">
      <label class="label">
        <span class="label-text">Tags</span>
      </label> 
      <input bind:value={quoteTags} type="text" placeholder="Tags" class="input">
      <label class="label">
        <span class="label-text">Source</span>
      </label> 
      <input bind:value={quoteSource} type="text" placeholder="Source" class="input">
    </div>
	<button type="submit" class="btn btn-outline" on:click="{() => submitQuote()}">SUBMIT</button>
  </div>

  <h1>{quoteBody} - {quoteAuthor}</h1>