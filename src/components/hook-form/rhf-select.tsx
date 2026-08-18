import React, { useCallback, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  TextInput as DefaultTextInput,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  HelperText,
  Menu,
  TextInput,
  TextInputProps,
} from 'react-native-paper';

// assets
import { IconArrowAlt } from '@/assets/icons';
// constants
import { GREY_COLORS } from '@/constants/theme';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
import { useTheme } from '@/hooks/use-theme';

// ----------------------------------------------------------------------

type Props = TextInputProps & {
  name: string;
  hideError?: boolean;
  helperText?: string;
  options: {
    value: string | number;
    label: string | number;
  }[];
};

const RHFSelect: React.FC<Props> = ({
  name,
  hideError = false,
  mode,
  helperText,
  disabled,
  options,
  style,
  ...rest
}) => {
  const { control } = useFormContext();

  const ref = useRef<DefaultTextInput>(null);

  const color = useTheme();

  const open = useBoolean();

  const [width, setWidth] = useState<number>(0);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
  }, []);

  const onClose = useCallback(() => {
    open.onFalse();
    ref.current?.blur();
  }, [open]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const value: typeof field.value =
          options.find((option) => option.value === field.value)?.label ?? '';

        const handleSelect = (value: string | number) => {
          field.onChange(value);
          onClose();
        };

        return (
          <View onLayout={handleLayout}>
            <Menu
              visible={open.value}
              onDismiss={onClose}
              anchor={
                <TextInput
                  {...field}
                  ref={ref}
                  value={value}
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
                      icon={() => (
                        <IconArrowAlt
                          direction={open.value ? 'up' : 'down'}
                          size={18}
                          color={GREY_COLORS[500]}
                        />
                      )}
                    />
                  }
                  {...rest}
                />
              }
              anchorPosition="bottom"
              contentStyle={{ width, backgroundColor: color.backgroundCard }}
            >
              {!!options.length ? (
                options.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSelect(item.value)}
                  >
                    <Menu.Item
                      dense
                      rippleColor="transparent"
                      title={item.label}
                    />
                  </TouchableOpacity>
                ))
              ) : (
                <Menu.Item disabled title="No data..." />
              )}
            </Menu>

            {!!error && !hideError && (
              <HelperText
                type="error"
                visible={!!error}
                style={styles.helperText}
              >
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

export default RHFSelect;

const styles = StyleSheet.create({
  flat: {
    backgroundColor: 'transparent',
  },
  helperText: {
    paddingBottom: 0,
    lineHeight: 14,
  },
});
