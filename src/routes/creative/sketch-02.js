const canvasSketch = require('canvas-sketch');

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

    const num = 12
    const radius = width * 0.3

    for (let i = 0; i < num; i++) {
      const slice = degreesToRadiants(360 / num)
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
      context.rotate(-angle);

      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore()
    }
  };
};

const degreesToRadiants = (degrees) => {
  return degrees / 180 * Math.PI
}

canvasSketch(sketch, settings);
