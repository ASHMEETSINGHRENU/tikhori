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
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-45deg)' },
          '50%': { transform: 'rotate(-38deg)' },
        },
        'sway-alt': {
          '0%, 100%': { transform: 'rotate(12deg)' },
          '50%': { transform: 'rotate(19deg)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.03)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        sway: 'sway 5s ease-in-out infinite',
        'sway-alt': 'sway-alt 6s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
        marquee: 'marquee 30s linear infinite',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
