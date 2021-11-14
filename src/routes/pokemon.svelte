<script>
	import { pokemon } from '../stores/pokestore';
	import PokemonCard from '$components/PokemonCard.svelte';

	let searchTerm = '';
	let filteredPokemon = [];

	$: {
		if (searchTerm) {
			filteredPokemon = $pokemon.filter((pokeman) => pokeman.name.toLowerCase().includes(searchTerm.toLowerCase()))
		} else {
			filteredPokemon = [...$pokemon];
		}
	}
</script>

<svelte:head>
	<title>MetaBrain: Your Life OS</title>
</svelte:head>
<div class="main">
	<h1>Pokedex Listing</h1>
	<input
		type="text"
		placeholder="Search Pokemon"
		class="w-5/6 rounded-md text-lg p-4 border-2 border-grey-200"
		bind:value={searchTerm}
	/>
	<!-- <div class="masonry"> -->
	<div class="grid gap-2 md:grid-cols-8 grid-cols-4">
		{#each filteredPokemon as poke}
			<PokemonCard {poke} />
		{/each}
	</div>
</div>

<style lang="scss">
	.masonry {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	h1 {
		font-size: 3rem;
		font-weight: 800;
		background: -webkit-linear-gradient(
			0deg,
			rgba(72, 0, 36, 1) 0%,
			rgba(9, 121, 121, 1) 25%,
			rgba(121, 121, 155, 1) 50%,
			rgba(121, 9, 121, 1) 75%,
			rgba(2, 0, 76, 1) 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
