const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
import { setItemColor } from './drawing.js'

const settings = {
  dimensions: [4096, 4096],
  // animate: true

};

const sketch = ({ context, width, height }) => {
  console.log(`🚀 ~ file: sketch-02.js ~ line 13 ~ sketch ~ width`, width)

  let color, radius, slice, angle
  color = `hsla(180, 50%, 50%, 1)`
  radius = width * .3
  slice = math.degToRad(360 / 1)
  angle = slice * 1

  // let color1 = `hsla(${random.range(0, 60)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
  // let color2 = `hsla(${random.range(60, 120)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
  // let color3 = `hsla(${random.range(120, 180)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
  // let color4 = `hsla(${random.range(180, 240)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
  // let color5 = `hsla(${random.range(240, 300)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
  // let color6 = `hsla(${random.range(300, 360)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`

  let coords = []
  let bgRectOrigin = width * .025
  let backgrounds = []
  let colors = []

  for (let i = 0; i < 3; i++) {
    let gradStartCoords = []
    let gradEndCoords = []
    let gradRadii = []
    for (let j = 0; j < 2; j++) {
      let startCoord = (random.range(0, width)).toFixed(3)
      let endCoord = (random.range(width * .25, width * .75).toFixed(3))
      let radius = (random.range(width * .25, width * .75).toFixed(3))
      gradStartCoords.push(startCoord)
      gradEndCoords.push(endCoord)
      gradRadii.push(radius)
    }
    let parameters = [...gradStartCoords, ...gradEndCoords, ...gradRadii]
    for (let j = 0; j < 6; j++) {
      const color = `hsla(${random.range(j * 60, 60 + j * 60)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.1, 0.3)})`
      colors.push({ color: color, stop: ((j) * 0.2).toFixed(1) })
    }
    let bg = {
      parameters: parameters,
      colors: colors,
      coords: coords
    }
    backgrounds.push(bg)
  }


  // backgrounds.forEach((bg, i) => {
  //   console.log(`🚀 ~ file: sketch-02.js ~ line 64 ~ sketch ~ i`, i)
  //   context.save()
  //   let grd = context.createRadialGradient(...bg.parameters)
  //   bg['colors'].forEach(item => {
  //   console.log(`🚀 ~ file: sketch-02.js ~ line 79 ~ backgrounds.forEach ~ item`, item)
  //     grd.addColorStop(item.stop, item.color)
  //   })
  //   let rectOriginValue = bgRectOrigin *.25 * (i+1)
  //   console.log(`🚀 ~ file: sketch-02.js ~ line 76 ~ backgrounds.forEach ~ rectOriginValue`, rectOriginValue)
  //   context.fillStyle = grd
  //   context.fillRect(rectOriginValue, rectOriginValue, width - rectOriginValue, height - rectOriginValue);
  //   console.log(`🚀 ~ file: sketch-02.js ~ line 86 ~ backgrounds.forEach ~ grd`, grd)
  //   context.shadowBlur = random.range(50, 200)
  //   context.shadowColor = colors[random.rangeFloor(1, 6)]
  //   context.restore()
  // })
  // ===========================================================================
  // ===========================================================================
  // Main loop - animates
  // ===========================================================================
  return ({ context, width, height }) => {
    context.clearRect(0, 0, width, height);
    context.beginPath()
    context.fillRect(0, 0, width, height)
    context.fillStyle = 'black'
    console.log(backgrounds)
    const cx = width * 0.5;
    const cy = height * 0.5;
    let x, y
    let w = width * 1;
    let h = height * .01;
    radius = width * .3
    drawBackgrounds(context, backgrounds, bgRectOrigin, width, height)


    // =========================================================================
    // =============================================================================
    // The main interior loop counter
    // =============================================================================
    const num = 15
    // =========================================================================
    // highlighting interior loop counter
    // =========================================================================
    for (let i = 0; i < num; i++) {
      // console.log(`🚀 ~ file: sketch-02.js ~ line 102 ~ return ~ i`, i)
      radius = width * random.range(0.1, .4)
      slice = math.degToRad(360 / num)
      angle = slice * i

      x = cx + radius * Math.sin(angle)
      y = cy + radius * Math.cos(angle)
      // x = cx + radius * Math.sin(random.range(angle * .05, angle * 1.5))
      // y = cy + radius * Math.cos(random.range(angle * .05, angle * 1.5))
      w = random.range(width * .5, width * 1.5)
      h = random.range(height * .1, height * .5)

      context.save()
      // =======================================================================
      // The following sets circle origin to center
      context.translate(cx, cy)
      // =======================================================================
      // =======================================================================
      // set random arc origins
      // =======================================================================
      // let r1 = random.range(-10, 5)
      // let r2 = random.range(-5, 10)
      // context.translate(cx + i * r1, cy + i * r2)
      // =======================================================================
      context.rotate(-angle)
      context.beginPath()
      context.arc(0, 0, radius * random.range(1, .4), slice * random.range(.25, .21), slice * random.range(.05, .2))
      context.shadowBlur = random.range(50, 200)
      context.lineWidth = random.range(5, 250)
      // let color1 = `hsla(${random.range(0, 60)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
      // let color2 = `hsla(${random.range(240, 360)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
      // let color3 = `hsla(${random.range(0, 120)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
      // let color4 = `hsla(${random.range(120, 240)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
      // let color5 = `hsla(${random.range(0, 40)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
      // let color6 = `hsla(${random.range(120, 240)}, ${random.range(45, 75)}%, ${random.range(25, 45)}%, ${random.range(0.55, 0.85)})`
      // let color = `hsla(${random.range(0, 60)}, ${random.range(65, 85)}%, ${random.range(15, 85)}%, ${random.range(0.05, .95)})`
      let colors = generateColors()
      context.shadowColor = colors[5]

      let grd = context.createLinearGradient(random.range(0, 100), random.range(0, 2000), x + i, y - i)
      grd.addColorStop(random.range(0, 0.2), colors[4])
      grd.addColorStop(random.range(0.2, .4), colors[1])
      grd.addColorStop(random.range(0.4, 0.6), colors[0])
      grd.addColorStop(random.range(0.6, .8), colors[5])
      grd.addColorStop(random.range(0.8, 1), colors[3])

      context.strokeStyle = grd
      context.stroke()
      context.restore()
    }
  };
};

canvasSketch(sketch, settings);

// class Arc {
//   constructor(startX, startY, radius, startAngle, endAngle) {
//     this.startX = startX,
//       this.startY = startY,
//       this.radius = radius * random.range(1, .4),
//       this.startAngle = startAngle,
//       this.endAngle = endAngle
//   }

//   addStops(colorValues) {
//     colorValues.forEach(item => {
//       this.addColorStop(item.stop, item.color)
//     })

//   }

//   draw(context) {
//     pen.save()
//     // pen.translate(this.pos.x, this.pos.y)
//     pen.beginPath()
//     pen.arc(this.startX, this.startY, this.radius, 0, Math.PI * 2)
//     pen.fill()
//     pen.lineWidth = 4
//     pen.stroke()
//     pen.restore()
//   }
// }

class radialGradientBG {
  constructor(parameters, coords, colors) {
    this.parameters = parameters
    this.coords = coords
    this.colors = colors
  }

  draw(context) {
    context.save()
    let grd = context.createRadialGradient(...this.parameters)
    context.fillStyle = grd
    context.fillRect(...this.coords);
    context.shadowBlur = random.range(50, 200)
    context.shadowColor = this.colors[random.rangeFloor(1, 6)]
    context.fill()
    console.log(this)
    context.restore()
  }
}

// class radialRect {
//   constructor(coords, gradient, colors) {
//     this.coords = coords
//     this.gradient = gradient
//     this.colors = colors
//   }

//   draw(context) {
//     context.save()
//     context.fillRect(...this.coords);
//     context.fillStyle = this
//     context.shadowBlur = random.range(50, 200)
//     context.shadowColor = this.colors[random.rangeFloor(1, 6)]
//     console.log(this)
//     context.restore()
//   }
// }

function drawBackgrounds(context, backgrounds, origin, width, height) {
  backgrounds.forEach((bg, i) => {
    context.fillRect(0, 0, width, height)
    context.fillStyle = 'black'
    console.log(`🚀 ~ file: sketch-02.js ~ line 254 ~ backgrounds.forEach ~ i`, i)
    // context.save()
    let grd = context.createRadialGradient(...bg.parameters)
    bg['colors'].forEach(item => {
      grd.addColorStop(item.stop, item.color)
    })
    let rectOriginValue = i * width * 0.025
    context.fillStyle = grd
    context.fillRect(rectOriginValue, rectOriginValue, width - 2 * rectOriginValue, height - 2 * rectOriginValue);
    context.shadowBlur = random.range(50, 200)
    context.shadowColor = bg.colors[random.rangeFloor(1, 6)]
    // context.restore()
  })
}

function drawArcs(context, backgrounds, origin, width, height) {
  backgrounds.forEach((bg, i) => {
    context.fillRect(0, 0, width, height)
    context.fillStyle = 'black'
    console.log(`🚀 ~ file: sketch-02.js ~ line 254 ~ backgrounds.forEach ~ i`, i)
    // context.save()
    let grd = context.createRadialGradient(...bg.parameters)
    bg['colors'].forEach(item => {
      grd.addColorStop(item.stop, item.color)
    })
    let rectOriginValue = i * width * 0.025
    context.fillStyle = grd
    context.fillRect(rectOriginValue, rectOriginValue, width - 2 * rectOriginValue, height - 2 * rectOriginValue);
    context.shadowBlur = random.range(50, 200)
    context.shadowColor = bg.colors[random.rangeFloor(1, 6)]
    // context.restore()
  })
}

function generateColors(s1 = 25, s2 = 75, l1 = 25, l2 = 75, a1 = 0, a2 = 1) {
  let hues = []
  for (let i = 0; i < 6; i++) {
    let hue = (random.range(i * 60, 60 + (i * 60))).toFixed(0)
    console.log(`🚀 ~ file: sketch-02.js ~ line 61 ~ sketch ~ hue`, hue)
    hues.push(hue)
  }

  let colors = []
  hues.forEach(hue => {
    let color = `hsla(${hue}, ${(random.range(s1, s2)).toFixed(0)}%, ${(random.range(l1, l2)).toFixed(0)}%, ${(random.range(a1, a2)).toFixed(2)})`
    colors.push(color)
  })
  return colors
}