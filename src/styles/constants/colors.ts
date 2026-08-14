// constants
import { BRAND_COLORS } from '@/constants/theme';

// ----------------------------------------------------------------------

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Colors = {
  light: {
    ...BRAND_COLORS,
    text: '#11181c',
    textReverse: '#ecedee',
    background: '#ffffff',
    backgroundCard: '#ffffff',
  },
  dark: {
    ...BRAND_COLORS,
    text: '#ecedee',
    textReverse: '#11181c',
    background: '#151718',
    backgroundCard: '#1f1f1f',
  },
} as const;
