<script>
	export let poke;
</script>

<div class="pokemon">
	<h2>{poke.name}</h2>
	<img src={poke.image} alt="" />
</div>

<style lang="scss">
	.pokemon {
		margin: 0.5rem;
		padding: 0.5rem;
		background: rgba(0, 0, 0, 0.1);
	}
</style>
