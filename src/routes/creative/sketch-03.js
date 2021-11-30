const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [2048, 2048],
  animate: true
};
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

    agents.forEach(agent => {
      agent.update()
      agent.draw(pen)
    })
  };
};

canvasSketch(sketch, settings);


class Vector {
  constructor(x, y, radius) {
    this.x = x
    this.y = y

  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y)
    this.vel = new Vector(random.range(-1,1), random.range(-1,1))
    this.radius = random.range(4, 12)
  }
  update() {
    this.pos.x += this.vel.x 
    this.pos.y += this.vel.y
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