import { client } from '$lib/dgraph-client'
// import { gql } from 'graphql-request'
import { operationStore, query } from '@urql/svelte'
import { initClient } from '@urql/svelte'
const dgraph = process.env[`DGRAPH-ENDPOINT`]
const DGRAPH_ENDPOINT = process.env['DGRAPH-ENDPOINT'];
initClient({
    url: `"${dgraph}"`
})
const todos = operationStore(`query MyQuery {
    aggregateTask
    queryUser
  }`)
let res = query(todos)
console.log(`🚀 ~ file: index.json.js ~ line 14 ~ res`, res)



