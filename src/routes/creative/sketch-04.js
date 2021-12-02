const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const Color = require('canvas-sketch-util/color');
const Tweakpane = require('tweakpane')

const settings = {
  dimensions: [2048, 2048],
  animate: true
};

const panelParams = {
  rows: 25,
  cols: 2,
  scaleMin: 1,
  scaleMax: 50,
  freq: 0.001,
  amp: 0.01,
  frame: 0,
  animate: true,
  lineCap: 'round',
  angle: 1,
}

const colorsParams = {
  c1: { r: 22, g: 55, b: 255, a: .75 },
  c2: { r: 55, g: 99, b: 155, a: .75 },
  c3: { r: 88, g: 133, b: 155, a: .75 },
  c4: { r: 133, g: 255, b: 55, a: .75 },
  c5: { r: 255, g: 55, b: 133, a: .75 },
}

const createPane = () => {
  const pane = new Tweakpane.Pane()
  let folder = pane.addFolder({ title: 'Grid' })
  folder.addInput(panelParams, 'rows', {
    min: 1,
    max: 300,
    step: 1
  })
  folder.addInput(panelParams, 'cols', {
    min: 1,
    max: 300,
    step: 1
  })
  folder.addInput(panelParams, 'scaleMin', {
    min: 1,
    max: 1000,
    step: 1
  })
  folder.addInput(panelParams, 'scaleMax', {
    min: 1,
    max: 1000,
    step: 1
  })
  folder.addInput(panelParams, 'lineCap', {
    options: {
      butt: 'butt',
      round: 'round',
      square: 'square'
    }
  })

  folder = pane.addFolder({ title: 'Noise' })
  folder.addInput(panelParams, 'freq', {
    min: 0,
    max: 0.01,
    step: 0.0001
  })
  folder.addInput(panelParams, 'amp', {
    min: 0,
    max: 1,
    step: 0.01
  })
  folder = pane.addFolder({ title: 'Controls' })
  folder.addInput(panelParams, 'animate')
  folder.addInput(panelParams, 'frame', {
    min: 0,
    max: 999
  })

  folder = pane.addFolder({ title: 'Color' })
  folder.addInput(colorsParams, 'c1')
  folder.addInput(colorsParams, 'c2')
  folder.addInput(colorsParams, 'c3')
  folder.addInput(colorsParams, 'c4')
  folder.addInput(colorsParams, 'c5')

  pane.addMonitor(panelParams, 'angle', {
    view: 'graph',
    min: -1,
    max: +1,
  });
}
// generateNewColorRGBA()
// const colors = generateVariedColors((panelParams.rows * panelParams.cols))


const sketch = () => {
  return ({ context, width, height, frame }) => {
    const pen = context
    // pen.fillStyle = 'hsla(165,55%,50%,1)';
    pen.fillRect(0, 0, width, height);

    const cols = panelParams.cols
    const rows = panelParams.rows
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
      let f = panelParams.animate ? frame : panelParams.frame
      // const n = random.noise2D(x + frame * 10, y, panelParams.freq)
      const n = random.noise3D(x, y, f, panelParams.freq)
      panelParams.angle = n * Math.PI * panelParams.amp
      // const scale  = (n + 1) / 2 * 30
      const scale = math.mapRange(n, -1, 1, panelParams.scaleMin, panelParams.scaleMax)

      let cellcenterx = x + margx + cellw / 2
      let cellcentery = y + margy + cellh / 2

      pen.save()
      pen.translate(cellcenterx, cellcentery)
      pen.rotate(panelParams.angle)
      pen.lineCap = panelParams.lineCap
      pen.beginPath()
      pen.moveTo(w * -0.5, 0)
      pen.lineTo(w * 0.5, 0)
      pen.restore()
      draw(pen, cellcenterx, cellcentery, w, h, gridw, gridh, scale)
    }
  };
};


createPane()
canvasSketch(sketch, settings);

function draw(pen, cellcenterx, cellcentery, w, h, gridw, gridh, scale) {
  pen.save()


  pen.lineWidth = scale
  let grd = pen.createLinearGradient(cellcenterx, cellcentery, gridw, gridh)
  grd = addColorStops(pen, grd)
  pen.strokeStyle = grd
  pen.stroke()
  pen.restore()

}



function generateNewColorRGBA() {
  let r, g, b, a, color
  r = (random.range(0, 255)).toFixed(0)
  g = (random.range(0, 255)).toFixed(0)
  b = (random.range(0, 255)).toFixed(0)
  a = (random.range(0, 1)).toFixed(2)

  color = `rgba(${r},${g},${b},${a})`
  console.log(`🚀 ~ file: sketch-04.js ~ line 193 ~ generateNewColorRGBA ~ color`, color)
  return color
}

const addColorStops = (pen, grd) => {
  let p
  p = colorsParams.c1
  let c1 = Color.parse([p.r,p.g,p.b,p.a])
  p = colorsParams.c2
  let c2 = Color.parse([p.r,p.g,p.b,p.a])
  p = colorsParams.c3
  let c3 = Color.parse([p.r,p.g,p.b,p.a])
  p = colorsParams.c4
  let c4 = Color.parse([p.r,p.g,p.b,p.a])
  p = colorsParams.c5
  let c5 = Color.parse([p.r,p.g,p.b,p.a])
  grd.addColorStop(.2, c1.hex)
  grd.addColorStop(.4, c2.hex)
  grd.addColorStop(.6, c3.hex)
  grd.addColorStop(.8, c4.hex)
  grd.addColorStop(1, c5.hex)
  return grd
}
// const addColorStops = (pen, grd) => {
//   grd.addColorStop(.2, generateNewColorRGBA())
//   grd.addColorStop(.4, generateNewColorRGBA())
//   grd.addColorStop(.6, generateNewColorRGBA())
//   grd.addColorStop(.8, generateNewColorRGBA())
//   grd.addColorStop(1, generateNewColorRGBA())
//   return grd
// }

const wrapIndex = (arr, index) => {
  return index % arr.length
}



// function generateVariedColors(numCells, s1 = 25, s2 = 75, l1 = 25, l2 = 75, a1 = 0.5, a2 = .95) {
//   let variedHues = []
//   for (let i = 0; i < numCells; i++) {
//     let hue = (random.range(i * 30, 120 + (i * 30))).toFixed(0)
//     variedHues.push(hue)
//   }
//   let variedColors = []
//   variedHues.forEach(hue => {
//     let color = `hsla(${hue}, ${(random.range(s1, s2)).toFixed(0)}%, ${(random.range(l1, l2)).toFixed(0)}%, ${(random.range(a1, a2)).toFixed(2)})`
//     variedColors.push(color)
//   })
//   return variedColors
// }