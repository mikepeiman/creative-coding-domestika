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
		gap: 15,
		fill: false,
		itemsPerColumn: 25,
		itemsPerRow: 25,
		originX: 0,
		originY: 0,
		totalItems: false,
		remainingWidth: 1080,
		remainingHeight: 1080,
		offset: 0,
		stroke: 20,
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
	let canvas = {}
	canvas['width'] = width
	canvas['height'] = height
	let fill, stroke;

	$: data.totalItems = data.itemsPerColumn * data.itemsPerRow;
	$: {
		// data.remainingWidth = width - data.itemsPerRow * (data.gap + data.itemWidth);
		data.itemWidth = data.remainingWidth / data.itemsPerRow;
		console.log(`🚀 ~ file: sketch02.svelte ~ line 36 ~ data.remainingWidth`, data.remainingWidth);
		console.log(`🚀 ~ file: sketch02.svelte ~ line 36 ~ data.itemWidth`, data.itemWidth);
		console.log(`🚀 ~ file: sketch02.svelte ~ line 36 ~ data.gap`, data.gap);
		console.log(`🚀 ~ file: sketch02.svelte ~ line 36 ~ data.itemsPerRow`, data.itemsPerRow);
		console.log(`🚀 ~ file: sketch02.svelte ~ line 36 ~ width`, width);
	}
	$: if (browser) {
		console.log(`browser`);
		width = canvas.width;
		data.remainingWidth = width - data.itemsPerRow * (data.gap + data.itemWidth);
	}
	// $: console.log(`🚀 ~ file: sketch02.svelte ~ line 35 ~ data.remainingWidth`, data.remainingWidth)
	// $: data.marginsX = width * data.marginValue
	// $: data.marginsY = width * data.marginValue

	const settings = {
		scaleToView: true,
		dimensions: [1280, 1280]
	};

	onMount(() => {
		let canvas = document.getElementsByTagName('canvas')[0];
		width = canvas.width;
		height = canvas.height;
		console.log(`🚀 ~ file: sketch02.svelte ~ line 50 ~ canvas`, canvas);
	});

	const sketch = ({ context, width, height }) => {
		data.remainingWidth = width - data.itemsPerRow * data.gap;
		data.remainingHeight = height - data.itemsPerColumn * data.gap;
		width = width;
		height = height;
		data.itemWidth = data.remainingWidth / data.itemsPerRow;
		data.itemHeight = data.remainingHeight / data.itemsPerColumn;

		data.remainingWidth = width - data.itemsPerRow * (data.gap + data.itemWidth);
		data.remainingHeight = height - data.itemsPerColumn * (data.gap + data.itemHeight);

		data.offset = data.gap / 2;
		console.log(
			`🚀 ~ file: sketch02.svelte ~ line 49 ~ sketch ~ data.remainingWidth`,
			data.remainingWidth
		);
		// data.originX = data.offset
		// data.originY = data.offse
		console.log(`🚀 ~ file: sketch02.svelte ~ line 46 ~ sketch ~ data.offset `, data.offset);
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
				let x = data.originX + (data.itemWidth + data.gap) * i;
				let y = data.originY + (data.itemHeight + data.gap) * j;
				stroke = 'white';
				drawRect(
					context,
					x + data.offset,
					y + data.offset,
					data.itemWidth,
					data.itemHeight,
					fill,
					stroke,
					1
				);
				// console.log(`🚀 ~ file: sketch02.svelte ~ line 71 ~ drawGrid ~ context, x, y, data.itemWidth, data.itemHeight, fill, stroke, 1`, context, x, y, data.itemWidth, data.itemHeight, fill, stroke, 1)
				// console.log(`🚀 ~ file: sketch02.svelte ~ line 70 ~ drawGrid ~ x, y,`, x, y,)
				if (Math.random() > 0.5) {
					fill = setItemColor(i, j, data.totalItems);
					drawRect(
						context,
						x + data.gap,
						y + data.gap,
						data.itemWidth - data.offset * 2,
						data.itemHeight - data.offset * 2,
						fill,
						stroke,
						2
					);
				}
			}
		}
	}
</script>

<CanvasSketchEditor {sketch} {settings} {data}>
	<Color label="Background" bind:value={data.background} />
	<Color label="Foreground" bind:value={data.foreground} />
	<Slider label="Items per row" bind:value={data.itemsPerRow} />
	<Slider label="Items per column" bind:value={data.itemsPerColumn} />
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
