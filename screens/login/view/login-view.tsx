import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';
// @expo
import { router } from 'expo-router';
// auth
import { useAuthContext } from '@/auth/hooks';
// styles
import Colors from '@/styles/constants/Colors';
// components
import FormProvider from '@/components/hook-form';
import Logo from '@/components/logo';
import { ThemedKeyboardAvoidingView, ThemedView } from '@/components/themed-native';
//
import LoginFootnote from '../login-footnote';
import LoginInputField from '../login-input-field';

// ----------------------------------------------------------------------

type FormValuesProps = {
  username: string;
  password: string;
};

export default function LoginView() {
  const { login } = useAuthContext();

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
        await login?.(data.username, data.password);
        reset();
        router.replace('/');
        console.info('DATA', data);
      } catch (error: any) {
        const message = typeof error === 'string' ? error : error.message;

        alert(message);
        console.error(message);
      }
    },
    [login, reset]
  );

  return (
    <FormProvider methods={methods}>
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
              buttonColor={Colors.common.white.main}
              textColor={Colors.primary}
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
    backgroundColor: Colors.primary,
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
