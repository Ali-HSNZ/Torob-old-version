/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "src/pages**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
    "src/common/**/*.{js,ts,jsx,tsx}",
    "src/layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'sans' : ['iranyekan']
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
