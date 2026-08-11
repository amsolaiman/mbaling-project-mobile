// import { useBottomTabBarHeight } from 'expo-router/react-navigation';

// ----------------------------------------------------------------------

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const TAB_BAR_HEIGHT = 60;

export const BOTTOM_TAB_BAR_INSET = TAB_BAR_HEIGHT + Spacing.three;
