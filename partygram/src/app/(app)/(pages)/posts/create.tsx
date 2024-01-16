import useTitle from "@core/hooks/useTitle"
import { createPost } from "@core/modules/posts/api"
import DefaultView from "@design/View/DefaultView"
import PostForm from "@shared/Post/PostForm"
import { useRouter } from "expo-router"

const PostCreatePage = () => {
  const router = useRouter();
  useTitle("Create post");

  return (
    <>
      <DefaultView>
        <PostForm 
          updateMethod={createPost}
          onSucces={() => router.push("/(app)/(tabs)")}
          label="Create post"
          initialValues={{
            description: "",
            location: "",
          }}
        />
      </DefaultView>
    </>
  )
}

export default PostCreatePage