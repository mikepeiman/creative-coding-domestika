<script>
	import CanvasSketchEditor from '$components/CanvasSketchEditor.svelte';
	import Slider from '$components/Slider.svelte';
	import Color from '$components/Color.svelte';
	import Checkbox from '$components/Checkbox.svelte';
	import { drawRect, setItemColor } from '../lib/drawing';
	import { onMount } from 'svelte';
	import { browser } from '$app/env';

	const data = {
		itemHeight: 25,
		itemWidth: 25,
		width: 1000,
		height: 1000,
		gap: 15,
		fill: false,
		itemsPerColumn: 25,
		itemsPerRow: 25,
		originX: 0,
		originY: 0,
		totalItems: false,
		remainingWidth: 1080,
		remainingHeight: 1080,
		margin: 100,
		stroke: '#ffffff',
		outline: true,
		fitToCanvas: true,
		arclen: 0.5,
		angle: 0,
		radius: 0.33,
		background: '#000000',
		foreground: '#04B9ff',
		lineWidth: 20
	};

	let width = 1080;
	let height = 1080;
	let canvas = {};
	canvas['width'] = width;
	canvas['height'] = height;
	let fill, stroke;
	let mounted = false;

	// $: data.width = canvas.width
	$: data.totalItems = data.itemsPerColumn * data.itemsPerRow;

	$: if (mounted) {
		console.log(`mounted`);
		// canvas = document.getElementsByTagName('canvas')[0];
		console.log(`🚀 ~ file: sketch02.svelte ~ line 44 ~ data.itemsPerRow`, data.itemsPerRow);
		// data.width = canvas.width;
		console.log(`🚀 ~ file: sketch02.svelte ~ line 52 ~ data.width`, data.width);
		console.log(`🚀 ~ file: sketch02.svelte ~ line 49 ~ width`, width);
		let totalGapX = data.itemsPerRow * data.gap;
		data.remainingWidth = data.width - totalGapX - data.margin;
		let totalGapY = data.itemsPerColumn * data.gap;
		data.remainingHeight = data.height - totalGapY - data.margin;
		console.log(`🚀 ~ file: sketch02.svelte ~ line 51 ~ data.remainingWidth`, data.remainingWidth);
		data.itemWidth = data.remainingWidth / data.itemsPerRow;
		data.itemHeight = data.remainingHeight / data.itemsPerColumn;
		// data.itemWidth = width / data.itemsPerRow;
		console.log(`🚀 ~ file: sketch02.svelte ~ line 53 ~ data.itemWidth`, data.itemWidth);
		// data.margin
		console.log(`🚀 ~ file: sketch02.svelte ~ line 58 ~ data.margin`, data.margin);
		// let occupiedWidth = data.itemsPerRow * (data.gap + data.itemWidth);
		// console.log(`🚀 ~ file: sketch02.svelte ~ line 55 ~ occupiedWidth`, occupiedWidth)
		// data.remainingWidth = width - occupiedWidth
		// console.log(`🚀 ~ file: sketch02.svelte ~ line 57 ~ data.remainingWidth`, data.remainingWidth)
		// console.log(`🚀 ~ file: sketch02.svelte ~ line 59 ~ data.itemWidth`, data.itemWidth)
	}
	// $: console.log(`🚀 ~ file: sketch02.svelte ~ line 35 ~ data.remainingWidth`, data.remainingWidth)
	// $: data.marginsX = width * data.marginValue
	// $: data.marginsY = width * data.marginValue

	const settings = {
		scaleToView: true,
		dimensions: [1280, 1280]
	};

	onMount(() => {
		mounted = true;
		let canvas = document.getElementsByTagName('canvas')[0];
		width = canvas.width;
		height = canvas.height;
		console.log(`🚀 ~ file: sketch02.svelte ~ line 50 ~ canvas`, canvas);
	});

	const sketch = ({ context, width, height }) => {
		console.log(`🚀 ~ file: sketch02.svelte ~ line 84 ~ sketch ~ width`, width);
		data.width = width;
		data.height = height;
		data.remainingWidth = width - data.itemsPerRow * data.gap;
		data.remainingHeight = height - data.itemsPerColumn * data.gap;

		data.itemWidth = data.remainingWidth / data.itemsPerRow;
		data.itemHeight = data.remainingHeight / data.itemsPerColumn;

		// data.remainingWidth = width - data.itemsPerRow * (data.gap + data.itemWidth);
		// data.remainingHeight = height - data.itemsPerColumn * (data.gap + data.itemHeight);

		// data.margin = data.gap / 2;
		console.log(
			`🚀 ~ file: sketch02.svelte ~ line 49 ~ sketch ~ data.remainingWidth`,
			data.remainingWidth
		);
		// data.originX = data.margin
		// data.originY = data.offse
		console.log(`🚀 ~ file: sketch02.svelte ~ line 46 ~ sketch ~ data.margin `, data.margin);
		return ({ context, width, height }) => {
			const { background, foreground, radius, arclen, angle, lineWidth, outline, stroke } = data;
			context.clearRect(0, 0, width, height);
			context.fillStyle = background;
			context.fillRect(0, 0, width, height);

			drawGrid(context, width, height);
		};
	};

	function drawGrid(context, width, height) {
		// console.log(data);
		for (let j = 0; j < data.itemsPerColumn; j++) {
			for (let i = 0; i < data.itemsPerRow; i++) {
				fill = `hsla(180, 50%, 50%, .4)`;
				let x = (data.itemWidth + data.gap) * i;
				let y = (data.itemHeight + data.gap) * j;
				stroke = 'white';
				drawRect(
					context,
					x + data.margin / 2,
					y + data.margin / 2,
					data.itemWidth,
					data.itemHeight,
					fill,
					data.stroke,
					1
				);
				if (Math.random() > 0.5) {
					// conditional if random squares are offset, so they don't get cut off by canvas edge
					if (i < data.itemsPerRow - 2 && j < data.itemsPerColumn - 2) {
						fill = setItemColor(i, j, data.totalItems);
						drawRect(
							context,
							x + data.margin / 2,
							y + data.margin / 2,
							data.itemWidth,
							data.itemHeight,
							fill,
							data.stroke,
							5
						);
					}
					// end offset conditional
				}
			}
		}
	}
</script>

<CanvasSketchEditor {sketch} {settings} {data}>
	<Color label="Background" bind:value={data.background} />
	<Color label="Foreground" bind:value={data.foreground} />
	<Color label="Stroke" bind:value={data.stroke} />
	<Slider label="Items per row" bind:value={data.itemsPerRow} />
	<Slider label="Items per column" bind:value={data.itemsPerColumn} />
	<Slider label="Gap" bind:value={data.gap} />
	<Slider label="Margin" bind:value={data.margin} />
	<!-- <Slider label="Radius" bind:value={data.radius} />
	<Slider label="Angle" bind:value={data.angle} min={-Math.PI} max={Math.PI} /> -->
	<Checkbox label="Outline" bind:checked={data.outline} />
	{#if data.outline}
		<Slider label="Line Width" bind:value={data.lineWidth} min="1" max="100" />
	{/if}
	<Checkbox label="Fit To Canvas" bind:checked={data.fitToCanvas} />
	{#if !data.fitToCanvas}
		<Slider label="Item Width" bind:value={data.itemWidth} />
		<Slider label="Item Height" bind:value={data.itemHeight} />
	{/if}
</CanvasSketchEditor>
