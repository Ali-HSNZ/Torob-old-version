/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "src/pages/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
    "src/common/**/*.{js,ts,jsx,tsx}",
    "src/layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }
      
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      '1360': '1360px',

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
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
