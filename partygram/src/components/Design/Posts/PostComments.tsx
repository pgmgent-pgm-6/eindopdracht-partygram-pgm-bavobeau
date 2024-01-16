import Text from "@design/Text/Text";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

type Props = {
  id: number;
}

const PostComments = ({id}: Props) => {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push(`/comments/${id}`)}>
      <Text>comments</Text>
    </Pressable>
  );
};

export default PostComments;