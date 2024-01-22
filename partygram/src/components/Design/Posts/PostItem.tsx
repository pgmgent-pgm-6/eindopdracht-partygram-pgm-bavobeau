import { Post } from "@core/modules/posts/types";
import { StyleSheet, View, StyleProp } from "react-native";
import PostTitle from "./PostTitle";
import { Profile } from "@core/modules/profiles/types";
import { useEffect, useState } from "react";
import { getProfileById } from "@core/modules/profiles/api";
import { getPostImageUrl } from "@core/modules/posts/utils";
import PostImage from "./PostImage";
import Text from "@design/Text/Text";
import { Variables } from "@style";
import PostButtons from "./PostButtons";
import PostComments from "./PostComments";
import LoadingIndicator from "@design/LoadingIndicator";
import CenteredView from "@design/View/CenteredView";
import { getData } from "@core/modules/data/api";

type Props = {
  post: Post;
  style?: StyleProp<Object>;
};

const PostItem = ({ post, style }: Props) => {
  const [profile, setProfile] = useState<Profile>();
  const [likes, setLikes] = useState<boolean>(true);
  const imageUrl = getPostImageUrl(post);

  useEffect(() => {
    getData().then((res) => {
      if (!res) {
        setLikes(true);
      }
      setLikes(res.likes);
    });
  }, []);

  useEffect(() => {
    getProfileById(post.owner_id).then((res) => {
      setProfile(res);
    });
  }, []);

  // Function to format day and month from a Date object
  const formatDayAndMonth = (date: Date): string => {
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    return `${day < 10 ? "0" : ""}${day}/${month < 10 ? "0" : ""}${month}`;
  };

  if (!profile) {
    return (
      <CenteredView style={styles.container}>
        <LoadingIndicator />
      </CenteredView>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        {!imageUrl ? (
          <PostImage source={require("@assets/images/icon.png")} />
        ) : (
          <PostImage source={{ uri: imageUrl }} />
        )}
      </View>
      <View style={styles.infoContainer}>
        <PostButtons id={post.id} />
        <View style={styles.dataContainer}>
          {likes ? (
            <>
              {!post.total_likes ? (
                <Text style={styles.textLikes}>0 likes</Text>
              ) : (
                <Text style={styles.textLikes}>
                  {post.total_likes === 1
                    ? `${post.total_likes.toString()} like`
                    : `${post.total_likes.toString()} likes`}
                </Text>
              )}
            </>
          ):(
            <View></View>
          )}
          <Text>{formatDayAndMonth(new Date(post.created_at))}</Text>
        </View>
        <PostTitle owner_id={post.owner_id} description={post.description} />
        <PostComments id={post.id} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  imageContainer: {
    width: "100%",
    height: 250,
  },
  infoContainer: {
    paddingHorizontal: Variables.sizes.horizontalPadding,
    paddingVertical: Variables.sizes.small,
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
  },
});

export default PostItem;
