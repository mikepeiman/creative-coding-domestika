const canvasSketch = require('canvas-sketch');
import { drawRect, setItemColor } from './drawing'

const settings = {
  dimensions: [2048, 2048]
};
let h, w, gap, fill, itemsPerColumn, itemsPerLine, originX, originY, totalItems
h = w = 100
gap = 50
originX = originY = 100
itemsPerColumn = itemsPerLine = 6
totalItems = itemsPerLine * itemsPerColumn
const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    drawGrid()
    async function drawGrid() {
      context.clearRect(0, 0, width, height);
      for (let j = 0; j < itemsPerColumn; j++) {
        for (let i = 0; i < itemsPerLine; i++) {
          fill = `hsla(180, 50%, 50%, .2)`;
          let x = originX + (w + gap) * i;
          let y = originY + (h + gap) * j;

          drawRect(context, x, y, w, h, gap, 5, fill);
          if (Math.random() > 0.5) {
            fill = await setItemColor(i, j, totalItems);
            drawRect(context, x + 8, y + 8, w - 16, h - 16, gap, 15, fill);
          }
          // fill = `hsla(180, 50%, 50%, .2)`;
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
