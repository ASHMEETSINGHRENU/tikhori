/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: '#1B4D2E',
          'forest-dark': '#123620',
          'forest-light': '#25663D',
          gold: '#F2C230',
          'gold-dark': '#D4A21A',
          'gold-light': '#FDF3CF',
          red: '#D6301F',
          'red-dark': '#B72416',
          cream: '#FDF6E9',
          brown: '#2B1D14',
          sand: '#F5EDE1',
          ivory: '#FAF4EB',
          charcoal: '#2B1D14',
          stone: '#5A483E',
          muted: '#8C7C72',
          border: '#E8DFCF'
        }
      },
      fontFamily: {
        display: ['"Fraunces"', '"Playfair Display"', 'serif'],
        serif: ['"Fraunces"', '"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', '"Plus Jakarta Sans"', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(43, 29, 20, 0.05), 0 2px 6px -1px rgba(43, 29, 20, 0.03)',
        'soft-lg': '0 10px 30px -4px rgba(43, 29, 20, 0.08), 0 4px 12px -2px rgba(43, 29, 20, 0.04)',
        'gold-glow': '0 0 25px -5px rgba(242, 194, 48, 0.35)'
      }
    },
  },
  plugins: [],
}
