
let separators = {
    title: {"openingChar": ",", "closingChar": ",", "value": false},
    source: {"openingChar": "[", "closingChar": "]", "value": false},
    axiom: {"openingChar": ":", "closingChar": "", "value": false},
    year: {"openingChar": "(", "closingChar": ")", "value": false},
    context: {"openingChar": "@", "closingChar": ")", "value": false},
    tags: {"openingChar": "#", "closingChar": "", "value": false},
}

// =============================================================================
// This is a great comment block from Clean Comments extension
// =============================================================================

export const parse = (workingQuoteObject) => {
    // let { originalText, nextPart } = workingQuoteObject
    // console.log(`🚀 ~ file: parseQuotes.js ~ line 3 ~ parse ~ originalText`, originalText)
    if (!workingQuoteObject['quoteBody']) {
        // workingQuoteObject['nextPart'] = 'quoteBody'
        workingQuoteObject = getQuoteBody(workingQuoteObject)
    }
    if (!workingQuoteObject['author']) {
        workingQuoteObject = getQuoteAuthor(workingQuoteObject)
    }    
    if (!workingQuoteObject['parsingComplete']) {  /*? nextPart */
        workingQuoteObject = parseNextDetail(workingQuoteObject)
        parse(workingQuoteObject)
    }
    console.log(workingQuoteObject)
    return workingQuoteObject
}

function getQuoteBody(workingQuoteObject) {
    let { originalText, remainingText } = workingQuoteObject
    let workingText, splitText, finalText, remainder
    workingText = workingQuoteObject['quoteBody'] = originalText
    splitText = workingText.split(`"`)
    finalText = splitText[1]
    remainder = splitText[2]
    let len = workingText.length;
    let nextPartStartIndex = remainder.indexOf(`-`)
    nextPartStartIndex = nextPartStartIndex > -1 ? nextPartStartIndex : 0;
    remainder = Array.from(remainder)
        .splice(nextPartStartIndex, len)
        .join(String())
        .trim();
    console.log(finalText)
    console.log(remainder)
    workingQuoteObject['remainingText'] = remainder
    workingQuoteObject['quoteBody'] = finalText;
    return workingQuoteObject;
}

function getQuoteAuthor(workingQuoteObject) {
    let { author, remainingText } = workingQuoteObject
    let workingText = authorTrim(remainingText)
    workingQuoteObject['author'] = workingText
    let textEnd = workingText.length;
    let separatorValue = findDefiningCharacter(workingText);
    if (separatorValue > 0 && separatorValue) {
        author = Array.from(workingText).splice(0, separatorValue).join(String());
        author = authorTrim(author)
        workingText = Array.from(workingText).splice(separatorValue, textEnd).join(String()).trim();
        console.log(workingText)
        workingQuoteObject['remainingText'] = workingText ? workingText : false
    } else {
        author = authorTrim(workingText)
        workingQuoteObject['author'] = author
        workingQuoteObject['remainingText'] = false
        workingQuoteObject['parsingComplete'] = true
    }
    workingQuoteObject['author'] = author;
    return workingQuoteObject
}
function authorTrim(author){
    if(author.includes("-")){
        return author.split("-")[1].trim()
    }
    return author.trim()
}

function parseNextDetail(workingQuoteObject) {
    let { remainingText, nextPart } = workingQuoteObject
    if (!remainingText) {
        workingQuoteObject['parsingComplete'] = true
        return workingQuoteObject
    }
    // console.log(`🚀 ~ file: parse.js ~ line 61 ~ parseNextDetail ~ remainingText`, remainingText)
    let separatorValue = findDefiningCharacter(remainingText);
    nextPart = nameNextPartOfQuote(remainingText, separatorValue)

    workingQuoteObject = parseNextPartOfQuote(workingQuoteObject, nextPart, separatorValue)
    // workingQuoteObject['parsingComplete'] = true
    return workingQuoteObject
}

function parseQuoteAuthorTitle(workingQuoteObject, separatorValue) {
    let title, text, nextPart
    text = workingQuoteObject['remainingText'].trim();
    let splitText = text.split(",")
    let textEnd = text.length;
    text = Array.from(text).splice(separatorValue + 1, textEnd).join(String())
    separatorValue = findDefiningCharacter(text);
    nextPart = nameNextPartOfQuote(text, separatorValue)
    workingQuoteObject['nextPart'] = nextPart
    if (nextPart) {
        title = Array.from(text).splice(0, separatorValue).join(String()).trim();
        title = titleTrim(title, ")")
        text = Array.from(text).splice(separatorValue, textEnd).join(String());
    } else {
        title = text
        text = false
    }
    workingQuoteObject.authorTitle?.push(title.trim())
    workingQuoteObject.details?.push({ 'type': 'Author title', 'value': title })
    workingQuoteObject['remainingText'] = text;
    return workingQuoteObject;
}

function titleTrim(title, char) {
    let text, split
    if(title.includes(char)){
        split = title.split(char)
        split[0].length
        split[1].length
        title = split.reduce((min, item) => min > item.length ? item.length : min)
    }
    return title.trim()
}

function parseQuoteAxiom(workingQuoteObject, separatorValue) {
    let title, text, nextPart
    text = workingQuoteObject['remainingText'].trim();
    let textEnd = text.length;
    text = Array.from(text).splice(separatorValue + 1, textEnd).join(String())
    separatorValue = findDefiningCharacter(text);
    nextPart = nameNextPartOfQuote(text, separatorValue)
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
    console.log(text)
    let len = text.length;
    let startingSeparatorValue = findDefiningCharacter(text);
    let closingSeparatorValue = text.indexOf("]", (startingSeparatorValue + 1));
    let start = separatorValue + 1
    let end = getClosingCharacterValue(text, ']') - 1;
    let source = Array.from(text)
        .splice(startingSeparatorValue, closingSeparatorValue)
        .join(String())
        .trim();
    start = source.length + 1
    end = text.length - 1
    remainingText = Array.from(text).splice(start, end).join(String()).trim()
    console.log(remainingText)
    workingQuoteObject['remainingText'] = remainingText
    workingQuoteObject.sources?.push(source)
    workingQuoteObject?.details?.push({ type: 'source', value: source });
    return workingQuoteObject;
}
function parseQuoteContext(workingQuoteObject, separatorValue) {
    let { remainingText } = workingQuoteObject
    let text = remainingText.trim();
    separatorValue = findDefiningCharacter(text);
    let newPart = text.split('(')[1]
    let context = newPart.split(')')[0]
    let remainder = newPart.split(')')[1] ? newPart.split(')')[1].trim() : false
    workingQuoteObject['remainingText'] = remainder
    workingQuoteObject['context'] = context
    workingQuoteObject?.details?.push({ type: 'context', value: context });
    console.log(`🚀 ~ file: parse.js ~ line 287 ~ parseQuoteContext ~ workingQuoteObject`, workingQuoteObject)
    return workingQuoteObject;
}
function parseQuoteTags(workingQuoteObject, separatorValue) {
    let { remainingText } = workingQuoteObject
    let text = remainingText.trim();
    separatorValue = findDefiningCharacter(text);
    let start = separatorValue + 1
    let end = getNextCharacterValue(text, `#`, start) - 1
    let thisPart
    if (end > -1) {
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
    workingQuoteObject['tags']?.push(thisPart)
    // console.log(`🚀 ~ file: parse.js ~ line 297 ~ parseQuoteTags ~ thisPart`, thisPart)
    workingQuoteObject?.details?.push({ type: 'tags', value: thisPart });
    // console.log(`🚀 ~ file: parse.js ~ line 287 ~ parseQuoteTags ~ workingQuoteObject`, workingQuoteObject)
    return workingQuoteObject;
}

function findNextCharacter(text, char) {
    return text.indexOf(char)
}

function findDefiningCharacter(text) {
    let separators = [
        {"name": "title", "openingChar": ",", "closingChar": ",", "value": false},
        {"name": "source", "openingChar": "[", "closingChar": "]", "value": false},
        {"name": "axiom", "openingChar": ":", "closingChar": "", "value": false},
        {"name": "year", "openingChar": "(", "closingChar": ")", "value": false},
        {"name": "context", "openingChar": "@", "closingChar": ")", "value": false},
        {"name": "tags", "openingChar": "#", "closingChar": "", "value": false},
    ]
    separators.forEach(separator => {
        separator.value = text.indexOf(separator.openingChar)
    })
    return getMinNotFalse(separators);
}

function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}

function nextInstanceOfChar(text, charIndex) {
    return text.charAt(charIndex + 1)
}

function nameNextPartOfQuote(remainingText, separatorValue) {
    let char = remainingText.charAt(separatorValue);
    if (char == '(') {
        let nextChar = nextInstanceOfChar(remainingText, separatorValue)
        if (isLetter(nextChar)) {
            return 'authorTitle'
        }
    }
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


function getClosingCharacterValue(text, char) {
    let separator = text.indexOf(char);
    return separator;
}

function getNextCharacterValue(text, char, first) {
    let separatorIndex = text.indexOf(char, first + 1)
    return separatorIndex
}

function getMinNotFalse(separators) {
    separators
    const charsFound = separators.filter(sep => sep.value > -1)
    if(!charsFound.length) {
        return false
    }
    const minSeparator = charsFound.reduce((min, item) => {return min > item.value ? item.value : min}, charsFound[0].value)
    minSeparator
    return minSeparator;
}


let test1 = `""Fortunately, some are born with spiritual immune systems that sooner or later give rejection to the illusory  worldview grafted upon them from birth through social conditioning. They begin sensing that something is amiss, and  start looking for answers. Inner knowledge and anomalous outer experiences show them a side of reality others are  oblivious to, and so begins their journey of awakening. Each step of the journey is made by following the heart  instead of following the crowd and by choosing knowledge over the veils of ignorance." - Henri Bergson"`;
let test2 = `"XML is like violence: If it isn’t working, you aren’t using enough of it." - unknown, #humor #software-development #coding`
let test3 = `"Isn't it true that all miracles originate in the human heart?" - Michael Peiman @(Or perhaps they
    originate in God, and are birthed through the human heart) #insight #spirituality #God`
let test4 = `"Do you have the courage to bring forth this work? The treasures that are hidden inside you are hoping that
    you'll say yes." - Jack Gilbert @(What do you want to do with your life?)`
let test5 = `"The medical profession is being bought by the pharmaceutical industry, not only in terms of the practice of
medicine, but also in terms of teaching and research. The academic institutions of this country are allowing
themselves to be the paid agents of the pharmaceutical industry. I think it’s disgraceful." - Arnold Seymour Relman,
Harvard professor, former Editor-In-Chief of the NEJM (New England Journal of Medicine) #pharma #medical-industry #corruption #science`
let test6 = `"Journalists cannot serve two masters. To the extent that they take on the task of suppressing information or
biting their tongue for the sake of some political agenda, they are betraying the trust of the public and corrupting
their own profession." Thomas Sowell`
let test7 = `"I must judge for myself, but how can I judge, how can any man judge, unless his mind has been opened and
enlarged by reading." - John Adams`
let test8 = `"Antifa: because nothing says &ldquo;I hate fascism&rdquo; like attacking anyone who has an independent
thought." -@yeebingeebin [YouTube]`
let test9 = `"You’re not the highest version of yourself which you can imagine, you’re the lowest version of yourself which
you can accept." - Sam Ovens`
let test10 = `"Go forth and have joy, and if you would do me the honor - share that joy with me next time we speak." -
Michael Peiman @(Benefaction and positive attitude from Michael Peiman to Melissa Rasmussen, while they were still
married; inspired by polyamory - that did not work out as she claimed it would.)`
let test11 = `"The ironies of history occur most pungently to those who don't believe in them." - Christopher Hitchens
[<a
  href=&quot;https://www.youtube.com/watch?v=g6aKFKIDbQw&amp;t=334s&quot;></a>][Christopher
Hitchens on the History of the 20th Century: U.K. and America (1995)]`
let workingQuoteObject = {};
workingQuoteObject['originalText'] = workingQuoteObject['remainingText'] = test11
workingQuoteObject['details'] = workingQuoteObject['authorTitle'] = workingQuoteObject['tags'] = [];
let result = parse(workingQuoteObject)
console.log(result)