import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

// assets
import { IconArrow } from '@/assets/icons';
// constants
import { COMMON_COLORS } from '@/constants/theme';
// hooks
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import { Colors, Spacing } from '@/styles';

// ----------------------------------------------------------------------

type Props = {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  customFunc?: VoidFunction;
};

export default function BackButton({
  position = 'top-left',
  customFunc,
}: Props) {
  const scheme = useColorScheme();
  const theme = scheme === 'unspecified' ? 'light' : scheme;

  return (
    <Pressable
      onPress={!!customFunc ? customFunc : router.back}
      style={[
        styles.container,
        {
          backgroundColor:
            scheme === 'light'
              ? COMMON_COLORS.black[70]
              : COMMON_COLORS.white[70],
          ...getPosition(position),
        },
      ]}
    >
      <IconArrow
        direction="left"
        variant="outline"
        size={24}
        color={Colors[theme].textReverse}
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
    borderRadius: '50%',
    zIndex: 999,
  },
});

const getPosition = (position: string) => {
  switch (position) {
    case 'top-right':
      return {
        top: Spacing.four,
        right: Spacing.four,
      };

    case 'bottom-left':
      return {
        bottom: Spacing.four,
        left: Spacing.four,
      };

    case 'bottom-right':
      return {
        bottom: Spacing.four,
        right: Spacing.four,
      };

    default:
      return {
        top: Spacing.four,
        left: Spacing.four,
      };
  }
};
