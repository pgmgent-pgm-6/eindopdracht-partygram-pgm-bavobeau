import Header from "@design/Header/Header";
import StoriesList from "@design/Stories/StoriesList";
import Text from "@design/Text/Text";
import DefaultView from "@design/View/DefaultView";
import { StyleSheet } from "react-native";

const LogScreen = () => {
  return (
    <>
      <DefaultView style={styles.container} >
      <Header title="Partygram" icon="message-outline" iconTitle="messages" iconOnPress={() => {}} style={styles.header} />
      <StoriesList />
      <Text style={styles.title}>Home</Text>
      </DefaultView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  header: {
    backgroundColor: "",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default LogScreen;