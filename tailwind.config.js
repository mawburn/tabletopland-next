/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      colors: {
        primary: '#3e1858',
        secondary: '#f4b12f',
        textColor: '#242424',
        lightText: '#f4f4f4',
        backgroundColor: '#f0f0f0',
      },
    },
    fontFamily: {
      mono: ['Fira Mono', 'monospace'],
      display: ['Coolvetica', 'Helvetica', 'sans-serif'],
      sans: ['Inter', 'Arial', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
