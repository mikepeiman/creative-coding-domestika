const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.svelte'],
    theme: {
        extend: {
            colors: {
                ...colors,
                'sky': colors.sky,
                'cyan': colors.cyan,
                'fuchsia': colors.fuchsia,
            }
        }
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui'),
    ],
  }