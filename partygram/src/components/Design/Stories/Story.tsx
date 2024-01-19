import { getProfileById } from '@core/modules/profiles/api';
import { getAvatarUrl } from '@core/modules/profiles/utils';
import { Variables } from '@style';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import ImageAvatar from '@design/Avatar/ImageAvatar';
import TextAvatar from '@design/Avatar/TextAvatar';
import { useQuery } from '@tanstack/react-query';
import Text from '@design/Text/Text';
import ErrorMessage from '@design/Text/ErrorMessage';

type Props = {
  user_id: string;
};

const Story = ({ user_id }: Props) => {
  const router = useRouter();
  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ['profile', user_id],
    queryFn: () => getProfileById(user_id),
  });

  const avatarUrl = getAvatarUrl(profile);

  const handleShowStory = () => {
    router.push(`/stories/${user_id}`);
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <ErrorMessage error="Something went wrong" />;
  }

  if (!profile) {
    return <Text>No profile found</Text>;
  }

  return (
    <Pressable style={styles.press} accessibilityLabel="story from" onPress={handleShowStory}>
      {!avatarUrl ? (
          <TextAvatar style={styles.story}>{`${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`}</TextAvatar>
        ) : (
          <ImageAvatar source={{ uri: avatarUrl }} style={styles.story} />
        )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  press: {
    width: Variables.sizes.xxxxl,
    height: Variables.sizes.xxxxl,
    borderRadius: Variables.sizes.xxxxl,
    backgroundColor: Variables.colors.grayLight,
    marginHorizontal: Variables.sizes.xxs,
    justifyContent: "center",
    alignItems: "center",
  },
  story: {
    borderRadius: Variables.sizes.xxxxl,
    borderWidth: 3,
    borderColor: Variables.colors.secondary,
    marginHorizontal: 8,
  },
});

export default Story;