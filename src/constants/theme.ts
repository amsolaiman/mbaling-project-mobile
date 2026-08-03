/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

// ----------------------------------------------------------------------

const COLOR_PRIMARY = '#c3272b';

const COLOR_SECONDARY = '#ffffff';

const COLOR_ACCENT = '#f6b6bb';

const COMMON_COLORS = {
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
};

const GREY_COLORS = {
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
};

export const BRAND_COLORS = {
  primary: COLOR_PRIMARY,
  secondary: COLOR_SECONDARY,
  accent: COLOR_ACCENT,
  common: COMMON_COLORS,
  grey: GREY_COLORS,
} as const;

// ----------------------------------------------------------------------

export const Colors = {
  light: {
    ...BRAND_COLORS,
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    ...BRAND_COLORS,
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
