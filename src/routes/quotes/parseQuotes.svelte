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
	import { parse } from './parse.js';
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
				quote.originalText.toLowerCase().includes(searchTerm.toLowerCase())
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
		let quoteBody, author, authorTitle, authorCredential, authorInstitution, Tags, tags, context;
		let quote = {
			quoteBody,
			author,
			authorTitle,
			authorCredential,
			authorInstitution,
			Tags,
			tags,
			context
		};

		for (let i = 0; i < quotesArrays.length; i++) {
			item = stringifyArray(quotesArrays[i]);
			if (item.includes('\\r') || item.includes('\\n')) {
				item = item.replace(/(\\r\\n|\\n|\\r)/gm, '');
			}
			console.log(
				'%cparseQuotes.svelte line:85 item',
				'color: white; background-color: #007acc;',
				item
			);
			let workingQuoteObject = {};
			workingQuoteObject['originalText'] = item;
			workingQuoteObject['remainingText'] = item;
			workingQuoteObject['details'] = [];
			workingQuoteObject = parse(workingQuoteObject);
			// workingQuoteObject['details'] = [];
			// workingQuoteObject['startingItem'] = item;
			// workingQuoteObject = parseQuoteText(workingQuoteObject);
			// workingQuoteObject = parseQuoteRemainder(workingQuoteObject);
			quotes = [...quotes, workingQuoteObject];
		}
		storedQuotesArray.set(quotes);
		// saveFile(quotes, "quotes.json")
	}

	function isolateQuotationBlocks(divs) {
		let quoteArray = [];
		for (let i = 0; i < divs.length; i++) {
			let div = divs[i];
			if (div.innerText.length > 5) {
				multiLineQuote++;
				quoteArray = [...quoteArray, div.innerText];
			} else {
				quotesArrays = [...quotesArrays, quoteArray];
				multiLineQuote = 0;
				quoteArray = [];
			}
		}
	}

	function stringifyArray(item) {
		let tempString = '';
		if (item.length > 1) {
			item.forEach((subItem) => {
				tempString += `${subItem}<br>`;
			});
			console.log(
				`🚀 ~ file: parseQuotes.svelte ~ line 20 ~ stringifyArray ~ tempString`,
				tempString
			);
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
	// Tags material/reference is enclosed within `[ ]`
	// an axiomatic saying is prefaced with `Axiom: ` before the name of it `Axiom: Brandolinie's Law`
	// author DOB-Death noted as `(####-####)`
	// quotation year noted at `(####)`
	// if there is additional context or comment, it is signified by `@(xxx xxx)`
	// tags are specified as `#(xxx xxx, ccccc, zzzz)` comma separated, OR each as `#xxx #yyy`
	// I will need also a flag or rating to determine which quotes are authenticated, or the degree of confidence, plus Tagss for this

	// need to clean quotes file more; multiline quotes are getting wrapped in <div>s as separate items
	// the <div><br></div> are useful here; they delineate the actual quotes
	function parseQuote(item) {
		// parseQuoteText(item)
		// parseQuoteRemainder(item)
		// parseAuthorCredential(item)
		// parseAuthorLifespan(item)
		// parseQuoteYear(item)
		// parseQuoteSource(item)
		// parseQuoteTags(item)
		// parseQuoteContext(item)
		// refactor workingQuoteObject for, after quoteBody and author, a nextParts array so any further details can be looped through
		// in the markup.
		// I'm seeing problems in structure here, philosophical problems, like - what is a quote, really?
		// it's an expression of an idea. It could be a statement sourced from written or verbal content,
		// a question, an axiom, a proverb.
		// So, perhaps I need a "type" property of every "quote"?
		// 2021-11-23 working very well but not perfectly.
		// need still to parse for '@' context and '#' tags symbols, and clean up the ' - ' in front of some authors names
		// author names also, sometimes first letter is cut off 'pocryphal'
		// Gary Vee quotes - still needs parsing for source and nickname
	}
</script>

<div class="quotes-wrapper flex flex-col w-1/2">
	<div class="fileinput-wrapper">
		<input
			class="input input-primary"
			id="fileInput"
			type="file"
			bind:files={input_file}
			on:change={readFile(input_file)}
		/>
	</div>
	<div class="flex w-full items-center justify-center">
		<input
			type="text"
			id="filterTextBar"
			placeholder="Search quotes"
			class="w-5/6 mt-5 input input-primary rounded-md text-lg p-4 border-2 border-grey-200"
			bind:value={searchTerm}
		/>
	</div>

<div class="quotes">
	{#if quotes.length}
		{#each filteredQuotes as quote, i}
			<div class="card quote p-3 m-12 shadow-md border-l-2 border-r-2 border-blue-900">
				<div class="badge bg-blue-900">{i + 1}</div>
				<h1 class="quoteBody">"{@html quote.quoteBody}" ~ {@html quote.author}</h1>
				<div class="flex flex-col justify-items-start place-items-start">
					<!-- <h1 class="badge badge-xl badge-success">{quote.author}</h1> -->
					<label class="input-group input-group-xs rounded-none">
						<span class="quotePart">Author</span>
						<span class="rounded-none badge badge-success input-xs">{@html quote.author}</span>
					</label>
					{#if quote.authorTitle}
						<label class="input-group input-group-xs rounded-none">
							<span class="quotePart rounded-none">Title</span>
							<span class="rounded-none badge bg-coolGray-700 text-cyan-400 input-xs"
								>{quote.authorTitle}</span
							>
						</label>
					{/if}
					{#if quote.date}
						<label class="input-group input-group-xs rounded-none">
							<span class="quotePart rounded-none">Date</span>
							<span class="rounded-none badge badge-info bg-coolGray-900 text-blue-500 input-xs"
								>{quote.date}</span
							>
						</label>
					{/if}
					{#if quote.source}
						<label class="input-group input-group-xs rounded-none">
							<span class="quotePart rounded-none">Source</span>
							<span class="rounded-none badge badge-warning input-xs">{quote.source}</span>
						</label>
					{/if}
					<!-- {#if quote.details?.length}
						{#each quote.details as detail}
							DETAILS
							<label class="input-group input-group-xs rounded-none">
								<span class="quotePart rounded-none">{detail.type}</span>
								<span class="rounded-none badge badge-info input-xs">{detail.value}</span>
							</label>
						{/each}
					{/if} -->
				</div>
			</div>
		{/each}
	{:else}
		loading...
	{/if}
</div>
</div>
<style>
	@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Karla:ital,wght@0,200;0,300;1,200;1,300&family=Merriweather:ital,wght@0,300;1,300&family=Montserrat:ital,wght@0,100;0,300;0,500;0,800;1,100;1,300;1,500;1,800&family=Outfit:wght@200;500&display=swap');

	input#filterTextBar {
		margin: 4rem 0 0 0;
	}

	input#fileInput {
		/* display: inline-block;
		width: 100%; */
		position: absolute;
		left: 2rem;
		top: 2rem;
		padding: 60px 0 0 0;
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
	.quotes {
		font-family: 'Outfit', sans-serif;
		font-weight: 200;
	}
	.quote {
		background: linear-gradient(
			36deg,
			rgba(2, 0, 36, 0) 0%,
			rgba(9, 9, 121, 0.5) 35%,
			rgba(2, 0, 36, 0) 100%,
			rgba(0, 212, 255, 0.1) 100%
		);
	}

	.badge {
		font-family: 'Montserrat', sans-serif;
		font-weight: normal;
	}

	.quoteBody {
		padding: 1rem;
		font-family: 'Merriweather', serif;
		font-family: 'Karla', sans-serif;
		font-size: 175%;
		/* font-family: 'Dancing Script', cursive;
        font-size: 250%; */
		font-weight: 300;

		/* background: rgba(2, 0, 36, 1); */

		border-radius: 5px 5px 5px 0;
	}

	.quotePart {
		background: rgba(0, 0, 0, 0.8);
		border-radius: 0px;
		width: 4rem;
	}
</style>
