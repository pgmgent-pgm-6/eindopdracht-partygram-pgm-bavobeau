import useTitle from "@core/hooks/useTitle"
import { getLastThreads, getThreadsById } from "@core/modules/threads/api";
import Divider from "@design/List/Divider";
import LoadingIndicator from "@design/LoadingIndicator";
import Text from "@design/Text/Text";
import ThreadInfo from "@design/Thread/ThreadInfo";
import CenteredView from "@design/View/CenteredView";
import DefaultView from "@design/View/DefaultView";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import DataListView from "@shared/Data/DataListView";

const ThreadsPage = () => {
  const { user } = useAuthContext();
  useTitle("Threads");

  if (!user) {
    return (
      <CenteredView>
        <LoadingIndicator />
      </CenteredView>
    )
  }

  return (
    <DefaultView vertical={false}>
      <DataListView
        method={() => getLastThreads(user.id)}
        name={["threads"]}
        emptyTitle="No threads"
        emptyDescription="There are no threads yet go to a profile and start a conversation"
        emptyIcon="message"
        separator={() => <Divider />}
        renderItem={({ item }) => <ThreadInfo thread={item} owner_id={user.id} />}
      />
    </DefaultView>
  )
}

export default ThreadsPage