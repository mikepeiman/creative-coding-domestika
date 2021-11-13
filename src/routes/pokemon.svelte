<script>
	import { pokemon } from '../stores/pokestore';
</script>

<svelte:head>
	<title>MetaBrain: Your Life OS</title>
</svelte:head>
<div class="main">
	<div class="masonry">
		{#each $pokemon as poke}
			<div class="pokemon">
                <h2>{poke.name}</h2>
                <img src={poke.image} alt="" />
            </div>
		{/each}
	</div>
</div>

<style lang="scss">

    .masonry {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .pokemon {
            margin: .5rem;
            padding: .5rem;
            background: rgba(0,0,0,0.1);
        }
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
