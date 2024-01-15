import StoryButton from "./StoryButton";
import Story from "./Story";
import { useQuery } from "@tanstack/react-query";
import { getLastStoriesFromLastDay } from "@core/modules/stories/api";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Variables } from "@style";

const StoriesList = () => {
  const router = useRouter();
  const [storiesToShow, setStoriesToShow] = useState(10);
  const { data, isLoading, error } = useQuery({
    queryFn: getLastStoriesFromLastDay,
    queryKey: ["stories"],
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const handleCreateStory = () => {
    router.push("/stories/create");
  }

  if (!data) return (
    <View style={styles.container}>
      <StoryButton title="Add Story" icon="plus" onPress={handleCreateStory} />
      <Text>No stories found</Text>
    </View>
  )
  
  const showNextStories = () => {
    setStoriesToShow((prevCount) => prevCount + 10);
  };

  const visibleStories = data.slice(0, storiesToShow);

  return (
    <View style={styles.container}>
      <StoryButton title="Add Story" icon="plus" onPress={handleCreateStory} />
      <FlatList
        data={visibleStories}
        renderItem={({ item }) => <Story user_id={item.owner_id} story_id={item.id} />}
        keyExtractor={(item) => item.id}
        horizontal={true}
      />
      {data.length > storiesToShow && (
      <StoryButton title="Add Story" icon="dot" onPress={showNextStories} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: Variables.sizes.medium,
    marginHorizontal: Variables.sizes.small,
  },
});

export default StoriesList;
