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

  let color1 = `hsla(${random.range(0, 60)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
  let color2 = `hsla(${random.range(60, 120)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
  let color3 = `hsla(${random.range(120, 180)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
  let color4 = `hsla(${random.range(180, 240)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
  let color5 = `hsla(${random.range(240, 300)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
  let color6 = `hsla(${random.range(300, 360)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`


  let backgrounds = []
  for (let i = 0; i < 10; i++) {
    console.log(`🚀 ~ file: sketch-02.js ~ line 29 ~ sketch ~ i`, i)
    let gradStartCoords = []
    let gradEndCoords = []
    let gradRadii = []
    for (let j = 0; j < 2; j++) {
      let startCoord = random.range(0, width)
      let endCoord = random.range(width * .25, width * .75)
      let radius = random.range(width * .25, width * .75)
      gradStartCoords.push(startCoord)
      gradEndCoords.push(endCoord)
      gradRadii.push(radius)
    }
    let radialGradientParameters = [...gradStartCoords, ...gradEndCoords, ...gradRadii]
    let colors = []
    for (let j = 0; j < 6; j++) {
      const color = `hsla(${random.range(j * 60, 60 + j * 60)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.1, 0.3)})`
      colors.push({color: color, stop: (j) * 0.2})
    }
    let bg = context.createRadialGradient(...radialGradientParameters)
    bg['colors'] = colors
    colors.forEach(item => {
      bg.addColorStop(item.stop, item.color)
    })


    backgrounds.push(bg)

  }
  backgrounds.forEach(bg => {
    let offsets = []
    let offset = width * .025
    for (let j = 2; j < 6; j++) {
      let off = offset * j
      offsets.push(off)
    }
    context.fillStyle = bg
    context.fillRect(...offsets);
    context.shadowBlur = random.range(50, 200)
    context.shadowColor = bg.colors[random.rangeFloor(1, 6)]
  })
  // ===========================================================================




  color = `hsla(${random.range(0, 360)}, ${random.range(10, 60)}%, ${random.range(10, 60)}%, ${random.range(0.1, 0.9)})`

  color1 = `hsla(${random.range(200, 140)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
  color2 = `hsla(${random.range(40, 120)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
  color3 = `hsla(${random.range(120, 180)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
  color4 = `hsla(${random.range(240, 160)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
  color5 = `hsla(${random.range(120, 240)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
  color6 = `hsla(${random.range(120, 240)}, ${random.range(45, 75)}%, ${random.range(25, 45)}%, ${random.range(0.55, 0.85)})`

  let gradientColorValues = [
    {
      stop: random.range(0, 0.2), color1
    },
    {
      stop: random.range(0.2, 0.4), color2
    },
    {
      stop: random.range(0.4, 0.6), color3
    },
    {
      stop: random.range(0.6, 0.8), color4
    },
    {
      stop: random.range(0.8, 1), color5
    },
  ]
  // ===========================================================================
  // Main loop - animates
  // ===========================================================================
  return ({ context, width, height }) => {
    const cx = width * 0.5;
    const cy = height * 0.5;
    let x, y
    let w = width * 1;
    let h = height * .01;
    context.clearRect(0, 0, width, height);
    context.fillRect(0,0,width,height)
    context.fillStyle = 'black'

    radius = width * .3

    // =========================================================================
    // =============================================================================
    // The main interior loop counter
    // =============================================================================
    const num = 15
    // =========================================================================
    // highlighting interior loop counter
    // =========================================================================
    for (let i = 0; i < num; i++) {
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
      let r1 = random.range(-50, 50)
      let r2 = random.range(-50, 50)
      // context.translate(cx + i * r1, cy + i * r2)
      // =======================================================================
      context.rotate(-angle)
      context.beginPath()
      context.arc(0, 0, radius * random.range(1, .4), slice * random.range(.25, .21), slice * random.range(.05, .2))
      context.shadowBlur = random.range(50, 200)
      context.shadowColor = color6
      // context.lineCap = 'round'
      context.lineWidth = random.range(5, 250)
      color = `hsla(${random.range(0, 60)}, ${random.range(65, 85)}%, ${random.range(15, 85)}%, ${random.range(0.05, .95)})`

      color1 = `hsla(${random.range(0, 60)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
      color2 = `hsla(${random.range(240, 360)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
      color3 = `hsla(${random.range(0, 120)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
      color4 = `hsla(${random.range(120, 240)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
      color5 = `hsla(${random.range(0, 40)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.25, 0.85)})`
      color6 = `hsla(${random.range(120, 240)}, ${random.range(45, 75)}%, ${random.range(25, 45)}%, ${random.range(0.55, 0.85)})`

      let grd = context.createLinearGradient(random.range(0, 100), random.range(0, 2000), x + i, y - i)
      grd.addColorStop(random.range(0, 0.2), color5)
      grd.addColorStop(random.range(0.2, .4), color3)
      grd.addColorStop(random.range(0.4, 0.6), color1)
      grd.addColorStop(random.range(0.6, .8), color2)
      grd.addColorStop(random.range(0.8, 1), color4)

      context.strokeStyle = grd
      context.stroke()
      context.restore()
    }
  };
};

canvasSketch(sketch, settings);

class Arc {
  constructor(startX, startY, radius, startAngle, endAngle) {
    this.startX = startX,
      this.startY = startY,
      this.radius = radius * random.range(1, .4),
      this.startAngle = startAngle,
      this.endAngle = endAngle
  }

  addStops(colorValues) {
    colorValues.forEach(item => {
      this.addColorStop(item.stop, item.color)
    })

  }

  draw(context) {
    pen.save()
    // pen.translate(this.pos.x, this.pos.y)
    pen.beginPath()
    pen.arc(this.startX, this.startY, this.radius, 0, Math.PI * 2)
    pen.fill()
    pen.lineWidth = 4
    pen.stroke()
    pen.restore()
  }
}

class radialGradientBG {
  constructor(bg) {
    this.bg = bg

  }
}