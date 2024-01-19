import useTitle from "@core/hooks/useTitle";
import Text from "@design/Text/Text"
import { useLocalSearchParams } from "expo-router"

const StoryDetailPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  useTitle(`Story from ${id}`);
  return (
    <>
      <Text>{id}</Text>
    </>
  )
}

export default StoryDetailPage