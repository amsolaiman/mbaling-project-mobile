import { StyleSheet } from 'react-native';

// ----------------------------------------------------------------------

export const FONT_WEIGHT_NAMES = {
  100: 'Thin',
  200: 'ExtraLight',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'Black',
} as const;

export const Fonts = StyleSheet.create(
  Object.fromEntries(
    Object.entries(FONT_WEIGHT_NAMES).map(([weight, name]) => [
      weight,
      {
        fontFamily: `Metropolis-${name}`,
        fontWeight: 'normal',
        fontStyle: 'normal',
      },
    ])
  ) as Record<
    keyof typeof FONT_WEIGHT_NAMES,
    { fontFamily: string; fontWeight: 'normal'; fontStyle: 'normal' }
  >
);
