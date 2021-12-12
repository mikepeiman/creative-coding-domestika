<script>
	import Param from './Param.svelte';

	export let label = '';

	export let checked = false;
</script>

<Param {label}>
	<input type='checkbox' bind:checked={checked} />
</Param>

<style>
input {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	width: 100%;
}
</style>