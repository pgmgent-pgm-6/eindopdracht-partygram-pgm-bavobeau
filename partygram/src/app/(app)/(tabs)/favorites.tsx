import { getFavoritesByUser } from "@core/modules/favorites/api";
import DefaultView from "@design/View/DefaultView"
import { useAuthContext } from "@shared/Auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const FavoritesPage = () => {
  const { user } = useAuthContext();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["favorites", user!.id],
    queryFn: () => getFavoritesByUser(user!.id),
  })

  return (
    <DefaultView>

    </DefaultView>
  )
}

export default FavoritesPage;