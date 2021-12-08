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

        let numLineas = 71;
        //let angle = (Math.PI * 6) / numLineas;
        let angle = (Math.PI * frame * 0.01) / numLineas;
        let rboli_max = width * 0.02;
        let rboli_min = width * 0.002;
        let rad_max = width * 0.5;
        let rad_min = width * 0.3;
        let inc_rad = (rad_max - rad_min) / numLineas;
        let inc_boli = (rboli_max - rboli_min) / numLineas;

        for (var i = 0; i < numLineas; i++) {
            let rboli = rboli_max - (i * inc_boli);
            let x_1 = 0;
            let x_2 = rad_min + (i * inc_rad);
            let y_1 = 0;
            let y_2 = 0;

            context.save();
            context.translate(rad_max, rad_max);
            context.fillStyle = "black";
            context.strokeStyle = "black"
            context.rotate(i * angle);
            context.beginPath();
            context.moveTo(x_1, y_1);
            context.lineTo(x_2, y_2);
            context.stroke();
            context.beginPath();
            context.arc(x_2, y_2, rboli, 0, Math.PI * 2);
            context.fill();
            context.restore();
        }
    };
};

canvasSketch(sketch, settings);