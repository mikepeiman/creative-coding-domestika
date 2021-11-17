<script>
	import { storedQuotesFile, storedFileContent } from '../../stores/stores.js';
	import { onMount } from 'svelte';

	let fsFileContent;
	$: if (fsFileContent) {
		parseFile(fsFileContent);
	}

    let searchTerm = '';
	let filteredQuotes = [];
	$: {
		if (searchTerm) {
			filteredQuotes = quotes.filter((quote) =>
				quote.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredQuotes = [...quotes];
		}
	}
	onMount(() => {
		fsFileContent = localStorage.getItem('fileContent');
	});

	let input_file = [],
		contents = '',
		quotes = [];

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
		let item, remainder;
		let quoteObj = { item, remainder };
		for (let i = 200; i < 353; i++) {
			if (discardBreaks(divs[i])) {
				item = discardBreaks(divs[i]);
				quotes = [...quotes, item];
				quoteObj = parseQuoteText(item);
				console.log(`🚀 ~ file: parseQuotes.svelte ~ line 46 ~ parseFile ~ quoteObj`, quoteObj);
				quoteObj = parseAuthorName(quoteObj['remainder']);
				console.log(`🚀 ~ file: parseQuotes.svelte ~ line 49 ~ parseFile ~ quoteObj`, quoteObj);
			}
		}
		for (let i = 0; i < 20; i++) {
			parseQuote(quotes[i]);
		}
	}

	function discardBreaks(item) {
		if (item.innerText.length > 5) {
			return item.textContent.replaceAll(/(\\r\\n|\\n|\\r)/gm, '');
		}
		return 0;
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

		// parseQuoteText(item)
		// parseAuthorName(item)
		// parseAuthorCredential(item)
		// parseAuthorLifespan(item)
		// parseQuoteYear(item)
		// parseQuoteSource(item)
		// parseQuoteTags(item)
		// parseQuoteContext(item)
	}

	function parseQuoteText(item) {
		let itemEnd = item.length;
		let quoteStart = item.indexOf('"') + 1;
		let quoteEnd = item.indexOf('"', 2) - 1;
		let quote = Array.from(item).splice(quoteStart, quoteEnd).join(String());
		let remainder = Array.from(item)
			.splice(quoteEnd + 4, itemEnd)
			.join(String())
			.trim();
		return { item, remainder };
	}

	function parseAuthorName(item) {
		let itemEnd = item.length;
		let authorStart = 0;
		let separatorForTitle = item.indexOf(',');
		console.log(
			`🚀 ~ file: parseQuotes.svelte ~ line 102 ~ parseAuthorName ~ separatorForTitle`,
			separatorForTitle
		);
		let separatorForSource = item.indexOf('[');
		console.log(
			`🚀 ~ file: parseQuotes.svelte ~ line 104 ~ parseAuthorName ~ separatorForSource`,
			separatorForSource
		);
		let separatorForAxiom = item.indexOf(':');
		console.log(
			`🚀 ~ file: parseQuotes.svelte ~ line 106 ~ parseAuthorName ~ separatorForAxiom`,
			separatorForAxiom
		);
		let author = Array.from(item).splice(authorStart, separatorForTitle).join(String());
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 103 ~ parseAuthorName ~ author`, author);
		let remainder = Array.from(item)
			.splice(separatorForTitle + 1, itemEnd)
			.join(String())
			.trim();
		console.log(
			`🚀 ~ file: parseQuotes.svelte ~ line 105 ~ parseAuthorName ~ remainder`,
			remainder
		);
		return { item, remainder };
	}

	function parseAuthorCredential(item) {
		let itemEnd = item.length;
		let quoteStart = item.indexOf('"') + 1;
		let quoteEnd = item.indexOf('"', 2) - 1;
		let quote = Array.from(item).splice(quoteStart, quoteEnd).join(String());
		let remainder = Array.from(item)
			.splice(quoteEnd + 4, itemEnd)
			.join(String())
			.trim();
		return { item, remainder };
	}
</script>

<div class="flex flex-col items-center">
    <input
        class="input input-primary"
        id="fileInput"
        type="file"
        bind:files={input_file}
        on:change={readFile(input_file)}
    />
    
    <input
        type="text"
        placeholder="Search quotes"
        class="w-5/6 mt-5 input input-primary rounded-md text-lg p-4 border-2 border-grey-200"
        bind:value={searchTerm}
    />
</div>

{#if quotes.length}
	{#each filteredQuotes as quote}
		<div class="card p-3 m-12 shadow-md">{quote}</div>
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
