const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const Color = require('canvas-sketch-util/color');

const settings = {
  dimensions: [1080, 1080],
  animate: true
};


let radius, slice, angle
const sketch = ({ context, width, height }) => {
  radius = width * .3
  let arcs = []
  const cx = width * 0.5;
  const cy = height * 0.5;
  let x, y
  let colors = generateVariedColors()
  let NUM_ARCS = 30
  // arcs = []
  for (let i = 0; i < NUM_ARCS; i++) {
    let thisArcColors = []
    for (let j = 0; j < 4; j++) {
      const colorIdx = wrapIndex(colors, parseInt(random.range(0, colors.length)))
      const color = colors[colorIdx]
      thisArcColors.push(color)
    }
    // function createArc(xCenter, yCenter, radius, startAngle, endAngle, lineWidth, colors)
    let arc = createArc(cx, 
      cy, 
      random.range(radius * .8, 
        radius * 1.1), 
        random.range(0, 7), 
        random.range(0, 7), 
        random.range(55, 250), 
        thisArcColors)
    arcs.push(arc)
  }
  console.log(arcs)




  return ({ context, width, height }) => {
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

      for (let j = i + 1; j < arcs.length; j++) {
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
      }

    }

    arcs.forEach(arc => {
      updateArc(arc)
      bounce(arc, width)
      // console.log(`🚀 ~ file: sketch-02-animate.js ~ line 103 ~ return ~ arc`, arc)
    })
  };
};

canvasSketch(sketch, settings);

function generateVariedColors(s1 = 25, s2 = 75, l1 = 25, l2 = 75, a1 = 0.1, a2 = .05) {
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
  grd.addColorStop(.3, `${arc.colors[wrapIndex(arc.colors, i+1)]}`)
  grd.addColorStop(.6, `${arc.colors [wrapIndex(arc.colors, i+2)]}`)
  grd.addColorStop(.9, `${arc.colors [wrapIndex(arc.colors, i+3)]}`)
  return grd
}

function bounce(arc, width) {
  let r = arc.radius
  let lw = arc.lineWidth
  let minRadius = width * .1
  let maxRadius = width * .5
  if (r <= minRadius || r >= maxRadius) {
    arc.vel.radius *= -1
    arc.vel.rotation = (random.range(0.025, .001))
  }
  if(lw < 10 || lw > 250) {
    arc.vel.lineWidth *= -1 
  }
}

function updateArc(arc) {
  arc.angle.start += parseFloat(arc.vel.rotation)
  arc.angle.end += parseFloat(arc.vel.rotation)
  arc.radius += parseFloat(arc.vel.radius)
  arc.lineWidth += parseFloat(arc.vel.lineWidth)
  updateColors(arc)
}
const updateColors = (arc) => {
  let colors = arc.colors
  colors.forEach((color, i) => {
  console.log(`🚀 ~ file: sketch-02-animate.js ~ line 152 ~ updateColors ~ color, i`, color, i)
    result = Color.parse(color)
    console.log(`🚀 ~ file: sketch-02-animate.js ~ line 153 ~ colors.forEach ~ result`, result)
    // colors[i] = result.hsl
    console.log(`🚀 ~ file: sketch-02-animate.js ~ line 152 ~ updateColors ~ result`, result)
    let hsla = result.hsla
    console.log(`🚀 ~ file: sketch-02-animate.js ~ line 154 ~ updateColors ~ hsla`, hsla)
    let hue = hsla[0]
    console.log(`🚀 ~ file: sketch-02-animate.js ~ line 156 ~ updateColors ~ hue`, hue)
    hsla[0] += parseFloat(arc.vel.hue, 1)
    let final = `hsla(${hsla[0]}, ${hsla[1]}%, ${hsla[2]}%, ${hsla[3]})`
    console.log(`🚀 ~ file: sketch-02-animate.js ~ line 162 ~ colors.forEach ~ final`, final)
    colors[i] = final
  })
}

const wrapIndex = (arr, index) => {
  return index % arr.length
}

// class Origin {
//   constructor(x, y) {
//     this.x = x
//     this.y = y
//   }

//   getDistance(v) {
//     const dx = this.x - v.x
//     const dy = this.y - v.y
//     return Math.sqrt(dx * dx + dy * dy)
//   }

//   addColorStop(color, stop) {
//     this.color = color
//     this.stop = stop
//     this.addColorStop(stop, color)
//   }
// }

// class Arc {
//   constructor(x1, y1, x2, y2) {
//     this.startPos = new Origin(x1, y1)
//     this.endPos = new Origin(x2, y2)
//     this.vel = new Origin(random.range(-1, 1), random.range(-1, 1))
//     this.radius = random.range(4, 12)
//   }
//   update() {
//     this.startPos.x += this.vel.x
//     this.startPos.y += this.vel.y
//   }

//   bounce(width, height) {
//     if (this.startPos.x <= 0 || this.startPos.x >= width) {
//       this.vel.x *= -1
//     }
//     if (this.startPos.y <= 0 || this.startPos.y >= height) {
//       this.vel.y *= -1
//     }
//   }

//   wrap(width, height) {
//     if (this.startPos.x > width) this.startPos.x = 0
//     if (this.startPos.x < 0) this.startPos.x = width
//     if (this.startPos.y > height) this.startPos.y = 0
//     if (this.startPos.y < 0) this.startPos.y = height
//   }
//   setGrad(pen) {

//   }

//   draw(pen) {
//     pen.save()
//     pen.translate(this.startPos.x, this.startPos.y)
//     pen.beginPath()
//     pen.arc(0, 0, this.radius, 0, Math.PI * 2)
//     pen.fill()
//     pen.lineWidth = 4
//     pen.stroke()
//     pen.restore()
//   }
// }



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