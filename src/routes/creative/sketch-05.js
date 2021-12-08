const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const load = require('load-asset')
const Tweakpane = require('tweakpane');


let manager
let glyph
let fontFamily = "Century"
let width = height = 600
const settings = {
  dimensions: [width, height],
  // cellSize: 2,
  // animate: true
};

let text = "A"
let fontSize = 1200
let image, dimensions
const typeCanvas = document.createElement('canvas')
const typeContext = typeCanvas.getContext('2d')
const imageCanvas = document.createElement('canvas')
const imageContext = imageCanvas.getContext('2d')

const images = [
  '8040ebabaa90d7ac5908a1a50e7b7b40.jpg',
  '1600-Iguazu-Falls-Argentina-shutterstock_172190801.jpg',
  '1024px-Martin,_John_-_The_Seventh_Plague_-_1823.jpg',
  '1200px-Paracas_National_Reserve._Ica,_Peru.jpg',
  'download-_8_.jpg',
  'download-_11_.jpg',
  'download-_12_.jpg',
  'download-_18_.jpg',
  'Evening-light-on-Mount-Thor-in-Auyuittuq-National-Park-Nunavut-Baffin-Island.jpg',
  'gettyimages-919352240-1024x1024.jpg',
  'main-qimg-e61354cfbf095d6f10f71dae9d578369.jpg',
  'springbrook national park, australia-2.jpg',
  'svaneti-georgia-min.jpg',
  'Thor-Peak-The-Greatest-Vertical-Drop-on-Earth.jpg',
  'vinicunza peru.jpg',
  '20211106_151003.jpg',
  '20211101_151335.jpg',
  '20211110_125044.jpg',
  '20211110_125818_HDR.jpg',
  'download.gif',
  '6bc3782329c30397e0679ed81b807bd8.jpg',
  '8DCBD365-843F-48BE-A9CE-A058C8BA8A52.jpg',
  'A69F230D-437F-426F-9D97-0011DADF82C8.jpg',
],
  params = {
    cellSize: 74,
    scaleDimensions: 2.5,
    glyphScale: .5,
    glyph: ':',
    singleGlyph: true,
    bg: '#000000ff',
    image: images[4],
  }

paramsGlyphs = {
  a: '\\',
  va: 75,
  b: '|',
  vb: 125,
  c: '/',
  vc: 175,
  d: 'v',
  vd: 225,
  e: '>',
  ve: 275,
  f: '<',
  vf: 325,
  g: '~',
  vg: 375,
  h: 'O',
  vh: 525,
}

const createTweakpane = () => {
  const pane = new Tweakpane.Pane()
  let folder
  folder = pane.addFolder({ title: "Settings" })
  folder.addInput(params, 'cellSize', {
    min: 1,
    max: 100,
    step: 1
  })
  folder.addInput(params, 'scaleDimensions', {
    min: .25,
    max: 10,
    step: .25
  })
  folder.addInput(params, 'glyphScale', {
    min: .05,
    max: 2,
    step: .05
  })
  folder.addInput(params, 'bg', {
    view: 'color',
    alpha: true
  })

  // .on('change', (e) => {
  //   console.log(`🚀 ~ file: sketch-05.js ~ line 58 ~ createTweakpane ~ e`, e)
  //   let props = manager.props
  //   console.log(`🚀 ~ file: sketch-05.js ~ line 61 ~ createTweakpane ~ props `, props)
  //   // manager.update()
  // })

  folder = pane.addFolder({ title: 'Glyphs' })
  folder.addInput(params, 'singleGlyph')
  folder.addInput(params, 'glyph')
  folder.addInput(paramsGlyphs, 'a')
  folder.addInput(paramsGlyphs, 'va', {
    min: 0,
    max: 755,
    step: 25
  })
  folder.addInput(paramsGlyphs, 'b')
  folder.addInput(paramsGlyphs, 'vb', {
    min: 0,
    max: 755,
    step: 25
  })
  folder.addInput(paramsGlyphs, 'c')
  folder.addInput(paramsGlyphs, 'vc', {
    min: 0,
    max: 755,
    step: 25
  })
  folder.addInput(paramsGlyphs, 'd')
  folder.addInput(paramsGlyphs, 'vd', {
    min: 0,
    max: 755,
    step: 25
  })
  folder.addInput(paramsGlyphs, 'e')
  folder.addInput(paramsGlyphs, 've', {
    min: 0,
    max: 755,
    step: 25
  })
  folder.addInput(paramsGlyphs, 'f')
  folder.addInput(paramsGlyphs, 'vf', {
    min: 0,
    max: 755,
    step: 25
  })
  folder.addInput(paramsGlyphs, 'g')
  folder.addInput(paramsGlyphs, 'vg', {
    min: 0,
    max: 755,
    step: 25
  })
  folder.addInput(paramsGlyphs, 'h')
  folder.addInput(paramsGlyphs, 'vh', {
    min: 0,
    max: 755,
    step: 25
  })
  folder.addInput(params, 'image', {
    options: {
      '8040ebabaa90d7ac5908a1a50e7b7b40.jpg': '8040ebabaa90d7ac5908a1a50e7b7b40.jpg',
      '1600-Iguazu-Falls-Argentina-shutterstock_172190801.jpg': '1600-Iguazu-Falls-Argentina-shutterstock_172190801.jpg',
      '8040ebabaa90d7ac5908a1a50e7b7b40.jpg': '8040ebabaa90d7ac5908a1a50e7b7b40.jpg',
      '1600-Iguazu-Falls-Argentina-shutterstock_172190801.jpg': '1600-Iguazu-Falls-Argentina-shutterstock_172190801.jpg',
      '1024px-Martin,_John_-_The_Seventh_Plague_-_1823.jpg': '1024px-Martin,_John_-_The_Seventh_Plague_-_1823.jpg',
      '1200px-Paracas_National_Reserve._Ica,_Peru.jpg': '1200px-Paracas_National_Reserve._Ica,_Peru.jpg',
      'download-_8_.jpg': 'download-_8_.jpg',
      'download-_11_.jpg': 'download-_11_.jpg',
      'download-_12_.jpg': 'download-_12_.jpg',
      'download-_18_.jpg': 'download-_18_.jpg',
      'download-_1_.jpg': 'download-_1_.jpg',
      'download-_19_.jpg': 'download-_19_.jpg',
      'download-_2_.jpg': 'download-_22_.jpg',
      'Evening-light-on-Mount-Thor-in-Auyuittuq-National-Park-Nunavut-Baffin-Island.jpg': 'Evening-light-on-Mount-Thor-in-Auyuittuq-National-Park-Nunavut-Baffin-Island.jpg',
      'gettyimages-919352240-1024x1024.jpg': 'gettyimages-919352240-1024x1024.jpg',
      'main-qimg-e61354cfbf095d6f10f71dae9d578369.jpg': 'main-qimg-e61354cfbf095d6f10f71dae9d578369.jpg',
      'springbrook national park, australia-2.jpg': 'springbrook national park, australia-2.jpg',
      'svaneti-georgia-min.jpg': 'svaneti-georgia-min.jpg',
      'Thor-Peak-The-Greatest-Vertical-Drop-on-Earth.jpg': 'Thor-Peak-The-Greatest-Vertical-Drop-on-Earth.jpg',
      'vinicunza peru.jpg': 'vinicunza peru.jpg',
      '20211106_151003.jpg': '20211106_151003.jpg',
      '20211101_151335.jpg': '20211101_151335.jpg',
      '20211110_125044.jpg': '20211110_125044.jpg',
      '20211110_125818_HDR.jpg': '20211110_125818_HDR.jpg',
      '70.jpg': '70.jpg',
      'download.gif': 'download.gif',
      'Bay.of.Kotor.original.15947.jpg': 'Bay.of.Kotor.original.15947.jpg',
      'hvalfjorur-fjord.jpg': 'hvalfjorur-fjord.jpg',
      '6bc3782329c30397e0679ed81b807bd8.jpg': '6bc3782329c30397e0679ed81b807bd8.jpg',
      '8DCBD365-843F-48BE-A9CE-A058C8BA8A52.jpg': '8DCBD365-843F-48BE-A9CE-A058C8BA8A52.jpg',
      'A69F230D-437F-426F-9D97-0011DADF82C8': 'A69F230D-437F-426F-9D97-0011DADF82C8.jpg',
    }
  })
  // .on('change', (e) => {
  //   console.log(`🚀 ~ file: sketch-05.js ~ line 58 ~ createTweakpane ~ e`, e)
  //   // manager.loadAndRun(sketch)
  // })

  pane.on('change', (e) => {
    manager.loadAndRun(sketch)
  })
}

// const updateImage = (src) => {
//   console.log(`🚀 ~ file: sketch-05.js ~ line 79 ~ updateImage ~ src`, src)
//   image = await load({ url: `assets/${src}`})
// }

const sketch = async ({ context, width, height, update }) => {

  console.log(`🚀 ~ file: sketch-05.js ~ line 20 ~ sketch ~ width, height`, width, height)
  const cell = settings.cellSize
  const cols = Math.floor(width / cell)
  const rows = Math.floor(height / cell)
  const numCells = cols * rows
  typeCanvas.width = cols
  typeCanvas.height = rows

  image = await load({ url: `assets/${params.image}` })
  let w = image.width
  let h = image.height
  let max = Math.max(w, h)
  console.log(`🚀 ~ file: sketch-05.js ~ line 116 ~ sketch ~ max`, max)
  w, h
  console.log(`🚀 ~ file: sketch-05.js ~ line 115 ~ sketch ~ w, h `, w, h)
  // if (max > 6000) params.scaleDimensions = .25
  // if (max > 4000) params.scaleDimensions = .5
  // if (max > 3000) params.scaleDimensions = .75
  // if (max < 1000) params.scaleDimensions = 1.25
  console.log(`🚀 ~ file: sketch-05.js ~ line 123 ~ sketch ~ params.scaleDimensions`, params.scaleDimensions)

  update({
    // dimensions: [image.width * 1.5, image.height * 1.5]
    // dimensions: [image.width, image.height]
    dimensions: [w * params.scaleDimensions - (w * params.scaleDimensions % params.cellSize), h * params.scaleDimensions - (h * params.scaleDimensions % params.cellSize)]
    // dimensions: [image.width *.5, image.height * .5]
    // dimensions: [image.width * .25, image.height * .25]
  })

  return ({ context, width, height }) => {
    // updateImage(params.image)
    console.log(`🚀 ~ file: sketch-05.js ~ line 35 ~ return ~ width, height`, width, height)
    const cell = params.cellSize
    const imageCols = Math.floor(width / cell)
    const imageRows = Math.floor(height / cell)
    const imageCells = imageCols * imageRows
    imageCanvas.width = width 
    imageCanvas.height = height 
    // imageCanvas.width = width * cell
    // imageCanvas.height = height * cell
    typeCanvas.width = cols
    typeCanvas.height = rows

    context.fillStyle = params.bg;
    context.fillRect(0, 0, width, height)
    console.log(`🚀 ~ file: sketch-05.js ~ line 51 ~ return ~ imageCols,imageRows`, imageCols, imageRows)

    // typeContext.fillStyle = 'black';
    // typeContext.fillRect(0, 0, cols, rows);
    // console.log(`🚀 ~ file: sketch-05.js ~ line 40 ~ return ~ cols, rows`, cols, rows)

    const pen = context
    fontSize = cols

    typeContext.fillStyle = 'white'
    // imageContext.fillStyle = 'red'
    typeContext.font = `${fontSize}px ${fontFamily}`
    typeContext.textBaseline = 'top'
    let metrics = typeContext.measureText(text)
    // console.log(`🚀 ~ file: sketch-05.js ~ line 20 ~ return ~ metrics `, metrics)
    let mx = metrics.actualBoundingBoxLeft * -1
    let my = metrics.actualBoundingBoxAscent * -1
    let mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    let mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    let tx = (cols - mw) * .5 - mx
    let ty = (rows - mh) * .5 - my

    typeContext.save()
    typeContext.translate(tx, ty)
    // imageContext.save()
    // imageContext.translate(tx, ty)
    typeContext.beginPath()

    typeContext.stroke()
    typeContext.fillText(text, random.range(0, params.cellSize),random.range(0, params.cellSize))
    // typeContext.fillStyle = 'white'
    typeContext.restore()
    // imageContext.drawImage(image, 0, 0, imageCols * cell, imageRows * cell)
    imageContext.drawImage(image, 0, 0, width / cell, height / cell)

    // let typeData = typeContext.getImageData(0, 0, cols, rows).data
    // let imageData = imageContext.getImageData(0, 0, imageCols, imageRows).data
    let imageData = imageContext.getImageData(0, 0, imageCols, imageRows).data
    // console.log(`🚀 ~ file: sketch-05.js ~ line 81 ~ return ~ imageData`, imageData)
    // console.log(`🚀 ~ file: sketch-05.js ~ line 53 ~ return ~ typeData`, typeData)

    // let radGrd = pen.createRadialGradient(width * .5, height * .5, 0, width * .5 + 100, height * .5 + 100, height)
    // radGrd.addColorStop(0, randomRGBA())
    // radGrd.addColorStop(0.25, randomRangedRGBA(0, 50, 50, 100, 150, 255, 55, 105))
    // radGrd.addColorStop(0.5, randomRangedRGBA(50, 100, 0, 50, 50, 205, 55, 105))
    // radGrd.addColorStop(0.75, randomRangedRGBA(50, 150, 50, 100, 150, 255, 55, 105))
    // radGrd.addColorStop(1, randomRangedRGBA(150, 255, 25, 50, 150, 205, 55, 105))
    // pen.fillStyle = radGrd
    // imageContext.fill()
    // pen.fill()

    pen.textBaseline = 'middle'
    pen.textAlign = 'center'

    // pen.drawImage(typeCanvas, 0, 180, 180, 180)
    // pen.drawImage(image, 0, 0, 180, 180)

    for (let i = 0; i < imageCells; i++) {
      const col = i % imageCols
      const row = Math.floor(i / imageCols)
      const x = col * cell
      const y = row * cell


      const r = imageData[i * 4 + 0]
      const g = imageData[i * 4 + 1]
      const b = imageData[i * 4 + 2]
      const a = imageData[i * 4 + 3]


      // pen.fillStyle = randomRGBA()
      // pen.fillStyle = `rgba(${r},${g},${b},${a})`
      // console.log(`🚀 ~ file: sketch-05.js ~ line 114 ~ return ~ rgba(${r},${g},${b},${a})`, `rgba(${r},${g},${b},${a})`)
      // pen.fillStyle = glyph
      // let glyph = getGlyph(r)
      pen.font = `${cell * 2}px ${fontFamily}`
      pen.save()
      pen.translate(x, y)
      pen.translate(cell * .25, cell * .25)
      // pen.fillText(glyph, 0, 0)
      // pen.beginPath()
      // let gradientAngle1 = random.range(0, 2)
      // let gradientAngle2 = random.range(0, 1)
      // let linGrd = pen.createLinearGradient(cell * gradientAngle1, 0, cell * gradientAngle2, cell)
      // let linGrd = pen.createLinearGradient(0, 0, cell, cell)
      // let colorRangeR = random.range(0, 1)
      // let colorRangeG = random.range(0, 1)
      // let colorRangeB = random.range(0, 1)
      // let colorRangeA = random.range(0, .5)
      // linGrd.addColorStop(0, `rgba(${r * colorRangeR},${g * colorRangeG},${b * colorRangeB},${a * colorRangeA})`)
      // linGrd.addColorStop(1, `rgba(${r},${g},${b},${a})`)
      let colorSum = r + g + b
      let colorDiff = 775 - r - g - b
      // params.singleGlyph ? glyph = params.glyph : glyph = getRandomGlyphFromString('|||||-+oc~@CO')
      // glyph = getGlyph(colorSum)
      let boldness = Math.ceil(colorSum / 100) 
      // fontSize = colorSum * params.glyphScale
      // if()
      // fontSize = colorSum * params.glyphScale + 20
      // console.log(`🚀 ~ file: sketch-05.js ~ line 249 ~ return ~ boldness`, boldness)
      // if(colorSum < 100) console.log(`low colorSum `, colorSum) 
      // console.log(`🚀 ~ file: sketch-05.js ~ line 249 ~ return ~ glyph`, glyph)
      // console.log(`🚀 ~ file: sketch-05.js ~ line 248 ~ return ~ colorSum`, colorSum)
      // pen.fillStyle = `rgba(${r},${g},${b},${1})`
      // let cutoff = params.cellSize
      // if (fontSize > cutoff) {
      //   pen.font = `normal normal ${boldness} ${fontSize >= cutoff ? fontSize : cutoff}px ${fontFamily}`
      //   pen.fillText(glyph, 0, 0)
      // } else {
      //   pen.fillRect(0, 0, cell, cell)
      // }

      // pen.fillStyle = linGrd
      // pen.fillStyle = `rgba(${r},${g},${b},${a})`
      pen.rotate(boldness * .05)
      pen.shadowBlur = boldness
      pen.shadowColor = `rgba(${r},${g},${b},${a})`
      // pen.fillRect(0, 0, cell * .9, cell * .9)
      // pen.fillRect(0, 0, cell * .75, cell * .75)
      // pen.fillRect(0, 0, cell * .5, cell * .5)
      // pen.fillRect(0, 0, cell * .25, cell * .25)
      // pen.lineTo(cell,cell)
      // pen.lineTo(0,0)
      // pen.rect(0, 0, cell * params.glyphScale, cell * params.glyphScale)
      pen.lineWidth = boldness * 2
      pen.strokeStyle = `rgba(${r},${g},${b},${a})`
      pen.strokeRect(0,0,cell * .5,cell * .5)
      // pen.strokeStyle = `rgba(${r},${g},${b},${a})`
      // pen.fillRect(0,0, 1, 1)
      // pen.arc(0, 0, cell / 2, 0, 5)
      pen.stroke()
      // pen.fill()
      pen.restore()
    }
  };
};

const onKeyUp = (e) => {
  console.log(`🚀 ~ file: sketch-05.js ~ line 50 ~ onKeyUp ~ e`, e)
  text = ""
  text = e.key.toUpperCase()
  manager.render()
}
// document.addEventListener('keyup', onKeyUp)

// const start = async () => {
//   manager = await canvasSketch(sketch, settings);
// }
const start = async () => {
  manager = await canvasSketch(sketch, settings, params);
  // manager = await canvasSketch(sketch, settings);
  // manager.loadAndRun(sketch, settings)
  // const img = await loadImage(url)
  // console.log(`🚀 ~ file: sketch-05.js ~ line 67 ~ loadImage ~ img`, img)
  // console.log(`This line`)
}
start()
createTweakpane()


const randomRGBA = (r = random.range(0, 255), g = random.range(0, 255), b = random.range(0, 255), a = random.range(0.5, .5)) => {
  let color = `rgba(${r},${g}%,${b}%,${a})`
  return color
}
const randomRangedRGBA = (
  r1 = 0,
  r2 = 255,
  g1 = 0,
  g2 = 255,
  b1 = 0,
  b2 = 255,
  a1 = 0,
  a2 = 255
) => {
  let color = `rgba(${random.range(r1, r2)},${random.range(g1, g2)}%,${random.range(b1, b2)}%,${random.range(a1, a2)})`
  return color
}

const getGlyph = (v) => {
  // console.log(`🚀 ~ file: sketch-05.js ~ line 347 ~ getGlyph ~ v`, v)
  if (v < paramsGlyphs.va) { return paramsGlyphs.a }
  if (v < paramsGlyphs.vb) { return paramsGlyphs.b }
  if (v < paramsGlyphs.vc) { return paramsGlyphs.c }
  if (v < paramsGlyphs.vd) { return paramsGlyphs.d }
  if (v < paramsGlyphs.ve) { return paramsGlyphs.e }
  if (v < paramsGlyphs.vf) { return paramsGlyphs.f }
  if (v < paramsGlyphs.vg) { return paramsGlyphs.g }
  return paramsGlyphs.h
  // const glyphs = '_= /'.split('')
  // let g = random.pick(glyphs)
  // return g
}

function getRandomGlyphFromString(str) {
  let glyphs = str.split('')
  let g = random.pick(glyphs)
  return g
}


const url = 'https://picsum.photos/200'
// const url = 'C:/webdev/kitplate/static/1024px-Martin,_John_-_The_Seventh_Plague_-_1823.jpg'
const loadImage = (url = 'https://picsum.photos/200') => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  })
}


// const start = () => {
//   loadImage(url).then(img => {
//   console.log(`🚀 ~ file: sketch-05.js ~ line 67 ~ loadImage ~ img`, img)
//   })
//   console.log(`This line`)
// }

// start()
