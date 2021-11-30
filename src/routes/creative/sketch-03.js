const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [2048, 2048]
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
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    agents.forEach(agent => {
      agent.draw(context)
    })
  };
};

canvasSketch(sketch, settings);


class Point {
  constructor(x, y, radius) {
    this.x = x
    this.y = y

  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Point(x, y)
    this.radius = 10
  }

  draw(context) {
    context.fillStyle = 'black'
    context.beginPath()
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
    context.fill()
  }
}