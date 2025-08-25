import { Text, type TextProps } from 'react-native';
// hooks
import { useThemeColor } from '@/hooks/useThemeColor';
// constants
import Fonts from '@/constants/Fonts';

// ----------------------------------------------------------------------

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  font?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  font = '400',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <Text style={[{ color, ...Fonts[font] }, style]} {...rest} />;
}
