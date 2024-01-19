import StoryButton from "./StoryButton";
import Story from "./Story";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Variables } from "@style";
import { getOwnerIdFromStoryToday } from "@core/modules/stories/api";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "@design/LoadingIndicator";

const StoriesList = () => {
  const router = useRouter();
  const [storiesToShow, setStoriesToShow] = useState(10);
  const { data: owners, isLoading, isError } = useQuery({
    queryKey: ["stories"],
    queryFn: () => getOwnerIdFromStoryToday(),
    refetchInterval: 2000,
  });
  
  const handleCreateStory = () => {
    router.push("/stories/create");
  }

  if (isLoading) return (
    <View style={styles.container}>
      <StoryButton title="Add Story" icon="plus" onPress={handleCreateStory} />
      <LoadingIndicator />
    </View>
  );

  if (isError) return (
    <View style={styles.container}>
      <StoryButton title="Add Story" icon="plus" onPress={handleCreateStory} />
      <Text>Something went wrong</Text>
    </View>
  );

  if (!owners) return (
    <View style={styles.container}>
      <StoryButton title="Add Story" icon="plus" onPress={handleCreateStory} />
      <Text>No stories found</Text>
    </View>
  );
  
  const showNextStories = () => {
    setStoriesToShow((prevCount) => prevCount + 10);
  };

  const visibleStories = owners.slice(0, storiesToShow);

  return (
    <View style={styles.container}>
      <StoryButton title="Add Story" icon="plus" onPress={handleCreateStory} />
      <FlatList
        data={visibleStories}
        renderItem={({ item }) => <Story user_id={item} />}
        keyExtractor={(item) => item}
        horizontal={true}
      />
      {owners.length > storiesToShow && (
      <StoryButton title="Add Story" icon="dot" onPress={showNextStories} />
      )}
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
