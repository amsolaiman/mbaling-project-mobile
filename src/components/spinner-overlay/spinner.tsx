import { Animated, Easing } from 'react-native';

// assets
import { IconSpinner } from '@/assets/icons';
// constants
import { COLOR_PRIMARY, COMMON_COLORS } from '@/constants/theme';

// ----------------------------------------------------------------------

type Props = {
  size?: number;
  speed?: number;
  color?: 'primary' | 'light' | 'dark';
};

export default function Spinner({
  size = 48,
  speed,
  color = 'primary',
}: Props) {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: speed ?? 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const FILL_COLOR =
    color === 'light'
      ? COMMON_COLORS.white.main
      : color === 'dark'
        ? COMMON_COLORS.black.main
        : COLOR_PRIMARY;

  return (
    <Animated.View
      style={{ width: size, height: size, transform: [{ rotate: spin }] }}
    >
      <IconSpinner size={size} color={FILL_COLOR} />
    </Animated.View>
  );
}
