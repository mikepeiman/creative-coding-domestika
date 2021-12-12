<script>
	import Param from './Param.svelte';

	export let label = '';

	export let value = 0;
	export let min = 0;
	export let max = 1;
	export let step = 0.01;
</script>

<Param {label}>
	<input type='range' bind:value={value} {min} {max} {step} />
</Param>

<style>
input {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	width: 100%;
	height: auto;
}
</style>