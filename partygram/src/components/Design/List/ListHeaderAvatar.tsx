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
          <View style={styles.containerInfo}>
            <View style={styles.data}>
              <Text style={styles.text}>{posts && posts > 0 ? String(posts) : "0"}</Text>
              <Text style={styles.text}>posts</Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>{stories && stories > 0 ? String(stories) : "0"}</Text>
              <Text style={styles.text}>stories</Text>
            </View>
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
    paddingLeft: Variables.sizes.xxl,
    flex: 1,
  },
  containerInfo: {
    gap: Variables.sizes.xxl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  data: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: Variables.sizes.medium,
    color: Variables.colors.text,
  }
});

export default ListHeaderAvatar;