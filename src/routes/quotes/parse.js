export const parse = (workingQuoteObject) => {
    let { originalText, quoteBody, author, authorTitle, source, lifespan, quoteDate, context, tags, remainingText, parsingComplete } = workingQuoteObject
    workingQuoteObject['remainingText'] = originalText
    if(!quoteBody){
        workingQuoteObject = getQuoteBody(workingQuoteObject)
    }
    if(!author){
        workingQuoteObject = getQuoteAuthor(workingQuoteObject)

    }
    if(!parsingComplete){
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
    let textEnd = text.length;
    let quoteStart = text.indexOf('"') + 1;
    let quoteEnd = text.indexOf('"', 10) - 1;
    workingQuoteObject['remainingText'] = Array.from(text)
        .splice(quoteEnd + 4, textEnd)
        .join(String())
        .trim();
    text = Array.from(text).splice(quoteStart, quoteEnd).join(String());
    workingQuoteObject['quoteBody'] = text;
    return workingQuoteObject;
}

function getQuoteAuthor(workingQuoteObject) {
    let { originalText, quoteBody, author, authorTitle, source, lifespan, quoteDate, context, tags, remainingText, parsingComplete } = workingQuoteObject
    workingQuoteObject['author'] = remainingText
    return workingQuoteObject
}

function parseNextDetail(workingQuoteObject){
    let { originalText, quoteBody, author, authorTitle, source, lifespan, quoteDate, context, tags, remainingText, parsingComplete } = workingQuoteObject
    let text = workingQuoteObject['remainingText']
    let nextDetail = getNextDetail(workingQuoteObject)
    return workingQuoteObject
}

function getNextDetail(workingQuoteObject) {
    let { originalText, author, authorTitle, quoteBody, source, lifespan, quoteDate, context, tags, remainingText, parsingComplete } = workingQuoteObject
    let separatorValue = findNextSeparatingCharacter(remainingText);
    workingQuoteObject['parsingComplete'] = true
}

function findNextSeparatingCharacter(text) {
    let separatorForTitle = text.indexOf(',');
    let separatorForTags = text.indexOf('[');
    let separatorForAxiom = text.indexOf(':');
    let separatorForYear = text.indexOf('(');
    let separatorValues = [
        separatorForTitle,
        separatorForTags,
        separatorForAxiom,
        separatorForYear
    ];
    return getMinNotFalse(separatorValues);
}

	function parseQuoteText(workingQuoteObject) {
		let item = workingQuoteObject['startingItem'];
		let itemEnd = item.length;
		let quoteStart = item.indexOf('"') + 1;
		let quoteEnd = item.indexOf('"', 10) - 1;
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
		let author,
			remainder,
			nextPart,
			separatorValue = false;

		if (workingQuoteObject['remainder']) {
			console.log(
				'\x1b[32m%s\x1b[0m',
				'parseQuotes.svelte line:116 workingQuoteObject',
				workingQuoteObject
			);
			// console.log(`🚀 ~ file: parseQuotes.svelte ~ line 122 ~ parseQuoteRemainder ~ workingQuoteObject`, workingQuoteObject)
			separatorValue = findNextSeparatingCharacter(item);
			// console.log(`🚀 ~ file: parseQuotes.svelte ~ line 123 ~ parseQuoteRemainder ~ separatorValue`, separatorValue)
			if (item.toLowerCase().includes('axiom')) {
				// console.log(`🚀 ~ file: parseQuotes.svelte ~ line 123 ~ parseQuoteRemainder ~ includes("axiom")`)
				workingQuoteObject = parseQuoteAxiom(workingQuoteObject, separatorValue);
				workingQuoteObject['author'] = false;
			}
			nextPart = nameNextPartOfQuote(item, separatorValue);
			if (nextPart) {
                workingQuoteObject['nextPart'] = nextPart;
				workingQuoteObject = parseNextPartOfQuote(workingQuoteObject, separatorValue);
				if (!workingQuoteObject['author']) {
					parseQuoteAuthorName(workingQuoteObject, separatorValue);
				}
				console.log('\x1b[42m%s\x1b[0m', 'parseQuotes.svelte line:128 nextPart', nextPart);
				workingQuoteObject['nextPart'] = nextPart;

			} else {
				workingQuoteObject['remainder'] = item;
				console.log('\x1b[41m%s\x1b[0m', 'parseQuotes.svelte line:142 item', item);
				parseQuoteAuthorName(workingQuoteObject, separatorValue);
				// workingQuoteObject['author'] = Array.from(item).splice(0, itemEnd).join(String()).trim();
				console.log(
					`🚀 ~ file: parseQuotes.svelte ~ line 149 ~ parseQuoteRemainder ~ workingQuoteObject['author']`,
					workingQuoteObject['author']
				);
				workingQuoteObject['nextPart'] = false;
				workingQuoteObject['remainder'] = false;
			}
			// parseQuoteRemainder(workingQuoteObject)
		}

		return workingQuoteObject;
	}

	function nameNextPartOfQuote(item, separatorValue) {
		let char = item.charAt(separatorValue);
		console.log(
			`🚀 ~ file: parseQuotes.svelte ~ line 158 ~ nameNextPartOfQuote \n\n~ char`,
			char,
			`\n\n`
		);
		console.log(
			'%cparseQuotes.svelte line:169 item',
			'color: white; background-color: #007acc;',
			item
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
	function parseQuoteAuthorName(workingQuoteObject, separatorValue) {
		console.log(
			`🚀 ~ file: parseQuotes.svelte ~ line 224 ~ parseQuoteAuthorName ~ separatorValue`,
			separatorValue
		);
		console.log(
			`🚀 ~ file: parseQuotes.svelte ~ line 224 ~ parseQuoteAuthorName ~ workingQuoteObject`,
			workingQuoteObject
		);
        let author, remainder
		let item = workingQuoteObject['remainder'];
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 226 ~ parseQuoteAuthorName ~ item`, item);
		let itemEnd = item.length;
		if (separatorValue) {
			author = Array.from(item).splice(0, separatorValue).join(String());
            console.log(`🚀 ~ file: parseQuotes.svelte ~ line 238 ~ parseQuoteAuthorName ~ author`, author)
			remainder = Array.from(item).splice(separatorValue, itemEnd).join(String());
            console.log(`🚀 ~ file: parseQuotes.svelte ~ line 240 ~ parseQuoteAuthorName ~ remainder`, remainder)
		} else {
            author = workingQuoteObject['remainder']
			remainder = false
		}
		workingQuoteObject['author'] = author;
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 246 ~ parseQuoteAuthorName ~ author`, author)
		workingQuoteObject['remainder'] = remainder;
		return workingQuoteObject;
	}

	function parseQuoteAuthorTitle(workingQuoteObject, separatorValue) {
        let title, remainder, nextPart
		let item = workingQuoteObject['remainder'];
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 242 ~ parseQuoteAuthorTitle ~ item`, item);
		let itemEnd = item.length;
		console.log(
			`🚀 ~ file: parseQuotes.svelte ~ line 239 ~ parseQuoteAuthorTitle ~ workingQuoteObject`,
			workingQuoteObject
		);
		console.log(
			`🚀 ~ file: parseQuotes.svelte ~ line 239 ~ parseQuoteAuthorTitle ~ separatorValue`,
			separatorValue
		);
        separatorValue = findNextSeparatingCharacter(item);
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 261 ~ parseQuoteAuthorTitle ~ separatorValue`, separatorValue)
        nextPart = nameNextPartOfQuote(item, separatorValue)
        workingQuoteObject['nextPart'] = nextPart
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 267 ~ parseQuoteAuthorTitle ~ nextPart`, nextPart)

        if (nextPart) {
			title = Array.from(item).splice(1, separatorValue - 1).join(String()).trim();
            console.log(`🚀 ~ file: parseQuotes.svelte ~ line 238 ~ parseQuoteAuthorName ~ title`, title)
			remainder = Array.from(item).splice(separatorValue, itemEnd).join(String());
            console.log(`🚀 ~ file: parseQuotes.svelte ~ line 240 ~ parseQuoteAuthorName ~ remainder`, remainder)
		} else {
            title = workingQuoteObject['remainder']
			remainder = false
		}
		workingQuoteObject['authorTitle'] = title;
        workingQuoteObject.details.push({'type': 'Author title', 'value': title})
		workingQuoteObject['remainder'] = remainder;
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 281 ~ parseQuoteAuthorTitle ~ workingQuoteObject\n\n`, workingQuoteObject,`\n\n`)
		return workingQuoteObject;
	}
	function parseQuoteAxiom(workingQuoteObject, separatorValue) {
		let item = workingQuoteObject['remainder'].trim();
		separatorValue = findNextSeparatingCharacter(item);
		let axiom = Array.from(item)
			.splice(separatorValue + 1, item.length)
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
		let item = workingQuoteObject['remainder'];
        console.log(`🚀 ~ file: parseQuotes.svelte ~ line 287 ~ parseQuoteDate ~ item`, item)
        workingQuoteObject['date'] = item
		let itemEnd = item.length;
		let date = Array.from(item).splice(0, separatorValue).join(String());
		let remainder = Array.from(item).splice(separatorValue, itemEnd).join(String());
		workingQuoteObject['nextPart'] = false;
		return workingQuoteObject;
	}
	function parseQuoteSource(workingQuoteObject, separatorValue) {
		console.log(
			`🚀 ~ file: parseQuotes.svelte ~ line 233 ~ parseQuoteSource ~ workingQuoteObject`,
			workingQuoteObject
		);
		let item = workingQuoteObject['remainder'].trim();
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 236 ~ parseQuoteSource ~ item`, item);
		let len = item.length;
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 238 ~ parseQuoteSource ~ len`, len);
		separatorValue = findNextSeparatingCharacter(item);
		let end = getClosingCharacterValue(item, ']');
		console.log(`🚀 ~ file: parseQuotes.svelte ~ line 241 ~ parseQuoteSource ~ end`, end);
		let source = Array.from(item)
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

	function getClosingCharacterValue(item, char) {
		let separator = item.indexOf(char);
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