import StoryButton from "./StoryButton";
import Story from "./Story";
import { getLastStoriesFromLastDay } from "@core/modules/stories/api";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Variables } from "@style";
import { StoriesOwners } from "@core/modules/stories/types";

const StoriesList = () => {
  const router = useRouter();
  const [stories, setStories] = useState<StoriesOwners>([]);
  const [storiesToShow, setStoriesToShow] = useState(10);

  useEffect(() => {
    // get stories and refresh every 10 seconds
    const interval = setInterval(() => {
      getLastStoriesFromLastDay().then((stories) => setStories(stories));
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  

  const handleCreateStory = () => {
    router.push("/stories/create");
  }

  if (stories.length == 0) return (
    <View style={styles.container}>
      <StoryButton title="Add Story" icon="plus" onPress={handleCreateStory} />
      <Text>No stories found</Text>
    </View>
  )
  
  const showNextStories = () => {
    setStoriesToShow((prevCount) => prevCount + 10);
  };

  const visibleStories = stories.slice(0, storiesToShow);

  return (
    <View style={styles.container}>
      <StoryButton title="Add Story" icon="plus" onPress={handleCreateStory} />
      <FlatList
        data={visibleStories}
        renderItem={({ item }) => <Story user_id={item.owner_id} story_id={item.id} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
      />
      {stories.length > storiesToShow && (
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
