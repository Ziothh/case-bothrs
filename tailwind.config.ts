import colors from 'tailwindcss/colors';
import c from 'tailwindcss/defaultTheme';

function pxToRem(px: number) {
  return `${px / 16}rem` as const;
}

export default ({
  content: [
    "./app/**/*.tsx",
    "./components/**/*.tsx",
    // "./components/**/*.tsx",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      background: {
        400: '#313135',
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
      xs: pxToRem(12),
      sm: pxToRem(14),
      base: pxToRem(16),
      lg: pxToRem(20),
      xl: pxToRem(22),
      '2xl': pxToRem(34),
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
} as const) satisfies import('tailwindcss').Config

