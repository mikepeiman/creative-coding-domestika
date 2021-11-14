<script context="module">
    export async function load({page}) {
        const id = page.params.id
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        const res = await fetch(url)
        const pokeman = await res.json()
        return {props: {pokeman}}
    }
</script>

<script>
    export let pokeman
</script>

<h1>{pokeman.name}</h1>