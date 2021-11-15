import { client } from '$lib/dgraph-client'
// import { gql } from 'graphql-request'
import { gql, operationStore, query } from '@urql/svelte';
export const get = async () => {
  try {
    const todosQuery = gql`
      query MyQuery {
        aggregateTask {
          count
          titleMin
          titleMax
        }
        queryUser {
          name
        }
      }
    `;
    client()
    const { todos } = await operationStore(todosQuery)
    return {
      status: 200,
      body: { todos }
    }
  } catch (error) {
    return {
      body: { error: 'There was a server error' }
    }
  }
}
