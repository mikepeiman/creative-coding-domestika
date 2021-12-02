const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const Color = require('canvas-sketch-util/color');


const settings = {
  dimensions: [2048, 2048],
  animate: true
};

const sketch = () => {
  return ({ context, width, height, frame}) => {
    const pen = context
    pen.fillStyle = 'hsla(165,55%,50%,1)';
    pen.fillRect(0, 0, width, height);

    const cols = 10
    const rows = 10
    const numCells = cols * rows

    const gridw = width * .8
    const gridh = height * .8
    const cellw = gridw / cols
    const cellh = gridh / rows
    const margx = (width - gridw) / 2
    const margy = (width - gridh) / 2



    for (let i = 0; i < numCells; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)

      const x = col * cellw
      const y = row * cellh
      const w = cellw * .8
      const h = cellh * .8

      const n = random.noise2D(x + frame*10, y, .001)
      const angle = n * Math.PI * .2
      // const scale  = (n + 1) / 2 * 30
      const scale = math.mapRange(n, -1, 1, 1, 30)

      let cellcenterx = x + margx + cellw/2
      let cellcentery = y + margy + cellh/2

      pen.save()
      // pen.translate(x, y)
      // pen.translate(margx, margy)
      // pen.translate(cellw/2, cellh/2)
      pen.translate(cellcenterx, cellcentery)
      pen.rotate(angle)

      pen.beginPath()
      pen.moveTo(w * -0.5, 0)
      pen.lineTo(w * 0.5, 0)
      pen.lineWidth = scale
      pen.stroke()
      pen.restore()
    }
  };
};

canvasSketch(sketch, settings);
