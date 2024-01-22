import { ThreadsWithRelations } from "@core/modules/threads/types";
import Text from "@design/Text/Text";
import { Variables } from "@style";
import { View, StyleSheet } from "react-native";

type Props = {
  thread: ThreadsWithRelations;
  owner_id: string;
};

const Message = ({ thread, owner_id }: Props) => {
  return (
    <View style={[styles.container, thread.owner_id.id == owner_id && styles.right]}>
      <Text style={styles.title}>{thread.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: Variables.sizes.small,
    paddingHorizontal: Variables.sizes.medium,
  },
  right: {
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    fontFamily: Variables.fonts.bold,
  },
});

export default Message;
