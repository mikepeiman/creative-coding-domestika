import { client } from '$lib/dgraph-client'
import { gql, request } from 'graphql-request'
export const get = async () => {
  try {
    const query = gql`query MyQuery {
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
    await client.request(query).then((data) => {
      todos = data.queryQuote
    })
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
