/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // content: [
  //   "./pages/**/*.{js,ts,jsx,tsx}",
  //   "./components/**/*.{js,ts,jsx,tsx}",
  //   "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  // ],
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {      fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}