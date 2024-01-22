import { ThreadsWithRelations } from "@core/modules/threads/types";
import { Pressable, View, StyleSheet } from "react-native";
import Text from "../Text/Text";
import Avatar from "@shared/User/Avatar";
import { useRouter } from "expo-router";
import { Variables } from "@style";

type Props = {
  thread: ThreadsWithRelations;
  owner_id: string;
};

const ThreadInfo = ({ thread, owner_id }: Props) => {
  const router = useRouter();
  return (
    <View>
      {thread.owner_id.id === owner_id ? (
        <Pressable style={styles.container} onPress={() => router.push(`/threads/${thread.receiver_id.id}`)}>
          <Avatar profile={thread.receiver_id} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{thread.receiver_id.username}</Text>
            <Text>{thread.message}</Text>
          </View>
        </Pressable>
      ) : (
        <Pressable style={styles.container} onPress={() => router.push(`/threads/${thread.owner_id.id}`)}>
          <Avatar profile={thread.owner_id} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{thread.owner_id.username}</Text>
            <Text>{thread.message}</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Variables.sizes.small,
    paddingHorizontal: Variables.sizes.medium,
    width: "100%",
  },
  textContainer: {
    marginLeft: Variables.sizes.medium,
  },
  title: {
    fontSize: 20,
    fontFamily: Variables.fonts.bold,
  },
});

export default ThreadInfo;
