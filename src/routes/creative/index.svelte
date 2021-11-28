<!-- Canvas REPL for help: https://svelte.dev/repl/e4fd9f9f6fd24f909c073a02f1a921cc?version=3.44.2 -->
<script>
	import { onMount } from 'svelte';
	import { draw } from 'svelte/transition';
	import { drawOnCanvas, drawRect } from './drawing';
	let canvas, context, innerWidth, innerHeight;
	onMount(() => {
		canvas.width = innerWidth;
		console.log(`🚀 ~ file: index.svelte ~ line 9 ~ onMount ~ innerWidth`, innerWidth);
		canvas.height = innerHeight;
		console.log(`🚀 ~ file: index.svelte ~ line 11 ~ onMount ~ innerHeight`, innerHeight);
		context = canvas.getContext('2d');
		// drawOnCanvas(context);
		for (let i = 0; i < 5; i++) {
			drawRect(context, i, 100, 100, 40, 40, 80, 5);
		}
	});
</script>

<!-- https://www.domestika.org/en/courses/2729-creative-coding-making-visuals-with-javascript/units/9668-fundamentals -->

<svelte:window bind:innerHeight bind:innerWidth />
<div class="flex flex-col content-center items-center w-full">
	<h1 class="text-sky-300 w-full text-center text-3xl bold">Creative Coding</h1>
	<div class="flex w-full items-center justify-center m-12">
		<canvas bind:this={canvas} class="border-2 border-yellow-600" width="600" height="600" />
	</div>
</div>
