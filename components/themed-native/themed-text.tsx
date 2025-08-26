import { Text, type TextProps } from 'react-native';
// utils
import { cn } from '@/utils/tw-merge';

// ----------------------------------------------------------------------

export default function ThemedText({ className, ...rest }: TextProps) {
  return (
    <Text
      className={cn('font-normal text-light-theme dark:text-dark-theme', className)}
      {...rest}
    />
  );
}
