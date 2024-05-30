/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
   
    extend: { 
      fontFamily: {
      
        "cursive": ['cursive'],
        "Roboto": ["'Roboto'"],
        "Gill": ["'Gill Sans'"],
      },
    },
  },
  plugins: [],
}

