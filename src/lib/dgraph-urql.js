import { initClient } from "@urql/svelte";
const VITE_DGRAPH_ENDPOINT = process.env['VITE_DGRAPH_ENDPOINT'];
initClient({
  url: VITE_DGRAPH_ENDPOINT
});