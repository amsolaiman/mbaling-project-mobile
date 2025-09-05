import { StyleSheet, View } from 'react-native';
// components
import { RHFAvatar, RHFDatePicker, RHFSelect, RHFTextField } from '@/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  isEdit: boolean;
};

export default function SettingsProfileFields({ isEdit }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <RHFAvatar name="avatarUrl" size={120} disabled={isEdit} />
      </View>

      <RHFTextField
        name="firstName"
        label="First name"
        //
        mode="flat"
        disabled={!isEdit}
      />

      <RHFTextField
        name="lastName"
        label="Last name"
        //
        mode="flat"
        disabled={!isEdit}
      />

      <RHFTextField
        name="middleName"
        label="Middle name"
        //
        mode="flat"
        disabled={!isEdit}
      />

      <RHFTextField
        name="nameExtension"
        label="Name extension"
        //
        mode="flat"
        disabled={!isEdit}
        helperText="E.g. Jr., Sr., II, III, etc."
      />

      <RHFSelect
        name="gender"
        label="Gender"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
        //
        mode="flat"
        disabled={!isEdit}
      />

      <RHFDatePicker
        name="dateOfBirth"
        label="Date of birth"
        //
        mode="flat"
        disabled={!isEdit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 16,
    flexDirection: 'column',
    gap: 12,
  },
  avatar: {
    paddingBottom: 12,
    alignItems: 'center',
  },
});
