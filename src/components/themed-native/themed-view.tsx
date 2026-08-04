import { View, type ViewProps } from 'react-native';

// constants
import { ThemeColor } from '@/constants/theme';
// hooks
import { useTheme } from '@/hooks/use-theme';

// ----------------------------------------------------------------------

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export default function ThemedView({
  style,
  type,
  ...otherProps
}: ThemedViewProps) {
  const theme = useTheme();

  const backgroundColor = (theme[type ?? 'background'] ??
    theme.background) as string;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
