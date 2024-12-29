/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Kaushan Script', 'sans-serif'],
      },
    },
  },
  plugins: [
     require('@tailwindcss/aspect-ratio'), 
  ],
}