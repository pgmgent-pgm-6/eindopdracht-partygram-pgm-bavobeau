import Text from "@design/Text/Text";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native"

type Props = {
  owner_id: string;
  username: string;
};

const Username = ({owner_id, username}: Props) => {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push(`/profile/${owner_id}`)}>
      <Text style={styles.username}>{username}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  username: {
    fontWeight: "bold",
  },
});

export default Username;