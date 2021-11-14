const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.svelte'],
    theme: {
        extend: {
            colors: {
                'light-blue': colors.lightBlue,
                'cyan': colors.cyan,
            }
        }
    },
    variants: {},
    plugins: [],
  }