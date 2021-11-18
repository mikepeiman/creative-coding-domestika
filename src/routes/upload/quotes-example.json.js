
mutation addQuotes($data: [AddQuoteInput!]!) {
    addQuote(input: $data) {
      numUids
      quote {
        id
        quoteBody
      }
    }
  }

  {
    "data": [
      {
        "quoteBody": "Read the books that they want to burn. That's the way we win against censorship.",
        "author": {
          "name": "Bret Weinstein",
          "titleLong": "PhD"
        },
        "context": "about social media censorship",
        "tags": {
          "tag": "censorship, free thought"
        }
      },
      {
        "quoteBody": "You don’t grow up until someone is more important than you",
        "author": {
          "name": "Jordan Peterson",
          "titleLong": "Professor, University of Toronto"
        },
        "context": "thinking about Melissa and parenting",
        "tags": {
          "tag": "maturity, parenting, growing up"
        }
      }
    ]
  }