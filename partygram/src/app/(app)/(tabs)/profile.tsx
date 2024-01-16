import { StyleSheet, View } from "react-native";
import Header from "@design/Header/Header";
import { useRouter } from "expo-router";
import UserHeader from "@shared/User/UserHeader";
import DefaultView from "@design/View/DefaultView";
import { Profile } from "@core/modules/profiles/types";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import { getProfileById } from "@core/modules/profiles/api";
import { useEffect, useState } from "react";
import { getPostsByUser } from "@core/modules/posts/api";
import { Posts } from "@core/modules/posts/types";
import { Stories } from "@core/modules/stories/types";
import { getStoriesByUser } from "@core/modules/stories/api";
import { Variables } from "@style";

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile>();
  const [posts, setPosts] = useState<Posts>([]);
  const [stories, setStories] = useState<Stories>([]);
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    // get profile, posts and stories and refresh every 10 seconds
    const interval = setInterval(() => {
      if (user) {
        getProfileById(user.id).then((profile) => setProfile(profile));
        getPostsByUser(user.id).then((posts) => setPosts(posts));
        getStoriesByUser(user.id).then((stories) => setStories(stories));
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [user]);

  if (!user || !profile) {
    return null;
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
