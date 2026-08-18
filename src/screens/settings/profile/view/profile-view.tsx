/* eslint-disable no-console */

import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import * as Yup from 'yup';

// assets
import { IconArrowAlt } from '@/assets/icons';
// auth
import { useAuthContext } from '@/auth/hooks';
import { AuthUserRoles } from '@/auth/types';
// components
import Button from '@/components/_ui/button';
import useCustomAlert from '@/components/custom-alert';
import {
  ThemedKeyboardAvoidingView,
  ThemedView,
} from '@/components/themed-native';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
import { useTheme } from '@/hooks/use-theme';
// types
import { UploadFormValue } from '@/types/posts';
import { IUserItem } from '@/types/users';

//
import { SettingsHeader } from '../../../_components';
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
  const color = useTheme();

  const edit = useBoolean();

  const { alert } = useCustomAlert();

  const { user } = useAuthContext();
  const userDetails = user as IUserItem;
  const isStudent = userDetails?.role === AuthUserRoles.STUDENT;

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
      firstName: userDetails?.firstName || '',
      lastName: userDetails?.lastName || '',
      middleName: userDetails?.middleName || '',
      nameExtension: userDetails?.nameExtension || null,
      gender: userDetails?.gender || 'male',
      dateOfBirth: userDetails?.dateOfBirth
        ? new Date(userDetails.dateOfBirth)
        : new Date(),
      avatarUrl: userDetails?.avatarUrl
        ? {
            uri: userDetails.avatarUrl,
            name: userDetails.avatarUrl.split('/').pop(),
            type: 'image',
          }
        : null,
    }),
    [userDetails]
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
      const message =
        typeof error === 'string' ? error : (error as Error).message;
      console.error(message);
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
        message:
          'Are you sure you want to leave this screen? Any unsaved changes will be lost.',
        buttons: [
          { text: 'CANCEL' },
          { text: 'YES', onPress: router.back, variant: 'contained' },
        ],
      });
    } else {
      router.back();
    }
  }, [edit, alert]);

  return (
    <FormProvider {...methods}>
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
                  color={color.text}
                />
              </Pressable>
            }
            actionRight={
              <Button
                onPress={handlePress}
                mode={edit.value ? 'contained' : 'outlined'}
              >
                {edit.value ? 'Save' : 'Edit'}
              </Button>
            }
          />

          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={styles.container}
          >
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
