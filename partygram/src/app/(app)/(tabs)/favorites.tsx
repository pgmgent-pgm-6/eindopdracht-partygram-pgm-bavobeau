import { getPostFavoritesByUser } from "@core/modules/favorites/api";
import SmallPost from "@design/Posts/SmallPost";
import Text from "@design/Text/Text";
import DefaultView from "@design/View/DefaultView"
import { useAuthContext } from "@shared/Auth/AuthProvider";
import DataListView from "@shared/Data/DataListView";

const FavoritesPage = () => {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <DefaultView>
        <Text>You need to be logged in to see your favorites.</Text>
      </DefaultView>
    );
  }

  return (
    <DefaultView vertical={false}>
      <DataListView
        name={["favorites", user.id]}
        method={() => getPostFavoritesByUser(user.id)}
        emptyDescription="You don't have any favorites yet."
        renderItem={({item}) => (<SmallPost post={item.post_id} />)}
        numColumns={3}
      />
    </DefaultView>
  )
}

export default FavoritesPage;