export const parse = (workingQuoteObject) => {
    let { originalText } = workingQuoteObject
    if (!workingQuoteObject['quoteBody']) {
        workingQuoteObject = getQuoteBody(workingQuoteObject)
    }
    if (!workingQuoteObject['author']) {
        workingQuoteObject = getQuoteAuthor(workingQuoteObject)
    }
    if (!workingQuoteObject['parsingComplete']) {
        workingQuoteObject = parseNextDetail(workingQuoteObject)
        parse(workingQuoteObject)
    }
    // console.log(`🚀 ~ file: parse.js ~ line 14 ~ parse ~ workingQuoteObject`, workingQuoteObject)
    return workingQuoteObject
}

function getQuoteBody(workingQuoteObject) {
    let { originalText, remainingText } = workingQuoteObject
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
    let { author, remainingText } = workingQuoteObject
    workingQuoteObject['author'] = remainingText.trim()
    console.log(`🚀 ~ file: parse.js ~ line 36 ~ getQuoteAuthor ~ remainingText`, remainingText)
    let textEnd = remainingText.length;
    let separatorValue = findNextSeparatingCharacter(remainingText);
    if (separatorValue > -1) {
        console.log(`🚀 ~ file: parse.js ~ line 39 ~ getQuoteAuthor ~ separatorValue`, separatorValue)
        console.log('%cparse.js line:40 separatorValue', 'color: white; background-color: #26bfa5;', separatorValue);
        author = Array.from(remainingText).splice(0, separatorValue).join(String()).trim();
        console.log(`🚀 ~ file: parse.js ~ line 42 ~ getQuoteAuthor ~ author`, author)
        remainingText = Array.from(remainingText).splice(separatorValue, textEnd).join(String()).trim();
        console.log(`🚀 ~ file: parse.js ~ line 44 ~ getQuoteAuthor ~ remainingText`, remainingText)
        workingQuoteObject['remainingText'] = remainingText
    } else {
        console.log('\x1b[41m%s\x1b[0m', 'parse.js line:45 separatorValue', separatorValue);
        author = workingQuoteObject['remainingText'].trim()
        workingQuoteObject['remainingText'] = false
        workingQuoteObject['parsingComplete'] = true
    }
    workingQuoteObject['author'] = author.trim();
    console.log(`🚀 ~ file: parseQuotes.svelte ~ line 53 ~ parseQuoteAuthorName ~ author`, author)
    console.log(`🚀 ~ file: parse.js ~ line 54 ~ getQuoteAuthor ~ remainingText`, remainingText)
    return workingQuoteObject
}

function parseNextDetail(workingQuoteObject) {
    let { remainingText } = workingQuoteObject
    if (!remainingText) {
        workingQuoteObject['parsingComplete'] = true
        return workingQuoteObject
    }
    console.log(`🚀 ~ file: parse.js ~ line 61 ~ parseNextDetail ~ remainingText`, remainingText)
    let separatorValue = findNextSeparatingCharacter(remainingText);
    let nextPart = nameNextPartOfQuote(remainingText, separatorValue)
    console.log('\x1b[41m%s\x1b[0m', 'parse.js line:60 nextPart', nextPart);
    console.log(`🚀 ~ file: parse.js ~ line 60 ~ parseNextDetail ~ nextPart`, nextPart)
    workingQuoteObject = parseNextPartOfQuote(workingQuoteObject, nextPart, separatorValue)
    // workingQuoteObject['parsingComplete'] = true
    return workingQuoteObject
}

function findNextSeparatingCharacter(remainingText) {
    console.log(`🚀 ~ file: parse.js ~ line 68 ~ findNextSeparatingCharacter ~ text`, remainingText)
    let separatorForTitle = remainingText.indexOf(',');
    let separatorForSource = remainingText.indexOf('[');
    let separatorForAxiom = remainingText.indexOf(':');
    let separatorForYear = remainingText.indexOf('(');
    let separatorForContext = remainingText.indexOf('@');
    let separatorForTags = remainingText.indexOf('#');
    let separatorValues = [
        separatorForTitle,
        separatorForSource,
        separatorForAxiom,
        separatorForYear,
        separatorForTags,
        separatorForContext
    ];
    return getMinNotFalse(separatorValues);
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

        case '@':
            return 'context';
            break;

        case '#':
            return 'tags';
            break;

        default:
            return false;
            break;
    }
}

function parseNextPartOfQuote(workingQuoteObject, nextPart, separatorValue) {
    console.log('\x1b[31m%s\x1b[0m', 'parseQuotes.svelte line:191 nextPart', nextPart);
    switch (nextPart) {
        case 'authorTitle':
            return parseQuoteAuthorTitle(workingQuoteObject, separatorValue);
            break;

        case 'axiom':
            return parseQuoteAxiom(workingQuoteObject, separatorValue);
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

        case 'tags':
            return parseQuoteTags(workingQuoteObject, separatorValue);
            break;

        default:
            workingQuoteObject['parsingComplete'] = true
            break;
    }
    return workingQuoteObject;
}

function parseQuoteAuthorTitle(workingQuoteObject, separatorValue) {
    let title, text, nextPart
    text = workingQuoteObject['remainingText'].trim();
    let textEnd = text.length;
    text = Array.from(text).splice(separatorValue + 1, textEnd).join(String())
    separatorValue = findNextSeparatingCharacter(text);
    nextPart = nameNextPartOfQuote(text, separatorValue)
    console.log('%cparse.js line:148 nextPart', 'color: white; background-color: #007acc;', nextPart);
    console.log(`🚀 ~ file: parse.js ~ line 148 ~ parseQuoteAuthorTitle ~ nextPart`, nextPart)
    workingQuoteObject['nextPart'] = nextPart
    if (nextPart) {
        title = Array.from(text).splice(1, separatorValue - 1).join(String()).trim();
        text = Array.from(text).splice(separatorValue, textEnd).join(String());
    } else {
        title = text
        text = false
    }
    workingQuoteObject['authorTitle'] = title.trim();
    workingQuoteObject.details.push({ 'type': 'Author title', 'value': title })
    workingQuoteObject['remainingText'] = text;
    // workingQuoteObject['parsingComplete'] = true
    console.log(`🚀 ~ file: parseQuotes.svelte ~ line 281 ~ parseQuoteAuthorTitle ~ workingQuoteObject\n\n`, workingQuoteObject, `\n\n`)
    return workingQuoteObject;
}
function parseQuoteAxiom(workingQuoteObject, separatorValue) {
    let title, text, nextPart
    text = workingQuoteObject['remainingText'].trim();
    let textEnd = text.length;
    text = Array.from(text).splice(separatorValue + 1, textEnd).join(String())
    separatorValue = findNextSeparatingCharacter(text);
    nextPart = nameNextPartOfQuote(text, separatorValue)
    console.log('%cparse.js line:148 nextPart', 'color: white; background-color: #007acc;', nextPart);
    console.log(`🚀 ~ file: parse.js ~ line 148 ~ parseQuoteAuthorTitle ~ nextPart`, nextPart)
    workingQuoteObject['nextPart'] = nextPart
    if (nextPart) {
        title = Array.from(text).splice(1, separatorValue - 1).join(String()).trim();
        text = Array.from(text).splice(separatorValue, textEnd).join(String());
    } else {
        title = text
        text = false
    }
    workingQuoteObject['authorTitle'] = title.trim();
    workingQuoteObject.details.push({ 'type': 'Author title', 'value': title })
    workingQuoteObject['remainingText'] = text;
    // workingQuoteObject['parsingComplete'] = true
    console.log(`🚀 ~ file: parseQuotes.svelte ~ line 281 ~ parseQuoteAuthorTitle ~ workingQuoteObject\n\n`, workingQuoteObject, `\n\n`)
    return workingQuoteObject;
}
function parseQuoteDate(workingQuoteObject, separatorValue) {
    let { remainingText } = workingQuoteObject
    remainingText.trim()
    let textEnd = remainingText.length;
    let date = Array.from(remainingText).splice(separatorValue + 1, textEnd - separatorValue - 2).join(String());
    workingQuoteObject['date'] = date
    console.log(`🚀 ~ file: parse.js ~ line 193 ~ parseQuoteDate ~ date`, date)
    remainingText = Array.from(remainingText).splice(separatorValue, textEnd).join(String());
    console.log(`🚀 ~ file: parse.js ~ line 195 ~ parseQuoteDate ~ remainingText`, remainingText)
    workingQuoteObject['parsingComplete'] = true
    return workingQuoteObject;
}
function parseQuoteSource(workingQuoteObject, separatorValue) {
    let { remainingText } = workingQuoteObject
    let text = workingQuoteObject['remainingText'].trim();
    let len = text.length;
    separatorValue = findNextSeparatingCharacter(text);
    let start = separatorValue + 1
    let end = getClosingCharacterValue(text, ']') - start;
    let source = Array.from(text)
        .splice(start, end)
        .join(String())
        .trim();
    start = source.length
    end = text.length - 1
    remainingText = Array.from(text).splice(start, end).join(String()).trim()
    console.log(`🚀 ~ file: parse.js ~ line 284 ~ parseQuoteSource ~ remainingText`, remainingText)
    workingQuoteObject['remainingText'] = remainingText
    workingQuoteObject['source'] = source
    workingQuoteObject?.details?.push({ type: 'source', value: source });
    console.log(`🚀 ~ file: parse.js ~ line 287 ~ parseQuoteSource ~ workingQuoteObject`, workingQuoteObject)
    return workingQuoteObject;
}
function parseQuoteContext(workingQuoteObject, separatorValue) {
    workingQuoteObject['nextPart'] = false;
    workingQuoteObject['remainingText'] = false
    workingQuoteObject['parsingComplete'] = true
    return workingQuoteObject;
}
function parseQuoteTags(workingQuoteObject, separatorValue) {
    workingQuoteObject['nextPart'] = false;
    workingQuoteObject['remainingText'] = false
    workingQuoteObject['parsingComplete'] = true
    return workingQuoteObject;
}

function getClosingCharacterValue(text, char) {
    let separator = text.indexOf(char);
    return separator;
}

function getMinNotFalse(values) {
    console.log(
        `🚀 ~ file: parseQuotes.svelte ~ line 227 ~ getMinNotFalse ~ values\n\n`,
        values,
        `\n\n`
    );
    let current = -1;
    let minValid = -1;
    for (let i = 0; i < values.length; i++) {
        if (values[i] > -1) {
            current = values[i]
            console.log(`🚀 ~ file: parse.js ~ line 229 ~ getMinNotFalse ~ FOUND VALUE *** ${current} ***`,)
            if (minValid > -1) {
                console.log(`🚀 ~ file: parse.js ~ line 231 ~ getMinNotFalse ~ minValid`, minValid)
                if (minValid > current) {
                    console.log(`🚀 ~ file: parse.js ~ line 233 ~ getMinNotFalse ~ current < minValid`, current < minValid)
                    minValid = current
                }
            } else {
                if (current > -1) {
                    minValid = current
                    console.log(`🚀 ~ file: parse.js ~ line 240 ~ getMinNotFalse ~ minValid`, minValid)
                }
            }
        }
        // console.log(`🚀 ~ file: parseQuotes.svelte ~ line 231 ~ getMinNotFalse ~ \nvalues[i]`, values[i])
        // console.log(`🚀 ~ file: parseQuotes.svelte ~ line 232 ~ getMinNotFalse ~ \ncurrent`, current)
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