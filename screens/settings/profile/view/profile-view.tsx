import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import * as Yup from 'yup';
// @expo
import { router } from 'expo-router';
// hooks
import { useAuthContext } from '@/auth/hooks';
import { useBoolean } from '@/hooks/use-boolean';
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import Colors from '@/styles/constants/Colors';
// types
import { UploadFormValue } from '@/types/posts';
// components
import Button from '@/components/button';
import useCustomAlert from '@/components/custom-alert';
import FormProvider from '@/components/hook-form';
import { ThemedKeyboardAvoidingView, ThemedView } from '@/components/themed-native';
// assets
import { IconArrowAlt } from '@/assets/icons';
//
import { SettingsHeader } from '@/screens/_components';
import SettingsProfileFields from '../profile-fields';
import SettingsProfileFooter from '../profile-footer';

// ----------------------------------------------------------------------

type FormValuesProps = {
  firstName: string;
  lastName: string;
  middleName: string;
  nameExtension?: string | null;
  gender: string;
  dateOfBirth: Date | string;
  avatarUrl?: UploadFormValue | null;
};

export default function SettingsProfileView() {
  const colorScheme = useColorScheme() ?? 'light';

  const edit = useBoolean();

  const { alert } = useCustomAlert();

  const { user, isStudent } = useAuthContext();

  const AccountSettingsSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    middleName: Yup.string().required('Middle name is required'),
    gender: Yup.string().required('Gender is required'),
    dateOfBirth: Yup.mixed<Date | string>()
      .test('is-valid-date', 'Date of birth is required', (value) => !!value)
      .required('Date of birth is required'),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      middleName: user?.middleName || '',
      nameExtension: user?.nameExtension || null,
      gender: user?.gender || 'male',
      dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth) : new Date(),
      avatarUrl: user?.avatarUrl
        ? {
            uri: user.avatarUrl,
            name: user.avatarUrl.split('/').pop(),
            type: 'image',
          }
        : null,
    }),
    [user]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(AccountSettingsSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.back();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handlePress = useCallback(async () => {
    if (!edit.value) {
      edit.onTrue();
      return;
    }

    handleSubmit(onSubmit)();
  }, [edit, handleSubmit, onSubmit]);

  const handleReturn = useCallback(() => {
    if (edit.value) {
      alert({
        message: 'Are you sure you want to leave this screen? Any unsaved changes will be lost.',
        buttons: [{ text: 'CANCEL' }, { text: 'YES', onPress: router.back, variant: 'contained' }],
      });
    } else {
      router.back();
    }
  }, [edit, alert]);

  return (
    <FormProvider methods={methods}>
      <ThemedKeyboardAvoidingView>
        <ThemedView
          loadingState={isSubmitting}
          loadingCaption="Saving update..."
          style={styles.container}
        >
          <SettingsHeader
            title="Edit profile"
            actionLeft={
              <Pressable onPress={handleReturn}>
                <IconArrowAlt
                  direction="left"
                  variant="outline"
                  size={24}
                  color={Colors[colorScheme].text}
                />
              </Pressable>
            }
            actionRight={
              <Button onPress={handlePress} mode={edit.value ? 'contained' : 'outlined'}>
                {edit.value ? 'Save' : 'Edit'}
              </Button>
            }
          />

          <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
            <SettingsProfileFields isEdit={edit.value} />

            {isStudent && <SettingsProfileFooter />}
          </ScrollView>
        </ThemedView>
      </ThemedKeyboardAvoidingView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
