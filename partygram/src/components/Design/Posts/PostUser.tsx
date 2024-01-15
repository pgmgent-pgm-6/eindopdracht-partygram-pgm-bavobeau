import Text from "@design/Text/Text";
import { Pressable, StyleSheet } from "react-native"

type Props = {
  owner_id: string;
  username: string;
  onPress?: () => void;
};

const PostUser = ({owner_id, username, onPress}: Props) => {
  return (
    <Pressable>
      <Text style={styles.username}>{username}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  username: {
    fontWeight: "bold",
  },
});

export default PostUser