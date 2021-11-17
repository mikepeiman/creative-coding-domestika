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
		for (let i = 0; i < 30; i++) {
			if (discardBreaks(divs[i])) {
				console.log(`That was ******** NOT ********* a break stub`);
				let item = discardBreaks(divs[i]);
				items = [...items, item];
			} else {
				console.log(`That was a break stub`);
			}
		}
		for (let i = 0; i < 20; i++) {
			parseQuote(items[i]);
			// console.log(`typeof item ${typeof items[i]}`)
			// removeLinebreaks(items[i])
		}

		let testString = 'abc\r\ndefg';
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 56 ~ parseFile ~ testString`, testString);
		let parsedSrting = testString.replaceAll(/(\r\n|\n|\r)/gm, '');
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 57 ~ parseFile ~ parsedSrting`, parsedSrting);
	}

	function discardBreaks(item) {
		if (item.textContent.length > 5) {
            // let div = document.createElement('div')
            // div.textContent = item.textContent
            // let cleanedDiv = div.textContent.replace(/(\r\n|\n|\r)/gm, '@');
            // console.log(`🚀 ~ file: parseQuotes.svelte ~ line 66 ~ discardBreaks ~ cleanedDiv`, cleanedDiv)
			let stringifiedItem = item.textContent.toString();
			// console.log(
			// 	`🚀 ~ file: parseQuotes.svelte ~ line 64 ~ discardBreaks ~ stringifiedItem`,
			// 	typeof stringifiedItem,
			// 	stringifiedItem
			// );
			// for (let i = 0; i < stringifiedItem.length; i++) {
			// 	console.log(
			// 		`🚀 ~ file: parseQuotes.svelte ~ line 66 ~ discardBreaks ~ stringifiedItem[${i}]: `,
			// 		stringifiedItem[i]
			// 	);
			// }
			let parsedStringifiedItem = stringifiedItem.replaceAll(/(\r\n|\n|\r)/gm, '');
			console.log(
				`🚀 ~ file: parseQuotes.svelte ~ line 66 ~ discardBreaks ~ parsedStringifiedItem`,
				parsedStringifiedItem
			);

			let resN = `${'\\n'.charCodeAt()}`;
			console.log(`🚀 ~ file: parseQuotes.svelte ~ line 59 ~ discardBreaks ~ resN`, resN);
			let resR = `${'\\r'.charCodeAt()}`;
			console.log(`🚀 ~ file: parseQuotes.svelte ~ line 60 ~ discardBreaks ~ resR`, resR);
			let toN = `${String.fromCharCode(10)}`;
			console.log(`🚀 ~ file: parseQuotes.svelte ~ line 63 ~ discardBreaks ~ toN`, toN);
			let toR = String.fromCharCode(92);
			console.log(`🚀 ~ file: parseQuotes.svelte ~ line 65 ~ discardBreaks ~ toR`, toR);

			// console.log(`charCode: '\n'.${charCodeAt()}`)
			return item.textContent.replaceAll(/(\\r\\n|\\n|\\r)/gm, '');
		}
		return 0;
	}

	function removeLinebreaks(item) {
		let str = item.textContent;
		console.log(
			`🚀 ~ file: parseQuotes.svelte ~ line 66 ~ removeLinebreaks ~ typeof str`,
			typeof str
		);
		let replaced = str.replace(/(\r\n|\n|\r)/gm, '');
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 68 ~ removeLinebreaks ~ replaced`, replaced);
		return replaced;
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
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 63 ~ parseQuote ~ item`, item);

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
		<div class="card p-3 m-12 shadow-md">{item}</div>
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
