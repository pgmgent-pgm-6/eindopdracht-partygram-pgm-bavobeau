import { getComments } from "@core/modules/comments/api";
import LoadingIndicator from "@design/LoadingIndicator";
import ErrorMessage from "@design/Text/ErrorMessage";
import Text from "@design/Text/Text";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

type Props = {
  id: number;
}

const PostComments = ({id}: Props) => {
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
    refetchInterval: 10000,
  }) 

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Pressable onPress={() => router.push(`/comments/${id}`)}>
      {data && data.length > 0 ? (
        <Text>{data.length} comment{data.length == 1 ? "" : "s"}</Text>
      ) : (
        <Text>0 comments</Text>
      )}
    </Pressable>
  );
};

export default PostComments;