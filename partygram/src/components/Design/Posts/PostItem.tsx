import { Post } from "@core/modules/posts/types"
import { StyleSheet, View } from "react-native"
import PostTitle from "./PostTitle"
import { Profile } from "@core/modules/profiles/types"
import { useEffect, useState } from "react"
import { getProfileById } from "@core/modules/profiles/api"
import { getPostImageUrl } from "@core/modules/posts/utils"
import PostImage from "./PostImage"
import Text from "@design/Text/Text"
import { Variables } from "@style"
import PostButtons from "./PostButtons"
import PostComments from "./PostComments"

type Props = {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  const [profile, setProfile] = useState<Profile>();
  const imageUrl = getPostImageUrl(post);

  useEffect(() => {
    getProfileById(post.owner_id).then((res) => {
      setProfile(res);
    });
  }, []);

  // Function to format day and month from a Date object
  const formatDayAndMonth = (date: Date): string => {
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}`;
  };

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      {!imageUrl ? (
        <PostImage source={require("@assets/images/icon.png")} />
      ):(
        <PostImage source={{ uri: imageUrl }} />
      )}
      </View>
      <View style={styles.infoContainer}>
        <PostButtons />
        <View style={styles.dataContainer}>
          {!post.total_likes ? (
            <Text style={styles.textLikes}>0 likes</Text>
          ) : (
            <Text style={styles.textLikes}>{post.total_likes == 1 ? `${post.total_likes.toString()} like` : `${post.total_likes.toString()} likes` }</Text>
          )}
          <Text>
            {formatDayAndMonth(new Date(post.created_at))}
          </Text>
        </View>
        <PostTitle owner_id={post.owner_id} username={profile!.username} description={post.description} />
        <PostComments />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Variables.sizes.small,
    width: "100%",
  },
  imageContainer: {
    width: "100%",
    height: 250,
  },
  infoContainer: {
    paddingHorizontal: Variables.sizes.horizontalPadding,
    paddingVertical: Variables.sizes.small,
    flexDirection: "column",
    flex: 1,
    gap: Variables.sizes.xxs,
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textLikes: {
    fontWeight: "bold",
  }
});

export default PostItem;