import { View, type ViewProps } from 'react-native';

// hooks
import { useTheme } from '@/hooks/use-theme';

// ----------------------------------------------------------------------

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();

  return (
    <View
      style={[{ backgroundColor: theme.background }, style]}
      {...otherProps}
    />
  );
}
