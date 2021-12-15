<script>
	import Param from './Param.svelte';
	import Select from 'svelte-select';
	import Checkbox from 'svelte-checkbox';

	export let label = '';

	export let items = [];
	export let selected = '';
	function handleSelect(event) {
		console.log('selected item', event.detail);
		selected = event.detail.value;
		// .. do something here 🙂
	}
	// let value = {value: 'square', label: 'SQUARE'}
	export let value = 'Select option...';
</script>

<Param {label}>
	<div class="themed py-2">
		<Select {items} {value} on:select={handleSelect} />
	</div>
	<!-- <input type='checkbox' bind:checked={checked} /> -->
</Param>

<style>
	.themed {
		--border: 3px solid blue;
		--inputColor: red;
		--clearSelectFocusColor: green;
		--clearSelectHoverColor: blue;
        --itemColor:var(--fuchsia-400);
	}
</style>
