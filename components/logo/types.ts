// ----------------------------------------------------------------------

type ColorProps = 'primary' | 'light' | 'dark';

type VariantProps = 'base' | 'vertical' | 'horizontal';

export type LogoProps = {
  disabledLink?: boolean;
  size?: number;
  color?: ColorProps;
  variant?: VariantProps;
};
