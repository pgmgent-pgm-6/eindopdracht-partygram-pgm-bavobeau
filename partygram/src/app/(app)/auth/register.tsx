import useTitle from "@core/hooks/useTitle";
import { createUser } from "@core/modules/auth/api";
import CenteredView from "@design/View/CenteredView";
import UserForm from "@shared/User/UserForm";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RegisterScreen = () => {
  const router = useRouter();
  useTitle("Create account");

  return (
    <>
      <CenteredView>
        <UserForm
          updateMethod={createUser}
          onSuccess={() => router.push("/(app)/(tabs)")}
          label="Create account"
          initialValues={{
            email: "",
            password: "",
            first_name: "",
            last_name: "",
          }}
        />
      </CenteredView>
      <StatusBar style="light" />
    </>
  );
}

export default RegisterScreen;