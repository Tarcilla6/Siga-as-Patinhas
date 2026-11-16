/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marrom: '#571A00',
        terra: '#683117',
        amarelo: '#FEE08A',
        azul: '#AFCFFE',
        creme: '#FFFDDD',
      },
      fontFamily: {
        destaque: ['Fraunces', 'serif'],
        corpo: ['Montserrat Alternates', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
