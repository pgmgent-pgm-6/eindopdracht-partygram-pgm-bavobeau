import Text from "@design/Text/Text";
import { Pressable } from "react-native";

type Props = {
  id: number;
}

const PostComments = ({id}: Props) => {
  return (
    <Pressable>
      <Text>comments</Text>
    </Pressable>
  );
};

export default PostComments;