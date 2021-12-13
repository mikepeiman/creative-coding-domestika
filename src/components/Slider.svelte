<script>
	import Param from './Param.svelte';

	export let label = '';

	export let value = 0;
	export let min = 0;
	export let max = 100;
	export let step = 1;
</script>

<Param {label}>
	<div class="flex">
		<input type="range" bind:value {min} {max} {step} />
		<input type="number" class=" input input-primary input-bordered w-12" bind:value {min} {max} {step}  />
	</div>
</Param>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
