import { client } from '$lib/dgraph-client'
import { gql, request } from 'graphql-request'
import { initClient, operationStore, query, mutation } from "@urql/svelte";
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

const getAllQuotesUrql = operationStore(`
  query {
    quotes {
      quoteBody
      author {
        name
      }
      tags {
        tag
      }
    }
  }`)
export const get = async () => {
  try {
    const query = getAllQuotes
    await client.request(query).then((data) => {
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