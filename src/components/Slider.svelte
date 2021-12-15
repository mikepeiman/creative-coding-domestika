<script>
	import Param from './Param.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let label = '';
	export let value;
	export let min = 1;
	export let max = 100;
	export let step = 1;

	function dispatchMessage() {
		dispatch('message', {
			value: value
		})
            console.log(`🚀 ~ file: Slider.svelte ~ line 17 ~ dispatchMessage ~ ${label}: `, value)
	}
</script>

<Param {label}>
	<div class="flex">
		<input type="range" bind:value {min} {max} {step} on:change={dispatchMessage} />
		<input
			type="number"
			class=" input input-primary input-bordered w-14 p-2"
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
