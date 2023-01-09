/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        main: '#6366f1',
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
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
