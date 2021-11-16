import { client } from '$lib/graphql-client'
import { gql, request } from 'graphql-request'
export const get = async () => {
  try {
    const query = gql`query Posts {
            posts {
              title
              slug
              date
              excerpt
              tags
              coverImage {
                url
              }
            }
          }`
    const { posts } = await client.request(query)
    console.log(`🚀 ~ file: index.json.js ~ line 18 ~ get ~ posts`, posts)
    return {
      status: 200,
      body: { posts }
    }
  } catch (error) {
    return {
      body: { error: 'There was a server error' }
    }
  }
}
