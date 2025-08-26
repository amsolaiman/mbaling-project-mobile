/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const colorPrimary = '#be282d';

const colorSecondary = '#ffffff';

const colorAccent = '#f6babb';

// ----------------------------------------------------------------------

export default {
  primary: colorPrimary,
  secondary: colorSecondary,
  accent: colorAccent,
  light: {
    text: '#11181c',
    background: '#ffffff',
    card: '#ffffff',
  },
  dark: {
    text: '#ecedee',
    background: '#151718',
    card: '#1f1f1f',
  },
  common: {
    white: {
      main: '#ffffff',
      10: 'rgba(255, 255, 255, 0.1)',
      20: 'rgba(255, 255, 255, 0.2)',
      30: 'rgba(255, 255, 255, 0.3)',
      40: 'rgba(255, 255, 255, 0.4)',
      50: 'rgba(255, 255, 255, 0.5)',
      60: 'rgba(255, 255, 255, 0.6)',
      70: 'rgba(255, 255, 255, 0.7)',
      80: 'rgba(255, 255, 255, 0.8)',
      90: 'rgba(255, 255, 255, 0.9)',
    },
    black: {
      main: '#000000',
      10: 'rgba(0, 0, 0, 0.1)',
      20: 'rgba(0, 0, 0, 0.2)',
      30: 'rgba(0, 0, 0, 0.3)',
      40: 'rgba(0, 0, 0, 0.4)',
      50: 'rgba(0, 0, 0, 0.5)',
      60: 'rgba(0, 0, 0, 0.6)',
      70: 'rgba(0, 0, 0, 0.7)',
      80: 'rgba(0, 0, 0, 0.8)',
      90: 'rgba(0, 0, 0, 0.9)',
    },
  },
  grey: {
    50: '#f1f4f7',
    100: '#e0e6ed',
    200: '#c3d0dd',
    300: '#a4b9cb',
    400: '#8ba0b3',
    500: '#768999',
    600: '#637381',
    700: '#4a5661',
    800: '#313a42',
    900: '#1a2025',
    950: '#101417',
  },
};
