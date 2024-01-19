import { Image, StyleSheet, View, Pressable } from "react-native";
import { Story } from "@core/modules/stories/types";
import { getStoryImageUrl } from "@core/modules/stories/utils";

type Props = {
  story: Story;
  left: () => void;
  right: () => void;
}

const StoryCard = ({ story, left, right }: Props) => {
  const imageUrl = getStoryImageUrl(story);
  return (
    <View style={styles.container} >
      <Pressable onPress={left} style={[ styles.buttons, styles.left ]} >
      </Pressable>
        <Image source={{ uri: imageUrl }} resizeMode="cover" style={styles.image} />
      <Pressable onPress={right} style={[ styles.buttons, styles.right ]}>
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttons: {
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "center",
    width: "50%",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
});

export default StoryCard;