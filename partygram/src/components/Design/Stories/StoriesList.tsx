import AddStory from './AddStory'
import Story from './Story'
import { useQuery } from '@tanstack/react-query';
import { getOwnersWithStoryFromLastDay } from '@core/modules/stories/api';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet, View, Text} from 'react-native';

const StoriesList = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: getOwnersWithStoryFromLastDay,
    queryKey: ["stories"]
  });

  console.log(data);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;

  return (
    <View style={styles.container}>
      <AddStory />
      <FlatList
        data={data}
        renderItem={({item}) => <Story story_id={item} />}
        keyExtractor={(item) => item}
        horizontal={false}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default StoriesList