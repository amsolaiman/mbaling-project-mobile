import { router } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// assets
import { IconArrowAlt } from '@/assets/icons';
// auth
import { useAuthContext } from '@/auth/hooks';
// components
import { RHFTextField } from '@/components/hook-form';
import InfoBanner from '@/components/info-banner';
import { ThemedKeyboardAvoidingView } from '@/components/themed-native';
// hooks
import { useTheme } from '@/hooks/use-theme';
// styles
import { Spacing } from '@/styles';
// types
import { StudentHousingResponse } from '@/types/housing';
import { UserStudentResponse } from '@/types/users';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';

import { SettingsHeader } from '../../../_components';

// ----------------------------------------------------------------------

type FormValuesProps = {
  housingName: string;
};

export default function SettingsAccountCampusView() {
  const color = useTheme();

  const { user } = useAuthContext();
  const userDetails = user as UserStudentResponse;
  const housingId = userDetails?.details?.housingId;
  const userId = userDetails?.id;

  const defaultValues = {
    housingName: '',
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { setValue } = methods;

  const getData = useCallback(async () => {
    try {
      if (housingId) {
        const response = await axios.get(API_ENDPOINTS.student.housing(userId));
        const data: StudentHousingResponse = response.data;

        setValue('housingName', data?.details?.housingName);
      }
    } catch {
      return;
    }
  }, [housingId, userId, setValue]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <FormProvider {...methods}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ThemedKeyboardAvoidingView>
          <View style={styles.container}>
            <SettingsHeader
              title="Campus housing"
              actionLeft={
                <Pressable onPress={router.back}>
                  <IconArrowAlt
                    direction="left"
                    variant="outline"
                    size={24}
                    color={color.text}
                  />
                </Pressable>
              }
            />

            <View style={styles.formContainer}>
              <RHFTextField
                name="housingName"
                label="Set campus address"
                //
                mode="flat"
                disabled
              />

              {!userDetails?.details?.housingId && (
                <InfoBanner
                  title="Set your campus housing"
                  caption="Please ensure your application is approved to set your campus housing address."
                  instruction="Go to your landlord profile > click Apply."
                />
              )}
            </View>
          </View>
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
    flexGrow: 1,
    padding: Spacing.four,
    flexDirection: 'column',
    gap: Spacing.five,
  },
});
