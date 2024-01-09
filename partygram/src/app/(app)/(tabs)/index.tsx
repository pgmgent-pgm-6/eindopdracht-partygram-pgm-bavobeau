import Header from "@design/Header/Header";
import Text from "@design/Text/Text";
import DefaultView from "@design/View/DefaultView";
import { Variables } from "@style";
import { useNavigation } from "expo-router";
import { StyleSheet } from "react-native";

const LogScreen = () => {
  const navigation = useNavigation();

  return (
    <DefaultView style={styles.container} padding={false}>
      <Header title="Partygram" icon="message-outline" iconTitle="messages" iconOnPress={() => {}} />
      <Text style={styles.title}>Home</Text>
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Variables.sizes.xl,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default LogScreen;