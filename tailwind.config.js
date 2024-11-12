/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // wichtig für den Theme Switch
  theme: {
    extend: {},
  },
  plugins: [],
}