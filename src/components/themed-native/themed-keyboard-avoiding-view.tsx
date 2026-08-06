import {
  KeyboardAvoidingView,
  Platform,
  type KeyboardAvoidingViewProps,
} from 'react-native';

// hooks
import { useTheme } from '@/hooks/use-theme';

// ----------------------------------------------------------------------

export default function ThemedKeyboardAvoidingView({
  style,
  ...rest
}: KeyboardAvoidingViewProps) {
  const theme = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={[{ backgroundColor: theme.background, flex: 1 }, style]}
      {...rest}
    />
  );
}
