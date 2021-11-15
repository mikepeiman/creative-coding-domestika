import { client } from '$lib/graphql-client'
import { gql } from 'graphql-request'
export const get = async (req) => {
    const slug = req.params.slug
    try {
        const query = gql`query Post($slug: String!) {
            post(where: {slug:$slug}) {
              title
              date
              tags
              author {
                name
                authorTitle: title
                picture {
                  url(transformation: {image: {resize: {fit:clip, height:150,width:150}}})
                }
              }
              content {
                html
              }
              coverImage{
                url
              }
            }
          }`
          const variables = {slug}
        const { post } = await client.request(query, variables)
        return {
            status: 200,
            body: { post }
        }
    } catch (error) {
        return {
            body: { error: 'There was a server error' }
        }
    }
}
