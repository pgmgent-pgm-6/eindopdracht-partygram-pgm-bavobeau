import { Post } from "@core/modules/posts/types";
import { Pressable, StyleSheet } from "react-native";
import PostImage from "./PostImage";
import { getPostImageUrl } from "@core/modules/posts/utils";
import { useRouter } from "expo-router";

type Props = {
  post: Post;
};

const SmallPost = ({ post }: Props) => {
  const router = useRouter();

  if (!post) {
    return null;
  }

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        router.push(`/posts/${post.id}`);
      }}
    >
      <PostImage source={{ uri: getPostImageUrl(post) }} />
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
