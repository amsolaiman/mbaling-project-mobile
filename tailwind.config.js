/** @type {import('tailwindcss').Config} */

const colors = require('./styles/overrides/colors').default;

module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: 'var(--crimson-600)',
        accent: 'var(--crimson-200)',
        crimson: {
          50: '#FCEDED',
          100: '#FADBDC',
          200: '#F6BABB',
          300: '#F39395',
          400: '#F16669',
          500: '#EA343A',
          600: '#BE282D',
          700: '#921C20',
          800: '#661113',
          900: '#400709',
          950: '#290304',
        },
        gray: {
          50: '#F1F4F7',
          100: '#E0E6ED',
          200: '#C3D0DD',
          300: '#A4B9CB',
          400: '#8BA0B3',
          500: '#768999',
          600: '#637381',
          700: '#4A5661',
          800: '#313A42',
          900: '#1A2025',
          950: '#101417',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ...colors,
      });
    },
  ],
};
