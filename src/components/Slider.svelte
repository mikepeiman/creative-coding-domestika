<script>
	import Param from './Param.svelte';

	export let label = '';

	export let value = 0;
	export let min = 1;
	export let max = 100;
	export let step = 1;
</script>

<Param {label}>
	<div class="flex">
        <input type='range' bind:value={value} {min} {max} {step} />
            <span class="input">{value}</span>
    </div>
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