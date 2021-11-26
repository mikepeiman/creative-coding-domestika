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
	import { parse } from './parseQuotes.js';
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
		quotesArrays = isolateQuotationBlocks(divs);
		for (let i = 0; i < 660; i++) { 
			// 54-64 gives the meical journal quotes
			let item = stringifyArray(quotesArrays[i]);
			if (item.includes('\\r') || item.includes('\\n')) {
				item = item.replace(/(\\r\\n|\\n|\\r)/gm, '');
			}
			let workingQuoteObject = {};
			workingQuoteObject['originalText'] = workingQuoteObject['remainingText'] = item;
			workingQuoteObject['details'] =	workingQuoteObject['authorTitle'] =	workingQuoteObject['tags'] = workingQuoteObject['sources'] = []
			// console.log(`🚀 ~ file: parseQuotes.svelte ~ line 77 ~ parseFile ~ workingQuoteObject`, workingQuoteObject)
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
		return quotesArrays;
	}

	function stringifyArray(item) {
		let tempString = '';
		if (item.length > 1) {
			item.forEach((subItem) => {
				tempString += `${subItem}<br>`;
			});
			return tempString;
		} else {
			tempString = '';
			return item[0];
		}
	}
</script>

<div class="quotes-wrapper flex flex-col w-full">
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
				<div class="card quote p-3 m-12 shadow-md border-sky-500 rounded-sm">
					<div class="badge bg-gray-700">{i + 1}</div>
					<h1 class="quote-body p-8">
						<span class="quote-mark text-sky-300">&ldquo;</span>{@html quote.quoteBody}<span
							class="quote-mark text-sky-300">&rdquo;</span
						>
						<span class="quote-author text-sky-300">~ {@html quote.author}</span>
					</h1>
					<div class="flex flex-col justify-items-start place-items-start">
						<!-- <h1 class="badge badge-xl badge-success">{quote.author}</h1> -->
						<label class="input-group input-group-xs rounded-none">
							<span class="quotepart-label">Author</span>
							<span class="rounded-none badge badge-success bg-coolGray-900 text-sky-300 input-xs"
								>{@html quote.author}</span
							>
						</label>
						{#if quote.authorTitle}
							<label class="input-group input-group-xs rounded-none">
								<span class="quotepart-label rounded-none">Title</span>
								{#each quote.authorTitle as title}
									<span
										class="rounded-none badge badge-success bg-coolGray-900 text-sky-400 input-xs"
										>{title}</span
									>
								{/each}
							</label>
						{/if}
						{#if quote.date}
							<label class="input-group input-group-xs rounded-none">
								<span class="quotepart-label rounded-none">Date</span>
								<span class="rounded-none badge badge-info bg-coolGray-900 text-gray-400 input-xs"
									>{quote.date}</span
								>
							</label>
						{/if}
						{#if quote.source}
							<label class="input-group input-group-xs rounded-none">
								<span class="quotepart-label rounded-none">Source</span>
								<span
									class="rounded-none badge badge-warning input-xs bg-coolGray-900 text-sky-500 input-xs"
									>{quote.source}</span
								>
							</label>
						{/if}
						{#if quote.tags.length}
							{#each quote.tags as tag}
								<label class="input-group input-group-xs rounded-none">
									<span class="quotepart-label rounded-none">Tags</span>
									<span
										class="rounded-none badge badge-warning input-xs bg-coolGray-900 text-sky-500 input-xs"
										>{tag}</span
									>
								</label>
							{/each}
						{/if}
						{#if quote.context}
							<label class="input-group input-group-xs rounded-none">
								<span class="quotepart-label rounded-none">Context</span>
								<span
									class="rounded-none badge badge-warning input-xs bg-coolGray-900 text-sky-500 input-xs"
									>{quote.context}</span
								>
							</label>
						{/if}
						{#if quote.details?.length}
							{#each quote.details as detail}
								DETAILS
								<label class="input-group input-group-xs rounded-none">
									<span class="quotepart-label rounded-none">{detail.type}</span>
									<span class="rounded-none badge badge-info input-xs">{detail.value}</span>
								</label>
							{/each}
						{/if}
					</div>
				</div>
			{/each}
		{:else}
			loading...
		{/if}
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Allura&family=Bad+Script&family=Coda:wght@400;800&family=Dancing+Script&family=Forum&family=Gideon+Roman&family=Great+Vibes&family=Karla:ital,wght@0,200;0,300;1,200;1,300&family=Lemonada:wght@300;400;500&family=Lobster&family=Merriweather:ital,wght@0,300;1,300&family=Monoton&family=Montserrat:ital,wght@0,100;0,300;0,500;0,800;1,100;1,300;1,500;1,800&family=Outfit:wght@200;500&family=Overlock:ital,wght@0,400;0,700;1,400;1,700&family=Staatliches&display=swap');

	/* font-family: 'Allura', cursive;
font-family: 'Bad Script', cursive;
font-family: 'Coda', cursive;
font-family: 'Dancing Script', cursive;
font-family: 'Forum', cursive;
font-family: 'Gideon Roman', cursive;
font-family: 'Great Vibes', cursive;
font-family: 'Karla', sans-serif;
font-family: 'Lemonada', cursive;
font-family: 'Lobster', cursive;
font-family: 'Merriweather', serif;
font-family: 'Monoton', cursive;
font-family: 'Montserrat', sans-serif;
font-family: 'Outfit', sans-serif;
font-family: 'Overlock', cursive;
font-family: 'Staatliches', cursive; */

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
		/* font-family: 'Karla', sans-serif; */
		/* font-family: 'Lemonada', cursive; */
		font-family: 'Merriweather', serif;
		/* font-family: 'Montserrat', sans-serif; */
		/* font-family: 'Outfit', sans-serif; */
		/* font-family: 'Overlock', cursive; */
		/* font-family: 'Staatliches', cursive; */

		font-weight: 300;
	}
	.quote {
		font-size: 150%;
		background: linear-gradient(
			36deg,
			rgba(2, 0, 36, 0) 0%,
			rgba(9, 9, 121, 0.5) 35%,
			rgba(2, 0, 36, 0) 100%,
			rgba(0, 212, 255, 0.1) 100%
		);
	}

	.quote-author {
		color: rgba(100, 200, 255, 1);
	}

	.quote-body {
		/* background: rgba(10,20,30,1);  */
		/* font-family: 'Gideon Roman', cursive; */
		/* font-family: 'Forum', cursive; */
		/* font-family: 'Bad Script', cursive; */
	}

	.quote-mark {
		font-family: 'Montserrat', serif;
		font-size: 125%;
		font-weight: 300;
		font-weight: 100;
		/* color: rgba(100, 200, 255, 1); */

		/* font-family: 'Bad Script', cursive; */
		font-family: 'Coda', cursive;
		/* font-family: 'Forum', cursive; */
		/* font-family: 'Gideon Roman', cursive; */
		/* font-family: 'Karla', sans-serif; */
		/* font-family: 'Lemonada', cursive; */
		/* font-family: 'Lobster', cursive; */
		/* font-family: 'Merriweather', serif;
        font-size: 100%; */
		/* font-family: 'Outfit', sans-serif; */
		/* font-family: 'Overlock', cursive; */
		/* font-family: 'Staatliches', cursive; */
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

	.quotepart-label {
		background: rgba(0, 0, 0, 0.8);
		border-radius: 0px;
		width: 4rem;
	}
</style>
