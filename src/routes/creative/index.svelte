<!-- Canvas REPL for help: https://svelte.dev/repl/e4fd9f9f6fd24f909c073a02f1a921cc?version=3.44.2 -->
<script>
	import { browser } from '$app/env';

	import { onMount } from 'svelte';
	import { draw } from 'svelte/transition';
	import { drawOnCanvas, drawRect } from './drawing';
	let canvas, context, innerWidth, innerHeight;
	let itemsPerLine,
		itemsPerColumn,
		gap,
		width,
		height,
		originX,
		originY
	originX = 100
	originY = 100;
	itemsPerLine = 12;
	itemsPerColumn = 12;

	$: innerWidth, innerHeight;
	onMount(() => {
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		gap = 40
		width = height = 100
		context = canvas.getContext('2d');
		context.fillStyle = '#0099ff';
		drawGrid();
	});

	function drawGrid() {
		for (let j = 0; j < itemsPerColumn; j++) {
			for (let i = 0; i < itemsPerLine; i++) {
				let fill = `#${i}${i}${i}${j}${j}${j}`;
                let x = originX + (width + gap )* i
                let y= originY + (height + gap )* j
				drawRect(context, i, j, x, y, width, height, gap, 5, fill);
				drawRect(context, i, j, x + 8, y + 8, width - 16, height - 16, gap, 5, fill);
			}
		}
	}
</script>

<!-- https://www.domestika.org/en/courses/2729-creative-coding-making-visuals-with-javascript/units/9668-fundamentals -->

<svelte:window bind:innerHeight bind:innerWidth />
<div class="flex flex-col content-center items-center w-full">
	<h1 class="text-sky-300 w-full text-center text-3xl bold">Creative Coding</h1>
	<div class="flex w-full items-center justify-center m-12">
		<canvas bind:this={canvas} />
	</div>
</div>
