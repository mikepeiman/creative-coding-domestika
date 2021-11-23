export const parse = (workingQuoteObject) => {
    let { originalText, quoteBody, author, authorTitle, source, lifespan, quoteDate, context, tags, remainingText, parsingComplete } = workingQuoteObject
    workingQuoteObject['remainingText'] = originalText
    if(!workingQuoteObject['quoteBody']){
        workingQuoteObject = getQuoteBody(workingQuoteObject)
    }
    if(!workingQuoteObject['author']){
        workingQuoteObject = getQuoteAuthor(workingQuoteObject)
    }
    if(!workingQuoteObject['parsingComplete']){
        workingQuoteObject = parseNextDetail(workingQuoteObject)
        parse(workingQuoteObject)
    }
    console.log(`🚀 ~ file: parse.js ~ line 14 ~ parse ~ workingQuoteObject`, workingQuoteObject)
    return workingQuoteObject
}

function getQuoteBody(workingQuoteObject) {
    console.log('%cHello parse.js line:23 ', 'background: green; color: white; display: block;');
    let { originalText, quoteBody, author, authorTitle, source, lifespan, quoteDate, context, tags, remainingText, parsingComplete } = workingQuoteObject
    workingQuoteObject['quoteBody'] = originalText
    let text = originalText
    let textEnd = remainingText.length;
    let quoteStart = remainingText.indexOf('"') + 1;
    let quoteEnd = remainingText.indexOf('"', 10) - 1;
    workingQuoteObject['remainingText'] = Array.from(remainingText)
        .splice(quoteEnd + 4, textEnd)
        .join(String())
        .trim();
    text = Array.from(remainingText).splice(quoteStart, quoteEnd).join(String());
    workingQuoteObject['quoteBody'] = text;
    return workingQuoteObject;
}

function getQuoteAuthor(workingQuoteObject) {
    let { originalText, quoteBody, author, authorTitle, source, lifespan, quoteDate, context, tags, remainingText, parsingComplete } = workingQuoteObject
    workingQuoteObject['author'] = remainingText
    let textEnd = remainingText.length;
    let separatorValue = findNextSeparatingCharacter(remainingText);
    console.log(`🚀 ~ file: parse.js ~ line 41 ~ getQuoteAuthor ~ separatorValue`, separatorValue)
    if (separatorValue) {
        console.log('%cparse.js line:42 `true`', 'color: white; background-color: #007acc;', `true`);
        author = Array.from(remainingText).splice(0, separatorValue).join(String()).trim();
        remainingText = Array.from(remainingText).splice(separatorValue, textEnd).join(String()).trim();
    } else {
        author = workingQuoteObject['remainingText'].trim()
        workingQuoteObject['remainingText'] = false
        workingQuoteObject['parsingComplete'] = true
    }
    workingQuoteObject['author'] = author.trim();
    console.log(`🚀 ~ file: parseQuotes.svelte ~ line 246 ~ parseQuoteAuthorName ~ author`, author)
    console.log(`🚀 ~ file: parse.js ~ line 51 ~ getQuoteAuthor ~ remainingText`, remainingText)
    return workingQuoteObject
}

function parseNextDetail(workingQuoteObject){
    let { originalText, quoteBody, author, authorTitle, source, lifespan, quoteDate, context, tags, remainingText, parsingComplete } = workingQuoteObject
    let separatorValue = findNextSeparatingCharacter(remainingText);
    let nextPart = nameNextPartOfQuote(remainingText, separatorValue)
    console.log('\x1b[41m%s\x1b[0m', 'parse.js line:60 nextPart', nextPart);
    console.log(`🚀 ~ file: parse.js ~ line 60 ~ parseNextDetail ~ nextPart`, nextPart)

    workingQuoteObject['parsingComplete'] = true
    // let nextDetail = getNextDetail(workingQuoteObject)
    return workingQuoteObject
}

function getNextDetail(workingQuoteObject) {
    let { originalText, author, authorTitle, quoteBody, source, lifespan, quoteDate, context, tags, remainingText, parsingComplete } = workingQuoteObject
    let separatorValue = findNextSeparatingCharacter(remainingText);
    let nextPart = nameNextPartOfQuote(remainingText, separatorValue)
    console.log(`🚀 ~ file: parse.js ~ line 67 ~ getNextDetail ~ nextPart`, nextPart)
    console.log(`🚀 ~ file: parse.js ~ line 66 ~ getNextDetail ~ separatorValue`, separatorValue)
    workingQuoteObject['parsingComplete'] = true
}

function findNextSeparatingCharacter(remainingText) {
    console.log(`🚀 ~ file: parse.js ~ line 68 ~ findNextSeparatingCharacter ~ text`, remainingText)
    let separatorForTitle = remainingText.indexOf(',');
    let separatorForTags = remainingText.indexOf('[');
    let separatorForAxiom = remainingText.indexOf(':');
    let separatorForYear = remainingText.indexOf('(');
    let separatorValues = [
        separatorForTitle,
        separatorForTags,
        separatorForAxiom,
        separatorForYear
    ];
    return getMinNotFalse(separatorValues);
}

	function parseQuoteText(workingQuoteObject) {
		let text = workingQuoteObject['startingtext'];
		let textEnd = remainingText.length;
		let quoteStart = remainingText.indexOf('"') + 1;
		let quoteEnd = remainingText.indexOf('"', 10) - 1;
		workingQuoteObject['remainingText'] = Array.from(remainingText)
			.splice(quoteEnd + 4, textEnd)
			.join(String())
			.trim();
		text = Array.from(remainingText).splice(quoteStart, quoteEnd).join(String());
		workingQuoteObject['quoteBody'] = text;
		return workingQuoteObject;
	}

	function parseQuoteremainingText(workingQuoteObject) {
		let text = workingQuoteObject['remainingText'];
		let textEnd = remainingText.length;
		let author,
			remainingText,
			nextPart,
			separatorValue = false;

		if (workingQuoteObject['remainingText']) {
			console.log(
				'\x1b[32m%s\x1b[0m',
				'parseQuotes.svelte line:116 workingQuoteObject',
				workingQuoteObject
			);
			// console.log(`🚀 ~ file: parseQuotes.svelte ~ line 122 ~ parseQuoteremainingText ~ workingQuoteObject`, workingQuoteObject)
			separatorValue = findNextSeparatingCharacter(remainingText);
			// console.log(`🚀 ~ file: parseQuotes.svelte ~ line 123 ~ parseQuoteremainingText ~ separatorValue`, separatorValue)
			if (remainingText.toLowerCase().includes('axiom')) {
				// console.log(`🚀 ~ file: parseQuotes.svelte ~ line 123 ~ parseQuoteremainingText ~ includes("axiom")`)
				workingQuoteObject = parseQuoteAxiom(workingQuoteObject, separatorValue);
				workingQuoteObject['author'] = false;
			}
			nextPart = nameNextPartOfQuote(text, separatorValue);
			if (nextPart) {
                workingQuoteObject['nextPart'] = nextPart;
				workingQuoteObject = parseNextPartOfQuote(workingQuoteObject, separatorValue);
				if (!workingQuoteObject['author']) {
					parseQuoteAuthorName(workingQuoteObject, separatorValue);
				}
				console.log('\x1b[42m%s\x1b[0m', 'parseQuotes.svelte line:128 nextPart', nextPart);
				workingQuoteObject['nextPart'] = nextPart;

			} else {
				workingQuoteObject['remainingText'] = text;
				console.log('\x1b[41m%s\x1b[0m', 'parseQuotes.svelte line:142 text', remainingText);
				parseQuoteAuthorName(workingQuoteObject, separatorValue);
				// workingQuoteObject['author'] = Array.from(remainingText).splice(0, textEnd).join(String()).trim();
				console.log(
					`🚀 ~ file: parseQuotes.svelte ~ line 149 ~ parseQuoteremainingText ~ workingQuoteObject['author']`,
					workingQuoteObject['author']
				);
				workingQuoteObject['nextPart'] = false;
				workingQuoteObject['remainingText'] = false;
			}
			// parseQuoteremainingText(workingQuoteObject)
		}

		return workingQuoteObject;
	}

	function nameNextPartOfQuote(remainingText, separatorValue) {
		let char = remainingText.charAt(separatorValue);
		console.log(
			`🚀 ~ file: parseQuotes.svelte ~ line 158 ~ nameNextPartOfQuote \n\n~ char`,
			char,
			`\n\n`
		);
		console.log(
			'%cparseQuotes.svelte line:169 text',
			'color: white; background-color: #007acc;',
			remainingText
		);
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

	function parseNextPartOfQuote(workingQuoteObject, separatorValue) {
		let nextPart = workingQuoteObject['nextPart'];
		console.log('\x1b[31m%s\x1b[0m', 'parseQuotes.svelte line:191 nextPart', nextPart);
		switch (nextPart) {
			case 'authorTitle':
				return parseQuoteAuthorTitle(workingQuoteObject, separatorValue);
				break;

			case 'date':
				return parseQuoteDate(workingQuoteObject, separatorValue);
				break;

			case 'source':
				return parseQuoteSource(workingQuoteObject, separatorValue);
				break;

			case 'context':
				return parseQuoteContext(workingQuoteObject, separatorValue);
				break;

			case 'tag':
				return parseQuoteTags(workingQuoteObject, separatorValue);
				break;

			default:
				break;
		}
		return workingQuoteObject;
	}

	function parseQuoteAuthorTitle(workingQuoteObject, separatorValue) {
        let title, remainingText, nextPart
		let text = workingQuoteObject['remainingText'];
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 242 ~ parseQuoteAuthorTitle ~ text`, remainingText);
		let textEnd = remainingText.length;
		console.log(
			`🚀 ~ file: parseQuotes.svelte ~ line 239 ~ parseQuoteAuthorTitle ~ workingQuoteObject`,
			workingQuoteObject
		);
		console.log(
			`🚀 ~ file: parseQuotes.svelte ~ line 239 ~ parseQuoteAuthorTitle ~ separatorValue`,
			separatorValue
		);
        separatorValue = findNextSeparatingCharacter(remainingText);
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 261 ~ parseQuoteAuthorTitle ~ separatorValue`, separatorValue)
        nextPart = nameNextPartOfQuote(text, separatorValue)
        workingQuoteObject['nextPart'] = nextPart
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 267 ~ parseQuoteAuthorTitle ~ nextPart`, nextPart)

        if (nextPart) {
			title = Array.from(remainingText).splice(1, separatorValue - 1).join(String()).trim();
            console.log(`🚀 ~ file: parseQuotes.svelte ~ line 238 ~ parseQuoteAuthorName ~ title`, title)
			remainingText = Array.from(remainingText).splice(separatorValue, textEnd).join(String());
            console.log(`🚀 ~ file: parseQuotes.svelte ~ line 240 ~ parseQuoteAuthorName ~ remainingText`, remainingText)
		} else {
            title = workingQuoteObject['remainingText']
			remainingText = false
		}
		workingQuoteObject['authorTitle'] = title;
        workingQuoteObject.details.push({'type': 'Author title', 'value': title})
		workingQuoteObject['remainingText'] = remainingText;
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 281 ~ parseQuoteAuthorTitle ~ workingQuoteObject\n\n`, workingQuoteObject,`\n\n`)
		return workingQuoteObject;
	}
	function parseQuoteAxiom(workingQuoteObject, separatorValue) {
		let text = workingQuoteObject['remainingText'].trim();
		separatorValue = findNextSeparatingCharacter(remainingText);
		let axiom = Array.from(remainingText)
			.splice(separatorValue + 1, remainingText.length)
			.join(String())
			.trim();
		workingQuoteObject.details.push({ type: 'axiom', value: axiom });
		return workingQuoteObject;
	}
	function parseQuoteDate(workingQuoteObject, separatorValue) {
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 281 ~ parseQuoteDate ~ separatorValue`, separatorValue)
		console.log(
			'\x1b[31m%s\x1b[0m',
			'parseQuotes.svelte line:239 workingQuoteObject',
			workingQuoteObject
		);
		let text = workingQuoteObject['remainingText'];
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 287 ~ parseQuoteDate ~ text`, remainingText)
        workingQuoteObject['date'] = text
		let textEnd = remainingText.length;
		let date = Array.from(remainingText).splice(0, separatorValue).join(String());
		let remainingText = Array.from(remainingText).splice(separatorValue, textEnd).join(String());
		workingQuoteObject['nextPart'] = false;
		return workingQuoteObject;
	}
	function parseQuoteSource(workingQuoteObject, separatorValue) {
		console.log(
			`🚀 ~ file: parseQuotes.svelte ~ line 233 ~ parseQuoteSource ~ workingQuoteObject`,
			workingQuoteObject
		);
		let text = workingQuoteObject['remainingText'].trim();
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 236 ~ parseQuoteSource ~ text`, remainingText);
		let len = remainingText.length;
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 238 ~ parseQuoteSource ~ len`, len);
		separatorValue = findNextSeparatingCharacter(remainingText);
		let end = getClosingCharacterValue(text, ']');
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 241 ~ parseQuoteSource ~ end`, end);
		let source = Array.from(remainingText)
			.splice(separatorValue + 1, end - separatorValue - 1)
			.join(String())
			.trim();
		workingQuoteObject?.details?.push({ type: 'source', value: source });
		return workingQuoteObject;
	}
	function parseQuoteContext(workingQuoteObject, separatorValue) {
		workingQuoteObject['nextPart'] = false;
		return workingQuoteObject;
	}
	function parseQuoteTags(workingQuoteObject, separatorValue) {
		workingQuoteObject['nextPart'] = false;
		return workingQuoteObject;
	}

	function getClosingCharacterValue(text, char) {
		let separator = remainingText.indexOf(char);
		return separator;
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

	// need to clean quotes file more; multiline quotes are getting wrapped in <div>s as separate texts
	// the <div><br></div> are useful here; they delineate the actual quotes
	function parseQuote(remainingText) {
		// parseQuoteText(remainingText)
		// parseQuoteremainingText(remainingText)
		// parseAuthorCredential(remainingText)
		// parseAuthorLifespan(remainingText)
		// parseQuoteYear(remainingText)
		// parseQuoteSource(remainingText)
		// parseQuoteTags(remainingText)
		// parseQuoteContext(remainingText)
		// refactor workingQuoteObject for, after quoteBody and author, a nextParts array so any further details can be looped through
		// in the markup.
		// I'm seeing problems in structure here, philosophical problems, like - what is a quote, really?
		// it's an expression of an idea. It could be a statement sourced from written or verbal content,
		// a question, an axiom, a proverb.
		// So, perhaps I need a "type" property of every "quote"?
	}