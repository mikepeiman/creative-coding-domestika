<!-- https://www.domestika.org/en/courses/2729-creative-coding-making-visuals-with-javascript/units/9668-fundamentals -->

<!-- Canvas REPL for help: https://svelte.dev/repl/e4fd9f9f6fd24f909c073a02f1a921cc?version=3.44.2 -->
<script context="module">
// import {drawing} from './drawing'
// console.log(drawing)
	// export const load = async ({ fetch }) => {
	// 	const res = await fetch('/creative.json');
	// 	if (res.ok) {
	// 		const { drawing } = await res;
	// 		return drawing;
	// 	}
	// };
</script>

<script>
	// export let drawing;
    import {drawing, canvasInit, drawOnCanvas} from './drawing'
    // console.log(`🚀 ~ file: index.svelte ~ line 17 ~ drawing`, drawing)

	// import { onMount } from 'svelte';
	// let canvas, context;
	// onMount(async () => {
    //     const drawing = await import drawing from './drawing'
	// 	// drawing.canvasInit();
    //     // drawing[0]
    //     // drawing[1]
    //     // drawing.init;
    //     // drawing.draw;
    //     canvas = document.querySelector('canvas');
    //     context = canvas.getContext('2d');
        // drawing.draw(canvas, context)
    //     // drawOnCanvas(canvas, context)
    //     // drawing.canvasInit
	// });

	// let canvasInit = () => {
	// 	canvas = document.querySelector('canvas');
	// 	context = canvas.getContext('2d');
	// 	context.fillStyle = '#0099ff'; // I've discovered that fillStyle must precede .fillRect or it does not apply
	// };

	// let drawArc = (x, y, r, start, end) => {
	// 	context.beginPath();
	// 	context.arc(x, y, r, start, end);
	// 	context.stroke();
	// };
	// let drawRect = (i, originX, originY, width, height, gap, lineWidth) => {
	// 	context.beginPath();
	// 	width = width + (width + gap) * i;
	// 	height = height + (height + gap) * i;
	// 	context.rect(originX, originY, width, height);
	// 	context.fill();
	// 	context.lineWidth = lineWidth;
	// 	context.stroke();
	// };
	// let drawOnCanvas = () => {
	// 	for (let i = 0; i < 5; i++) {
	// 		drawRect(i, 100, 100, 40, 40, 40, 5);
	// 	}
	// };
</script>

<div class="flex flex-col content-center items-center w-full">
	<h1 class="text-sky-300 w-full text-center text-3xl bold">Creative Coding</h1>
	<div class="flex w-full items-center justify-center m-12">
		<canvas class="border-2 border-yellow-600" width="600" height="600" />
	</div>
</div>
