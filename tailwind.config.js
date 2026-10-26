/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#3368A0',
          secondary: '#66A3BF',
          accent: '#C8DFDB',
          bg: '#F8FAFC',
        }
      }
    },
  },
  plugins: [],
}
