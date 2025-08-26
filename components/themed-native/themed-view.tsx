import { View, type ViewProps } from 'react-native';
// utils
import { cn } from '@/utils/tw-merge';
// components
import SpinnerOverlay from '../spinner-overlay';

// ----------------------------------------------------------------------

type Props = ViewProps & {
  loadingState?: boolean;
  loadingCaption?: string;
};

export default function ThemedView({
  className,
  loadingState = false,
  loadingCaption,
  ...rest
}: Props) {
  return (
    <>
      <SpinnerOverlay state={loadingState} caption={loadingCaption} />

      <View className={cn('bg-light-theme dark:bg-dark-theme', className)} {...rest} />
    </>
  );
}
