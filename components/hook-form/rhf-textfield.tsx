import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';

// ----------------------------------------------------------------------

type Props = TextInputProps & {
  name: string;
  hideError?: boolean;
  helperText?: string;
  type?: 'string' | 'number';
};

const RHFTextField: React.FC<Props> = ({
  name,
  hideError = false,
  type = 'string',
  mode,
  helperText,
  disabled,
  style,
  ...rest
}) => {
  const { control } = useFormContext();

  const isNumber = type === 'number';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const handleChange = (value: string) => {
          if (isNumber) {
            const numericValue = value
              // Remove all characters except digits and dots
              .replace(/[^0-9.]/g, '')
              // Only keep the first dot
              .replace(/^([^.]*\.)|\./g, (_, firstDotMatch) => firstDotMatch || '')
              // Remove leading zero unless it is followed by a dot
              .replace(/^0+(?!\.)/, '');

            field.onChange(numericValue);
          } else {
            field.onChange(value);
          }
        };

        return (
          <View>
            <TextInput
              {...field}
              value={isNumber ? String(field.value ?? 0) : field.value}
              onChangeText={(value) => handleChange(value)}
              style={[mode === 'flat' && styles.flat, style]}
              //
              mode={mode}
              error={!!error}
              disabled={disabled}
              {...rest}
            />

            {!!error && !hideError && (
              <HelperText type="error" visible={!!error} style={styles.helperText}>
                {error.message}
              </HelperText>
            )}

            {!!helperText && !error && (
              <HelperText
                type="info"
                visible={!!helperText}
                disabled={disabled}
                style={styles.helperText}
              >
                {helperText}
              </HelperText>
            )}
          </View>
        );
      }}
    />
  );
};

export default RHFTextField;

const styles = StyleSheet.create({
  flat: {
    backgroundColor: 'transparent',
  },
  helperText: {
    paddingBottom: 0,
    lineHeight: 14,
  },
});
