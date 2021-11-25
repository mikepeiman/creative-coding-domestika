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
    /*?  workingQuoteObject */
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
        author = Array.from(remainingText).splice(0, separatorValue).join(String()).trim();
        remainingText = Array.from(remainingText).splice(separatorValue + 1, textEnd).join(String()).trim();
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
    console.log(`🚀 ~ file: parse.js ~ line 54 ~ getQuoteAuthor ~ workingQuoteObject`, workingQuoteObject)
    return workingQuoteObject
}

function parseNextDetail(workingQuoteObject) {
    let { remainingText } = workingQuoteObject
    if (!remainingText) {
        workingQuoteObject['parsingComplete'] = true
        return workingQuoteObject
    }
    // console.log(`🚀 ~ file: parse.js ~ line 61 ~ parseNextDetail ~ remainingText`, remainingText)
    let separatorValue = findNextSeparatingCharacter(remainingText);
    let nextPart = nameNextPartOfQuote(remainingText, separatorValue)
    // console.log('\x1b[41m%s\x1b[0m', 'parse.js line:60 nextPart', nextPart);
    // console.log(`🚀 ~ file: parse.js ~ line 60 ~ parseNextDetail ~ nextPart`, nextPart)
    workingQuoteObject = parseNextPartOfQuote(workingQuoteObject, nextPart, separatorValue)
    // workingQuoteObject['parsingComplete'] = true
    return workingQuoteObject
}

function findNextSeparatingCharacter(remainingText) {
    // console.log(`🚀 ~ file: parse.js ~ line 68 ~ findNextSeparatingCharacter ~ text`, remainingText)
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
        separatorForContext,
        separatorForTags,

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
    console.log(`🚀 ~ file: parse.js ~ line 250 ~ parseQuoteContext ~ workingQuoteObject`, workingQuoteObject)
    let { remainingText } = workingQuoteObject
    let text = remainingText.trim();
    let len = text.length;
    separatorValue = findNextSeparatingCharacter(text);
    console.log(`🚀 ~ file: parse.js ~ line 255 ~ parseQuoteContext ~ separatorValue`, separatorValue)
    let start = separatorValue + 1
    let end = getClosingCharacterValue(text, ')') - start;
    let thisPart = Array.from(text)
        .splice(start, end)
        .join(String())
        .trim();
    start = thisPart.length
    end = text.length - 1
    remainingText = Array.from(text).splice(start, end).join(String()).trim()
    console.log(`🚀 ~ file: parse.js ~ line 284 ~ parseQuoteContext ~ remainingText`, remainingText)
    workingQuoteObject['remainingText'] = remainingText
    workingQuoteObject['context'] = thisPart
    workingQuoteObject?.details?.push({ type: 'context', value: thisPart });
    console.log(`🚀 ~ file: parse.js ~ line 287 ~ parseQuoteContext ~ workingQuoteObject`, workingQuoteObject)
    workingQuoteObject['nextPart'] = false;
    workingQuoteObject['remainingText'] = false
    workingQuoteObject['parsingComplete'] = true
    return workingQuoteObject;
}
function parseQuoteTags(workingQuoteObject, separatorValue) {
    // console.log(`🚀 ~ file: parse.js ~ line 257 ~ parseQuoteTags ~ workingQuoteObject`, workingQuoteObject)
    let { remainingText } = workingQuoteObject
    let text = remainingText.trim();
    console.log(`🚀 ~ file: parse.js ~ line 281 ~ parseQuoteTags ~ text`, text)
    let len = text.length;
    separatorValue = findNextSeparatingCharacter(text);
    console.log(`🚀 ~ file: parse.js ~ line 255 ~ parseQuoteTags ~ separatorValue`, separatorValue)
    let start = separatorValue + 1
    // let end = text.length - getClosingCharacterValue(text, `#`);
    let end = getNextCharacterValue(text, `#`, start) - 1
    let thisPart
    if(end > -1){
         thisPart = Array.from(text)
        .splice(start, end)
        .join(String())
        .trim();
    } else {
        thisPart = Array.from(text)
        .splice(start, text.length)
        .join(String())
        .trim();
    }

    start = thisPart.length + 1
    end = text.length - 1
    remainingText = Array.from(text).splice(start, end).join(String()).trim()
    // console.log(`🚀 ~ file: parse.js ~ line 284 ~ parseQuoteTags ~ remainingText`, remainingText)
    workingQuoteObject['remainingText'] = remainingText
    workingQuoteObject['tags'].push(thisPart)
    // console.log(`🚀 ~ file: parse.js ~ line 297 ~ parseQuoteTags ~ thisPart`, thisPart)
    workingQuoteObject?.details?.push({ type: 'tags', value: thisPart });
    // console.log(`🚀 ~ file: parse.js ~ line 287 ~ parseQuoteTags ~ workingQuoteObject`, workingQuoteObject)
    return workingQuoteObject;
}

function getClosingCharacterValue(text, char) {
    let separator = text.indexOf(char);
    return separator;
}

function getNextCharacterValue(text, char, first) {
    let separatorIndex = text.indexOf(char, first+1)
    return separatorIndex
}

function getMinNotFalse(values) {
    // console.log(
    //     `🚀 ~ file: parseQuotes.svelte ~ line 227 ~ getMinNotFalse ~ values\n\n`,
    //     values,
    //     `\n\n`
    // );
    let current = -1;
    let minValid = -1;

    for (let i = 0; i < values.length; i++) {
        if (values[i] > -1) {
            current = values[i]
            // console.log(`🚀 ~ file: parse.js ~ line 229 ~ getMinNotFalse ~ FOUND VALUE *** ${current} ***`,)
            if (minValid > -1) {
                // console.log(`🚀 ~ file: parse.js ~ line 231 ~ getMinNotFalse ~ minValid before checking current: : : `, minValid)
                if (minValid > current) {
                    // console.log(`🚀 ~ file: parse.js ~ line 233 ~ getMinNotFalse ~ current < minValid`, current < minValid)
                    minValid = current
                }
            } else {
                minValid = current
            }
            // console.log(`🚀 ~ file: parse.js ~ line 240 ~ getMinNotFalse ~ minValid`, minValid)
        }
        // console.log(`🚀 ~ file: parseQuotes.svelte ~ line 231 ~ getMinNotFalse ~ \nvalues[i]`, values[i])
        // console.log(`🚀 ~ file: parseQuotes.svelte ~ line 232 ~ getMinNotFalse ~ \ncurrent`, current)
        // console.log(`🚀 ~ file: parseQuotes.svelte ~ line 233 ~ getMinNotFalse ~ \nminValid`, minValid)
    }
    // console.log(`\n\ngetMinNotFalse BREAK**********************************\n\n`)
    return minValid;
}

let workingQuoteObject = {};

let item = `""Fortunately, some are born with spiritual immune systems that sooner or later give rejection to the illusory  worldview grafted upon them from birth through social conditioning. They begin sensing that something is amiss, and  start looking for answers. Inner knowledge and anomalous outer experiences show them a side of reality others are  oblivious to, and so begins their journey of awakening. Each step of the journey is made by following the heart  instead of following the crowd and by choosing knowledge over the veils of ignorance." - Henri Bergson"`;
let item2 = `"XML is like violence: If it isn’t working, you aren’t using enough of it." - unknown, #humor #software-development #coding`
workingQuoteObject['originalText'] = item2
workingQuoteObject['remainingText'] = item2
workingQuoteObject['details'] = [];
workingQuoteObject['tags'] = [];

let result = parse(workingQuoteObject)
result