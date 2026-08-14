import { StyleSheet } from 'react-native';
import { ButtonProps, Button as PaperButton } from 'react-native-paper';

// constants
import { COLOR_PRIMARY, COMMON_COLORS } from '@/constants/theme';
// styles
import { Spacing } from '@/styles';

// ----------------------------------------------------------------------

type Props = Omit<ButtonProps, 'mode'> & {
  dense?: boolean;
  mode?: 'contained' | 'outlined';
};

export default function Button({
  mode = 'contained',
  dense = false,
  disabled,
  style,
  labelStyle,
  children,
  ...rest
}: Props) {
  return (
    <PaperButton
      mode={mode}
      disabled={disabled}
      style={[styles.button, !disabled && styles.border, style]}
      //
      labelStyle={[
        styles.label,
        !!dense && styles.dense,
        mode === 'contained' && !disabled && styles.white,
        labelStyle,
      ]}
      {...rest}
    >
      {children}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: Spacing.ten,
    borderWidth: 1,
    borderRadius: 50,
  },
  label: {
    marginVertical: Spacing.three,
    marginHorizontal: Spacing.four,
  },
  dense: {
    marginVertical: Spacing.oneHalf,
  },
  white: {
    color: COMMON_COLORS.white.main,
  },
  border: {
    borderColor: COLOR_PRIMARY,
  },
});
