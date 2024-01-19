import { Post } from "@core/modules/posts/types";
import { Pressable, StyleSheet } from "react-native";
import PostImage from "./PostImage";
import { getPostImageUrl } from "@core/modules/posts/utils";
import { useRouter } from "expo-router";
import LoadingIndicator from "@design/LoadingIndicator";
import CenteredView from "@design/View/CenteredView";

type Props = {
  post: Post;
};

const SmallPost = ({ post }: Props) => {
  const router = useRouter();
  const imageUrl = getPostImageUrl(post);

  if (!post) {
    return null;
  }

  if (!imageUrl) {
    return (
      <CenteredView style={styles.container}>
        <LoadingIndicator />
      </CenteredView>
    )
  }

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        router.push(`/posts/${post.id}`);
      }}
    >
      <PostImage source={{ uri: imageUrl }} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "33.33%",
    aspectRatio: 1,
  },
});

export default SmallPost;
