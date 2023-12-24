// @ts-check

const colors = require('tailwindcss/colors');

// /** @param {number} px */
// function pxToRem(px) {
//   return `${px / 16}rem`;
// }

/** @type import('tailwindcss').Config */
module.exports = {
  content: [
    "./app/**/*.tsx",
    "./features/**/*.{ts, tsx}",
    "**/*.tsx",
    "**/*.ts",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      gray: '#ABABAB',
      red: '#FF5660',
      background: {
        400: '#313135',
        500: '#2D2938',
        600: '#221F2B',
        900: '#18161D',
        layer: 'rgba(255, 255, 255, 0.10)',
      },
      cyan: {
        400: '#52D1B7',
        600: '#1F977F',
      },
      purple: {
        400: '#612DF6',
        600: '#4D24C5',
      },
      blue: {
        400: '#63B3B9',
        600: '#4A868A',
      },
      pink: {
        400: '#EB498A',
        600: '#A9255A',
      },
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 20,
      xl: 22,
      '2xl': 34,
    },
    fontFamily: {
      sans: [
        'Lato',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
  },
  plugins: [],
}

