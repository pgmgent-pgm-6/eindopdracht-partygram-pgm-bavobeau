import { useAuthContext } from "@shared/Auth/AuthProvider";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const AppLayout = () => {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
};

export default AppLayout;