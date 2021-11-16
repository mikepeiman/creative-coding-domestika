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
		let divs = htmlDoc.getElementsByTagName('div');
        for(let i = 0; i < divs.length; i++) {
            discardBreaks(divs[i])
        }
		for (let i = 0; i < items.length; i++) {
			parseQuote(items[i]);
		}
	}

    function discardBreaks(item) {
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 57 ~ discardBreaks ~ item`, item)
        if(item.innerHTML.length > 5){
            items = [...items, item]
        }
    }

	// Quote structure from text:
	// quotes are in `" "` quotation marks
	// author is attributed with ` - `
	// author credential/identity is indicated after `,`
	// source material/reference is enclosed within `[ ]`
	// an axiomatic saying is prefaced with `Axiom: ` before the name of it `Axiom: Brandolinie's Law`
	// author DOB-Death noted as `(####-####)`
	// quotation year noted at `(####)`
	// if there is additional context or comment, it is signified by `@(xxx xxx)`
	// tags are specified as `#(xxx xxx, ccccc, zzzz)` comma separated, OR each as `#xxx #yyy`
	// I will need also a flag or rating to determine which quotes are authenticated, or the degree of confidence, plus sources for this

	function parseQuote(item) {
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 63 ~ parseQuote ~ item`, item)
        // let hasBreak = item.getElementsByTagName('br');
		// if (!hasBreak.length) {
        //     console.log(`🚀 ~ file: parseQuotes.svelte ~ line 66 ~ parseQuote ~ hasBreak`, hasBreak.length);
		// }
        // let innerHTML = item.innerHTML
        //     if(innerHTML.length > 5){
        //         console.log(`🚀 ~ file: parseQuotes.svelte ~ line 61 ~ parseQuote ~ item`, item)

        //     }

        // console.log(`🚀 ~ file: parseQuotes.svelte ~ line 67 ~ parseQuote ~ innerHTML`, innerHTML)
        // console.log(`🚀 ~ file: parseQuotes.svelte ~ line 67 ~ parseQuote ~ innerHTML.length `, innerHTML.length)
        // console.log(`🚀 ~ file: parseQuotes.svelte ~ line 67 ~ parseQuote ~ item.length`, item.length)

        // replacementStr = replacementStr.replace(/\\n/g, '\n')

		// discardEmptyDiv()
		// parseQuoteText()
		// parseAuthorName()
		// parseAuthorCredential()
		// parseAuthorLifespan()
		// parseQuoteYear()
		// parseQuoteSource()
		// parseQuoteTags()
		// parseQuoteContext()
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
		<div class="card p-3 m-12 shadow-md">{@html item.innerHTML}</div>

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
