const canvasSketch = require('canvas-sketch');
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
    dimensions: [1000, 1000],
    animate: true,
};

let inc = 0.009;
let numVertices = 3 - inc;
const colores = ["ffadad", "ffd6a5", "fdffb6", "caffbf", "9bf6ff", "a0c4ff", "bdb2ff", "ffc6ff", "fffffc"];
const colorPick = [];
//loop xa crear colores max. num colores por 10
for (var i = 0; i < 40; i++) {
    for (var j = 0; j < colores.length; j++) {
        colorPick.push(colores[j]);
    }
}

const sketch = () => {
    return ({ context, width, height, frame }) => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);

        numVertices += inc;
        let arco = (Math.PI * 2) / numVertices;
        let radius = width * .40;
        const vX = [];
        const vY = [];

        for (var i = 0; i < numVertices; i++) {
            let angle1 = (i * arco) - Math.PI * .5;
            //línea ant. le resto ese PI*5 para set el primer vertice (0º) arriba.
            vX[i] = Math.cos(angle1) * radius;
            vY[i] = Math.sin(angle1) * radius;

            context.save();
            context.fillStyle = `#${colorPick[i]}`;
            context.translate(width * .5, height * .5);
            context.beginPath();
            context.arc(vX[i], vY[i], width * .01, 0, Math.PI * 2);
            context.fill();
            context.restore();
        }

        //loop xa crear lineas

        for (var i = 0; i < numVertices; i++) {
            for (var j = 0; j < (numVertices - 1); j++) {
                context.save();
                context.lineWidth = width * 0.0011;
                context.strokeStyle = `#${colorPick[i]}`;
                context.translate(width * .5, height * .5);
                context.beginPath();
                context.moveTo(vX[i], vY[i]);
                context.lineTo(vX[j + 1], vY[j + 1]);
                context.stroke();
                context.restore();
            }
        }

    };
};

canvasSketch(sketch, settings);