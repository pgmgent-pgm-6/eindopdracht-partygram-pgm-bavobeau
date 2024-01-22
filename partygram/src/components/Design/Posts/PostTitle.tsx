import { View, StyleSheet } from 'react-native';
import Username from './Username';
import Text from '@design/Text/Text';
import { Variables } from '@style';
import processHashtags from '@shared/Post/Hashtag';

type Props = {
  owner_id: string;
  description: string;
};

const PostTitle = ({owner_id, description}: Props) => {
  const processedWords = processHashtags(description);
  return (
    <View style={styles.container}>
      <Username id={owner_id} />
      {processedWords}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: Variables.sizes.xs,
  }
})

export default PostTitle;