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

  let bg1, bg2, bg3, bg4

  // =========================================================================
  let color1b = `hsla(${random.range(0, 60)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.1, 0.3)})`
  let color2b = `hsla(${random.range(60, 180)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.1, 0.3)})`
  let color3b = `hsla(${random.range(120, 240)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.1, 0.3)})`
  let color4b = `hsla(${random.range(180, 240)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.1, 0.3)})`
  let color5b = `hsla(${random.range(240, 60)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.1, 0.3)})`
  let color6b = `hsla(${random.range(300, 40)}, ${random.range(25, 75)}%, ${random.range(5, 45)}%, ${random.range(0.1, 0.3)})`
  // =========================================================================
  let wRange1a = random.range(0, width)
  let wRange1b = random.range(0, width)
  let wRange1c = random.range(width * .25, width * .75)
  let wRange1d = random.range(width * .25, width * .75)
  let wRange1e = random.range(width * .25, width * .75)
  let wRange1f = random.range(width * .25, width * .75)
  bg1 = context.createRadialGradient(wRange1a, wRange1b, wRange1c, wRange1d, wRange1e, wRange1f)
  bg1.addColorStop(0, color1)
  bg1.addColorStop(0.5, color6)
  bg1.addColorStop(1, color2)
  // =============================================================================
  let wRange2a = random.range(0, width)
  let wRange2b = random.range(0, width)
  let wRange2c = random.range(width * .25, width * .75)
  let wRange2d = random.range(width * .25, width * .75)
  let wRange2e = random.range(width * .25, width * .75)
  let wRange2f = random.range(width * .25, width * .75)
  bg2 = context.createRadialGradient(wRange2a, wRange2b, wRange2c, wRange2d, wRange2e, wRange2f)
  bg2.addColorStop(1, color3)
  bg2.addColorStop(0.5, color4)
  bg2.addColorStop(0, color5)
  // =============================================================================
  let wRange3a = random.range(0, width)
  let wRange3b = random.range(0, width)
  let wRange3c = random.range(width * .25, width * .75)
  let wRange3d = random.range(width * .25, width * .75)
  let wRange3e = random.range(width * .25, width * .75)
  let wRange3f = random.range(width * .25, width * .75)
  bg3 = context.createRadialGradient(wRange3a, wRange3b, wRange3c, wRange3d, wRange3e, wRange3f)
  bg3.addColorStop(0, color1b)
  bg3.addColorStop(0.5, color6b)
  bg3.addColorStop(1, color2b)
  // =============================================================================
  let wRange4a = random.range(0, width)
  let wRange4b = random.range(0, width)
  let wRange4c = random.range(width * .25, width * .75)
  let wRange4d = random.range(width * .25, width * .75)
  let wRange4e = random.range(width * .25, width * .75)
  let wRange4f = random.range(width * .25, width * .75)
  bg4 = context.createRadialGradient(wRange4a, wRange4b, wRange4c, wRange4d, wRange4e, wRange4f)
  bg4.addColorStop(1, color3b)
  bg4.addColorStop(0.5, color4b)
  bg4.addColorStop(0, color5b)
  // =============================================================================
  let off1 = width * .025
  let off2 = off1 * 2
  let off3 = off1 * 3
  let off4 = off1 * 4
  context.fillRect(0, 0, width, height);
  context.fillStyle = 'black';
  context.fillStyle = '#000';
  context.fillRect(0, 0, width, height);
  context.fillStyle = bg3
  context.fillRect(off4, off1, width - off1 * 2, height - off2 * 2);
  context.shadowBlur = random.range(50, 200)
  context.shadowColor = color6
  context.fillStyle = bg4;
  context.fillRect(off3, off2, width - off2 * 2, height - off2 * 2);
  context.shadowBlur = random.range(50, 200)
  context.shadowColor = color6
  context.fillStyle = bg3
  context.fillRect(off1, off1, width - off1 * 2, height - off3 * 2);
  context.shadowBlur = random.range(50, 200)
  context.shadowColor = color6
  context.fillStyle = bg4;
  context.fillRect(off2, off2, width - off2 * 2, height - off4 * 2);
  context.shadowBlur = random.range(50, 200)
  context.shadowColor = color6
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
    // context.clearRect(0, 0, canvas.width, canvas.height);


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