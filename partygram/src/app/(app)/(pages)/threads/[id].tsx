import useTitle from "@core/hooks/useTitle"
import { getProfileById } from "@core/modules/profiles/api"
import { createThread, getThreadsByUsers } from "@core/modules/threads/api"
import Divider from "@design/List/Divider"
import ErrorMessage from "@design/Text/ErrorMessage"
import Message from "@design/Thread/Message"
import CenteredView from "@design/View/CenteredView"
import DefaultView from "@design/View/DefaultView"
import { useAuthContext } from "@shared/Auth/AuthProvider"
import DataListView from "@shared/Data/DataListView"
import ThreadForm from "@shared/Thread/ThreadForm"
import { useQuery } from "@tanstack/react-query"
import { useLocalSearchParams, useRouter } from "expo-router"
import { StyleSheet } from "react-native";

const ThreadDetailPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuthContext();
  const router = useRouter();
  const { data: profile } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfileById(id),
  })

  useTitle(profile?.username || "Loading...")

  if (!profile || !user) {
    return (
      <CenteredView>
        <ErrorMessage error={"no user found"} />
      </CenteredView>
    )
  }

  return (
    <DefaultView vertical={false}>
      <DataListView
        method={() => getThreadsByUsers(id, user.id)}
        name={["threads"]}
        emptyTitle="No threads yet"
        emptyDescription="There are no threads with this user yet"
        emptyIcon="image"
        separator={() => <Divider />}
        renderItem={({ item }) => <Message thread={item} owner_id={user.id}/>}
      />
      <DefaultView vertical={false} horizontal={true} style={styles.form}>
        <ThreadForm
          updateMethod={createThread}
          label="Add thread"
          initialValues={{
            receiver_id: id,
            message: "",
            owner_id: user.id,
          }}
        />
      </DefaultView>
    </DefaultView>
  )
};

const styles = StyleSheet.create({
  form: {
    flexGrow: 0.3,
  }
});

export default ThreadDetailPage