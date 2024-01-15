import { Pressable, StyleSheet, View } from "react-native";
import { Variables } from "@style";
import Title from "../Text/Title";
import Text from "@design/Text/Text";

type Props = {
  title: string;
  avatar: React.ReactNode;
  posts?: number;
  stories?: number;
  onPress: () => void;
};

const ListHeaderAvatar = ({ title, avatar, posts, stories, onPress }: Props) => {
  return (
    <Pressable
      style={styles.pressable}
      android_ripple={{ color: Variables.colors.ripple, foreground: true }}
      onPress={onPress}
    >
      <View style={styles.container}>
        {avatar}
        <View style={styles.containerText}>
          <View>
            <Text>{posts && posts > 0 ? String(posts) : "0"}</Text>
            <Text>posts</Text>
            <Text>{stories && stories > 0 ? String(stories) : "0"}</Text>
            <Text>stories</Text>
          </View>
          <Title>{title}</Title>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    marginBottom: Variables.sizes.xxl,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Variables.sizes.horizontalPadding,
    paddingVertical: Variables.sizes.medium,
  },
  containerText: {
    flex: 1,
    marginStart: Variables.sizes.medium,
  },
});

export default ListHeaderAvatar;