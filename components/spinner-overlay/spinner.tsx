import { Animated, Easing } from 'react-native';
// styles
import Colors from '@/styles/constants/Colors';
// assets
import { IconSpinner } from '@/assets/icons';

// ----------------------------------------------------------------------

type Props = {
  size?: number;
  speed?: number;
  color?: 'primary' | 'light' | 'dark';
};

export default function Spinner({ size = 48, speed, color = 'primary' }: Props) {
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

  return (
    <Animated.View style={{ width: size, height: size, transform: [{ rotate: spin }] }}>
      <IconSpinner
        size={size}
        color={color === 'primary' ? Colors.primary : Colors[color].background}
      />
    </Animated.View>
  );
}
