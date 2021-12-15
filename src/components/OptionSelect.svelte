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
	<div class="themed py-2 w-48 text-cyan-600">
		<Select {items} {value} on:select={handleSelect} />
	</div>
	<!-- <input type='checkbox' bind:checked={checked} /> -->
</Param>

<style>
	.themed {
		--border: 3px solid var(--color-sky-600);
        --border-focus-color: var(--color-sky-100);
		--placeholderColor: red;
		--itemHoverColor: var(--color-fuchsia-200);
        --itemHoverBG: var(--color-slate-900);
        --itemIsActive: var(--color-slate-900);
        --itemActiveBackground: var(--color-slate-900);
        --itemIsActiveBG: var(--color-slate-900);
		--clearSelectFocusColor: green;
		--clearSelectHoverColor: blue;
        --inputColor: purple;
        --itemColor:var(--color-fuchsia-400);
        --spinnerColor: orange;
        --indicatorColor: orange;
        --placeholderColor: var(--color-sky-500);
        --indicatorWidth: 12rem;
	}
</style>
