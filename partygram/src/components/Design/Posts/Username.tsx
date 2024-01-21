import { getProfileById } from "@core/modules/profiles/api";
import { getAvatarUrl } from "@core/modules/profiles/utils";
import ImageAvatar from "@design/Avatar/ImageAvatar";
import TextAvatar from "@design/Avatar/TextAvatar";
import LoadingIndicator from "@design/LoadingIndicator";
import ErrorMessage from "@design/Text/ErrorMessage";
import Text from "@design/Text/Text";
import { Variables } from "@style";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native"

type Props = {
  id: string;
  showAvatar?: boolean;
};

const Username = ({id, showAvatar = false}: Props) => {
  const router = useRouter();
  const { data: profile, isLoading, isError, error } = useQuery({
    queryFn: () => getProfileById(id),
    queryKey: ["profile", id],
  });
  const avatarUrl = getAvatarUrl(profile);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  if (!profile) {
    return <ErrorMessage error="Profile does not exist" />;
  }

  return (
    <Pressable onPress={() => router.push(`/profiles/${id}`)} style={styles.container}>
      {showAvatar && 
        (!avatarUrl ? (
          <TextAvatar style={styles.avatar}>{`${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`}</TextAvatar>
        ) : (
          <ImageAvatar source={{ uri: avatarUrl }} style={styles.avatar}/>
        ))
      }
      <Text style={styles.username}>{profile.username}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Variables.sizes.xs,
  },
  username: {
    fontFamily: Variables.fonts.bold,
  },
  avatar : {
    width: Variables.sizes.xl,
    height: Variables.sizes.xl,
  }
});

export default Username;