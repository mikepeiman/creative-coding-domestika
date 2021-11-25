import { parse } from './parseQuotes.js';
const cheerio = require('cheerio')
const htmlparser2 = require('htmlparser2');
import { storedQuotesFile, storedFileContent, storedQuotesArray } from '../../stores/stores.js';
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
let filePath = "C:/webdev/kitplate/static/Quotes.html"
/*? filePath */

export const parseFile = (doc) => {
		// const parser = new DOMParser();
		// const htmlDoc = parser.parseFromString(doc, 'text/html');
        const dom = htmlparser2.parseDocument(doc);
        let $ = cheerio.load(dom)
        /*? cheerioDoc */
		// let divs = cheerioDoc['_root'].children[0].children[1]
        // let els = $('div');
		// let divs = htmlDoc.getElementsByTagName('div');
		quotesArrays = isolateQuotationBlocks(divs);
		for (let i = 0; i < 630; i++) {
			//quotesArrays.length
			let item = stringifyArray(quotesArrays[i]);
			if (item.includes('\\r') || item.includes('\\n')) {
				item = item.replace(/(\\r\\n|\\n|\\r)/gm, '');
			}
			let workingQuoteObject = {};
			workingQuoteObject['originalText'] = item;
			workingQuoteObject['remainingText'] = item;
			workingQuoteObject['details'] = [];
			workingQuoteObject['tags'] = [];
			workingQuoteObject = parse(workingQuoteObject);
			// workingQuoteObject['details'] = [];
			// workingQuoteObject['startingItem'] = item;
			// workingQuoteObject = parseQuoteText(workingQuoteObject);
			// workingQuoteObject = parseQuoteRemainder(workingQuoteObject);
			quotes = [...quotes, workingQuoteObject];
		}
		storedQuotesArray.set(quotes);
        return quotes
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

    parseFile(filePath)