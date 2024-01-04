import Text from "@design/Text/Text";
import { StyleSheet, View } from "react-native";

const LogScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home screen</Text>
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

export default LogScreen;