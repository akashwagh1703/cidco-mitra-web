/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        secondary: '#1E88E5',
        accent: '#4CAF50',
        cidcoBlue: '#0066CC',
        cidcoDarkBlue: '#004999',
      },
    },
  },
  plugins: [],
}
