import { client } from '$lib/dgraph-client'
import { gql } from 'graphql-request'
// import { saveFile } from '$lib/save-file'
let quote = {
  body: "this is a test quote",
  author: {
    name: "Michael",
    titleLong: "The Dad"
  },
  context: "learning SvelteKit endpoints, APIs, graphql, and coding",
  source: "PAIN",
  tags: {
    tag: "tag one, tag two"
  }
}
const addQuote = gql`mutation
   {
    quoteBody: "${quote.body}", 
    author: {
      name: "${quote.author.name}",
      titleLong: "${quote.author.titleLong}"}, 
    context: "${quote.context}", 
    source: "${quote.source}", 
    tags: {tag: "${quote.tags.tag}"}}
`

export const get = async () => {
  try {
    await client.request(addQuote).then((data) => {
      console.log(`🚀 ~file: index.json.js ~line 48 ~awaitclient.request ~data`, data)
    })
    return {
      status: 200,
      body: { data }
    }
  } catch (error) {
    return {
      body: { error: 'There was a server error', error }
    }
  }
}
