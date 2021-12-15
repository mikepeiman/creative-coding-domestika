<script>
	import Param from './Param.svelte';
	import Checkbox from 'svelte-checkbox'

	export let label = '';

	export let checked = false;
</script>

<Param {label}>
	<div class="py-2">
		<Checkbox bind:checked={checked} primaryColor="#11cc55" size="2rem"/>
	</div>
	<!-- <input type='checkbox' bind:checked={checked} /> -->
</Param>

<style>
input {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	width: 100%;
}
</style>