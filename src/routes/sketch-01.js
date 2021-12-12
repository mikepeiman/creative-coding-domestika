const canvasSketch = require('canvas-sketch');
import { drawRect, setItemColor } from '../lib/drawing'

const settings = {
  dimensions: [1080, 1080]//'A4', //[2048, 2048]
  // pixelsPerInch: 300
};
let itemHeight, itemWidth, gap,
  fill, itemsPerColumn, itemsPerLine,
  originX, originY, totalItems, remainingWidth,
  remainingHeight, offset, stroke;



const sketch = () => {
  return ({ context, width, height }) => {
    // init background
    context.fillStyle = '#333';
    context.fillRect(0, 0, width, height);
    // set key variables
    itemsPerColumn = itemsPerLine = 25
    let marginValue = 0.01
    let marginsX = width * marginValue
    let marginsY = height * marginValue
    originX = marginsX
    originY = marginsY
    remainingWidth = width - marginsX * 2
    remainingHeight = height - marginsY * 2
    gap = remainingWidth * marginValue
    itemWidth = (remainingWidth - (gap * itemsPerLine)) / (itemsPerLine) + marginValue * 50// (100 / itemsPerLine )
    itemHeight = (remainingHeight - (gap * itemsPerLine)) / (itemsPerLine) + marginValue * 50// (100 / itemsPerLine )
    totalItems = itemsPerLine * itemsPerColumn
    offset = gap / 5
    drawGrid()
    function drawGrid() {
      // context.clearRect(0, 0, width, remainingHeight);
      for (let j = 0; j < itemsPerColumn; j++) {
        for (let i = 0; i < itemsPerLine; i++) {
          fill = `hsla(180, 50%, 50%, .4)`;
          let x = originX + (itemWidth + gap) * i;
          let y = originY + (itemHeight + gap) * j;
          stroke = 'white'
          drawRect(context, x, y, itemWidth, itemHeight, fill, stroke, 1);
          if (Math.random() > 0.5) {
            fill = setItemColor(i, j, totalItems);
            drawRect(context, x + offset / 2, y + offset / 2, itemWidth - offset, itemHeight - offset, fill, stroke, 2);
          }
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
