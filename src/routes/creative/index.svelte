<!-- Canvas REPL for help: https://svelte.dev/repl/e4fd9f9f6fd24f909c073a02f1a921cc?version=3.44.2 -->
<script>
	import { browser } from '$app/env';

	import { onMount } from 'svelte';
	import { draw } from 'svelte/transition';
	import { drawOnCanvas, drawRect } from './drawing';
	let canvas, context, innerWidth, innerHeight;
	let itemsPerLine,
		itemsPerColumn,
		widthPerItem,
		heightPerItem,
		gapPercentage,
		widthPercentage,
		heightPercentage,
		gap,
		width,
		height,
        pageMargin
	itemsPerLine = 25;
	itemsPerColumn = 25;
	gapPercentage = 0.2;
    pageMargin = 150
	widthPercentage = 1 - gapPercentage;
	heightPercentage = 1 - gapPercentage;
	gap = widthPerItem * gapPercentage;
	width = widthPerItem * widthPercentage;
	height = heightPerItem * heightPercentage;
	$: widthPerItem = innerWidth / itemsPerLine;
	$: console.log(
		`🚀 ~ file: index.svelte ~ line 9 ~ ${widthPerItem} = ${innerWidth} / ${itemsPerLine}`,
		(widthPerItem = innerWidth / itemsPerLine)
	);
	$: innerWidth, innerHeight;
	$: width = widthPerItem * 0.8;
	$: gap = widthPerItem * 0.2;
	// $: if(browser) { recalculateDrawing()}
	onMount(() => {
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		widthPerItem = (innerWidth - pageMargin) / itemsPerLine;
		heightPerItem = (innerHeight - pageMargin * 3) / itemsPerColumn;
		gap = widthPerItem * gapPercentage;
		width = widthPerItem * widthPercentage;
		height = heightPerItem * heightPercentage;
		console.log(`🚀 ~ file: index.svelte ~ line 11 ~ onMount ~ innerHeight`, innerHeight);
		context = canvas.getContext('2d');
		context.fillStyle = '#0099ff';
		recalculateDrawing();
		// for (let i = 0; i < itemsPerLine; i++) {
		// 	drawRect(context, i, 100, 100, width, 40, gap, 5);
		// }
	});

	function recalculateDrawing() {
		for (let j = 0; j < itemsPerColumn; j++) {
			for (let i = 0; i < itemsPerLine; i++) {
                let fill = `#${i}${i}${i}${j}${j}${j}`;
				drawRect(context, i, j, 100, 100, width, height, gap, 5, fill);
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
