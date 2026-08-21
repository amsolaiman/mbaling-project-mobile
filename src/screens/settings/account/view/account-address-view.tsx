/* eslint-disable no-console */

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';

// auth
import { useAuthContext } from '@/auth/hooks';
// components
import {
  ThemedKeyboardAvoidingView,
  ThemedView,
} from '@/components/themed-native';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// styles
import { Spacing } from '@/styles';
// types
import { IUserItem } from '@/types/users';

//
import SettingsActionHeader from '../../settings-action-header';
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
  const edit = useBoolean();

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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.info('DATA', data);
    } catch (error) {
      const message =
        typeof error === 'string' ? error : (error as Error).message;
      console.error(message);
    }
  }, []);

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
              title="Address"
              isEdit={edit.value}
              onEdit={edit.onTrue}
              onSubmit={handleSubmit(onSubmit)}
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
