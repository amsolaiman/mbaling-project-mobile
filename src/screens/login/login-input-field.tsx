import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

// components
import { ThemedText } from '@/components/themed-native';
// constants
import { COMMON_COLORS } from '@/constants/theme';
// hooks
import { useBoolean } from '@/hooks/use-boolean';

// ----------------------------------------------------------------------

type Props = TextInputProps & {
  name: string;
};

export default function LoginInputField({
  name,
  label,
  secureTextEntry = false,
}: Props) {
  const { control } = useFormContext();

  const onFocus = useBoolean(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <View style={styles.container}>
          <TextInput
            {...field}
            value={field.value}
            onChangeText={field.onChange}
            secureTextEntry={secureTextEntry}
            style={styles.input}
            //
            onFocus={onFocus.onTrue}
            onBlur={onFocus.onFalse}
            //
            textColor={COMMON_COLORS.white.main}
            underlineColor={COMMON_COLORS.white.main}
            activeUnderlineColor={COMMON_COLORS.white.main}
          />

          {!onFocus.value && !field.value && (
            <ThemedText style={styles.label}>{label}</ThemedText>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '60%',
    height: 48,
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  label: {
    position: 'absolute',
    color: COMMON_COLORS.white[80],
    fontSize: 16,
    pointerEvents: 'none',
    zIndex: 0,
  },
});
