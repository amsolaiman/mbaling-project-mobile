/* eslint-disable no-console */

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Yup from 'yup';

// auth
import { useAuthContext } from '@/auth/hooks';
// components
import { RHFTextField } from '@/components/hook-form';
import {
  ThemedKeyboardAvoidingView,
  ThemedView,
} from '@/components/themed-native';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// styles
import { Spacing } from '@/styles';
// types
import { UserLandlordResponse } from '@/types/users';

//
import SettingsActionHeader from '../../settings-action-header';

// ----------------------------------------------------------------------

type FormValuesProps = {
  housingName: string;
};

export default function SettingsAccountHousingView() {
  const edit = useBoolean();

  const { user } = useAuthContext();
  const userDetails = user as UserLandlordResponse;

  const AccountSettingsSchema = Yup.object().shape({
    housingName: Yup.string().required('Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      housingName: userDetails?.details?.housingName || '',
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
              title="Housing name"
              isEdit={edit.value}
              onEdit={edit.onTrue}
              onSubmit={handleSubmit(onSubmit)}
            />

            <View style={styles.formContainer}>
              <RHFTextField
                name="housingName"
                label="Enter housing name"
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
