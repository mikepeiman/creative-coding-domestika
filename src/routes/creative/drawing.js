
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
export let drawRect = (context, i, j, originX, originY, width, height, gap, lineWidth, fill) => {
	context.strokeStyle = "#aabbff"
	context.beginPath();
	originX = width + ((width + gap) * i)
	originY = height + ((height + gap) * j)
	context.rect(originX, originY, width, height);
	context.lineWidth = lineWidth;
	context.stroke();
	// context.strokeStyle = "#aabbff"
	context.fillStyle = fill
	context.fill();
};
export const drawOnCanvas = (context) => {
	drawRect(context, i, 100, 100, 160, 40, 40, 5);
}
