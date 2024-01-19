import useTitle from "@core/hooks/useTitle";
import { getProfileById } from "@core/modules/profiles/api";
import LoadingIndicator from "@design/LoadingIndicator";
import Text from "@design/Text/Text"
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router"

const StoryDetailPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfileById(id),
  });

  if (isLoading) return (
    <LoadingIndicator />
  );

  if (isError) return (
    <Text>Something went wrong</Text>
  );
  
  if (user) {
  useTitle(`Story from ${user.username}`);
  };

  return (
    <>
      <Text>{id}</Text>
    </>
  )
}

export default StoryDetailPage