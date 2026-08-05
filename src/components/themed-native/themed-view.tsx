import { View, type ViewProps } from 'react-native';

// hooks
import { useTheme } from '@/hooks/use-theme';

//
import SpinnerOverlay from '../spinner-overlay';

// ----------------------------------------------------------------------

export type ThemedViewProps = ViewProps & {
  loadingState?: boolean;
  loadingCaption?: string;
};

export default function ThemedView({
  style,
  loadingState = false,
  loadingCaption,
  ...rest
}: ThemedViewProps) {
  const theme = useTheme();

  return (
    <>
      <SpinnerOverlay state={loadingState} caption={loadingCaption} />

      <View style={[{ backgroundColor: theme.background }, style]} {...rest} />
    </>
  );
}
