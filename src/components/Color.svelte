<script context="module">
</script>

<script>
	import Param from './Param.svelte';
	import Slider from './Slider.svelte';
	import { HsvPicker } from 'svelte-color-picker';
	import { parseRGBA } from '$utils/parseColor.js';


	export let label = '';
	export let value = 0;
	export let min = 0;
	export let max = 1;
	export let step = 0.01;

	function colorCallback(rgba) {
		// console.log(`🚀 ~ file: Color.svelte ~ line 12 ~ colorCallback ~ rgba`, rgba);
		// console.log(`🚀 ~ file: Color.svelte ~ line 12 ~ colorCallback ~ rgba`, rgba.detail);
    // let { r, g, b, a} = rgba.detail
    // console.log(`🚀 ~ file: Color.svelte ~ line 20 ~ colorCallback ~ r`, r)
		value = parseRGBA(value);
		// console.log(`🚀 ~ file: Color.svelte ~ line 16 ~ colorCallback ~ result`, result);
		// value = rgba.detail
	}
</script>

<Param {label}>
	<!-- <HsvPicker on:colorChange={colorCallback} startColor={value} /> -->
	<div class="flex flex-col items-start justify-center m-0 color-combo bg-slate-300 p-3 m-5 rounded-sm">
    <input type='color'  on:change={colorCallback(value)} bind:value={value} />
      <Slider />
  </div>
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
