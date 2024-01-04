import { StyleSheet, View } from "react-native";
import Button from "@design/Button/Button";
import TextField from "@design/Form/TextField";
import Logo from "@design/Logo/Logo";
import Title from "@design/Text/Title";
import { Variables } from "@style";
import DefaultView from "@design/View/DefaultView";
import { useMutation } from "@tanstack/react-query";
import { login } from "@core/modules/auth/api";
import { useState } from "react";
import { useRouter } from "expo-router";
import ErrorMessage from "@design/Text/ErrorMessage";

const LoginScreen = () => {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
  });

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    mutate(data, {
      onSuccess: () => {
        router.push("/(app)/(tabs)/");
      },
    });
  };

  const setDataField = (name: string, value: string) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <DefaultView style={styles.container}>
      <Logo />
      <Title style={styles.title}>Login met je account</Title>
      {isError && <ErrorMessage error={error} />}
      <TextField
        label="Email"
        name="email"
        value={data.email}
        placeholder="john@doe.com"
        autoComplete="email"
        keyboardType="email-address"
        disabled={isPending}
        onChangeText={(text: string) => setDataField("email", text)}
      />
      <TextField
        label="Password"
        name="password"
        value={data.password}
        secureTextEntry={true}
        disabled={isPending}
        onChangeText={(text: string) => setDataField("password", text)}
      />
      <Button onPress={handleSubmit} disabled={isPending} style={styles.button}>
        Login
      </Button>
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Variables.sizes.xxxxl * 2,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: Variables.sizes.medium,
    marginBottom: Variables.sizes.xl,
  },
  button: {
    marginTop: Variables.sizes.xs,
    width: "100%",
  },
});

export default LoginScreen;