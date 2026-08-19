/* eslint-disable no-console */

import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import { useCallback } from 'react';
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
import { IconArrowAlt, IconEye } from '@/assets/icons';
// components
import Button from '@/components/_ui/button';
import useCustomAlert from '@/components/custom-alert';
import { RHFTextField } from '@/components/hook-form';
import {
  ThemedKeyboardAvoidingView,
  ThemedView,
} from '@/components/themed-native';
// constants
import { GREY_COLORS } from '@/constants/theme';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
import { useTheme } from '@/hooks/use-theme';
// styles
import { Spacing } from '@/styles';

import { SettingsHeader } from '../../../_components';

// ----------------------------------------------------------------------

type FormValuesProps = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function SettingsAccountPasswordView() {
  const color = useTheme();

  const edit = useBoolean();

  const show = useBoolean();

  const { alert } = useCustomAlert();

  const AccountSettingsSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(8, 'Password must be at least 8 characters')
      .test(
        'no-match',
        'New password must be different than old password',
        (value, { parent }) => value !== parent.oldPassword
      ),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
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
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.replace('/settings/account');
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

  const renderEye = (
    <TextInput.Icon
      icon={() => (
        <Pressable onPress={show.onToggle} disabled={!edit.value}>
          {show.value ? (
            <IconEye variant="solid" size={24} color={GREY_COLORS[300]} />
          ) : (
            <IconEye variant="outline" size={24} color={GREY_COLORS[300]} />
          )}
        </Pressable>
      )}
    />
  );

  const RHFProps = {
    disabled: !edit.value,
    secureTextEntry: !show.value,
    right: renderEye,
  };

  return (
    <FormProvider {...methods}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ThemedKeyboardAvoidingView>
          <ThemedView
            loadingState={isSubmitting}
            loadingCaption="Saving update..."
            style={styles.container}
          >
            <SettingsHeader
              title="Password"
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

            <View style={styles.formContainer}>
              <RHFTextField
                name="oldPassword"
                label="Enter old password"
                mode="flat"
                {...RHFProps}
              />

              <RHFTextField
                name="newPassword"
                label="Enter new password"
                mode="flat"
                {...RHFProps}
              />

              <RHFTextField
                name="confirmPassword"
                label="Confirm new password"
                mode="flat"
                {...RHFProps}
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
