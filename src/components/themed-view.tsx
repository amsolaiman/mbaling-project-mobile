import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedView({ style, type, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();

  const backgroundColor = (theme[type ?? 'background'] ??
    theme.background) as string;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
