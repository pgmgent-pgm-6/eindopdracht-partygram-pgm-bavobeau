import useTitle from "@core/hooks/useTitle";
import { createComment, getComments } from "@core/modules/comments/api";
import CommentItem from "@design/Comments/CommentItem";
import Divider from "@design/List/Divider";
import LoadingIndicator from "@design/LoadingIndicator";
import DefaultView from "@design/View/DefaultView";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import CommentForm from "@shared/Comment/CommentForm";
import DataListView from "@shared/Data/DataListView";
import { useLocalSearchParams, useRouter } from "expo-router";

const CommentsDetailScreen = () => {
  const { user } = useAuthContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  useTitle("Comments");

  if (!user) {
    return <LoadingIndicator />;
  }

  return (
    <DefaultView vertical={false}>
      <DataListView
        method={() => getComments(parseInt(id))}
        name={["comments", id]}
        emptyTitle="No comments yet"
        emptyIcon="comment"
        emptyDescription="Be the first to comment!"
        separator={() => <Divider />}
        renderItem={({ item }) => <CommentItem comment={item} />}
      />
      <DefaultView vertical={false} horizontal={true}>
      <CommentForm
        updateMethod={createComment}
        onSucces={() => {}}
        label="Add comment"
        initialValues={{
          post_id: parseInt(id),
          description: "",
          owner_id: user.id,
        }}
      />
      </DefaultView>
    </DefaultView>
  );
};

export default CommentsDetailScreen;
