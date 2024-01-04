import { logout } from "@core/modules/auth/api";
import Button from "@design/Button/Button";
import Text from "@design/Text/Text";
import { StyleSheet, View } from "react-native";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Button onPress={() => logout()}>Logout</Button>
      <Text style={styles.title}>Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default SettingsScreen;