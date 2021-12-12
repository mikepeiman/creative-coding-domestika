const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
// import { setItemColor } from '$lib/drawing.js'

const settings = {
  // dimensions: [4096, 4096],
  dimensions: [2048, 2048],
  // animate: true

};

const sketch = ({ context, width, height }) => {
  console.log(`🚀 ~ file: sketch-02.js ~ line 13 ~ sketch ~ width`, width)

  let color, radius, slice, angle
  color = `hsla(180, 50%, 50%, 1)`
  radius = width * .3
  slice = math.degToRad(360 / 1)
  angle = slice * 1

  // ===========================================================================
  // Main loop - animates
  // ===========================================================================
  return ({ context, width, height }) => {
    // context.clearRect(0, 0, width, height);
    context.fillRect(0, 0, width, height)
    context.fillStyle = 'black'
    const cx = width * 0.5;
    const cy = height * 0.5;
    let x, y
    let w = width * 1;
    let h = height * .01;
    radius = width * .3
    // drawBackgrounds(context, width, height, 3)


    // =============================================================================
    // The main interior loop counter
    // =============================================================================
    const num = 77
    // =========================================================================
    // highlighting interior loop counter
    // =========================================================================
    for (let i = 0; i < num; i++) {
      // console.log(`🚀 ~ file: sketch-02.js ~ line 102 ~ return ~ i`, i)
      radius = width * random.range(0.325, .35)
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
      let updatedSlice = updateSlice(slice)
      context.arc(0, 0, radius * random.range(1, .4), updatedSlice, updatedSlice + updatedSlice)
      // context.arc(0, 0, radius * random.range(1, .4), slice * random.range(.25, .21), slice * random.range(.05, .2))
      // context.arc(angle * 2, slice, radius * random.range(1, .3), slice * random.range(25, .1), slice * random.range(.05, .2))
      context.lineWidth = random.range(55, 250)
      let colors = generateVariedColors()
      context.shadowColor = colors[5]
      context.shadowBlur = random.range(25, 75)
      
      // let grd = context.createLinearGradient(random.range(0, 100), random.range(0, 2000), x + i, y - i)
      let grd = context.createLinearGradient(random.range(0, 1), random.range(0, 2), x + angle, y - i)
      // let p = generateRadGradParams(width, height, 0, 0, .25,  .35, radius, radius, .25, .35)
      // let grd = context.createRadialGradient(...p)
// =============================================================================
// one thing I'd like to do is have a fully-transparent color to fade out gradients
// =============================================================================
let transparent = `hsla(0,0%,0%,0)`
      grd.addColorStop(random.range(0, 0.2), colors[5])
      // grd.addColorStop(random.range(0.2, .4), colors[4])
      // grd.addColorStop(random.range(0.4, 0.6), colors[5])
      // grd.addColorStop(random.range(0.6, .8), colors[9])
      // grd.addColorStop(random.range(0.8, 1), colors[11])
      // grd.addColorStop(random.range(0, 0.2), colors[7])
      grd.addColorStop(random.range(0.2, .4), colors[10])
      // grd.addColorStop(random.range(0.4, 0.6), colors[5])
      // grd.addColorStop(random.range(0.6, .8), colors[8])
      // grd.addColorStop(random.range(0.8, 1), colors[0])
      grd.addColorStop(1, transparent)
      grd.shadowColor = colors[9]
      grd.shadowBlur = random.range(25, 75)
      context.strokeStyle = grd
      context.stroke()
      context.restore()
    }
  };
};

canvasSketch(sketch, settings);

function updateSlice(slice) {
  return slice * 1.1
}

function drawBackgrounds(context, width, height, num) {
  for (let i = 0; i < num; i++) {
    // context.fillRect(0, 0, width, height)
    // context.fillStyle = 'black'
    console.log(`🚀 ~ file: sketch-02.js ~ line 254 ~ backgrounds.forEach ~ i`, i)
    // context.save()
    let p = generateRadGradParams(width, height)
    let grd = context.createRadialGradient(...p)
    let colors = generateVariedColors(35, 65, 25, 45, 0.15, .4)
    colors.forEach((color, j) => {
      console.log(`🚀 ~ file: sketch-02.js ~ line 188 ~ colors.forEach ~ j`, j)
      let lower = j * .08
      lower < .95 ? lower : 0.9
      console.log(`🚀 ~ file: sketch-02.js ~ line 190 ~ colors.forEach ~ lower`, lower)
      let clampedUpper = math.clamp(0.2 + (j*0.7), lower, 1)
      let clampedLower = math.clamp((j*.1), 0, 0.9)
      console.log(`🚀 ~ file: sketch-02.js ~ line 190 ~ drawBackgrounds ~ clampedLower`, clampedLower)
      console.log(`🚀 ~ file: sketch-02.js ~ line 190 ~ drawBackgrounds ~ clampedUpper`, clampedUpper)
      grd.addColorStop(random.range(clampedLower, clampedUpper), color)
    })
    grd.addColorStop(random.range(0, .3), colors[3])
    grd.addColorStop(random.range(.3, .7), colors[5])

    let rectOriginValue = i * width * 0.025
    context.fillStyle = grd
    context.fillRect(rectOriginValue, rectOriginValue, width - 2 * rectOriginValue, height - 2 * rectOriginValue);
    context.shadowBlur = random.range(50, 200)
    context.shadowColor = colors[random.rangeFloor(1, 6)]
  }

}

function generateStraightColors(s1 = 35, s2 = 65, l1 = 25, l2 = 75, a1 = .1, a2 = 1) {
  let straightHues = []
  for (let i = 0; i < 6; i++) {
    let hue = (random.range(i * 60, 60 + (i * 60))).toFixed(0)
    straightHues.push(hue)
  }
  let straightColors = []
  straightHues.forEach(hue => {
    let color = `hsla(${hue}, ${(random.range(s1, s2)).toFixed(0)}%, ${(random.range(l1, l2)).toFixed(0)}%, ${(random.range(a1, a2)).toFixed(2)})`
    straightColors.push(color)
  })
  return straightColors
}

function generateVariedColors(s1 = 25, s2 = 75, l1 = 25, l2 = 75, a1 = 0, a2 = 1) {
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

// need a function to add gradient stops, can apply to both arc linear gradients and radial gradients on bg rects

function generateRadGradParams(width, height, x0 = 0, y0 = 0, r0min = .25, r0max = .75, x1 = width, y1 = height, r1min = .25, r1max = .75) {
  let params = []
  let p1 = (random.range(x0, width)).toFixed(1)
  let p2 = (random.range(y0, width)).toFixed(1)
  let p3 = (random.range(width * r0min, width * r0max)).toFixed(1)
  let p4 = (random.range(width * r0min, width * r0max)).toFixed(1)
  let p5 = (random.range(width * r1min, width * r1max)).toFixed(1)
  let p6 = (random.range(width * r1min, width * r1max)).toFixed(1)
  params = [p1, p2, p3, p4, p5, p6]
  console.log(`🚀 ~ file: sketch-02.js ~ line 228 ~ generateRadGradParams ~ params`, params)
  return params
}

function drawFigure() {

}


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
// pen.translate(this.pos.x, this.pos.y)
//     pen.beginPath()
//     pen.arc(this.startX, this.startY, this.radius, 0, Math.PI * 2)
//     pen.fill()
//     pen.lineWidth = 4
//     pen.stroke()
//     pen.restore()
//   }
// }

// class radialGradientBG {
//   constructor(parameters, coords, colors) {
//     this.parameters = parameters
//     this.coords = coords
//     this.colors = colors
//   }

//   draw(context) {
//     context.save()
//     let grd = context.createRadialGradient(...this.parameters)
//     context.fillStyle = grd
//     context.fillRect(...this.coords);
//     context.shadowBlur = random.range(50, 200)
//     context.shadowColor = this.colors[random.rangeFloor(1, 6)]
//     context.fill()
//     console.log(this)
//     context.restore()
//   }
// }

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

// function drawArcs(context, backgrounds, origin, width, height) {
//   backgrounds.forEach((bg, i) => {
//     context.fillRect(0, 0, width, height)
//     context.fillStyle = 'black'
//     console.log(`🚀 ~ file: sketch-02.js ~ line 254 ~ backgrounds.forEach ~ i`, i)
//     // context.save()
//     let grd = context.createRadialGradient(...bg.parameters)
//     bg['colors'].forEach(item => {
//       grd.addColorStop(item.stop, item.color)
//     })
//     let rectOriginValue = i * width * 0.025
//     context.fillStyle = grd
//     context.fillRect(rectOriginValue, rectOriginValue, width - 2 * rectOriginValue, height - 2 * rectOriginValue);
//     context.shadowBlur = random.range(50, 200)
//     context.shadowColor = bg.colors[random.rangeFloor(1, 6)]
//     // context.restore()
//   })
// }