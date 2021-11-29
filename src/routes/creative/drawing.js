
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
	// originX = width + ((width + gap) * i)
	// originY = height + ((height + gap) * j)
	context.rect(originX, originY, width, height);
	context.lineWidth = lineWidth;
	context.stroke();
	// context.strokeStyle = "#aabbff"
	context.fillStyle = fill; //setItemColor(i, j, totalItems)
	context.fill();
};

function setItemColor(i, j, totalItems) {
	let hueOffset = 30
	let hueInterval = 360 / (totalItems)
	let currentFactor = i + j
	return `hsla(${(currentFactor + (i*.75)) * hueInterval + hueOffset}, 45%, 45%, .4)`;
}

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
	originX,
	originY,
	pageMargin,
	totalItems;
gap = 10
width = 50
height = 50
itemsPerColumn = 5
itemsPerLine = 5
totalItems = itemsPerLine * itemsPerColumn
let drawRectData = (i, j, originX, originY, width, height, gap, lineWidth, fill) => {
	originX = width + (width + gap) * i
	originX
	originY = height + (height + gap) * j
	originY
	let rect = [originX, originY, width, height]
    console.log(`rect`, rect)

};
for (let j = 0; j < itemsPerColumn; j++) {
	for (let i = 0; i < itemsPerLine; i++) {
		let fill = `#${i}${i}${i}${j}${j}${j}`;
		drawRectData( i, j, originX, originY, width, height, gap, 5, fill);
		drawRectData( i, j, originX + 8, originY + 8, width - 16, height - 16, gap, 5, fill);
	}
}