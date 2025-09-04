import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useCallback, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextInput as DefaultTextInput, Platform, StyleSheet, View } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// styles
import Colors from '@/styles/constants/Colors';
// assets
import { IconCalendar } from '@/assets/icons';

// ----------------------------------------------------------------------

type Props = TextInputProps & {
  name: string;
  hideError?: boolean;
  helperText?: string;
};

const RHFDatePicker: React.FC<Props> = ({
  name,
  hideError = false,
  mode,
  helperText,
  disabled,
  style,
  ...rest
}) => {
  const { control } = useFormContext();

  const ref = useRef<DefaultTextInput>(null);

  const open = useBoolean();

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return '';

    return date.toLocaleDateString();
  };

  const onClose = useCallback(() => {
    open.onFalse();
    ref.current?.blur();
  }, [open]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const onDateChange = (_event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
          // Close picker on Android or keep open on iOS
          open.setValue(Platform.OS === 'ios');

          if (selectedDate) {
            field.onChange(selectedDate);
            onClose();
          }
        };

        return (
          <View>
            <TextInput
              {...field}
              ref={ref}
              value={formatDate(field.value)}
              style={[mode === 'flat' && styles.flat, style]}
              onFocus={open.onTrue}
              onBlur={open.onFalse}
              showSoftInputOnFocus={false}
              //
              mode={mode}
              error={!!error}
              disabled={disabled}
              right={
                <TextInput.Icon
                  icon={() => <IconCalendar variant="outline" size={24} color={Colors.grey[500]} />}
                />
              }
              {...rest}
            />

            {open.value && (
              <DateTimePicker
                value={field.value || new Date()}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}

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

export default RHFDatePicker;

const styles = StyleSheet.create({
  flat: {
    backgroundColor: 'transparent',
  },
  helperText: {
    paddingBottom: 0,
    lineHeight: 14,
  },
});
