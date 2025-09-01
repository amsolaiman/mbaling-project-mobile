import { Pressable, StyleSheet } from 'react-native';
// @expo
import { router } from 'expo-router';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// theme
import Colors from '@/styles/constants/Colors';
// assets
import { IconArrow } from '@/assets/icons';

// ----------------------------------------------------------------------

type Props = {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  customFunc?: VoidFunction;
};

export default function BackButton({ position = 'top-left', customFunc }: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Pressable
      onPress={!!customFunc ? customFunc : router.back}
      style={[
        styles.container,
        {
          backgroundColor:
            colorScheme === 'light' ? Colors.common.black[70] : Colors.common.white[70],
          ...getPosition(position),
        },
      ]}
    >
      <IconArrow
        direction="left"
        variant="outline"
        size={24}
        color={Colors[colorScheme].background}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 42,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    zIndex: 999,
  },
});

const getPosition = (position: string) => {
  switch (position) {
    case 'top-right':
      return {
        top: 16,
        right: 16,
      };

    case 'bottom-left':
      return {
        bottom: 16,
        left: 16,
      };

    case 'bottom-right':
      return {
        bottom: 16,
        right: 16,
      };

    default:
      return {
        top: 16,
        left: 16,
      };
  }
};
