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
} from 'react-native';
import * as Yup from 'yup';

// assets
import { IconArrowAlt } from '@/assets/icons';
// auth
import { useAuthContext } from '@/auth/hooks';
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
// styles
import { Spacing } from '@/styles';
// types
import { IUserItem } from '@/types/users';

//
import { SettingsHeader } from '../../../_components';
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
  const color = useTheme();

  const edit = useBoolean();

  const { alert } = useCustomAlert();

  const { user } = useAuthContext();
  const userDetails = user as IUserItem;

  const AccountSettingsSchema = Yup.object().shape({
    addressLine1: Yup.string().required('Address line is required'),
    addressLine2: Yup.string().required('Barangay is required'),
    addressLine3: Yup.string().required('City or municipality is required'),
    addressLine4: Yup.string().required('Province is required'),
  });

  const defaultValues = useMemo(
    () => ({
      addressLine1: userDetails?.addressLine1 || '',
      addressLine2: userDetails?.addressLine2 || '',
      addressLine3: userDetails?.addressLine3 || '',
      addressLine4: userDetails?.addressLine4 || '',
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
              title="Address"
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
    padding: Spacing.four,
    flexDirection: 'column',
    gap: Spacing.four,
  },
});
