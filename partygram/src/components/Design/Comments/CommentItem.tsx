import { Comment } from "@core/modules/comments/types";
import Username from "@design/Posts/Username";
import { Variables } from "@style";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  comment: Comment;
}

const CommentItem = ({comment}: Props) => {
  return (
    <View style={styles.container}>
      <Username id={comment.owner_id} showAvatar={true} />
      <Text>{comment.description}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    gap: Variables.sizes.xs,
    paddingVertical: Variables.sizes.medium,
    paddingHorizontal: Variables.sizes.small,
    alignItems: "center",
  }
})

export default CommentItem;