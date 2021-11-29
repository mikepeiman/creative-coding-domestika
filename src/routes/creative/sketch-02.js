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
    const x = width * 0.5;
    const y = height * 0.5;
    const w = width * 0.3;
    const h = height * 0.3;

    context.save()
    context.translate(x, y);
    context.rotate(1);
    context.beginPath();
    context.rect(-w * 0.5, -h * 0.5, w, h);
    context.fill();
    context.restore()

    context.translate(200, 200)
    context.beginPath()
    context.arc(0, 0, 50, 0, Math.PI * 2)
    context.fillStyle = '#aa33ff'; // fillStyle must come after fillRect or I won't see the new rect!!
    context.fill()
  };
};

canvasSketch(sketch, settings);
