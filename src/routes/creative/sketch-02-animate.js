const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [2048, 2048],
  animate: false
};


// function createControlButton() {

//   let canvas = document.getElementsByTagName('canvas')
//   let body = document.body
//   let insertionPoint = body.children[2]
//   const button = document.createElement('button')
//   button.innerText = "Play/Pause"
//   button.classList = "btn btn-primary btn-outline"
//   console.log(`🚀 ~ file: sketch-02-animate.js ~ line 18 ~ createControlButton ~ button`, button)
//   console.log(`🚀 ~ file: sketch-02-animate.js ~ line 13 ~ createControlButton ~ canvas`, canvas)
//   console.log(`🚀 ~ file: sketch-02-animate.js ~ line 13 ~ createControlButton ~ document`, document)
//   console.log(`🚀 ~ file: sketch-02-animate.js ~ line 14 ~ createControlButton ~ body`, body)
//   body.insertBefore(button, insertionPoint)
//   button.addEventListener('click', () => {
//     settings['animate'] = true ? settings.animate = true : console.log(`false: `,settings)
//     console.log(`🚀 ~ file: sketch-02-animate.js ~ line 26 ~ button.addEventListener ~ settings`, settings)
//     canvasSketch(sketch, settings);
//   })
// }

// createControlButton()
// =============================================================================
// basic animation example below; canvas-sketch 'animate' setting calls this on main return function
// =============================================================================
const animate = () => {
  console.log(`Mike animate`)
  requestAnimationFrame(animate)
}
// animate()
// ============================================================================= 

let radius, slice, angle
const sketch = ({ context, width, height }) => {
  radius = width * .4
  let arcs = []
  // for (let i = 0; i < 5; i++) {
  //   let x1 = random.range(radius * 1, radius * .4)
  //   let y1 = random.range(radius * 1, radius * .4)
  //   let x2 = random.range(radius * 1, radius * .4)
  //   let y2 = random.range(radius * 1, radius * .4)

  //   let arc = new Arc(x1, y1, x2, y2)
  //   arcs = [...arcs, arc]
  // }
  const cx = width * 0.5;
  const cy = height * 0.5;
  let x, y

  let colors = generateVariedColors()
  let NUM_ARCS = colors.length
  // arcs = []
  for (let i = 0; i < NUM_ARCS; i++) {
    let arc = createArc(cx, cy, random.range(radius * .8, radius * 1.1), random.range(i, 12), i + 1, random.range(55, 250), colors)
    arcs.push(arc)
  }
  console.log(arcs)
  let transparent = `hsla(0,0%,0%,0)`
  return ({ context, width, height }) => {
    const pen = context
    pen.fillStyle = 'white';
    pen.fillRect(0, 0, width, height);
    let num = arcs.length
    for (let i = 0; i < arcs.length; i++) {
      radius = width * random.range(0.325, .35)
      slice = math.degToRad(360 / num)
      angle = slice * i
      x = cx + radius * Math.sin(angle)
      y = cy + radius * Math.cos(angle)
      const arc = arcs[i];

      for (let j = i + 1; j < arcs.length; j++) {
        // pen.lineWidth = math.mapRange(dist, 0, 200, 12, 1)
        pen.beginPath()
        pen.arc(arc.center.x, arc.center.y, arc.radius, arc.angle.start, arc.angle.end)
        let grd = pen.createLinearGradient(cx, cy, x, y)
        // console.log(`🚀 ~ file: sketch-02-animate.js ~ line 65 ~ return ~ grd`, grd)
        // console.log(`🚀 ~ file: sketch-02-animate.js ~ line 65 ~ return ~ cx,cy,x,y`, cx,cy,x,y)
        grd.addColorStop(0, `${arc.colors[i]}`)
        grd.addColorStop(1, transparent)
        pen.strokeStyle = grd
        pen.lineWidth = arc.lineWidth
        // pen.moveTo(arc.startPos.x, arc.startPos.y)
        // pen.lineTo(other.startPos.x, other.startPos.y)
        pen.stroke()
      }

    }

    arcs.forEach(arc => {
      updateArcAngles(arc)
    })
  };
};

canvasSketch(sketch, settings);


class Origin {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  getDistance(v) {
    const dx = this.x - v.x
    const dy = this.y - v.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  addColorStop(color, stop) {
    this.color = color
    this.stop = stop
    this.addColorStop(stop, color)
  }
}

class Arc {
  constructor(x1, y1, x2, y2) {
    this.startPos = new Origin(x1, y1)
    this.endPos = new Origin(x2, y2)
    this.vel = new Origin(random.range(-1, 1), random.range(-1, 1))
    this.radius = random.range(4, 12)
  }
  update() {
    this.startPos.x += this.vel.x
    this.startPos.y += this.vel.y
  }

  bounce(width, height) {
    if (this.startPos.x <= 0 || this.startPos.x >= width) {
      this.vel.x *= -1
    }
    if (this.startPos.y <= 0 || this.startPos.y >= height) {
      this.vel.y *= -1
    }
  }

  wrap(width, height) {
    if (this.startPos.x > width) this.startPos.x = 0
    if (this.startPos.x < 0) this.startPos.x = width
    if (this.startPos.y > height) this.startPos.y = 0
    if (this.startPos.y < 0) this.startPos.y = height
  }
  setGrad(pen) {

  }

  draw(pen) {
    pen.save()
    pen.translate(this.startPos.x, this.startPos.y)
    pen.beginPath()
    pen.arc(0, 0, this.radius, 0, Math.PI * 2)
    pen.fill()
    pen.lineWidth = 4
    pen.stroke()
    pen.restore()
  }
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

function createArc(x, y, r, s, e, lineWidth, colors) {
  let arc = {
    center: { x: x, y: y },
    radius: r,
    angle: { start: s, end: e },
    lineWidth: lineWidth,
    colors: colors
  }
  return arc
}

function updateArcColor() {

}

function updateArcAngles(arc) {
  arc.angle.start += .01
  arc.angle.end += .01
}

