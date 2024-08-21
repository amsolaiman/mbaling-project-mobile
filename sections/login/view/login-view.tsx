import * as Yup from "yup";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
// @expo
import { router } from "expo-router";
// @paper
import { Button } from "react-native-paper";
// theme
import Fonts from "@/theme/Fonts";
import Colors from "@/theme/Colors";
// components
import FormProvider from "@/components/hook-form";
import { View } from "@/theme/Components";
import { LogoVertical } from "@/components/logo";
//
import LoginFootnote from "../login-footnote";
import LoginInputField from "../login-input-field";
import SpinnerOverlay from "@/components/spinner-overlay";

// ----------------------------------------------------------------------

type FormValuesProps = {
  username: string;
  password: string;
};

export default function LoginView() {
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  const defaultValues = useMemo(
    () => ({
      username: "",
      password: "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
        await new Promise((resolve) => setTimeout(resolve, 500));
        reset();
        router.push("/(main)/home");
        console.info("DATA", data);
      } catch (error) {
        console.error(error);
      }
    },
    [reset, router]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <View
        style={styles.container}
        loadingState={isSubmitting}
        loadingCaption="Logging in..."
      >
        <LogoVertical disabledLink color="dark" style={styles.logo} />

        <LoginInputField name="username" label="username" />

        <LoginInputField name="password" label="password" secureTextEntry />

        <Button
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          //
          uppercase={false}
          buttonColor="#fff"
          textColor={Colors.primary}
          labelStyle={{
            marginVertical: 6,
          }}
        >
          <Text style={{ ...Fonts[600] }}>log-in</Text>
        </Button>

        <LoginFootnote />
      </View>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  logo: {
    marginBottom: 48,
    alignSelf: "center",
  },
  button: {
    marginTop: 20,
    width: 110,
    alignSelf: "center",
    borderRadius: 50,
  },
});
