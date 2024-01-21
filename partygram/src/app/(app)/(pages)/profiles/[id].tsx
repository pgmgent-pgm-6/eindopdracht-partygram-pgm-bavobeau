import useTitle from "@core/hooks/useTitle";
import { getPostsByUser } from "@core/modules/posts/api";
import { Post } from "@core/modules/posts/types";
import { getProfileById } from "@core/modules/profiles/api";
import Button from "@design/Button/Button";
import LoadingIndicator from "@design/LoadingIndicator";
import SmallPost from "@design/Posts/SmallPost";
import ErrorMessage from "@design/Text/ErrorMessage";
import CenteredView from "@design/View/CenteredView";
import DefaultView from "@design/View/DefaultView";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import DataListView from "@shared/Data/DataListView";
import UserHeader from "@shared/User/UserHeader";
import { Variables } from "@style";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

const ProfileDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuthContext();
  const router = useRouter();
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfileById(id),
  });

  if (id === user?.id) {
    router.push("/profile");
  }

  if (isLoading) {
    return (
      <CenteredView>
        <LoadingIndicator />
      </CenteredView>
    );
  }

  if (isError) {
    return (
      <CenteredView>
        <ErrorMessage error={error} />
      </CenteredView>
    );
  }

  if (!profile) {
    return (
      <CenteredView>
        <ErrorMessage error="Profile not found" />
      </CenteredView>
    );
  };

  useTitle(profile.username);

  return (
    <DefaultView vertical={false}>
      <UserHeader
        profile={profile}
        onPress={() => {}}
        imageStyle={styles.userHeader}
        editable={false}
      />
      <Button onPress={() => router.push(`/threads/${profile.id}`)}>
        message
      </Button>
      <DefaultView>
        <DataListView
          name={["posts", profile.id]}
          method={() => getPostsByUser(profile.id)}
          renderItem={({ item: post }: { item: Post }) => (
            <SmallPost post={post} />
          )}
          emptyDescription="This user has no posts yet"
          numColumns={3}
        />
      </DefaultView>
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Variables.sizes.medium,
  },
  userHeader: {
    width: Variables.sizes.xxxxl * 2,
    height: Variables.sizes.xxxxl * 2,
  },
});

export default ProfileDetailScreen;
