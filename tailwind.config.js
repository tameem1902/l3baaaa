/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'sans-serif'],
      },
      colors: {
        gold: '#FFD700',
        royal: '#4B0082',
      }
    },
  },
  plugins: [],
}
