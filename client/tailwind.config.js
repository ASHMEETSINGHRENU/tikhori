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
          ivory: '#FAF8F3',
          sand: '#F3EFE6',
          cream: '#FFFFFF',
          forest: '#204B26',
          'forest-dark': '#132F18',
          'forest-light': '#2D6635',
          gold: '#D97706',
          'gold-dark': '#B45309',
          'gold-light': '#FEF3C7',
          red: '#991B1B',
          'red-dark': '#7F1D1D',
          charcoal: '#1C1917',
          stone: '#57534E',
          muted: '#8C857B',
          border: '#E7E2D7'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', '"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(28, 25, 23, 0.05), 0 2px 6px -1px rgba(28, 25, 23, 0.03)',
        'soft-lg': '0 10px 30px -4px rgba(28, 25, 23, 0.08), 0 4px 12px -2px rgba(28, 25, 23, 0.04)',
        'gold-glow': '0 0 25px -5px rgba(217, 119, 6, 0.25)'
      }
    },
  },
  plugins: [],
}
