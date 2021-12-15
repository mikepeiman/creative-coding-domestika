<script>
	import Param from './Param.svelte';
	import { parseHSLA } from '$utils/parseColor.js';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let label = '';
	export let value = 0;
	export let hsla = '';
	export let opacity = 1;
	function dispatchMessage() {
		// value = parseHSLA(value, opacity);
		console.log(`🚀 ~ file: ColorInput.svelte ~ line 17 ~ dispatchMessage ~ ${label}: `, value);
		dispatch('message', {
			value: value
		});
	}

	function colorCallback() {
		console.log(`🚀 ~ file: ColorInput.svelte ~ line 19 ~ colorCallback ~ value: `, value);
		hsla = parseHSLA(value, opacity);
	}
</script>

<Param {label}>
	<input type="color" on:change={dispatchMessage} bind:value />
</Param>

<style>
	input {
		cursor: pointer;
		-webkit-appearance: none;
		border: none;
		background: none;
		border-radius: 5px;
		padding: 0;
		overflow: hidden;
		width: 50px;
		height: 25px;
		outline: 0;
		box-sizing: border-box;
		border: 1px solid #dcdcdc;
		padding: 0;
		margin: 0;
	}

	input[type='color']::-webkit-color-swatch-wrapper {
		border: 0;
		padding: 0;
	}
	input[type='color']::-webkit-color-swatch {
		border: none;
		border: 2px solid white;
		border-radius: 5px;
	}
</style>
