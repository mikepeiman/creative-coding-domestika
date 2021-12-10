const colors = require('tailwindcss/colors')
console.log(`🚀 ~ file: tailwind.config.cjs ~ line 2 ~ colors`, colors)

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

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
        primary: withOpacityValue('--color-primary'),
        secondary: withOpacityValue('--color-secondary'),
        accent: withOpacityValue('--color-accent-1'),
        highlight: withOpacityValue('--color-accent-2'),
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        'quotes': {                          /* your theme name */
          'primary': '#a991f7',           /* Primary color */
          'primary-focus': '#8462f4',     /* Primary color - focused */
          'primary-content': '#ffffff',   /* Foreground content color to use on primary color */

          'secondary': '#f6d860',         /* Secondary color */
          'secondary-focus': '#f3cc30',   /* Secondary color - focused */
          'secondary-content': '#ffffff', /* Foreground content color to use on secondary color */

          'accent': '#37cdbe',            /* Accent color */
          'accent-focus': '#2aa79b',      /* Accent color - focused */
          'accent-content': '#ffffff',    /* Foreground content color to use on accent color */

          'neutral': '#3d4451',           /* Neutral color */
          'neutral-focus': '#2a2e37',     /* Neutral color - focused */
          'neutral-content': '#ffffff',   /* Foreground content color to use on neutral color */

          'base-100': '#112233',          /* Base color of page, used for blank backgrounds */
          'base-200': '#051122',          /* Base color, a little darker */
          'base-300': '#020511',          /* Base color, even more darker */
          'base-content': '#cfeff7',      /* Foreground content color to use on base color */

          'info': '#2094f3',              /* Info */
          'success': '#009485',           /* Success */
          'warning': '#ff9900',           /* Warning */
          'error': '#ff5724',             /* Error */
        },
      },
      'dark',
      'forest',
      'aqua',
      'fantasy',
      'luxury',
      'CMYK'
    ],
  }
}