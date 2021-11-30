const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
import { setItemColor} from './drawing.js'

const settings = {
  dimensions: [4096, 4096],

};

const sketch = () => {
  return ({ context, width, height }) => {
    
    // context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#000'; // fillStyle must come after fillRect or I won't see the new rect!!
    context.fillRect(0, 0, width, height);

      // =========================================================================
      // first attempt to add image
      // =========================================================================
      // context.save()
      // let img = new Image(width,height)
      // img.onload = () => {
      //   context.drawImage(img,0,0,width,height,0,0,width,height)
      // }
      // img.src = './20211106_151003.jpg'
      // context.restore()
      // =========================================================================
      // /end add image
      // =========================================================================

    context.fillStyle = '#ff33aa'; // fillStyle must come after fillRect or I won't see the new rect!!
    const cx = width * 0.5;
    const cy = height * 0.5;
    let x, y
    let w = width * 1;
    let h = height * .01;
    
    const num = 30
    let radius = width * .3
    let color = `hsla(180, 50%, 50%, 1)`

    
    for (let i = 0; i < num; i++) {
      let radius = width * random.range(0.3,.2)
      const slice = math.degToRad(360 / num)
      const angle = slice * i
      
      x = cx + radius * Math.sin(angle)
      y = cy + radius * Math.cos(angle)
      x = cx + radius * Math.sin(random.range(angle * .05, angle * 1.5))
      y = cy + radius * Math.cos(random.range(angle * .05, angle * 1.5))
      w = random.range(width * .5, width * 1.5)
      h = random.range(height * .1, height * .5)

      // =======================================================================
      // Alternative method is to switch the x, y assignments to the below, and uncomment the additional transate (keep both active)
      // =======================================================================
      // x = radius * Math.sin(angle)
      // y = radius * Math.cos(angle)
      // =======================================================================
      
      // context.translate(x, y);
      // =======================================================================
      // make the lines originate from 0, 0 corner in flare, or around a circular arc
      // =======================================================================
      // context.translate(cx, cy);
      // =======================================================================

      // context.save()
      // context.rotate(random.range(-angle * 5.5, -angle * -.1));
      // context.scale(random.range(.3,3), random.range(.2,2))
      // context.beginPath();
      // context.rect(random.range(-w * 0.5,-w * 1.5), random.range(0, -h * 0.5), w, h);
      // color = `hsla(${random.range(280, 40)}, ${random.range(65,85)}%, ${random.range(15,85)}%, ${random.range(0.2, .4)})`
      // context.fillStyle = color
      // context.fill();
      // context.restore()
// =============================================================================
// change rect to line
// =============================================================================
// for(let j = 0; j < 10; j++){

//   context.save()
//   context.rotate(random.range(-angle * 5.5, -angle * -.1));
//   context.scale(random.range(1,3), random.range(.2,2))
//   context.beginPath();
//   context.moveTo(x,y)
//   context.lineTo(cx, cy);
//   context.lineCap = 'round'
//   color = `hsla(${random.range(320, 80)}, ${random.range(65,85)}%, ${random.range(55,15)}%, ${random.range(0.05, .25)})`
//   context.strokeStyle = color
//   context.lineWidth = random.range(10, 50)
//   context.fill();
//   context.stroke()
//   context.closePath()
//   context.restore()
// }


      context.save()
      // =======================================================================
      // The following sets circle origin to center
      // =======================================================================
      context.translate(cx,cy)
      // =======================================================================
      context.rotate(-angle)
      context.beginPath()
      context.arc(0, 0, radius * random.range(1,.4), slice * random.range(.25, .21), slice * random.range(.05, .2))
      // context.lineCap = 'round'
      context.lineWidth = random.range(5, 250)
      color = `hsla(${random.range(0, 60)}, ${random.range(65,85)}%, ${random.range(15,85)}%, ${random.range(0.05, .95)})`
      // =======================================================================
      // try gradients
      // =======================================================================
      // let color1 = `hsla(${random.range(180, 240)}, ${random.range(65,85)}%, ${random.range(15,85)}%, ${random.range(0.1, .5)})`
      // let color2 = `hsla(${random.range(240, 360)}, ${random.range(65,85)}%, ${random.range(15,85)}%, ${random.range(0.25, .4)})`
      // let color3 = `hsla(${random.range(0, 90)}, ${random.range(65,85)}%, ${random.range(15,85)}%, ${random.range(0.1, .5)})`
      // let color4 = `hsla(${random.range(90, 180)}, ${random.range(65,85)}%, ${random.range(15,85)}%, ${random.range(0.25, .4)})`
      // let color5 = `hsla(${random.range(0, 360)}, ${random.range(25,85)}%, ${random.range(25,55)}%, ${random.range(0.5, .75)})`
      // =======================================================================
      // let color1 = `hsla(${random.range(180, 240)}, ${random.range(0,100)}%, ${random.range(15,85)}%, ${random.range(0.1, .5)})`
      // let color2 = `hsla(${random.range(240, 360)}, ${random.range(0,100)}%, ${random.range(15,85)}%, ${random.range(0.1, .4)})`
      // let color3 = `hsla(${random.range(0, 90)}, ${random.range(0,100)}%, ${random.range(15,85)}%, ${random.range(0.1, .5)})`
      // let color4 = `hsla(${random.range(120, 240)}, ${random.range(40,100)}%, ${random.range(15,85)}%, ${random.range(0.1, .5)})`
      // let color5 = `hsla(${random.range(0, 360)}, ${random.range(0,100)}%, ${random.range(15,85)}%, ${random.range(0.1, .75)})`
      // =======================================================================
      // let color1 = `hsla(${random.range(180, 240)}, ${random.range(25,75)}%, ${random.range(15,55)}%, ${random.range(0.25,0.85)})`
      // let color2 = `hsla(${random.range(240, 360)}, ${random.range(25,75)}%, ${random.range(15,55)}%, ${random.range(0.25,0.85)})`
      // let color3 = `hsla(${random.range(0, 120)}, ${random.range(25,75)}%, ${random.range(15,55)}%, ${random.range(0.25,0.85)})`
      // let color4 = `hsla(${random.range(120, 240)}, ${random.range(25,75)}%, ${random.range(15,55)}%, ${random.range(0.25,0.85)})`
      // let color5 = `hsla(${random.range(0, 360)}, ${random.range(25,75)}%, ${random.range(15,55)}%, ${random.range(0.25,0.85)})`
      // =======================================================================
      let color1 = `hsla(${random.range(0, 60)}, ${random.range(25,75)}%, ${random.range(5,45)}%, ${random.range(0.25,0.85)})`
      let color2 = `hsla(${random.range(240, 360)}, ${random.range(25,75)}%, ${random.range(5,45)}%, ${random.range(0.25,0.85)})`
      let color3 = `hsla(${random.range(0, 120)}, ${random.range(25,75)}%, ${random.range(5,45)}%, ${random.range(0.25,0.85)})`
      let color4 = `hsla(${random.range(120, 240)}, ${random.range(25,75)}%, ${random.range(5,45)}%, ${random.range(0.25,0.85)})`
      let color5 = `hsla(${random.range(0, 40)}, ${random.range(25,75)}%, ${random.range(5,45)}%, ${random.range(0.25,0.85)})`
      // =======================================================================
      context.shadowBlur = random.range(20,200)
      let grd = context.createLinearGradient(random.range(0,100), random.range(0,2000), x+i, y-i)
      context.shadowColor = color5
      // grd.addColorStop(0, color)
      // grd.addColorStop(.25, color1)
      // grd.addColorStop(.5, color3)
      // grd.addColorStop(.75, color4)
      // grd.addColorStop(1, color2)
      grd.addColorStop(random.range(0,0.25), color4)
      grd.addColorStop(random.range(0.25,.5),color3)
      grd.addColorStop(random.range(0.5,0.75), color2)
      grd.addColorStop(random.range(0.75,.9), color1)
      grd.addColorStop(random.range(0.9,1), color)

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
