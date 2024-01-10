import { StyleSheet } from "react-native";
import { LoginBody, createUser, login } from "@core/modules/auth/api";
import TextButton from "@design/Button/TextButton";
import Logo from "@design/Logo/Logo";
import ErrorMessage from "@design/Text/ErrorMessage";
import Title from "@design/Text/Title";
import CenteredView from "@design/View/CenteredView";
import AppForm from "@shared/Formik/AppForm";
import AppSubmitButton from "@shared/Formik/AppSubmitButton";
import AppTextField from "@shared/Formik/AppTextField";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import * as yup from "yup";
import { Variables } from "@style";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginScreen = () => {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
  });

  const handleSubmit = (data: LoginBody) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/(app)/(tabs)");
      },
    });
  };

  return (
    <AppForm
      initialValues={{ email: "", password: "" }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <CenteredView style={styles.container}>
        <Logo />
        <Title>Login</Title>
        {isError && <ErrorMessage error={error} />}
        <AppTextField
          label="Email"
          name="email"
          placeholder="john@doe.com"
          autoComplete="email"
          keyboardType="email-address"
          disabled={isPending}
        />
        <AppTextField
          label="Password"
          name="password"
          secureTextEntry
          disabled={isPending}
        />
        <AppSubmitButton disabled={isPending}>Login</AppSubmitButton>
        <TextButton
          style={styles.textButton}
          onPress={() => router.push("/auth/register")}
        >
          Nog geen account? Registreer hier
        </TextButton>
      </CenteredView>
    </AppForm>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Variables.sizes.xxxxl * 2,
  },
  textButton: {
    marginTop: 10,
  },
});

export default LoginScreen;
