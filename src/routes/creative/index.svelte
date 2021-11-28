<!-- https://www.domestika.org/en/courses/2729-creative-coding-making-visuals-with-javascript/units/9668-fundamentals -->
<script>
	import { onMount } from 'svelte';
	let canvas, context;
	onMount(() => {
		canvasInit();
		drawOnCanvas();
	});

	let canvasInit = () => {
		canvas = document.querySelector('canvas');
		context = canvas.getContext('2d');
		context.fillStyle = '#0099ff'; // I've discovered that fillStyle must precede .fillRect or it does not apply
	};

	let drawArc = (x, y, r, start, end) => {
		context.beginPath();
		context.arc(x, y, r, start, end);
		context.stroke();
	};
	let drawRect = (originX, originY, width, height, lineWidth) => {
		context.beginPath();
		context.rect(originX, originY, width, height);
		context.fill();
		context.lineWidth = lineWidth;
		context.stroke();
	};
	let drawOnCanvas = () => {
		for (let i = 0; i < 5; i++) {
			drawRect(100 + 60 * i, 100, 40, 40, 5);
		}
	};
</script>

<div class="flex flex-col content-center items-center w-full">
	<h1 class="text-sky-300 w-full text-center text-3xl bold">Creative Coding</h1>
	<div class="flex w-full items-center justify-center m-12">
		<canvas class="border-2 border-yellow-600" width="600" height="600" />
	</div>
</div>
