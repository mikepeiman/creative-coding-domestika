const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const Color = require('canvas-sketch-util/color');
const Tweakpane = require('tweakpane');
const { value } = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048],
  animate: true
};

// try using noise as color variable in hue and rgb

const panelParams = {
  rows: 100,
  cols: 1,
  scaleMin: 1,
  scaleMax: 4,
  freq: 0.001,
  amp: 0.43,
  frame: 0,
  animate: true,
  lineCap: 'butt',
  angle: 1,
}

const colorsParams = {
  c1: { r: 22, g: 55, b: 255, a: .75 },
  c2: { r: 55, g: 99, b: 155, a: .75 },
  c3: { r: 88, g: 133, b: 155, a: .75 },
  c4: { r: 133, g: 255, b: 55, a: .75 },
  c5: { r: 255, g: 55, b: 133, a: .75 },
}

const colors = {
  red: {
    currentValue: 100,
    varianceAmplitude: 5,
    movementSpeed: 1
  },
 green: {
    currentValue: 100,
    varianceAmplitude: 5,
    movementSpeed: 1
  },
 blue: {
    currentValue: 100,
    varianceAmplitude: 5,
    movementSpeed: 1
  },
 alpha: {
    currentValue: 1,
    varianceAmplitude: .05,
    movementSpeed: .01
  }
}


const monitorParams = {
  cellw: 0,
  cellh: 0,
  x: 0,
  y: 0,
  posMoveToX: 0,
  posMoveToY: 0,
  posLineToX: 0,
  posLineToY: 0,
  cellcenterx: 0,
  cellcentery: 0,
}

const createPane = () => {
  const pane = new Tweakpane.Pane()
  let folder = pane.addFolder({ title: 'Grid' })
  folder.addInput(panelParams, 'rows', {
    min: 1,
    max: 1000,
    step: 1
  })
  folder.addInput(panelParams, 'cols', {
    min: 1,
    max: 1000,
    step: 1
  })
  folder.addInput(panelParams, 'scaleMin', {
    min: 1,
    max: 1000,
    step: 1
  })
  folder.addInput(panelParams, 'scaleMax', {
    min: 1,
    max: 100,
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
    max: 0.1,
    step: 0.001
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
  folder.addInput(colors.red, 'movementSpeed', {
    min: 0,
    max: 10,
    step: 1
  })
  folder.addInput(colors.green, 'movementSpeed', {
    min: 0,
    max: 10,
    step: 1
  })
  folder.addInput(colors.blue, 'movementSpeed', {
    min: 0,
    max: 10,
    step: 1
  })
  folder.addInput(colors.alpha, 'movementSpeed', {
    min: 0,
    max: 1,
    step: .01
  })

  pane.addMonitor(panelParams, 'angle', {
    view: 'graph',
    min: -1,
    max: +1,
  });
  pane.addMonitor(monitorParams, 'cellw', {
    // view: 'graph',
  });
  pane.addMonitor(monitorParams, 'cellh', {
    // view: 'graph',
  });
  pane.addMonitor(monitorParams, 'cellcenterx', {
    // view: 'graph',
  });
  pane.addMonitor(monitorParams, 'cellcentery', {
    // view: 'graph',
  });

  pane.addMonitor(monitorParams, 'posMoveToX', {
    multiline: true,
    linecount: 5
  });
  pane.addMonitor(monitorParams, 'posMoveToY', {
    // view: 'graph',
  });
  pane.addMonitor(monitorParams, 'posLineToX', {
    // view: 'graph',
  });
  pane.addMonitor(monitorParams, 'posLineToY', {
    // view: 'graph',
  });
}
// generateNewColorRGBA()
// const colors = generateVariedColors((panelParams.rows * panelParams.cols))

// =============================================================================
// Timer
// =============================================================================
const timestamp = Math.round(Date.now() / 1000);
const date = new Date()
let seconds = date.getSeconds()
console.log(`🚀 ~ file: sketch-04.js ~ line 141 ~ seconds`, seconds)
const timer = setTimeout(varyColors, 1000)
function varyColors() {
  console.log(`varyColors timer running`)
  adjustColorParams(colors.red, colors.green, colors.blue, colors.alpha)
  if (settings.animate) {
    setTimeout(varyColors, 10)
  }
}

// =============================================================================
//  / timer
// =============================================================================

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
    const cellw = monitorParams.cellw = gridw / cols
    const cellh = monitorParams.cellh = gridh / rows
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
      monitorParams.cellcenterx = cellcenterx
      monitorParams.cellcentery = cellcentery
      pen.save()
      pen.translate(cellcenterx, cellcentery)
      pen.rotate(panelParams.angle)
      pen.beginPath()
      let posMoveToX = w * -0.5
      let posMoveToY = 0
      monitorParams.posMoveTo = { x: w * -0.5, y: 0 }
      monitorParams.posMoveTo.x = w * -0.5
      monitorParams.posMoveTo.y = 0
      let posLineToX = w * 0.5
      let posLineToY = 0
      monitorParams.posMoveToX = posMoveToX
      monitorParams.posMoveToY = posMoveToY
      monitorParams.posLineToX = posLineToX
      monitorParams.posLineToY = posLineToY
      pen.moveTo(posMoveToX, posMoveToY)
      pen.lineTo(posLineToX, posLineToY)
      pen.restore()
      pen.lineCap = panelParams.lineCap
      draw(pen, cellcenterx, cellcentery, w, h, gridw, gridh, scale)
    }
  };
};


createPane()
canvasSketch(sketch, settings);

function draw(pen, cellcenterx, cellcentery, w, h, gridw, gridh, scale) {
  // pen.save()
  pen.lineWidth = scale
  // let grd = pen.createLinearGradient(cellcenterx, cellcentery, gridw, gridh)
  let grd = pen.createLinearGradient(gridw, gridh, cellcenterx, 700)
  grd = addColorStops(pen, grd)
  pen.strokeStyle = grd
  pen.stroke()
  pen.restore()

}



function generateNewColorRGBA(red, green, blue, alpha) {
  let r, g, b, a, color
  r = (random.range(0, 255)).toFixed(0)
  g = (random.range(0, 255)).toFixed(0)
  b = (random.range(0, 255)).toFixed(0)
  a = (random.range(0, 1)).toFixed(2)

  color = `rgba(${r},${g},${b},${a})`
  // console.log(`🚀 ~ file: sketch-04.js ~ line 193 ~ generateNewColorRGBA ~ color`, color)
  return color
}



// adjustColorParams(red, green, blue, alpha)

function adjustColorParams(red, green, blue, alpha) {
  let r, g, b, a
  let current, amp, movement
  current = red.currentValue
  amp = red.varianceAmplitude
  movement = red.movementSpeed
  let colorParamsKeys = Object.keys(colorsParams)
  colorParamsKeys.forEach(key => {
    console.log(`🚀 ~ file: sketch-04.js ~ line 283 ~ adjustColorParams ~ key`, key)
    let value = colorsParams[key]
    console.log(`🚀 ~ file: sketch-04.js ~ line 285 ~ adjustColorParams ~ value `, value)
    r = value.r
    r = parseInt(random.range(r + amp, r - amp) + movement)
    r = checkRGBwithinRange(r, "red")
    colorsParams[key].r = r
    g = value.g
    g = parseInt(random.range(g + amp, g - amp) + movement)
    g = checkRGBwithinRange(g, "green")
    colorsParams[key].g = g
    b = value.b
    b = parseInt(random.range(b + amp, b - amp) + movement)
    b = checkRGBwithinRange(b, "blue")
    colorsParams[key].b = b
    // a = value.a
    // a = parseInt(random.range(a + amp, a - amp) + movement)
    // a = checkAlphaWithinRange(a, "alpha")
    // colorsParams[key].a = a

    console.log(`🚀 ~ file: sketch-04.js ~ line 285 ~ adjustColorParams ~ value `, value)
  })
}

function checkRGBwithinRange(value, colorName) {
  if (value > 255) {
    value = 255
    reverseColorMovement(colorName)
  }
  if (value < 1) {
    value = 0
    reverseColorMovement(colorName)
  }
  return value
}

function reverseColorMovement(colorName) {
  let c = colors[`${colorName}`].movementSpeed *= -1
  console.log(`🚀 ~ file: sketch-04.js ~ line 323 ~ reverseColorMovement ~ c`, c)
}

function checkAlphaWithinRange(value) {
  if (value > .99) {
    value = 1
  }
  if (value < .8) {
    value = .8
  }
  return value
}

function createRGBAcolor(red, green, blue, alpha) {
  let current, amp
  current = red.currentValue
  amp = red.varianceAmplitude
  let r = parseInt(random.range(current + amp, current - amp))
  current = green.currentValue
  amp = green.varianceAmplitude
  let g = parseInt(random.range(current + amp, current - amp))
  current = blue.currentValue
  amp = blue.varianceAmplitude
  let b = parseInt(random.range(current + amp, current - amp))
  current = alpha.currentValue
  amp = alpha.varianceAmplitude
  let a = parseFloat(random.range(current + amp, current - amp).toFixed(2))
  let color = { r: r, g: g, b: b, a: a }
}

const addColorStops = (pen, grd) => {
  let p
  p = colorsParams.c1
  let c1 = Color.parse([p.r, p.g, p.b, p.a])
  p = colorsParams.c2
  let c2 = Color.parse([p.r, p.g, p.b, p.a])
  p = colorsParams.c3
  let c3 = Color.parse([p.r, p.g, p.b, p.a])
  p = colorsParams.c4
  let c4 = Color.parse([p.r, p.g, p.b, p.a])
  p = colorsParams.c5
  let c5 = Color.parse([p.r, p.g, p.b, p.a])
  grd.addColorStop(.2, `rgba(${c1.rgba})`)
  grd.addColorStop(.4, `rgba(${c2.rgba})`)
  grd.addColorStop(.6, `rgba(${c3.rgba})`)
  grd.addColorStop(.8, `rgba(${c4.rgba})`)
  grd.addColorStop(1, `rgba(${c5.rgba})`)
  return grd
}
// const addColorStops = (pen, grd) => {
//   let p
//   p = colorsParams.c1
//   let c1 = Color.parse([p.r, p.g, p.b, p.a])
//   p = colorsParams.c2
//   let c2 = Color.parse([p.r, p.g, p.b, p.a])
//   p = colorsParams.c3
//   let c3 = Color.parse([p.r, p.g, p.b, p.a])
//   p = colorsParams.c4
//   let c4 = Color.parse([p.r, p.g, p.b, p.a])
//   p = colorsParams.c5
//   let c5 = Color.parse([p.r, p.g, p.b, p.a])
//   grd.addColorStop(.2, c1.hex)
//   grd.addColorStop(.4, c2.hex)
//   grd.addColorStop(.6, c3.hex)
//   grd.addColorStop(.8, c4.hex)
//   grd.addColorStop(1, c5.hex)
//   return grd
// }

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

const wrapIndex = (arr, index) => {
  return index % arr.length
}
const checkRemainder = (num1, num2) => {
  return num1 % num2
}
let rgb = 255
let cent = 100
console.log(`CheckRemainder rgb, cent : ${checkRemainder(rgb, cent)}`)



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