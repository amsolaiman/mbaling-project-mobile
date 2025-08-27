import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// styles
import Colors from '@/styles/constants/Colors';
// components
import { ThemedText } from '@/components/themed-native';

// ----------------------------------------------------------------------

type Props = TextInputProps & {
  name: string;
};

export default function LoginInputField({ name, label, secureTextEntry = false }: Props) {
  const { control } = useFormContext();

  const onFocus = useBoolean(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <View className="relative items-center justify-center">
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
            textColor={Colors.common.white.main}
            underlineColor={Colors.common.white.main}
            activeUnderlineColor={Colors.common.white.main}
          />

          {!onFocus.value && !field.value && <ThemedText style={styles.label}>{label}</ThemedText>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
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
    color: Colors.common.white[80],
    fontSize: 16,
    pointerEvents: 'none',
    zIndex: 0,
  },
});
