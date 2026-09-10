/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          dark: '#0a192f',
          navy: '#0f2b5c',
          blue: '#1d4ed8',
          lightBlue: '#3b82f6',
          pale: '#f0f4f8',
          saffron: '#f97316',
          saffronDark: '#ea580c',
          green: '#10b981',
          greenDark: '#047857',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
