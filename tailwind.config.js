/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        },
        dark: {
          100: '#f6f6f7',
          130: '#eff0f0',
          160: '#e6e6e8',
          200: '#dcddde',
          230: '#d1d3d5',
          260: '#c6c8ca',
          300: '#b9bbbe',
          330: '#a3a6aa',
          345: '#96989d',
          360: '#8e9297',
          400: '#72767d',
          430: '#686d73',
          460: '#5d6269',
          500: '#4f545c',
          530: '#484c54',
          560: '#40444b',
          600: '#36393f',
          630: '#2f3136',
          660: '#292b2f',
          700: '#202225',
          730: '#1e1f22',
          760: '#1b1d20',
          800: '#18191c',
          830: '#121315',
          860: '#0c0d0e',
          900: '#040405',
        }
      },
      textColor: {
        'primary': '#dcddde',
        'muted': '#a3a6aa',
        'link': '#00b0f4',
        'positive': '#46c46d',
        'warning': '#faa61a',
        'danger': '#f38688'
      },
      backgroundColor: {
        'primary': '#4f545c',
        'secondary': '#2f3136',
        'secondary-alt': '#292b2f',
        'tertiary': '#202225',
        'accent': '#4f545c',
        'floating': '#18191c',
      }
    },
  },
  plugins: [],
}
