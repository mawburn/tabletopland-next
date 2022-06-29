/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      coolvetica: ['Carter', 'sans-serif'],
      karla: ['Karla', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
