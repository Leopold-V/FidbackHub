/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.8rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        main: '#4f46e5',
        mainBackground: '#1f2023',
        secondaryBackground: '#303136',
        '3Background': '#3d3d43',
        '4Background': '#6B7280',
        mainText: 'white',
        secondaryText: '#d3d3de',
        muted: '#9ca3af',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.secondaryText'),
            h1: {
              color: theme('colors.mainText'),
            },
            h2: {
              color: theme('colors.mainText'),
            },
            h3: {
              color: theme('colors.mainText'),
            },
            strong: {
              color: theme('colors.mainText'),
            },
            // ...
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')],
};
