import { MD3LightTheme } from 'react-native-paper';

// ----------------------------------------------------------------------

const WEIGHT_TO_FONT: Record<string, string> = {
  '100': 'Metropolis-Thin',
  thin: 'Metropolis-Thin',
  '200': 'Metropolis-ExtraLight',
  '300': 'Metropolis-Light',
  light: 'Metropolis-Light',
  '400': 'Metropolis-Regular',
  normal: 'Metropolis-Regular',
  '500': 'Metropolis-Medium',
  medium: 'Metropolis-Medium',
  '600': 'Metropolis-SemiBold',
  '700': 'Metropolis-Bold',
  bold: 'Metropolis-Bold',
  '800': 'Metropolis-ExtraBold',
  '900': 'Metropolis-Black',
  black: 'Metropolis-Black',
};

const getWeight = (weight?: string) =>
  WEIGHT_TO_FONT[weight ?? 'normal'] ?? 'Metropolis-Regular';

export default Object.fromEntries(
  Object.entries(MD3LightTheme.fonts).map(([key, value]) => [
    key,
    {
      ...value,
      fontFamily: getWeight(value.fontWeight),
      fontStyle: 'normal',
    },
  ])
);
