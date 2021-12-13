<script>
	import Param from './Param.svelte';

	export let label = '';
    console.log(`🚀 ~ file: Slider.svelte ~ line 5 ~ label`, label)

	export let value;
	export let min = 1;
    console.log(`🚀 ~ file: Slider.svelte ~ line 8 ~ min`, min)
	export let max = 100;
    console.log(`🚀 ~ file: Slider.svelte ~ line 10 ~ max`, max)
	export let step = 1;
    console.log(`🚀 ~ file: Slider.svelte ~ line 12 ~ step`, step)
</script>

<Param {label}>
	<div class="flex">
		<input type="range" bind:value {min} {max} {step} />
		<input
			type="number"
			class=" input input-primary input-bordered w-16"
			bind:value
			{min}
			{max}
			{step}
		/>
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
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
