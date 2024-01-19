import { getComments } from "@core/modules/comments/api";
import CommentItem from "@design/Comments/CommentItem";
import DefaultView from "@design/View/DefaultView";
import DataListView from "@shared/Data/DataListView";
import { useLocalSearchParams } from "expo-router";

const CommentsDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <DefaultView vertical={false}>
      <DataListView
        method={() => getComments(parseInt(id))}
        name={["comments", id]}
        emptyTitle="No comments yet"
        emptyIcon="comment"
        emptyDescription="Be the first to comment!"
        onAddItem={() => {}}
        renderItem={({ item }) => <CommentItem comment={item} />}
      />
      
    </DefaultView>
  );
};

export default CommentsDetailScreen;
