import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';
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
import FormProvider from '@/components/hook-form';
import { ThemedKeyboardAvoidingView, ThemedView } from '@/components/themed-native';
import { SettingsHeader } from '@/screens/_components';
// assets
import { IconArrowAlt } from '@/assets/icons';
//
import SettingsAccountAddressFields from '../account-address-fields';

// ----------------------------------------------------------------------

type FormValuesProps = {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  selectedProvince?: string;
  selectedMunicipality?: string;
  selectedBarangary?: string;
};

export default function SettingsAccountAddressView() {
  const colorScheme = useColorScheme() ?? 'light';

  const edit = useBoolean();

  const { alert } = useCustomAlert();

  const { user } = useAuthContext();

  const AccountSettingsSchema = Yup.object().shape({
    addressLine1: Yup.string().required('Address line is required'),
    addressLine2: Yup.string().required('Barangay is required'),
    addressLine3: Yup.string().required('City or municipality is required'),
    addressLine4: Yup.string().required('Province is required'),
  });

  const defaultValues = useMemo(
    () => ({
      addressLine1: user?.addressLine1 || '',
      addressLine2: user?.addressLine2 || '',
      addressLine3: user?.addressLine3 || '',
      addressLine4: user?.addressLine4 || '',
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
              title="Address"
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

            <SettingsAccountAddressFields isEdit={edit.value} />
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
    flexDirection: 'column',
    gap: 16,
  },
});
