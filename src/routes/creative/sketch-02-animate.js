const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const Color = require('canvas-sketch-util/color');
const Tweakpane = require('tweakpane');
const colorNames = require('daisyui/colors/colorNames');

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

let radius, slice, angle

const structureParams = {
  numberOfArcs: 12
}

const colorParams = {
  h1: 0, h2: 360, s1: 25, s2: 75, l1: 25, l2: 75, a1: 0.1, a2: .55
}

const setColorsParams = {
  c1: "#b2186349",
  c2: "#2d9f21b1",
  c3: "#3533a5e5",
  c4: "#00cce8aa",
  c5: "#ffab29cf",
  c6: "#ffab29cf",
}

const arcParams = {
  vel: {
    hue: 1
  },
  hue: 1
}

const createPane = () => {
  const pane = new Tweakpane.Pane()
  let folder = pane.addFolder({ title: 'Structure' })
  folder.addInput(structureParams, 'numberOfArcs', {
    min: 1,
    max: 30,
    step: 1
  })
  folder = pane.addFolder({ title: 'Color' })
  // folder.addInput(colorParams, 'h1', {
  //   min: 0,
  //   max: 360,
  //   step: 1
  // })
  // folder.addInput(colorParams, 'h2', {
  //   min: 0,
  //   max: 360,
  //   step: 1
  // })
  // folder.addInput(colorParams, 's1', {
  //   min: 0,
  //   max: 100,
  //   step: 1
  // })
  // folder.addInput(colorParams, 's2', {
  //   min: 0,
  //   max: 100,
  //   step: 1
  // })
  // folder.addInput(colorParams, 'l1', {
  //   min: 0,
  //   max: 100,
  //   step: 1
  // })
  // folder.addInput(colorParams, 'l2', {
  //   min: 0,
  //   max: 100,
  //   step: 1
  // })
  // folder.addInput(colorParams, 'a1', {
  //   min: 0,
  //   max: 100,
  //   step: 1
  // })
  // folder.addInput(colorParams, 'a2', {
  //   min: 0,
  //   max: 1,
  //   step: .01
  // })
  folder.addInput(setColorsParams, 'c1', {
    picker: 'inline',
    expanded: true
  })
  folder.addInput(setColorsParams, 'c2', {
    picker: 'inline',
    expanded: true
  })
  folder.addInput(setColorsParams, 'c3', {
    picker: 'inline',
    expanded: true
  })
  folder.addInput(setColorsParams, 'c4', {
    picker: 'inline',
    expanded: true
  })
  folder.addInput(setColorsParams, 'c5', {
    picker: 'inline',
    expanded: true
  })
  folder.addInput(setColorsParams, 'c6', {
    picker: 'inline',
    expanded: true
  })
}

const sketch = ({ context, width, height }) => {
  radius = width * .3

  const cx = width * 0.5;
  const cy = height * 0.5;
  let x, y
  let colors = generateVariedColors()
  const numberOfArcs = structureParams.numberOfArcs
  let arcs = []
  console.log(`🚀 ~ file: sketch-02-animate.js ~ line 36 ~ sketch ~ arcs`, arcs.length)

  const date = new Date()
  let seconds = date.getSeconds()
  const timer = setTimeout(runTimer, 1000)

  function runTimer() {
    generateArcs(structureParams.numberOfArcs)
    if (settings.animate) {
      setTimeout(runTimer, 250)
    }
  }
  function generateArcs(numberOfArcs) {
    if (numberOfArcs < arcs?.length) {
      let len = arcs.length
      arcs = arcs.slice(0, len - numberOfArcs)
    }
    for (let i = arcs?.length; i < numberOfArcs; i++) {
      let arc = buildArc()
      arcs.push(arc)
    }
  }

  function buildArc() {
    let thisArcColors = []
    for (let j = 0; j < 4; j++) {
      const colorIdx = wrapIndex(colors, parseInt(random.range(0, colors.length)))
      const color = colors[colorIdx]
      thisArcColors.push(color)
    }

    
    let arc = createArc(cx,
      cy,
      random.range(radius * .25,
        radius),
      random.range(0, 7),
      random.range(0, 7),
      random.range(55, 250),
      thisArcColors)
    return arc
  }
  runTimer()
  console.log(arcs)
  return ({ context, width, height }) => {
    runTimer()
    const pen = context
    pen.fillStyle = 'black';
    pen.fillRect(0, 0, width, height);
    let num = arcs.length
    for (let i = 0; i < arcs.length; i++) {
      radius = width * random.range(0.325, .35)
      slice = math.degToRad(360 / num)
      angle = slice * i
      x = cx + radius * Math.sin(angle)
      y = cy + radius * Math.cos(angle)
      const arc = arcs[i];

      // for (let j = i + 1; j < arcs.length; j++) {
      // pen.lineWidth = math.mapRange(dist, 0, 200, 12, 1)
      pen.beginPath()
      pen.arc(arc.center.x, arc.center.y, arc.radius, arc.angle.start, arc.angle.end)
      let grd = pen.createLinearGradient(cx, cy, x, y)
      grd = addColorStops(pen, arc, grd, i)
      // console.log(`🚀 ~ file: sketch-02-animate.js ~ line 65 ~ return ~ grd`, grd)
      // console.log(`🚀 ~ file: sketch-02-animate.js ~ line 65 ~ return ~ cx,cy,x,y`, cx,cy,x,y)

      pen.strokeStyle = grd
      // pen.lineCap = "round"
      pen.lineWidth = arc.lineWidth
      // pen.moveTo(arc.startPos.x, arc.startPos.y)
      // pen.lineTo(other.startPos.x, other.startPos.y)
      pen.stroke()
      // }

    }

    arcs.forEach(arc => {
      updateArc(arc)
      bounce(arc, width)
      // console.log(`🚀 ~ file: sketch-02-animate.js ~ line 103 ~ return ~ arc`, arc)
    })
  };
};

createPane()
canvasSketch(sketch, settings);

function generateVariedColors(h1 = colorParams.h1, h2 = colorParams.h2, s1 = colorParams.s1, s2 = colorParams.s2, l1 = colorParams.l1, l2 = colorParams.l2, a1 = colorParams.a1, a2 = colorParams.a2) {
  let variedHues = []
  for (let i = 0; i < 12; i++) {
    let hue = (random.range(i * 30, 120 + (i * 30))).toFixed(0)
    variedHues.push(hue)
  }
  let variedColors = []
  variedHues.forEach(hue => {
    let color = `hsla(${hue}, ${(random.range(s1, s2)).toFixed(0)}%, ${(random.range(l1, l2)).toFixed(0)}%, ${(random.range(a1, a2)).toFixed(2)})`
    variedColors.push(color)
  })
  return variedColors
}



function createArc(x, y, r, s, e, lineWidth, colors) {
  let arc = {
    center: { x: x, y: y },
    radius: r,
    angle: { start: s, end: e },
    lineWidth: lineWidth,
    colors: colors,
    vel: {
      radius: (random.range(.5, 2.5)),
      rotation: (random.range(0.025, .001)),
      hueChange: (random.range(0.001, 5)),
      lineWidth: (random.range(1, .25)),
      hue: (random.range(1, 2.5))
    }
  }
  return arc
}

const addColorStops = (pen, arc, grd, i) => {
  grd.addColorStop(0, `${arc.colors[wrapIndex(arc.colors, i)]}`)
  grd.addColorStop(.3, `${arc.colors[wrapIndex(arc.colors, i + 1)]}`)
  // grd.addColorStop(.6, `${arc.colors [wrapIndex(arc.colors, i+2)]}`)
  grd.addColorStop(.9, `${arc.colors[wrapIndex(arc.colors, i + 3)]}`)
  // lags too much with shadow blur
  pen.shadowBlur = random.range(50, 200)
  pen.shadowColor = arc.colors[0]
  return grd
}

function bounce(arc, width) {
  let r = arc.radius
  let lw = arc.lineWidth
  let minRadius = width * .075
  let maxRadius = width * .3
  if (r <= minRadius || r >= maxRadius) {
    arc.vel.radius *= -1
    arc.vel.rotation = (random.range(0.025, .001))
  }
  if (lw < 10 || lw > 250) {
    arc.vel.lineWidth *= -1
  }
}

function updateArc(arc) {
  arc.angle.start += parseFloat(arc.vel.rotation)
  arc.angle.end += parseFloat(arc.vel.rotation)
  arc.radius += parseFloat(arc.vel.radius)
  arc.lineWidth += parseFloat(arc.vel.lineWidth)
  arc.colors = updateColors()
}
const updateColors = () => {
  let keys = Object.keys(setColorsParams)
  let colors = []
  keys.forEach(key => {
    colors.push(setColorsParams[key])
  })
  colors.forEach((color, i) => {
    result = Color.parse(color)
    let hsla = result.hsla
    hsla[0] += parseFloat(arcParams.vel.hue, 1)
    let final = `hsla(${hsla[0]}, ${hsla[1]}%, ${hsla[2]}%, ${hsla[3]})`
    colors[i] = final
  })
  return colors
}

const wrapIndex = (arr, index) => {
  return index % arr.length
}