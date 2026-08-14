import { StyleSheet } from 'react-native';
import { ButtonProps, Button as PaperButton } from 'react-native-paper';

// constants
import { COLOR_PRIMARY, COMMON_COLORS } from '@/constants/theme';

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
    minWidth: 72,
    borderWidth: 1,
    borderRadius: 50,
  },
  label: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  dense: {
    marginVertical: 6,
  },
  white: {
    color: COMMON_COLORS.white.main,
  },
  border: {
    borderColor: COLOR_PRIMARY,
  },
});
