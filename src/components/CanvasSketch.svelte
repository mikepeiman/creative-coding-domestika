<script>
	import canvasSketch from 'canvas-sketch';
	import { onMount, onDestroy } from 'svelte';

	let canvas;

	export let settings = {
		dimensions: undefined
	};
	
	export let data = {};
	export let sketch = () => {};
	
	// handle sketch loaded
	let loader, manager;
	onMount(async () => {
		const opt = {
			...settings,
			canvas,
			parent: canvas.parentElement,
			data
		};
		loader = canvasSketch(sketch, opt);
		manager = await loader;
	});
	
	// handle sketch destroy
	// onDestroy(() => {
	// 	loader.then(m => m.destroy());
	// 	loader = null;
	// 	manager = null;
	// });

	// update settings and data
	$: manager && manager.update(settings);
	$: dataChanged(data);
	
	function dataChanged (data) {
		if (manager) {
			Object.assign(manager.props.data, data);
			manager.render();
		}
	}
</script>

<canvas bind:this={canvas} />

<style>
	/* Optionally style the canvas here */
	canvas {
		margin: auto;
    display: block;
    box-shadow: 0px 2px 12px -2px rgba(0, 0, 0, 0.15);
	}
</style>
