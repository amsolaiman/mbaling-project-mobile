import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import * as Yup from 'yup';
// @expo
import { router } from 'expo-router';
// hooks
import { useAuthContext } from '@/auth/hooks';
import { useBoolean } from '@/hooks/use-boolean';
import { useColorScheme } from '@/hooks/use-color-scheme';
// styles
import Colors from '@/styles/constants/Colors';
// components
import Button from '@/components/button';
import useCustomAlert from '@/components/custom-alert';
import FormProvider, { RHFTextField } from '@/components/hook-form';
import { ThemedKeyboardAvoidingView, ThemedView } from '@/components/themed-native';
import { SettingsHeader } from '@/screens/_components';
// assets
import { IconArrowAlt } from '@/assets/icons';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
};

export default function SettingsAccountEmailView() {
  const colorScheme = useColorScheme() ?? 'light';

  const edit = useBoolean();

  const { alert } = useCustomAlert();

  const { user } = useAuthContext();

  const AccountSettingsSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Must be a valid email address'),
  });

  const defaultValues = useMemo(
    () => ({
      email: user?.email || '',
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
    padding: 16,
  },
});
