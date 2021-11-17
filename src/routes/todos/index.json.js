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
    // console.log(`🚀 ~ file: index.json.js ~ line 21 ~ const{todos}=awaitclient.request ~ data`, data)
      todos = data.queryQuote
    })
    // console.log(`🚀 ~ file: index.json.js ~ line 18 ~ get ~ todos`, todos)
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
