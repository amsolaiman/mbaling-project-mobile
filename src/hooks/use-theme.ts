/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import { Colors } from '@/styles';

// ----------------------------------------------------------------------

export function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === 'unspecified' ? 'light' : scheme;

  return Colors[theme];
}
