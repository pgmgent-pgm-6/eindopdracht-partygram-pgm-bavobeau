import { StyleSheet, View } from "react-native";
import Header from "@design/Header/Header";
import { useRouter } from "expo-router";
import UserHeader from "@shared/User/UserHeader";
import DefaultView from "@design/View/DefaultView";

const ProfilePage = () => {
  const router = useRouter();

  return (
    <DefaultView style={styles.container} >
      <Header
        title="Profile"
        icon="cog"
        iconTitle="settings"
        iconOnPress={() => router.push("/profile/settings")}
      />
      <UserHeader onPress={() => router.push("/profile/edit")} />      
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ProfilePage;
