// const Color = require('canvas-sketch-util/color');
import Color from 'canvas-sketch-util/color'

export const parseRGBA = (color) => {
console.log(`🚀 ~ file: parseColor.js ~ line 5 ~ parseRGBA ~ ${color}`, color)
    let { r, g, b, a } = color
    let result = Color.parse(`rgba(${r},${g},${b},${a})`)
    // let result = Color.parse(color)
    console.log(`🚀 ~ file: parseColor.js ~ line 5 ~ parseRGBA ~ result`, result)
    return result.hex
}