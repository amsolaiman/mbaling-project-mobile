// constants
import { BRAND_COLORS } from '@/constants/theme';

// ----------------------------------------------------------------------

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

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
