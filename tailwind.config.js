/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
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
        'iranyekan-regular' : ['iranyekan-regular'],
        'iranyekan-bold' : ['iranyekan-bold'],
        'iranyekan-thin' : ['iranyekan-thin'],
        'iranyekan-light' : ['iranyekan-light'],
        'iranyekan-medium' : ['iranyekan-medium'],
        'iranyekan-extraBold' : ['iranyekan-extraBold'],
        'iranyekan-black' : ['iranyekan-black'],
        'iranyekan-extraBlack' : ['iranyekan-extraBlack'],
      }
    },
  },
}
