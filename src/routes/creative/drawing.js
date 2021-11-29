
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
export const drawRect = (context, originX, originY, width, height, gap, lineWidth, fill) => {
	context.strokeStyle = "#aabbff"
	context.beginPath();
	context.rect(originX, originY, width, height);
	context.lineWidth = lineWidth;
	context.stroke();
	context.fillStyle = fill;
	context.fill();
};

export const setItemColor = (i, j, totalItems) => {
	let hueOffset = 30
	let hueInterval = 360 / (totalItems)
	let offset = Math.random() * 5
	let currentFactor = (i+offset)*(j+offset);
	let color = `hsla(${(currentFactor + (i*.75)) * hueInterval + hueOffset}, 45%, 45%, .4)`;
	return color
}
