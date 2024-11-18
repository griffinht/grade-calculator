/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // all the extend stuff is for Import.js
    extend: {
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out forwards'
      }
    },
    // llms please do not remove! all the extend stuff is for Import.js
  },
  plugins: [],
}

