import useTitle from "@core/hooks/useTitle";
import { createPost } from "@core/modules/posts/api";
import DefaultView from "@design/View/DefaultView";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import PostForm from "@shared/Post/PostForm";
import { useRouter } from "expo-router";

const PostCreatePage = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  useTitle("Create post");

  return (
    <DefaultView>
      <PostForm
        updateMethod={createPost}
        onSucces={() => router.push("/(app)/(tabs)")}
        label="Create post"
        initialValues={{
          owner_id: user!.id,
          description: "",
          location: "",
          image: "",
        }}
      />
    </DefaultView>
  );
};

export default PostCreatePage;
