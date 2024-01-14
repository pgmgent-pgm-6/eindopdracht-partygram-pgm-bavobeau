import { Variables } from '@style';
import { useRouter } from 'expo-router';
import React from 'react'
import { Image, Pressable, StyleSheet } from 'react-native';

type Props = {
  user_id: string;
  story_id: number;
};

const Story = ({user_id,story_id}: Props) => {
  const router = useRouter();

  const handleShowStory = () => {
    router.push(`/stories/${story_id}`);
  }

  return (
    <Pressable style={styles.press} accessibilityLabel="story from" onPress={handleShowStory}>
      <Image style={styles.story} source={require("@assets/images/favicon.png")} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  press: {
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: Variables.colors.grayLight,
    marginHorizontal: Variables.sizes.xs,
    justifyContent: "center",
    alignItems: "center",
  },
  story: {
    width: 64,
    height: 64,
    borderRadius: 64,
    borderWidth: 3,
    borderColor: Variables.colors.secondary,
    marginHorizontal: 8,
  },
});

export default Story;