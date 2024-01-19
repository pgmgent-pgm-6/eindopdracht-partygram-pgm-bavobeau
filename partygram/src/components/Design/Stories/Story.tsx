import { getProfileById } from '@core/modules/profiles/api';
import { getAvatarUrl } from '@core/modules/profiles/utils';
import { Variables } from '@style';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import ImageAvatar from '@design/Avatar/ImageAvatar';
import TextAvatar from '@design/Avatar/TextAvatar';
import { Profile } from '@core/modules/profiles/types';

type Props = {
  user_id: string;
};

const Story = ({ user_id }: Props) => {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>();

  // get profile and avatar from user_id
  useEffect(() => {
    if (user_id) {
      getProfileById(user_id).then((profile) => setProfile(profile));
    }
  }, [user_id]);

  const avatarUrl = getAvatarUrl(profile);

  const handleShowStory = () => {
    router.push(`/stories/${user_id}`);
  }

  if (!profile) {
    return;
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