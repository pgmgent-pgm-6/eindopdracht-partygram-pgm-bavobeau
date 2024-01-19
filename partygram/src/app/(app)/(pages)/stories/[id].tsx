import useTitle from "@core/hooks/useTitle";
import { getProfileById } from "@core/modules/profiles/api";
import { getStoriesByUserIdFromToday } from "@core/modules/stories/api";
import { Story } from "@core/modules/stories/types";
import LoadingIndicator from "@design/LoadingIndicator";
import StoryCard from "@design/Stories/StoryCard";
import Text from "@design/Text/Text";
import DefaultView from "@design/View/DefaultView";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

const StoryDetailPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeStory, setActiveStory] = useState<Story>();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfileById(id),
  });
  const {
    data: stories,
    isLoading: storyIsLoading,
    isError: storyIsError,
  } = useQuery({
    queryKey: ["story", id],
    queryFn: () => getStoriesByUserIdFromToday(id),
  });

  useTitle(user ? `Story from ${user.username}` : null);

  useEffect(() => {
    if (user && stories && stories.length > 0) {
      setActiveStory(stories[0]);
    }
  }, [user, stories]);

  if (!stories || stories.length === 0) return <Text>No stories found</Text>;

  if (isLoading || storyIsLoading) return <LoadingIndicator />;

  if (isError || storyIsError) return <Text>Something went wrong</Text>;
  
  const handleLeftPress = () => {
    if (activeStory) {
      const index = stories.indexOf(activeStory);
      if (index > 0) {
        setActiveStory(stories[index - 1]);
      }
    }
  };

  const handleRightPress = () => {
    if (activeStory) {
      const index = stories.indexOf(activeStory);
      if (index < stories.length - 1) {
        setActiveStory(stories[index + 1]);
      } else {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleRightPress();

    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [handleRightPress, handleLeftPress]); 

  return (
    <DefaultView vertical={false}>
      {activeStory && <StoryCard story={activeStory} left={handleLeftPress} right={handleRightPress} />}
    </DefaultView>
  );
};

export default StoryDetailPage;
