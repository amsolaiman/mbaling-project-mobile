/* eslint-disable no-console */

import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Yup from 'yup';

// assets
import { IconArrowAlt } from '@/assets/icons';
// auth
import { useAuthContext } from '@/auth/hooks';
// components
import Button from '@/components/_ui/button';
import useCustomAlert from '@/components/custom-alert';
import { RHFTextField } from '@/components/hook-form';
import {
  ThemedKeyboardAvoidingView,
  ThemedView,
} from '@/components/themed-native';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
import { useTheme } from '@/hooks/use-theme';
// styles
import { Spacing } from '@/styles';
// types
import { IUserItem } from '@/types/users';

//
import { SettingsHeader } from '../../../_components';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
};

export default function SettingsAccountEmailView() {
  const color = useTheme();

  const edit = useBoolean();

  const { alert } = useCustomAlert();

  const { user } = useAuthContext();
  const userDetails = user as IUserItem;

  const AccountSettingsSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Must be a valid email address'),
  });

  const defaultValues = useMemo(
    () => ({
      email: userDetails?.email || '',
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
              title="E-mail"
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
                name="email"
                label="Enter e-mail"
                keyboardType="email-address"
                //
                mode="flat"
                disabled={!edit.value}
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
  },
});
