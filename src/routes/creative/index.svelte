<!-- Canvas REPL for help: https://svelte.dev/repl/e4fd9f9f6fd24f909c073a02f1a921cc?version=3.44.2 -->
<script>
	import { onMount } from 'svelte';
	import { drawRect, setItemColor } from '../../lib/drawing';
    
	let canvas, context, innerWidth, innerHeight;
	let itemsPerLine, itemsPerColumn, gap, width, height, originX, originY, totalItems;
	originX = 100;
	originY = 100;
	itemsPerLine = 12;
	itemsPerColumn = 6;
	totalItems = itemsPerColumn * itemsPerLine;
	$: innerWidth, innerHeight;
	onMount(() => {
		canvas.width = innerWidth - 200;
		canvas.height = innerHeight - 300;
		gap = 40;
		width = height = 100;
		context = canvas.getContext('2d');
		context.fillStyle = '#0099ff';
		drawGrid();
	});
	let fill;
	function drawGrid() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		for (let j = 0; j < itemsPerColumn; j++) {
			for (let i = 0; i < itemsPerLine; i++) {
				fill = `hsla(180, 50%, 50%, .2)`;
				let x = originX + (width + gap) * i;
				let y = originY + (height + gap) * j;

				drawRect(context, x, y, width, height, gap, 5, fill);
				if (Math.random() > 0.5) {
					fill = setItemColor(i, j, totalItems);
					drawRect(context, x + 8, y + 8, width - 16, height - 16, gap, 5, fill);
				}
				fill = `hsla(180, 50%, 50%, .2)`;
			}
		}
	}
	let hueOffset = 30;
	let hueInterval = 360 / totalItems;
	// function setItemColor(i, j) {
    //     let offset = Math.random() * 5
	// 	let currentFactor = (i+offset)*(j+offset);
    //     console.log(`🚀 ~ file: index.svelte ~ line 44 ~ setItemColor ~ currentFactor`, currentFactor)
	// 	return `hsla(${currentFactor * hueInterval + hueOffset}, 50%, 50%, 1)`;
	// }
</script>

<!-- https://www.domestika.org/en/courses/2729-creative-coding-making-visuals-with-javascript/units/9668-fundamentals -->

<svelte:window bind:innerHeight bind:innerWidth />
<div class="flex flex-col content-center items-center w-full">
	<h1 class="text-sky-300 w-full text-center text-3xl bold">Creative Coding</h1>
    <!-- <img src="/20211110_125818_HDR.jpg" width="500" height="500" /> -->
	<button class="btn btn-outline btn-primary mt-6" on:click={drawGrid}>Generate</button>
	<div class="flex w-full items-center justify-center m-12">
		<canvas bind:this={canvas} />
	</div>
</div>
