
export const drawing = (canvas, context) => {
	let functionsOjb = {
		init: canvasInit(),
		draw: drawOnCanvas()
	}
	return functionsOjb
};
export let canvasInit = (canvas) => {
	context = canvas.getContext('2d');
	context.fillStyle = '#0099ff'; // I've discovered that fillStyle must precede .fillRect or it does not apply
};
let drawArc = (x, y, r, start, end) => {
	context.beginPath();
	context.arc(x, y, r, start, end);
	context.stroke();
};
let drawRect = (i, originX, originY, width, height, gap, lineWidth) => {
	context.beginPath();
	width = width + ((width + gap) * i)
	height = height + ((height + gap) * i)
	context.rect(originX, originY, width, height);
	context.fill();
	context.lineWidth = lineWidth;
	context.stroke();
};
export let drawOnCanvas = (canvas, context) => {
	for (let i = 0; i < 5; i++) {
		drawRect(i, 100, 100, 40, 40, 40, 5);
	}
};