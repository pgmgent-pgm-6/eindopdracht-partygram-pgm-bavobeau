import { View } from 'react-native';
import PostUser from './PostUser';
import Text from '@design/Text/Text';

type Props = {
  owner_id: string;
  username: string;
  description?: string;
};

const PostTitle = ({owner_id, username, description}: Props) => {
  return (
    <View>
      <PostUser owner_id={owner_id} username={username} />
      <Text>{!description ? "" : description}</Text>
    </View>
  );
};

export default PostTitle;