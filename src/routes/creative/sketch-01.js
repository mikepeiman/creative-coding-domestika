const canvasSketch = require('canvas-sketch');
import { drawRect, setItemColor } from './drawing'

const settings = {
  dimensions: [1080, 1080]//'A4', //[2048, 2048]
  // pixelsPerInch: 300
};
let h, w, gap, fill, itemsPerColumn, itemsPerLine, originX, originY, totalItems, remainingWidth, remainingHeight, offset



const sketch = () => {
  return ({ context, width, height }) => {
    // init background
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    // set key variables
    itemsPerColumn = itemsPerLine = 12
    console.log(`🚀 ~ file: sketch-01.js ~ line 19 ~ return ~ itemsPerLine`, itemsPerLine)
    originX = width / itemsPerLine / 2
    originY = height / itemsPerColumn / 2
    remainingWidth = width - (originX * 2)
    console.log(`🚀 ~ file: sketch-01.js ~ line 22 ~ return ~ remainingWidth`, remainingWidth)
    remainingHeight = height - originY * 2
    w = remainingWidth / itemsPerLine // (100 / itemsPerLine )
    console.log(`🚀 ~ file: sketch-01.js ~ line 25 ~ return ~ w`, w)
    h = remainingHeight / itemsPerColumn// (100 / itemsPerColumn)
    totalItems = itemsPerLine * itemsPerColumn
    gap = ((remainingWidth - w) / itemsPerLine) / 6
    console.log(`🚀 ~ file: sketch-01.js ~ line 30 ~ return ~ (w * itemsPerLine)) / itemsPerLine`, (w / itemsPerLine))
    console.log(`🚀 ~ file: sketch-01.js ~ line 30 ~ return ~ w * itemsPerLine`, w * itemsPerLine)
    console.log(`🚀 ~ file: sketch-01.js ~ line 27 ~ return ~ gap`, gap)
    offset = gap
    console.log(`🚀 ~ file: sketch-01.js ~ line 28 ~ return ~ offset`, offset)
    drawGrid()
    function drawGrid() {
      // context.clearRect(0, 0, width, remainingHeight);
      for (let j = 0; j < itemsPerColumn; j++) {
        for (let i = 0; i < itemsPerLine; i++) {
          fill = `hsla(180, 50%, 50%, .2)`;
          let x = originX + (w + gap) * i;
          let y = originY + (h + gap) * j;

          drawRect(context, x, y, w, h, gap, 5, fill);
          if (Math.random() > 0.5) {
            fill = setItemColor(i, j, totalItems);
            drawRect(context, x + offset / 2, y + offset / 2, w - offset, h - offset, gap, 15, fill);
          }
          // fill = `hsla(180, 50%, 50%, .2)`;
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
