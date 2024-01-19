import StoryButton from "./StoryButton";
import Story from "./Story";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Variables } from "@style";
import { getOwnerIdFromStoryToday } from "@core/modules/stories/api";
import DataListView from "@shared/Data/DataListView";

const StoriesList = () => {
  const router = useRouter();
  
  const handleCreateStory = () => {
    router.push("/stories/create");
  }

  return (
    <View style={styles.container}>
      <StoryButton title="Add Story" icon="plus" onPress={handleCreateStory} />
      <DataListView
        method={getOwnerIdFromStoryToday}
        name={["stories"]}
        emptyTitle="No stories"
        emptyDescription="There are no stories yet"
        emptyIcon="image"
        onAddItem={handleCreateStory}
        horizontal={true}
        renderItem={({ item }) => <Story user_id={item.owner_id} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: Variables.sizes.small,
    marginHorizontal: Variables.sizes.small,
  },
});

export default StoriesList;
