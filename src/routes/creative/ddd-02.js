const canvasSketch = require('canvas-sketch');
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
    dimensions: [1080, 1080],
    animate: true,
};

const sketch = () => {
    return ({ context, width, height, frame }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        let line_max = width * 0.8;
        let line_min = width * 0.3;
        let numLineas = 24;
        let rMax = width * 0.015;
        let rMin = width * 0.008;
        let linew_max = width * 0.003;
        let linew_min = width * 0.0005;
        let gapLinea = width * 0.025;
        let todoY = (height - (numLineas - 1) * gapLinea) * 0.5;

        for (let i = 0; i < numLineas; i++) {
            let linea_y = i * gapLinea;
            //let lineaLong = random.range(line_min, line_max);
            let n = random.noise1D(i + frame, 0.01);
            let lineaLong = line_min * (n + 0.5);
            let x1 = lineaLong * -0.5;
            let x2 = lineaLong * 0.5;
            let coef_rad = (rMax - rMin) / (line_max - line_min);
            let radius = rMin + ((lineaLong - line_min) * coef_rad);
            let angle = random.range(-0.1, 0.1) * Math.PI;
            let lineWidth = 2;
            //la siguientes 2 lineas reescalan también la línea.
            //let coef_lw = (linew_max - linew_min) / (line_max - line_min);
            //let lineWidth = linew_min + ((lineaLong - line_min) * coef_lw);
            let n_angle = n * -Math.PI;
            //console.log(lineaLong);

            context.save();
            context.lineWidth = lineWidth;
            //context.fillStyle = "#ffffe6";
            context.translate(width * 0.5, todoY)
            context.translate(0, linea_y);
            context.rotate(n_angle);
            context.beginPath();
            context.moveTo(x1, 0);
            context.lineTo(x2, 0);
            context.stroke();
            context.beginPath();
            context.arc(x1, 0, radius, 0, Math.PI * 2);
            context.fill();
            context.stroke();
            context.beginPath();
            context.arc(x2, 0, radius, 0, Math.PI * 2);
            context.fill();
            context.stroke();
            context.restore();
        }
    };
};

canvasSketch(sketch, settings);

ddddd