import { KeyboardAvoidingView, Platform, type KeyboardAvoidingViewProps } from 'react-native';
//
import { useThemeColor } from './use-theme-color';

// ----------------------------------------------------------------------

type ThemedViewProps = KeyboardAvoidingViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedKeyboardAvoidingView({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={[{ backgroundColor, flex: 1 }, style]}
      {...rest}
    />
  );
}
