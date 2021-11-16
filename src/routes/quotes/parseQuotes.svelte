<script>
	import { storedQuotesFile, storedFileContent } from '../../stores/stores.js';
	import { onMount } from 'svelte';

	let fsFileContent;
	$: if (fsFileContent) {
		parseFile(fsFileContent);
	}

	onMount(() => {
		fsFileContent = localStorage.getItem('fileContent');
	});

	let input_file = [],
		contents = '',
		items = [];

	function readFile(input_file) {
		if (input_file) {
			console.log(`🚀 ~ file: parseQuotes.svelte ~ line 14 ~ readFile ~ input_file`, input_file[0]);
			let file = input_file[0];
			var reader = new FileReader();
			reader.onload = function (event) {
				contents = event.target.result;
				console.log('Successfully read file');
				storedFileContent.set(contents);
				parseFile(contents);
			};
			reader.onerror = function (err) {
				console.error('Failed to read file', err);
			};
			reader.readAsText(file);
		}
	}

	function parseFile(doc) {
		const parser = new DOMParser();
		const htmlDoc = parser.parseFromString(doc, 'text/html');
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 28 ~ parseFile ~ htmlDoc`, htmlDoc);
		let divs = htmlDoc.getElementsByTagName('div');
		items = divs;
		// console.log(`🚀 ~ file: parseQuotes.svelte ~ line 30 ~ parseFile ~ divs`, divs);
        for (let i = 0; i < 20; i++){
            let quote = parseQuote(divs[i])
            console.log(`🚀 ~ file: parseQuotes.svelte ~ line 45 ~ parseFile ~ quote`, quote)
        }
	}

// Quote structure from text:
// quotes are in `" "` quotation marks
// author is attributed with ` - `
// author credential/identity is indicated after `,`
// source material/reference is enclosed within `[ ]`

    function parseQuote(item) {
            console.log(item)
    }
</script>

<input
	class="input input-primary"
	id="fileInput"
	type="file"
	bind:files={input_file}
	on:change={readFile(input_file)}
/>

{#if items.length}
	{#each items as item}
		{@html item.innerHTML}
		<br />
	{/each}
{/if}

<style>
	/* ::-webkit-file-upload-button {
		display: none;
	} */

	input#fileInput {
		display: inline-block;
		width: 100%;
		padding: 120px 0 0 0;
		height: 0px;
		overflow: hidden;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background: url('https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-256.png')
			center center no-repeat #e4e4e4;
		border-radius: 20px;
		background-size: 60px 60px;
	}
</style>
