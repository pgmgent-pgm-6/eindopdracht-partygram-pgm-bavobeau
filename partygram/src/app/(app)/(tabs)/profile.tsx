import { StyleSheet, View } from "react-native";
import Header from "@design/Header/Header";
import { useRouter } from "expo-router";
import UserHeader from "@shared/User/UserHeader";
import DefaultView from "@design/View/DefaultView";
import { Profile } from "@core/modules/profiles/types";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import { getProfileById } from "@core/modules/profiles/api";
import { getPostsByUser } from "@core/modules/posts/api";
import { Posts } from "@core/modules/posts/types";
import { Stories } from "@core/modules/stories/types";
import { getStoriesByUserId } from "@core/modules/stories/api";
import { Variables } from "@style";
import LoadingIndicator from "@design/LoadingIndicator";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "@design/Text/ErrorMessage";

const ProfilePage = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  if (!user) {
    return <LoadingIndicator />;
  }

  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ["profile", user.id],
    queryFn: () => getProfileById(user.id),
  });
  const { data: posts, isLoading: postsIsLoading, isError: postsIsError } = useQuery({
    queryKey: ["posts", user.id],
    queryFn: () => getPostsByUser(user.id),
  });
  const { data: stories, isLoading: storiesIsLoading, isError: storiesIsError } = useQuery({
    queryKey: ["stories", user.id],
    queryFn: () => getStoriesByUserId(user.id),
  });

  if (isLoading || postsIsLoading || storiesIsLoading) {
    return <LoadingIndicator />;
  }

  if (isError || postsIsError || storiesIsError) {
    return <ErrorMessage error="Something went wrong" />;
  }

  if (!profile) {
    return <ErrorMessage error="Profile does not exist" />;
  }

  if (!posts) {
    return <ErrorMessage error="Posts do not exist" />;
  }

  if (!stories) {
    return <ErrorMessage error="Stories do not exist" />;
  }

  return (
    <DefaultView style={styles.container}>
      <Header
        title={`${profile.username}`}
        icon="cog"
        iconTitle="settings"
        iconOnPress={() => router.push("/profiles/settings")}
      />
      <UserHeader
        onPress={() => router.push("/profiles/edit")}
        imageStyle={styles.userHeader}
        profile={profile}
        totalPosts={posts.length}
        totalStories={stories.length}
      />
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  container: {},
  userHeader: {
    width: Variables.sizes.xxxxl * 2,
    height: Variables.sizes.xxxxl * 2,
  },
});

export default ProfilePage;
