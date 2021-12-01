const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [2048, 2048],
  animate: true
};

// =============================================================================
// basic animation example below; canvas-sketch 'animate' setting calls this on main return function
// =============================================================================
const animate = () => {
  console.log(`Mike animate`)
  requestAnimationFrame(animate)
}
// animate()
// ============================================================================= 

let agents = []
const sketch = ({ context, width, height }) => {

  for (let i = 0; i < 40; i++) {
    let x = random.range(0, width)
    let y = random.range(0, height)
    let agent = new Agent(x, y)
    agents = [...agents, agent]
  }

  return ({ context, width, height }) => {
    const pen = context
    pen.fillStyle = 'white';
    pen.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];
        const dist = agent.pos.getDistance(other.pos)
        if (dist > 200) continue

        pen.lineWidth = math.mapRange(dist, 0, 200, 12, 1)
        pen.beginPath()
        pen.moveTo(agent.pos.x, agent.pos.y)
        pen.lineTo(other.pos.x, other.pos.y)
        context.stroke()



      }

    }

    agents.forEach(agent => {
      agent.update()
      agent.draw(pen)
      // agent.bounce(width, height)
      agent.wrap(width,height)
    })
  };
};

canvasSketch(sketch, settings);


class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  getDistance(v) {
    const dx = this.x - v.x
    const dy = this.y - v.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y)
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1))
    this.radius = random.range(4, 12)
  }
  update() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.vel.x *= -1
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1
    }
  }

  wrap(width, height){
    if (this.pos.x > width) this.pos.x = 0 
    if (this.pos.x < 0) this.pos.x = width
    if (this.pos.y > height) this.pos.y = 0 
    if (this.pos.y < 0) this.pos.y = height
  }

  draw(pen) {
    pen.save()
    pen.translate(this.pos.x, this.pos.y)
    pen.beginPath()
    pen.arc(0, 0, this.radius, 0, Math.PI * 2)
    pen.fill()
    pen.lineWidth = 4
    pen.stroke()
    pen.restore()
  }
}