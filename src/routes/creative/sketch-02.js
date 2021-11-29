const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
import { setItemColor} from './drawing.js'

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#333'; // fillStyle must come after fillRect or I won't see the new rect!!
    context.fillRect(0, 0, width, height);
    context.fillStyle = '#ff33aa'; // fillStyle must come after fillRect or I won't see the new rect!!
    const cx = width * 0.5;
    const cy = height * 0.5;
    let x, y
    const w = width * 0.01;
    const h = height * 0.1;

    const num = 55
    const radius = width * 0.3
    let color = `hsla(180, 50%, 50%, 1)`
    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num)
      const angle = slice * i

      x = cx + radius * Math.sin(angle)
      y = cy + radius * Math.cos(angle)
      // =======================================================================
      // Alternative method is to switch the x, y assignments to the below, and uncomment the additional transate (keep both active)
      // =======================================================================
      // x = radius * Math.sin(angle)
      // y = radius * Math.cos(angle)

      context.save()
      context.translate(x, y);
      // context.translate(cx, cy);
      context.rotate(random.range(-angle + .3, -angle - .3));
      context.scale(random.range(.3,3), random.range(.2,2))

      context.beginPath();
      context.rect(random.range(-w * 0.5,-w * 1.5), random.range(0, -h * 0.5), w, h);
      color = `hsla(${random.range(0, 360)}, ${random.range(15,85)}%, ${random.range(15,85)}%, ${random.range(0.05, 1)})`
      context.fillStyle = color
      context.fill();
      context.restore()

      context.save()
      context.translate(cx,cy)
      context.rotate(-angle)
      context.beginPath()
      context.arc(0, 0, radius * random.range(0.75,1.25), slice * random.range(-15, 5), slice * random.range(11.5,0.5))
      context.lineWidth = random.range(5, 20)
      color = `hsla(${random.range(0, 360)}, ${random.range(15,85)}%, ${random.range(15,85)}%, ${random.range(0.05, 1)})`
      console.log(`🚀 ~ file: sketch-02.js ~ line 55 ~ return ~ color`, color)
      context.strokeStyle = color
      context.stroke()
      context.restore()
    }
  };
};

const degreesToRadiants = (degrees) => {
  return degrees / 180 * Math.PI
}

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min
}

canvasSketch(sketch, settings);
