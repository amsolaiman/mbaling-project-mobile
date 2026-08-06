import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';

// components
import Logo from '@/components/logo';
import {
  ThemedKeyboardAvoidingView,
  ThemedView,
} from '@/components/themed-native';
// constants
import { COLOR_PRIMARY, COMMON_COLORS } from '@/constants/theme';

//
import LoginFootnote from '../login-footnote';
import LoginInputField from '../login-input-field';

// ----------------------------------------------------------------------

type FormValuesProps = {
  username: string;
  password: string;
};

export default function LoginView() {
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    username: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        reset();
        router.replace('/');
        // eslint-disable-next-line no-console
        console.info('DATA', data);
      } catch (error: Error | unknown) {
        const message =
          typeof error === 'string' ? error : (error as Error).message;

        alert(message);
        throw new Error(message);
      }
    },
    [reset]
  );

  return (
    <FormProvider {...methods}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ThemedKeyboardAvoidingView>
          <ThemedView
            style={styles.container}
            loadingState={isSubmitting}
            loadingCaption="Logging in..."
          >
            <View style={styles.logo}>
              <Logo disabledLink variant="vertical" color="light" />
            </View>

            <LoginInputField name="username" label="username" />

            <LoginInputField name="password" label="password" secureTextEntry />

            <Button
              onPress={handleSubmit(onSubmit)}
              style={styles.button}
              //
              buttonColor={COMMON_COLORS.white.main}
              textColor={COLOR_PRIMARY}
              labelStyle={styles.label}
            >
              log-in
            </Button>

            <LoginFootnote />
          </ThemedView>
        </ThemedKeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: COLOR_PRIMARY,
  },
  logo: {
    marginBottom: 48,
    alignSelf: 'center',
  },
  button: {
    marginTop: 16,
    width: 100,
    alignSelf: 'center',
    borderRadius: 50,
  },
  label: {
    marginVertical: 6,
    marginHorizontal: 12,
  },
});
