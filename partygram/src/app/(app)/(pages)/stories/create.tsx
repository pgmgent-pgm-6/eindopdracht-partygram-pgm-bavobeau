import useTitle from "@core/hooks/useTitle";
import { createStory } from "@core/modules/stories/api";
import DefaultView from "@design/View/DefaultView";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import StoryForm from "@shared/Stories/StoryForm";
import { useRouter } from "expo-router";

const StoriesCreateScreen = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  useTitle("Create story");

  return (
    <DefaultView>
      <StoryForm 
        updateMethod={createStory}
        onSucces={() => router.push("/(app)/(tabs)")}
        label="Create story"
        initialValues={{
          owner_id: user!.id,
          location: "",
          image: "",
        }}
      />
    </DefaultView>
  )
}

export default StoriesCreateScreen;