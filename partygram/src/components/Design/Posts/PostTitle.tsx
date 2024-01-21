import { View, StyleSheet } from 'react-native';
import Username from './Username';
import Text from '@design/Text/Text';
import { Variables } from '@style';

type Props = {
  owner_id: string;
  description?: string;
};

const PostTitle = ({owner_id, description}: Props) => {
  return (
    <View style={styles.container}>
      <Username id={owner_id} />
      <Text>{!description ? "" : description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Variables.sizes.xs,
  }
})

export default PostTitle;