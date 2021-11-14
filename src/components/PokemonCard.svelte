<script>
	export let poke;
</script>

<a href={`/pokeman/${poke.id}`}>
	<div class="pokemon hover:drop-shadow-lg">
		<h2 class="uppercase text-1xl">{poke.id}. {poke.name}</h2>
		<img src={poke.image} alt="" class="w-30 h-30" />
	</div>
</a>

<style lang="scss">
	.pokemon {
		margin: 0.5rem;
		padding: 0.5rem;
		background: rgba(0, 0, 0, 0.1);
	}
</style>
