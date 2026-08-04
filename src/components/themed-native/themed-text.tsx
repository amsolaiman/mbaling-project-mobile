import { Text, type TextProps } from 'react-native';

// hooks
import { useTheme } from '@/hooks/use-theme';
// constants
import { Fonts } from '@/styles';

// ----------------------------------------------------------------------

export type ThemedTextProps = TextProps & {
  font?: keyof typeof Fonts;
};

export default function ThemedText({
  style,
  font = 400,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return <Text style={[{ color: theme.text }, Fonts[font], style]} {...rest} />;
}
