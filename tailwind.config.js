/** @type {import('tailwindcss').Config} */
// Ridgeline Roofing: every colour below was sampled from the client's own logo,
// cover photo or job photos (see README for the table).
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // ACTION: the bright face of the roof line and the "N" in the logo (#1254D3).
        // Reserved for things you can click: Call, Quote, links, focus rings.
        action: {
          DEFAULT: '#1254D3',
          700: '#0B3FB0', // the shaded side of the logo's roof line
          800: '#0A3289',
          300: '#799DE1', // the logo's light bevel; used for the membrane in drawings
          100: '#DCE6FA',
        },
        // INK: the logo's black ground (#060606), pulled slightly toward the blue-slate.
        ink: {
          DEFAULT: '#0D1017',
          900: '#07090E',
          800: '#151923',
          700: '#232937',
          600: '#3A4150',
        },
        // SLATE: the natural slate in the cover photo (#4A4849 / #676668 / #D5D5D4).
        slate: {
          DEFAULT: '#4A4849',
          500: '#676668',
          400: '#8C8B8E',
          300: '#B4B3B6',
          200: '#D5D5D4',
        },
        // SURFACE: the cover photo's pale sky (#FBF9F6) cooled toward Guernsey granite grey.
        surface: {
          DEFAULT: '#F1F1EE',
          50: '#F8F8F6',
          200: '#E5E5E1',
          300: '#D6D6D1',
        },
        // HIGHLIGHT: the red treated battens and terracotta clay tiles from their jobs.
        // Drawings, layer markers and numbers only. Never a button.
        highlight: {
          DEFAULT: '#C2512A',
          700: '#9C3D1C',
          300: '#E59A76',
        },
        // TIMBER: the bare rafters in the strip-back photos. Drawings only.
        timber: '#D8B98E',
      },
      fontFamily: {
        // Wide, square capitals like the RIDGELINE lettering in the logo
        display: ['"Zalando Sans Expanded Variable"', '"Arial Black"', 'sans-serif'],
        sans: ['"Rethink Sans Variable"', 'system-ui', 'sans-serif'],
        mono: ['"Azeret Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { site: '80rem' },
      transitionTimingFunction: { out: 'cubic-bezier(.2,.7,.2,1)' },
    },
  },
  plugins: [],
};
