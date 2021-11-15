
import { initClient } from '@urql/svelte';

export const client = () => {
    const VITE_DGRAPH_ENDPOINT = process.env['VITE_DGRAPH_ENDPOINT']
    console.log(`🚀 ~ file: dgraph-client.js ~ line 4 ~ VITE_DGRAPH_ENDPOINT`, VITE_DGRAPH_ENDPOINT)
    initClient({
        url: `${VITE_DGRAPH_ENDPOINT}`
    });
    
}



// export const client = new initClient({
//     url: import.meta.env.VITE_DGRAPH_ENDPOINT
// });