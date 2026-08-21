/* eslint-disable no-console */

import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import * as Yup from 'yup';

// auth
import { useAuthContext } from '@/auth/hooks';
import { AuthUserRoles } from '@/auth/types';
// components
import {
  ThemedKeyboardAvoidingView,
  ThemedView,
} from '@/components/themed-native';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// types
import { UploadFormValue } from '@/types/posts';
import { IUserItem } from '@/types/users';

//
import SettingsActionHeader from '../../settings-action-header';
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
  const edit = useBoolean();

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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.back();
      console.info('DATA', data);
    } catch (error) {
      const message =
        typeof error === 'string' ? error : (error as Error).message;
      console.error(message);
    }
  }, []);

  return (
    <FormProvider {...methods}>
      <ThemedKeyboardAvoidingView>
        <ThemedView
          loadingState={isSubmitting}
          loadingCaption="Saving update..."
          style={styles.container}
        >
          <SettingsActionHeader
            title="Edit profile"
            isEdit={edit.value}
            onEdit={edit.onTrue}
            onSubmit={handleSubmit(onSubmit)}
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
