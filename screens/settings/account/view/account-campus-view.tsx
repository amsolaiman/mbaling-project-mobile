import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
// @expo
import { router } from 'expo-router';
// hooks
import { useAuthContext } from '@/auth/hooks';
import { useColorScheme } from '@/hooks/use-color-scheme';
// utils
import axios, { API_ENDPOINTS } from '@/utils/axios';
// types
import { StudentHousingResponse } from '@/types/housing';
// styles
import Colors from '@/styles/constants/Colors';
// components
import FormProvider, { RHFTextField } from '@/components/hook-form';
import InfoBanner from '@/components/info-banner';
import { ThemedKeyboardAvoidingView } from '@/components/themed-native';
import { SettingsHeader } from '@/screens/_components';
// assets
import { IconArrowAlt } from '@/assets/icons';

// ----------------------------------------------------------------------

type FormValuesProps = {
  housingName: string;
};

export default function SettingsAccountCampusView() {
  const colorScheme = useColorScheme() ?? 'light';

  const { user } = useAuthContext();

  const defaultValues = {
    housingName: '',
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { setValue } = methods;

  const getData = useCallback(async () => {
    try {
      if (!!user?.studentDetails.housingId) {
        const response = await axios.get(API_ENDPOINTS.student.housing(user?.id));

        const _data: StudentHousingResponse = response.data;

        setValue('housingName', _data?.housingDetails.housingName);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user?.studentDetails.housingId, user?.id, setValue]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <FormProvider methods={methods}>
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
                    color={Colors[colorScheme].text}
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

              {!user?.studentDetails.housingId && (
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
    padding: 16,
    flexDirection: 'column',
    gap: 24,
  },
});
