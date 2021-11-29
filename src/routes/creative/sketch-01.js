const canvasSketch = require('canvas-sketch');
import { drawRect, setItemColor } from './drawing'

const settings = {
  dimensions: [1080, 1080]//'A4', //[2048, 2048]
  // pixelsPerInch: 300
};
let itemHeight, itemWidth, gap, fill, itemsPerColumn, itemsPerLine, originX, originY, totalItems, remainingWidth, remainingHeight, offset



const sketch = () => {
  return ({ context, width, height }) => {
    // init background
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    console.log(`🚀 ~ file: sketch-01.js ~ line 17 ~ return ~ width`, width)
    // set key variables
    itemsPerColumn = itemsPerLine = 12
    let marginsX = width * .05
    console.log(`🚀 ~ file: sketch-01.js ~ line 21 ~ return ~ marginsX`, marginsX)
    let marginsY = height * .05
    originX =  marginsX
    console.log(`🚀 ~ file: sketch-01.js ~ line 24 ~ return ~ originX`, originX)
    originY =  marginsY
    remainingWidth = width - marginsX * 2
    console.log(`🚀 ~ file: sketch-01.js ~ line 24 ~ return ~ remainingWidth`, remainingWidth)
    remainingHeight = height - marginsY * 2
    console.log(`🚀 ~ file: sketch-01.js ~ line 29 ~ return ~ remainingHeight`, remainingHeight)
    gap = remainingWidth * .01
    itemWidth = (remainingWidth  - (gap * itemsPerLine)) / ( itemsPerLine)// (100 / itemsPerLine )
    itemHeight = (remainingHeight - (gap * itemsPerLine)) / (itemsPerLine) // (100 / itemsPerLine )
    console.log(`🚀 ~ file: sketch-01.js ~ line 29 ~ return ~ itemWidth`, itemWidth)
    // itemHeight= (remainingHeight - marginsY * 2) / itemsPerColumn// (100 / itemsPerColumn)
    totalItems = itemsPerLine * itemsPerColumn
    // gap = ((remainingWidth) / itemsPerLine / 100) + (itemWidth/ itemsPerLine)
    // gap = marginsX / 2
    offset = gap / 2
    drawGrid()
    function drawGrid() {
      // context.clearRect(0, 0, width, remainingHeight);
      for (let j = 0; j < itemsPerColumn; j++) {
        for (let i = 0; i < itemsPerLine; i++) {
          fill = `hsla(180, 50%, 50%, .2)`;
          let x = originX + (itemWidth + gap) * i;
          let y = originY + (itemHeight + gap) * j;

          drawRect(context, x, y, itemWidth, itemHeight, gap, 5, fill);
          if (Math.random() > 0.5) {
            fill = setItemColor(i, j, totalItems);
            drawRect(context, x + offset / 2, y + offset / 2, itemWidth - offset, itemHeight - offset, gap, 15, fill);
          }
          // fill = `hsla(180, 50%, 50%, .2)`;
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
