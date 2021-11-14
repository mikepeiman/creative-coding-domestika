<script context="module">
	export async function load({ page }) {
		const id = page.params.id;
		const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
		const res = await fetch(url);
		const pokeman = await res.json();
		console.log(pokeman);
		return { props: { pokeman } };
	}
</script>

<script>
	export let pokeman;
</script>

<div class="pokeman flex items-center justify-center">
	<h1
		class="text-4xl text-center min-w-min my-8 uppercase bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-sky-500"
	>
		{pokeman.name}
	</h1>
    <img src="{pokeman.sprites.other["official-artwork"].front_default}" />
	<div class="flex flex-wrap">
		{#each pokeman.abilities as ability}
			<span class="p-2 m-2 bg-gradient-to-bl from-lightBlue-700 to-purple-700 text-white"
				>{ability.ability.name}</span
			>
			<p class="p-2 m-2 bg-gradient-to-bl from-lightBlue-700 to-purple-700 text-white">
				{ability.ability.url}
			</p>
		{/each}
    </div>
    <div class="flex flex-wrap">
		{#each pokeman.moves as move}
			<span class="p-2 m-2 bg-gradient-to-bl from-lightBlue-700 to-purple-700 text-white"
				>{move.move.name}</span
			>
		{/each}
    </div>
    <div class="flex">

            <!-- <img src="{pokeman.sprites.back_default}" /> -->

	</div>
</div>

<style lang="scss">
</style>
