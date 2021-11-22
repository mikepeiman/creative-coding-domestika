// import { initClient, operationStore, query, mutation } from "@urql/svelte";
import { client } from '$lib/dgraph-client'
import { gql, request } from 'graphql-request'
// const VITE_DGRAPH_ENDPOINT = import.meta.env['VITE_DGRAPH_ENDPOINT'];
// initClient({
//   url: VITE_DGRAPH_ENDPOINT
// });
export let quotes
let quotesBody = ""
let author = ""
let context = ""
let tag = ""
let source = ""

// setClient(client);

const mutateQuotes = gql`
mutation addQuotes($data: [AddQuoteInput!]!) {
    addQuote(input: $data) {
      numUids
      quote {
        id
        quoteBody
      }
    }
  }`

const deleteAllQuotes = gql`
  mutation deleteAllQuotes {
    deleteQuote(filter: {quoteBody: {}}) {
      numUids
    }
  }
  `

// const deleteAllQuotesByAuthor = operationStore(`
//   mutation deleteAuthor {
//     deleteAuthor(filter: {name: {anyoftext: ""}})
//   }
//   `)


const getAllQuotes = gql`query MyQuery {
    queryQuote {
      author {
        name
      }
      tags {
        tag
      }
      quoteBody
    }
  }
  `

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


// const data = {
//   data: [
//     {
//       "quoteBody": "It is not for nothing that our age cries out for the redeemer personality; for the one who can emancipate himself from the grip of the collective psychosis and save at least his own soul, who lights a beacon of hope for others, proclaiming that here is at least one man who has succeeded in extricating himself from the fatal identity within the group psyche.",
//       "author": {
//         "name": "Carl Jung",
//         "titleLong": "PhD"
//       },
//       "context": "individuality and mature selfhood",
//       "tags": {
//         "tag": "redemption, individuality, collective, mass psychosis"
//       }
//     },
//     {
//       "quoteBody": "To learn who rules over you, simply find out who you are not allowed to criticize.",
//       "author": {
//         "name": "Voltaire",
//         "titleLong": ""
//       },
//       "context": "politics",
//       "tags": {
//         "tag": "politics, power"
//       }
//     },
//     {
//       "quoteBody": "Test 444",
//       "author": {
//         "name": "Voltaire",
//         "titleLong": ""
//       },
//       "context": "politics",
//       "tags": {
//         "tag": "politics, power"
//       }
//     }
//   ]
// }

const testData2 = {
  data: [
    {
      "quoteBody": "Test 111",
      "author": {
        "name": "A",
        "titleLong": ""
      },
      "context": "power",
      "tags": {
        "tag": "power"
      }
    },
    {
      "quoteBody": "Test 333",
      "author": {
        "name": "B",
        "titleLong": ""
      },
      "context": "politics",
      "tags": {
        "tag": "politics"
      }
    }
  ]
}

export const get = async ({ query }) => {
  try {
    console.log(`🚀 ~ file: index.json.js ~ line 135 ~ get ~ query`, query)
    let value = query.get("data")
    console.log(`🚀 ~ file: index.json.js ~ line 138 ~ get ~ value\n\n`, value, `\n\n`)
    // let json = JSON.parse(value)
    // console.log(`🚀 ~ file: index.json.js ~ line 140 ~ get ~ json`, json)
    let data = JSON.parse(value)
    console.log(`🚀 ~ file: index.json.js ~ line 142 ~  data\n\n`, data, `\n\n`)
    // console.log(`🚀 ~ file: index.json.js ~ line 142 ~ get ~ data`, JSON.parse(data))
    console.log(`🚀 ~ file: index.json.js ~ line 146 ~ testData2\n\n`, (testData2), `\n\n`)

    const graphQuery = mutateQuotes
    await client.request(graphQuery, data).then((res) => {
      // console.log(`🚀 ~ file: index.json.js ~ line 138 ~ awaitclient.request ~ res`, res)
      // console.log(`🚀 ~ file: index.json.js ~ line 175 ~ awaitclient.request ~ data`, data)
      quotes = res.addQuote.quote
      // console.log(`🚀 ~ file: index.json.js ~ line 144 ~ awaitclient.request ~ quotes`, quotes)
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
