const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, width, height);
    context.fillStyle = '#0033aa'; // fillStyle must come after fillRect or I won't see the new rect!!
    const x = width * 0.5;
    const y = height * 0.5;
    const w = width * 0.3;
    const h = height * 0.3;
    context.translate(x, y);
    context.rotate(0.3);
    context.beginPath();
    context.rect(0, 0, w, h);
    context.fill();
  };
};

canvasSketch(sketch, settings);
