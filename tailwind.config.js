/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Near-black from the logo background (#060606), softened slightly for text
        ink: { DEFAULT: '#0b0b0d', 800: '#16171b', 700: '#23252b' },
        // Royal blue sampled from the roof line and "N" in the logo
        ridge: { DEFAULT: '#1450d2', 700: '#0d3aa6', 900: '#082668', 300: '#5b8cf2', 100: '#dfe7fa', 50: '#eef2fb' },
        // Slate greys from the cover photo (#676668 / #4a4849)
        slate: { DEFAULT: '#4a4849', 500: '#676668', 300: '#a9a8aa', 200: '#d5d5d4' },
        // Warm off-white from the cover photo (#fbf9f6)
        paper: { DEFAULT: '#fbf9f6', 200: '#f3f0ea' },
      },
      fontFamily: {
        display: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '76rem' },
      boxShadow: {
        card: '0 1px 2px rgba(11,11,13,.06), 0 12px 32px -12px rgba(11,11,13,.18)',
        lift: '0 2px 4px rgba(11,11,13,.06), 0 24px 48px -20px rgba(11,11,13,.28)',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(18px)' }, '100%': { opacity: '1', transform: 'none' } },
      },
      animation: { 'fade-up': 'fade-up .8s cubic-bezier(.2,.7,.2,1) both' },
    },
  },
  plugins: [],
};
