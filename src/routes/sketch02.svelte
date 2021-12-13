<script>
	import CanvasSketchEditor from '$components/CanvasSketchEditor.svelte';
	import Slider from '$components/Slider.svelte';
	import Color from '$components/Color.svelte';
	import Checkbox from '$components/Checkbox.svelte';
	import { drawRect, setItemColor } from '../lib/drawing';
	const data = {
		itemHeight: 25,
		itemWidth: 25,
		gap: 15,
		fill: false,
		itemsPerColumn: 25,
		itemsPerLine: 25,
		originX: 0,
		originY: 0,
		totalItems: false,
		remainingWidth: 0,
		remainingHeight: 0,
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

	let width, height, fill, stroke;

	$: data.totalItems = data.itemsPerColumn * data.itemsPerLine;
	// $: data.marginsX = width * data.marginValue
	// $: data.marginsY = width * data.marginValue

	const settings = {
		scaleToView: true,
		dimensions: [1280, 1280]
	};

	const sketch = ({ context, width, height }) => {
		return ({ context, width, height }) => {
			const { background, foreground, radius, arclen, angle, lineWidth, outline, stroke } = data;
			context.clearRect(0, 0, width, height);
			context.fillStyle = background;
			context.fillRect(0, 0, width, height);

			// const minDim = Math.min(width, height);
			// context.beginPath();
			// context.arc(width / 2, height / 2, minDim * radius, angle, Math.PI * 2 * arclen + angle);
			// context.fillStyle = foreground;
			// context.strokeStyle = foreground;
			// context.lineWidth = lineWidth;
			// if (outline) context.stroke();
			// else context.fill();
			drawGrid(context);
		};
	};

	function drawGrid(context) {
		console.log(data);
		for (let j = 0; j < data.itemsPerColumn; j++) {
			for (let i = 0; i < data.itemsPerLine; i++) {
				fill = `hsla(180, 50%, 50%, .4)`;
				let x = data.originX + (data.itemWidth + data.gap) * i;
				let y = data.originY + (data.itemHeight + data.gap) * j;
				stroke = 'white';
				
                console.log(`🚀 ~ file: sketch02.svelte ~ line 69 ~ drawGrid ~ data.itemWidth - data.offset`, data.itemWidth - data.offset)
				drawRect(context, x, y, data.itemWidth, data.itemHeight, fill, stroke, 1);
                console.log(`🚀 ~ file: sketch02.svelte ~ line 71 ~ drawGrid ~ context, x, y, data.itemWidth, data.itemHeight, fill, stroke, 1`, context, x, y, data.itemWidth, data.itemHeight, fill, stroke, 1)
                console.log(`🚀 ~ file: sketch02.svelte ~ line 70 ~ drawGrid ~ x, y,`, x, y,)
				if (Math.random() > 0.5) {
					fill = setItemColor(i, j, data.totalItems);
					drawRect(
						context,
						x + data.offset / 2,
						y + data.offset / 2,
						data.itemWidth - data.offset,
						data.itemHeight - data.offset,
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
