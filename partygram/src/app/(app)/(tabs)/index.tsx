import Header from "@design/Header/Header";
import StoriesList from "@design/Stories/StoriesList";
import Text from "@design/Text/Text";
import DefaultView from "@design/View/DefaultView";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

const LogScreen = () => {
  const router = useRouter();

  return (
    <>
      <DefaultView style={styles.container} >
      <Header title="Partygram" icon="message-outline" iconTitle="messages" iconOnPress={() => router.push("/threads/")} style={styles.header} iconMiddle="plus" iconMiddleTitle="Create post" iconMiddleOnPress={() =>  router.push("/posts/create")} />
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