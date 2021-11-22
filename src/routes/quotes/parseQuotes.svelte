<!-- <script context="module">
    	export const load = async ({ fetch }) => {
		const res = await fetch('/todos.json');
		if (res.ok) {
			const { todos } = await res.json();
			return { props: { todos } };
		}
	};
</script> -->

<script>
	import { storedQuotesFile, storedFileContent, storedQuotesArray } from '../../stores/stores.js';
	import { onMount } from 'svelte';
    // import { saveFile} from '$lib/save-file'

	let fsFileContent;
	$: if (fsFileContent) {
		parseFile(fsFileContent);
	}
	let input_file = [];
	let contents = '';
	let quotes = [];
	let searchTerm = '';
	let filteredQuotes = [];
	let multiLineQuote = 0;
	let quotesArrays = [];
	let filteredQuotesArrays = [];
	let quotesObjects = [];
	let filteredQuotesObjects = [];
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
		isolateQuotationBlocks(divs);
		let item, remainder;
        let quoteBody, author, authorTitle, authorCredential, authorInstitution, source, tags, context;
        let quote = { quoteBody, author, authorTitle,authorCredential, authorInstitution,source,tags,context };
		let workingQuoteObject = {}

		for (let i = 10; i < 20; i++) {
			// was divs.length
			// if (stringifyArray(quotesArrays[i])) { // was discardBreaks(divs[i])
			item = stringifyArray(quotesArrays[i]); // was discardBreaks(divs[i])
			if (item.includes('\\r') || item.includes('\\n')) {
                item = item.replace(/(\\r\\n|\\n|\\r)/gm, '');
			}
            workingQuoteObject = {}
            console.log(`🚀 ~ file: parseQuotes.svelte ~ line 75 ~ parseFile ~ item`, item)
            workingQuoteObject['startingItem'] = item
            console.log(`🚀 ~ file: parseQuotes.svelte ~ line 81 ~ parseFile ~ workingQuoteObject`, workingQuoteObject)
			workingQuoteObject = parseQuoteText(workingQuoteObject);
            console.log(`🚀 ~ file: parseQuotes.svelte ~ line 83 ~ parseFile ~ workingQuoteObject`, workingQuoteObject)
			workingQuoteObject = parseAuthorName(workingQuoteObject);
            console.log(`🚀 ~ file: parseQuotes.svelte ~ line 85 ~ parseFile ~ workingQuoteObject`, workingQuoteObject)
            quotes = [...quotes, workingQuoteObject];
		}
        storedQuotesArray.set(quotes)
        // saveFile(quotes, "quotes.json")
	}
    function parseQuoteText(workingQuoteObject) {
        let item = workingQuoteObject['startingItem']
		let itemEnd = item.length;
		let quoteStart = item.indexOf('"') + 1;
		let quoteEnd = item.indexOf('"', 2) - 1;
        
        workingQuoteObject['remainder'] = Array.from(item)
			.splice(quoteEnd + 4, itemEnd)
			.join(String())
			.trim();
		item = Array.from(item).splice(quoteStart, quoteEnd).join(String());
        workingQuoteObject['quoteBody'] = item
        workingQuoteObject['author'] = workingQuoteObject['remainder']
		return workingQuoteObject;
	}

	function parseAuthorName( workingQuoteObject) {
        let item = workingQuoteObject['remainder']
		let itemEnd = item.length;
		let authorStart = 0;
		let separatorForTitle = item.indexOf(',');
		let separatorForSource = item.indexOf('[');
		let separatorForAxiom = item.indexOf(':');
		let author = Array.from(item).splice(authorStart, separatorForTitle).join(String());
        author.length
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 116 ~ parseAuthorName ~ author.length`, author.length)
        // workingQuoteObject['author'] = author
		workingQuoteObject['author'] = Array.from(item)
			.splice(separatorForTitle + 1, itemEnd)
			.join(String())
			.trim();
		return workingQuoteObject;
	}
	function isolateQuotationBlocks(divs) {
		let quoteArray = [];
		for (let i = 0; i < divs.length; i++) {
			let div = divs[i];
			// checkDivsWhetherQuoteOrEmpty(divs[i])
			if (div.innerText.length > 5) {
				multiLineQuote++;
				// console.log(`${i}: isolateQuotationBlocks TRUE QUOTE line: ${multiLineQuote}`);
				// console.log(`${div.innerText.slice(0, 50)}`);
				quoteArray = [...quoteArray, div.innerText];
			} else {
				quotesArrays = [...quotesArrays, quoteArray];
				// console.log(`${i}: isolateQuotationBlocks FALSE EMPTY`);
				multiLineQuote = 0;
				quoteArray = [];
			}
		}
		// console.log(
		// 	`🚀 ~ file: parseQuotes.svelte ~ line 76 ~ isolateQuotationBlocks ~ isolateQuotationBlocks completed`
		// );
	}

	function checkDivsWhetherQuoteOrEmpty() {
		if (div.innerText.length > 5) {
			console.log(`${i}: isolateQuotationBlocks TRUE QUOTE`);
			console.log(`${div.innerText.slice(0, 50)}`);
			quoteArray = [...quoteArray, div.innerText];
		} else {
			console.log(`${i}: isolateQuotationBlocks FALSE EMPTY`);
		}
	}
	function stringifyArray(item) {
		// console.log(
		// 	`🚀 ~ file: parseQuotes.svelte ~ line 109 ~ stringifyArray ~ item length ${item.length}`,
		// 	item
		// );
		let tempString = '';
		if (item.length > 1) {
			item.forEach((subItem) => {
				tempString += `${subItem}<br>`;
			});
            console.log(`🚀 ~ file: parseQuotes.svelte ~ line 20 ~ stringifyArray ~ tempString`, tempString)
			return tempString;
		} else {
			tempString = '';
			return item[0];
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

	// need to clean quotes file more; multiline quotes are getting wrapped in <div>s as separate items
	// the <div><br></div> are useful here; they delineate the actual quotes
	function parseQuote(item) {
		// parseQuoteText(item)
		// parseAuthorName(item)
		// parseAuthorCredential(item)
		// parseAuthorLifespan(item)
		// parseQuoteYear(item)
		// parseQuoteSource(item)
		// parseQuoteTags(item)
		// parseQuoteContext(item)
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
		return { quote, item, remainder };
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
	{#each filteredQuotes as quote, i}
		<div class="card p-3 m-12 shadow-md">
            <div class="badge badge-primary">{i + 1}</div>
			<h1>{quote.quoteBody}</h1>  
            <div class="divider divider-vertical">|</div>
            <h1>{quote.author}</h1>  
		</div>
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
