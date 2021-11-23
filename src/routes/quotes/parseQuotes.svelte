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
import { each } from 'svelte/internal';
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

		for (let i = 108; i < 122; i++) {
			// was divs.length
			item = stringifyArray(quotesArrays[i]);
			if (item.includes('\\r') || item.includes('\\n')) {
				item = item.replace(/(\\r\\n|\\n|\\r)/gm, '');
			}
			let workingQuoteObject = {};
            workingQuoteObject['details'] = []
			console.log(`🚀 ~ file: parseQuotes.svelte ~ line 75 ~ parseFile ~ item`, item);
			workingQuoteObject['startingItem'] = item;
			workingQuoteObject = parseQuoteText(workingQuoteObject);
			workingQuoteObject = parseQuoteRemainder(workingQuoteObject);
			quotes = [...quotes, workingQuoteObject];
		}
		storedQuotesArray.set(quotes);
		// saveFile(quotes, "quotes.json")
	}
	function parseQuoteText(workingQuoteObject) {
		let item = workingQuoteObject['startingItem'];
		let itemEnd = item.length;
		let quoteStart = item.indexOf('"') + 1;
		console.log(
			`🚀 ~ file: parseQuotes.svelte ~ line 112 ~ parseQuoteText ~ quoteStart`,
			quoteStart
		);
		let quoteEnd = item.indexOf('"', 10) - 1;
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 114 ~ parseQuoteText ~ quoteEnd`, quoteEnd);

		workingQuoteObject['remainder'] = Array.from(item)
			.splice(quoteEnd + 4, itemEnd)
			.join(String())
			.trim();
		item = Array.from(item).splice(quoteStart, quoteEnd).join(String());
		workingQuoteObject['quoteBody'] = item;
		return workingQuoteObject;
	}

	function parseQuoteRemainder(workingQuoteObject) {
		let item = workingQuoteObject['remainder'];
		let itemEnd = item.length;
		let author, remainder, nextPart, separatorValue = false;

		if (workingQuoteObject['remainder']) {
            console.log(`🚀 ~ file: parseQuotes.svelte ~ line 122 ~ parseQuoteRemainder ~ workingQuoteObject`, workingQuoteObject)
			separatorValue = findNextSeparatingCharacter(item);
            console.log(`🚀 ~ file: parseQuotes.svelte ~ line 123 ~ parseQuoteRemainder ~ separatorValue`, separatorValue)
            if(item.toLowerCase().includes("axiom")){
                console.log(`🚀 ~ file: parseQuotes.svelte ~ line 123 ~ parseQuoteRemainder ~ includes("axiom")`)
                workingQuoteObject = parseQuoteAxiom(workingQuoteObject)
                workingQuoteObject['author'] = false
            }

			if (separatorValue) {
				nextPart = nameNextPartOfQuote(item, separatorValue);
                console.log(`🚀 ~ file: parseQuotes.svelte ~ line 132 ~ parseQuoteRemainder ~ nextPart`, nextPart)
				workingQuoteObject['nextPart'] = nextPart;
                workingQuoteObject = parseNextPartOfQuote(workingQuoteObject);
				author = Array.from(item).splice(0, separatorValue).join(String());
				remainder = Array.from(item).splice(separatorValue, itemEnd).join(String());
				console.log(
					`🚀 ~ file: parseQuotes.svelte ~ line 142 ~ parseQuoteRemainder ~ nextPart\n\n`,
					nextPart,
					`\n\n`
				);
				console.log(
					`🚀 ~ file: parseQuotes.svelte ~ line 142 ~ parseQuoteRemainder ~ remainder\n\n`,
					remainder,
					`\n\n`
				);
				console.log(
					`🚀 ~ file: parseQuotes.svelte ~ line 142 ~ parseQuoteRemainder ~ author\n\n`,
					author,
					`\n\n`
				);
				workingQuoteObject['author'] = author;
				workingQuoteObject['remainder'] = remainder;
			} else {
				workingQuoteObject['author'] = Array.from(item).splice(0, itemEnd).join(String()).trim();
				console.log(
					`🚀 ~ file: parseQuotes.svelte ~ line 149 ~ parseQuoteRemainder ~ workingQuoteObject['author']`,
					workingQuoteObject['author']
				);
				workingQuoteObject['nextPart'] = false;
				workingQuoteObject['remainder'] = false;
			}
		}

		return workingQuoteObject;
	}

	function nameNextPartOfQuote(item, separatorValue) {
		let char = item.charAt(separatorValue);
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 158 ~ nameNextPartOfQuote \n\n~ char`, char,`\n\n`);
		switch (char) {
			case ',':
				return 'authorTitle';
				break;
			case ':':
				return 'axiom';
				break;
			case '(':
				return 'date';
				break;
			case '[':
				return 'source';
				break;

			default:
				return false;
				break;
		}
	}

	function parseNextPartOfQuote(workingQuoteObject) {
		let nextPart = workingQuoteObject['nextPart'];
		switch (nextPart) {
			case 'authorTitle':
				return parseQuoteAuthorTitle(workingQuoteObject);
				break;

			case 'date':
				return parseQuoteDate(workingQuoteObject);
				break;

			case 'source':
				return parseQuoteSource(workingQuoteObject);
				break;

			case 'context':
				return parseQuoteContext(workingQuoteObject);
				break;

			case 'tag':
				return parseQuoteTags(workingQuoteObject);
				break;

			default:
				break;
		}
		return workingQuoteObject;
	}
    function parseQuoteAuthorTitle(workingQuoteObject) {
        return workingQuoteObject
    }
    function parseQuoteAxiom(workingQuoteObject) {
        let item = workingQuoteObject['remainder'].trim()
        let separatorValue = findNextSeparatingCharacter(item);
        let axiom = Array.from(item).splice(separatorValue + 1, item.length).join(String()).trim()
        workingQuoteObject?.details?.push({'type': 'axiom', 'value': axiom})
        return workingQuoteObject
    }
    function parseQuoteDate(workingQuoteObject) {
        return workingQuoteObject
    }
    function parseQuoteSource(workingQuoteObject) {
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 233 ~ parseQuoteSource ~ workingQuoteObject`, workingQuoteObject)
        let item = workingQuoteObject['remainder'].trim()
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 236 ~ parseQuoteSource ~ item`, item)
        let len = item.length
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 238 ~ parseQuoteSource ~ len`, len)
        let separatorValue = findNextSeparatingCharacter(item);
        let end = getClosingCharacterValue(item, "]")
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 241 ~ parseQuoteSource ~ end`, end)
        let source = Array.from(item).splice(separatorValue + 1, end - separatorValue - 1).join(String()).trim()
        workingQuoteObject?.details?.push({'type': 'source', 'value': source})
        return workingQuoteObject
    }
    function parseQuoteContext(workingQuoteObject) {
        return workingQuoteObject
    }
    function parseQuoteTags(workingQuoteObject) {
        return workingQuoteObject
    }

    function getClosingCharacterValue(item, char){
        let separator = item.indexOf(char)
		return separator
    }


	function findNextSeparatingCharacter(item) {
		let separatorForTitle = item.indexOf(',');
		let separatorForTags = item.indexOf('[');
		let separatorForAxiom = item.indexOf(':');
		let separatorForYear = item.indexOf('(');
		let separatorValues = [
			separatorForTitle,
			separatorForTags,
			separatorForAxiom,
			separatorForYear
		];
		return getMinNotFalse(separatorValues);
	}

	function getMinNotFalse(values) {
		// console.log(
		// 	`🚀 ~ file: parseQuotes.svelte ~ line 227 ~ getMinNotFalse ~ values\n\n`,
		// 	values,
		// 	`\n\n`
		// );
		let first = -1;
		let minValid = false;
		for (let i = 0; i < values.length; i++) {
            values[i] > -1 ? (first = values[i]) : values[i];
			minValid == false && first > -1 ? (minValid = first) : minValid;
			minValid > first && minValid ? (minValid = first) : minValid;
			// console.log(`🚀 ~ file: parseQuotes.svelte ~ line 231 ~ getMinNotFalse ~ \nvalues[i]`, values[i])
			// console.log(`🚀 ~ file: parseQuotes.svelte ~ line 232 ~ getMinNotFalse ~ \nfirst`, first)
			// console.log(`🚀 ~ file: parseQuotes.svelte ~ line 233 ~ getMinNotFalse ~ \nminValid`, minValid)
		}
		// console.log(`\n\ngetMinNotFalse BREAK**********************************\n\n`)
		return minValid;
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
			<h1 class="quoteBody">{quote.quoteBody}</h1>
			<div class="flex flex-col justify-items-start place-items-start">
				<!-- <h1 class="badge badge-xl badge-success">{quote.author}</h1> -->
				<label class="input-group input-group-xs rounded-none">
					<span class="quotePart">Author</span>
					<span class="rounded-none badge badge-success input-xs">{quote.author}</span>
				</label>

                {#if quote.details.length}
                    {#each quote.details as detail}
                    DETAILS
                    <label class="input-group input-group-xs rounded-none">
						<span class="quotePart rounded-none">{detail.type}</span>
						<span class="rounded-none badge badge-info input-xs">{detail.value}</span>
					</label>
                    {/each}
                {/if}
			</div>
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

	.quoteBody {
		padding: 1rem;
		background: rgba(2, 0, 36, 1);
		background: linear-gradient(
			36deg,
			rgba(2, 0, 36, 1) 0%,
			rgba(9, 9, 121, 1) 35%,
			rgba(0, 212, 255, 0.2) 100%
		);
		border-radius: 5px 5px 5px 0;
	}

	.quotePart {
		background: rgba(0, 0, 0, 0.8);
		border-radius: 0px;
		width: 4rem;
	}
</style>
