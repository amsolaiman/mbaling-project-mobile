import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
// @expo
import { useFocusEffect } from 'expo-router';
// hooks
import { useAuthContext } from '@/auth/hooks';
import { useBoolean } from '@/hooks/use-boolean';
// components
import Button from '@/components/button';
import FormProvider, { RHFTextField } from '@/components/hook-form';
import InfoBanner from '@/components/info-banner';
import SpinnerOverlay from '@/components/spinner-overlay';

// ----------------------------------------------------------------------

export default function AccountLandlordSetup() {
  const { user } = useAuthContext();

  return (
    <View style={styles.container}>
      <LinkForm type="chat" link={user?.housingDetails.chatLink} />

      <LinkForm type="map" link={user?.housingDetails.mapLink} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
  },
});

// ----------------------------------------------------------------------

type FormValuesProps = {
  input: string | null | undefined;
};

type LinkFormProps = {
  link?: string | null;
  type: 'chat' | 'map';
};

function LinkForm({ link = null, type }: LinkFormProps) {
  const isChatType = type === 'chat';

  const enable = useBoolean();

  const defaultValues = useMemo(
    () => ({
      input: link ?? null,
    }),
    [link]
  );

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset({ input: link ?? null });
  }, [reset, link]);

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        enable.onFalse();
        console.info('DATA', data);
      } catch (error) {
        console.error(error);
      }
    },
    [enable]
  );

  const handlePress = useCallback(async () => {
    if (!enable.value) {
      enable.onTrue();
      return;
    }

    handleSubmit(onSubmit)();
  }, [enable, handleSubmit, onSubmit]);

  useFocusEffect(
    useCallback(
      () => {
        reset(defaultValues);
        enable.onFalse();

        return () => {};
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [link]
    )
  );

  return (
    <>
      <SpinnerOverlay state={isSubmitting} caption="Updating..." />

      <FormProvider methods={methods}>
        <View style={formStyles.container}>
          <InfoBanner
            title={`Set ${type} link`}
            caption={`Please input below your ${
              isChatType ? 'Facebook Messenger' : 'Google Map'
            } link to connect it with your account.`}
            instruction="Click the icon on the right for tutorial."
          />

          <RHFTextField
            name="input"
            placeholder="Enter link..."
            disabled={!enable.value}
            dense
            style={{ backgroundColor: 'transparent' }}
          />

          <Button
            dense
            onPress={handlePress}
            mode={enable.value ? 'contained' : 'outlined'}
            style={formStyles.button}
          >
            {enable.value ? 'Save' : 'Edit'}
          </Button>
        </View>
      </FormProvider>
    </>
  );
}

const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
  },
  button: {
    minWidth: 90,
    alignSelf: 'flex-end',
  },
});
