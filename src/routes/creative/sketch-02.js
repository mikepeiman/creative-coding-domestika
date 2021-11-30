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
    let w = width * 1;
    let h = height * .01;

    const num = 300
    const radius = width * 0.3
    let color = `hsla(180, 50%, 50%, 1)`
    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num)
      const angle = slice * i

      x = cx + radius * Math.sin(angle)
      y = cy + radius * Math.cos(angle)
      w = random.range(width * 0.1, width * 1.5)
      h = random.range(height * 0.001, height * .05)
      // =======================================================================
      // Alternative method is to switch the x, y assignments to the below, and uncomment the additional transate (keep both active)
      // =======================================================================
      // x = radius * Math.sin(angle)
      // y = radius * Math.cos(angle)
      // =======================================================================

      context.save()
      // context.translate(x, y);
      // =======================================================================
      // make the lines originate from 0, 0 corner in flare, or around a circular arc
      // =======================================================================
      // context.translate(cx, cy);
      // =======================================================================
      context.rotate(random.range(-angle * 5.5, -angle * -.1));
      context.scale(random.range(.3,3), random.range(.2,2))

      context.beginPath();
      context.rect(random.range(-w * 0.5,-w * 1.5), random.range(0, -h * 0.5), w, h);
      color = `hsla(${random.range(280, 40)}, ${random.range(65,85)}%, ${random.range(15,85)}%, ${random.range(0.2, .4)})`
      context.fillStyle = color
      context.fill();
      context.restore()

      context.save()
      // =======================================================================
      // The following sets circle origin to center
      // =======================================================================
      // context.translate(cx,cy)
      // =======================================================================
      context.rotate(-angle)
      context.beginPath()
      context.arc(0, 0, radius * random.range(.25,4.25), slice * random.range(-15, 5), slice * random.range(11.5,0.5))
      context.lineWidth = random.range(15, 70)
      color = `hsla(${random.range(180, 240)}, ${random.range(65,85)}%, ${random.range(15,85)}%, ${random.range(0.1, .5)})`
      // =======================================================================
      // try gradients
      // =======================================================================
      let color1 = `hsla(${random.range(180, 240)}, ${random.range(65,85)}%, ${random.range(15,85)}%, ${random.range(0.3, .8)})`
      let color2 = `hsla(${random.range(240, 300)}, ${random.range(65,85)}%, ${random.range(15,85)}%, ${random.range(0.5, 1)})`
      let grd = context.createLinearGradient(0, 0, cx, cy)
      grd.addColorStop(0, color1)
      grd.addColorStop(1, color2)

      context.strokeStyle = grd
      // context.strokeStyle = color
      // =======================================================================
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
