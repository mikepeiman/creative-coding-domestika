<script>
	import CanvasSketchEditor from '$components/CanvasSketchEditor.svelte';
	import Slider from '$components/Slider.svelte';
	import Color from '$components/Color.svelte';
	import Checkbox from '$components/Checkbox.svelte';
	import { onMount } from 'svelte';
	import random from 'canvas-sketch-util/random';

	const data = {
		TITLE: 'Sketch02',
		itemHeight: 25,
		itemWidth: 25,
		itemScaleX: 1,
		itemScaleY: 1,
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
		offset: 0,
		randomFactor: 0.5,
		opacityMedian: 0.5,
		opacityVariance: 0.25,
		randomStroke: true,
		randomFill: true,
		fill: '#00000000',
		stroke: '#ffffffaa',
		background: "00000000",
		outline: true,
		fitToCanvas: true,
		arclen: 0.5,
		angle: 0,
		radius: 0.33,
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
		let totalGapX = data.itemsPerRow * data.gap;
		data.remainingWidth = data.width - totalGapX - data.margin;
		let totalGapY = data.itemsPerColumn * data.gap;
		data.remainingHeight = data.height - totalGapY - data.margin;
		data.itemWidth = data.remainingWidth / data.itemsPerRow;
		data.itemHeight = data.remainingHeight / data.itemsPerColumn;
	}

	const settings = {
		scaleToView: true,
		dimensions: [1280, 1280]
	};

	onMount(() => {
		mounted = true;
		let canvas = document.getElementsByTagName('canvas')[0];
		width = canvas.width;
		height = canvas.height;
	});

	const sketch = ({ context, width, height }) => {
		data.width = width;
		data.height = height;
		data.remainingWidth = width - data.itemsPerRow * data.gap;
		data.remainingHeight = height - data.itemsPerColumn * data.gap;
		data.itemWidth = data.remainingWidth / data.itemsPerRow;
		data.itemHeight = data.remainingHeight / data.itemsPerColumn;

		return ({ context, width, height }) => {
			context.clearRect(0, 0, width, height);
			context.fillStyle = data.background;
			context.fillRect(0, 0, width, height);
			drawGrid(context, width, height);
		};
	};

	function drawGrid(context, width, height) {
		// console.log(data);
		for (let j = 0; j < data.itemsPerColumn; j++) {
			for (let i = 0; i < data.itemsPerRow; i++) {
				let x = (data.itemWidth + data.gap) * i;
				let y = (data.itemHeight + data.gap) * j;
				data.randomStroke
					? (stroke = `hsla(${setItemColor(i, j, data.totalItems * 0.3)}, 90%, 50%, ${random.range(
							data.opacityMedian - data.opacityVariance,
							data.opacityMedian + data.opacityVariance
					  )})`)
					: (stroke = data.stroke);
				drawRect(
					context,
					x + data.margin / 2 + data.gap / 2,
					y + data.margin / 2 + data.gap / 2,
					data.itemWidth,
					data.itemHeight,
					data.fill,
					stroke,
					data.lineWidth
				);
				if (Math.random() < data.randomFactor) {
					// conditional if random squares are offset, so they don't get cut off by canvas edge
					// if (i < data.itemsPerRow - 2 && j < data.itemsPerColumn - 2) {
					data.randomFill
						? (fill = `hsla(${setItemColor(i, j, data.totalItems * 0.3)}, 90%, 50%, ${random.range(
							data.opacityMedian - data.opacityVariance,
							data.opacityMedian + data.opacityVariance
						  )})`)
						: (fill = data.fill);
					drawRect(
						context,
						x + data.margin / 2 + data.gap / 2 + data.offset,
						y + data.margin / 2 + data.gap / 2 + data.offset,
						data.itemWidth,
						data.itemHeight,
						fill,
						stroke,
						data.lineWidth
					);
				}
				// end offset conditional
				// }
			}
		}
	}
	const drawRect = (context, originX, originY, width, height, fill, stroke, lineWidth) => {
		context.strokeStyle = stroke;
		context.beginPath();
		context.rect(originX, originY, width * data.itemScaleX, height * data.itemScaleY);
		context.lineWidth = lineWidth;
		context.stroke();
		context.fillStyle = fill;
		context.fill();
	};

	const setItemColor = (i, j, totalItems) => {
		let hueOffset = 30;
		let hueInterval = 360 / totalItems;
		let variance = Math.random() * 5;
		let currentFactor = (i + variance) * (j - variance) * (variance * totalItems);
		let hue = currentFactor + hueOffset;
		return hue;
		// let color = `hsla(${currentFactor + hueOffset}, 90%, 50%, 1)`;
		// return color;
	};
</script>

<CanvasSketchEditor {sketch} {settings} {data}>
	<Checkbox label="Random fill" bind:checked={data.randomFill} />
	<!-- {#if !data.randomFill} -->
	<Color label="Fill" bind:value={data.fill} />
	<!-- {/if} -->
	<!-- <Color label="Foreground" bind:value={data.foreground} /> -->
	<Checkbox label="Random stroke" bind:checked={data.randomStroke} />
	{#if !data.randomStroke}
		<Color label="Stroke" bind:value={data.stroke} />
	{/if}
	<Slider label="Items per row" bind:value={data.itemsPerRow} min="1" max="300" step="1" />
	<Slider label="Items per column" bind:value={data.itemsPerColumn} min="1" max="300" step="1" />
	<Slider label="Scale X" bind:value={data.itemScaleX} min=".25" max="10" step=".25" />
	<Slider label="Scale Y" bind:value={data.itemScaleY} min=".25" max="10" step=".25" />
	<Slider label="Gap" bind:value={data.gap} min="0" max="100" step="5" />
	<Slider label="Margin" bind:value={data.margin} min="0" max="500" step="10" />
	<Slider label="Offset" bind:value={data.offset} min="0" max="100" step="1" />
	<Slider label="Random Factor" bind:value={data.randomFactor} min="0" max="1" step=".05" />
	<Slider label="Opacity Median" bind:value={data.opacityMedian} min="0" max="1" step=".05" />
	<Slider label="Opacity Variance" bind:value={data.opacityVariance} min="0" max="1" step=".05" />
	<!-- <Slider label="Radius" bind:value={data.radius} />
	<Slider label="Angle" bind:value={data.angle} min={-Math.PI} max={Math.PI} /> -->
	<Checkbox label="Outline" bind:checked={data.outline} />
	<!-- {#if data.outline} -->
	<Slider label="Line Width" bind:value={data.lineWidth} min="0" max="100" />
	<!-- {/if} -->
	<!-- <Checkbox label="Fit To Canvas" bind:checked={data.fitToCanvas} />
	{#if !data.fitToCanvas}
		<Slider label="Item Width" bind:value={data.itemWidth} />
		<Slider label="Item Height" bind:value={data.itemHeight} />
	{/if} -->
</CanvasSketchEditor>
