/* eslint-disable no-console */

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import * as Yup from 'yup';

// assets
import { IconEye } from '@/assets/icons';
// components
import { RHFTextField } from '@/components/hook-form';
import {
  ThemedKeyboardAvoidingView,
  ThemedView,
} from '@/components/themed-native';
// constants
import { GREY_COLORS } from '@/constants/theme';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// styles
import { Spacing } from '@/styles';

//
import SettingsActionHeader from '../../settings-action-header';

// ----------------------------------------------------------------------

type FormValuesProps = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function SettingsAccountPasswordView() {
  const edit = useBoolean();

  const [show, setShow] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const AccountSettingsSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(8, 'Must be at least 8 characters')
      .test(
        'no-match',
        'Must be different than old password',
        (value, { parent }) => value !== parent.oldPassword
      ),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword')], 'Must match new password'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

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
      console.info('DATA', data);
    } catch (error) {
      const message =
        typeof error === 'string' ? error : (error as Error).message;
      console.error(message);
    }
  }, []);

  const handleFormSubmit = useCallback(
    (): Promise<boolean> =>
      new Promise((resolve) => {
        handleSubmit(
          async (data) => {
            await onSubmit(data);
            resolve(true);
          },
          () => resolve(false)
        )();
      }),
    [handleSubmit, onSubmit]
  );

  const toggleVisibility = useCallback((field: keyof typeof show) => {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  const renderEye = (field: keyof typeof show) => (
    <TextInput.Icon
      icon={() => (
        <Pressable
          onPress={() => toggleVisibility(field)}
          disabled={!edit.value}
        >
          {show[field] ? (
            <IconEye variant="solid" size={24} color={GREY_COLORS[300]} />
          ) : (
            <IconEye variant="outline" size={24} color={GREY_COLORS[300]} />
          )}
        </Pressable>
      )}
    />
  );

  return (
    <FormProvider {...methods}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ThemedKeyboardAvoidingView>
          <ThemedView
            loadingState={isSubmitting}
            loadingCaption="Saving update..."
            style={styles.container}
          >
            <SettingsActionHeader
              title="Password"
              isEdit={edit.value}
              onEdit={edit.onTrue}
              onSubmit={handleFormSubmit}
            />

            <View style={styles.formContainer}>
              <RHFTextField
                name="oldPassword"
                label="Enter old password"
                mode="flat"
                disabled={!edit.value}
                secureTextEntry={!show.oldPassword}
                right={renderEye('oldPassword')}
              />

              <RHFTextField
                name="newPassword"
                label="Enter new password"
                mode="flat"
                disabled={!edit.value}
                secureTextEntry={!show.newPassword}
                right={renderEye('newPassword')}
              />

              <RHFTextField
                name="confirmPassword"
                label="Confirm new password"
                mode="flat"
                disabled={!edit.value}
                secureTextEntry={!show.confirmPassword}
                right={renderEye('confirmPassword')}
              />
            </View>
          </ThemedView>
        </ThemedKeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: Spacing.four,
    flexDirection: 'column',
    gap: Spacing.four,
  },
});
