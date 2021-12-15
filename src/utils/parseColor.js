// const Color = require('canvas-sketch-util/color');
import Color from 'canvas-sketch-util/color'

export const parseHSLA = (color, opacity) => {
console.log(`🚀 ~ file: parseColor.js ~ line 5 ~ parseColor ~ opacity`, opacity)
console.log(`🚀 ~ file: parseColor.js ~ line 5 ~ parseColor ~ `, color)
    let { r, g, b, a } = color
    let result = Color.parse(color).hsla
    console.log(`🚀 ~ file: parseColor.js ~ line 5 ~ parseColor ~ result`, result)
    let hsla = `hsla(${result[0]},${result[1]}%,${result[2]}%,${parseFloat(opacity, 2)})`
    console.log(`🚀 ~ file: parseColor.js ~ line 11 ~ parseHSLA RESULT: `, hsla)
    return hsla
}