import { client } from '$lib/dgraph-client'
import { gql, request } from 'graphql-request'
import {mutation } from '@urql/svelte'
export let id
let quotesBody = ""
let author = ""
let context = ""
let tag = ""
let source = ""

// const addQuotes = mutation({
//   query: query
// })
const query = gql`
mutation addQuotes($data: [AddQuoteInput!]!) {
    addQuote(input: $data) {
      numUids
      quote {
        id
        quoteBody
      }
    }
  }`

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
  export const get = async () => {
    return {
      status: 200,
      body: { data }
    }

    // try {
    //   const query = getAllQuotes
    //   await client.request(query).then((data) => {
    //     quotes = data.queryQuote
    //   })
    //   return {
    //     status: 200,
    //     body: { quotes }
    //   }
    // } catch (error) {
    //   return {
    //     body: { error: 'There was a server error' }
    //   }
    // }
  }
  