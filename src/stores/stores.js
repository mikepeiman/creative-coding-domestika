import { writable } from "svelte/store";

const quotesFile = writable({})
const fileContent = writable({})
const quotesArray = writable([])


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

export const storedQuotesArray = {
    subscribe: quotesArray.subscribe,
    set: val => {
        quotesArray.set(val);
        localStorage.setItem("quotesArray", JSON.stringify(val));
    }
};