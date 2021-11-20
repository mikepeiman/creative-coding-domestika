import { initClient, createClient } from "@urql/svelte";
const VITE_DGRAPH_ENDPOINT = import.meta.env['VITE_DGRAPH_ENDPOINT'];
console.log(`🚀 ~ file: dgraph-urql.js ~ line 3 ~ VITE_DGRAPH_ENDPOINT`, VITE_DGRAPH_ENDPOINT)
// initClient({
//   url: VITE_DGRAPH_ENDPOINT
// });
export const client = createClient({
    url: VITE_DGRAPH_ENDPOINT
})