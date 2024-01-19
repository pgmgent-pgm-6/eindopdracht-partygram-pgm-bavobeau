import useTitle from "@core/hooks/useTitle";
import { getPostById } from "@core/modules/posts/api";
import LoadingIndicator from "@design/LoadingIndicator";
import PostItem from "@design/Posts/PostItem";
import ErrorMessage from "@design/Text/ErrorMessage";
import CenteredView from "@design/View/CenteredView";
import DefaultView from "@design/View/DefaultView";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

const PostDetailPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(parseInt(id)),
    refetchInterval: 1000,
  });

  useTitle(post ? post.description : null);

  if (isLoading) {
    return (
      <CenteredView>
        <LoadingIndicator />
      </CenteredView>
    )
  }

  if (isError) {
    return (
      <CenteredView>
        <ErrorMessage error="Something went wrong" />
      </CenteredView>
    )
  }

  if (!post) {
    return (
      <CenteredView>
        <ErrorMessage error="Does not exist" />
      </CenteredView>
    )
  }

  return (
    <DefaultView vertical={false}>
      <PostItem post={post} style={{ height: 400}} />
    </DefaultView>
  )
}

export default PostDetailPage;