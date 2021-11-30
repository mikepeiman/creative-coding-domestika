const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

for (let i = 0; i < 40; i++) {
  let agent = new Agent(random.range(1, width), random.range(1, height))
  agent.draw(context)
  
}

    const agentA = new Agent(800, 400)
    const agentB = new Agent(300, 700)

    agentA.draw(context)
    agentB.draw(context)
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