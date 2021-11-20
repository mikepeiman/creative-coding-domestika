import { initClient, operationStore, query, mutation } from "@urql/svelte";
const VITE_DGRAPH_ENDPOINT = import.meta.env['VITE_DGRAPH_ENDPOINT'];
initClient({
  url: VITE_DGRAPH_ENDPOINT
});
import { gql, request } from 'graphql-request'
export let id
let quotesBody = ""
let author = ""
let context = ""
let tag = ""
let source = ""

// setClient(client);

const mutateQuotes = operationStore(`
mutation addQuotes($data: [AddQuoteInput!]!) {
    addQuote(input: $data) {
      numUids
      quote {
        id
        quoteBody
      }
    }
  }`)

  const getQuotes = operationStore(`
  query {
    quotes {
      quoteBody
      author {
        name
      }
    }
  }`)

  let res = query(getQuotes)
  console.log(`🚀 ~ file: index.json.js ~ line 38 ~ res`, res)

// const addQuotes = mutation({
//   query: query
// })

function runAddQuotes() {
  // const quoteObject = [
  //   {
  //     quotesBody: quotesBody,
  //     author: author,
  //     context: context,
  //     tag: tag,
  //     source: source
  //   }
  // ]
}


const data = {
  "data": [
    {
      "quoteBody": "It is not for nothing that our age cries out for the redeemer personality; for the one who can emancipate himself from the grip of the collective psychosis and save at least his own soul, who lights a beacon of hope for others, proclaiming that here is at least one man who has succeeded in extricating himself from the fatal identity within the group psyche.",
      "author": {
        "name": "Carl Jung",
        "titleLong": "PhD"
      },
      "context": "individuality and mature selfhood",
      "tags": {
        "tag": "redemption, individuality, collective, mass psychosis"
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
export const get = async () => {
  // return {
  //   status: 200,
  //   body: { data }
  // }

  try {
    const query = query
    await client.request(query).then((res) => {
      console.log(`🚀 ~ file: index.json.js ~ line 75 ~ awaitclient.request ~ res`, res)
      quotes = data.queryQuote
    })
    return {
      status: 200,
      body: { quotes }
    }
  } catch (error) {
    return {
      body: { error: 'There was a server error' }
    }
  }
}
