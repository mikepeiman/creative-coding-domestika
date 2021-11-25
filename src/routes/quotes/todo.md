## Quote structure from text:
* quotes are in `" "` quotation marks
* author is attributed with ` - `
* author credential/identity is indicated after `,`
* Tags material/reference is enclosed within `[ ]`
* an axiomatic saying is prefaced with `Axiom: ` before the name of it `Axiom: Brandolinie's Law`
* author DOB-Death noted as `(####-####)`
* quotation year noted at `(####)`
* if there is additional context or comment, it is signified by `@(xxx xxx)`
* tags are specified as `#(xxx xxx, ccccc, zzzz)` comma separated, OR each as `#xxx #yyy`
* I will need also a flag or rating to determine which quotes are authenticated, or the degree of confidence, plus Tagss for this

## Pseudocode
* parseQuoteText(item)
* parseQuoteRemainder(item)
* parseAuthorCredential(item)
* parseAuthorLifespan(item)
* parseQuoteYear(item)
* parseQuoteSource(item)
* parseQuoteTags(item)
* parseQuoteContext(item)

## Todo
* need to clean quotes file more; multiline quotes are getting wrapped in `<div>`'s as separate items
* the `<div><br></div>` are useful here; they delineate the actual quotes
* refactor workingQuoteObject for, after quoteBody and author, a nextParts array so any further details can be looped through
* in the markup.
* I'm seeing problems in structure here, philosophical problems, like - what is a quote, really?
* it's an expression of an idea. It could be a statement sourced from written or verbal content,
* a question, an axiom, a proverb.
* So, perhaps I need a "type" property of every "quote"?
* 2021-11-23 working very well but not perfectly.
* need still to parse for '@' context and '#' tags symbols, and clean up the ' - ' in front of some authors names
* author names also, sometimes first letter is cut off 'pocryphal'
* Gary Vee quotes - still needs parsing for source and nickname
* Relman quote, missing Harvard Professor title (extended titles)
* replace standard single quots with right-and-left single and double quotes within quotes
* add an "x" to clear input bar with a click
* "Voltaire" is missing "V", showing as "oltaire"

## CRUD features
* If I add a date to a source, then any other quotes citing that source should be updated with the date. In other words, "source" has an attribute "date"

## Future UI/Design
* Make author names clickable links; deliver single-page UI but use svelte transitions to both filter for their quotes, and to bring in additional author detail

## Reminders
* Remember that all this work on string manipulation, graphs and datasets, and UI are directly applicable to the serious and significant software that I want to develop, most especially LifeIQ/MetaBrain