import { client } from '$lib/dgraph-client'
import { gql, request } from 'graphql-request'

// import { saveFile } from '$lib/save-file'
// export let quote
// const addQuote = gql`mutation MyMutation {
//   addQuote(input: {
//     quoteBody: "${quote.body}", 
//     author: {
//       titleLong: "${author.titleLong}", 
//       name: "${author.name}"}, 
//     context: "${quote.context}", 
//     source: "${quote.source}", 
//     tags: {tag: "${quote.tags}"}})
// }
// `
// const deleteAllQuotes = gql`mutation MyMutation {
//   deleteQuote(filter: {}) {
//     numUids
//   }
// }
// `
const getAllQuotes = gql`query MyQuery {
  queryQuote {
    author {
      name
    }
    tags {
      tag
    }
    body
  }
}
`
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


// export const post = async () => {
//   try {
//     const query = addQuote
//     await client.request(query).then((data) => {
//       console.log(`🚀 ~file: index.json.js ~line 48 ~awaitclient.request ~data`, data)
//     })
//     return {
//       status: 200,
//       body: { data }
//     }
//   } catch (error) {
//     return {
//       body: { error: 'There was a server error' }
//     }
//   }
// }
