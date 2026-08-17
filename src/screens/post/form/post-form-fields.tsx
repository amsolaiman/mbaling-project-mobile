import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

// components
import { RHFTextField } from '@/components/hook-form';
import { ThemedView } from '@/components/themed-native';
// styles
import { Spacing } from '@/styles';

// ----------------------------------------------------------------------

export default function PostFormFields() {
  return (
    <ThemedView style={styles.container}>
      <RHFTextField
        name="title"
        label="Title"
        //
        mode="flat"
        multiline
      />

      <RHFTextField
        name="price"
        label="Fee (monthly)"
        left={<TextInput.Affix text="₱ " />}
        //
        mode="flat"
        type="number"
        keyboardType="numeric"
      />

      <RHFTextField
        name="description"
        label="Description"
        //
        mode="flat"
        multiline
        numberOfLines={100}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.six,
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
    borderTopLeftRadius: Spacing.six,
    borderTopRightRadius: Spacing.six,
  },
});
