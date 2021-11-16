import { writable } from "svelte/store";

const quotesFile = writable({})
const fileContent = writable({})


export const storedQuotesFile = {
    subscribe: quotesFile.subscribe,
    set: val => {
        quotesFile.set(val);
        localStorage.setItem("quotesFile", JSON.stringify(val));
    }
};

export const storedFileContent = {
    subscribe: fileContent.subscribe,
    set: val => {
        fileContent.set(val);
        localStorage.setItem("fileContent", JSON.stringify(val));
    }
};