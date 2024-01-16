import { createLike, deleteLike, getLikeByPostAndOwner } from '@core/modules/likes/api';
import IconButton from '@design/Button/IconButton';
import { useAuthContext } from '@shared/Auth/AuthProvider';
import { Variables } from '@style';
import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  id: number;
}

const PostButtons = ({id}: Props) => {
  const { user } = useAuthContext();
  const getLike = async () => {
    try {
      const res = await getLikeByPostAndOwner(id, user!.id);
      return res;
    } catch (error) {
      return false;
    }
  };
  
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getLike();
      if (result) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    };

    fetchData();
  }, []);

  const handleLike = () => {
    if (isLiked) {
      deleteLike(id, user!.id).finally(() => setIsLiked(false));
    } else {
      createLike(id, user!.id).finally(() => setIsLiked(true));
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.pair}>
        <IconButton icon={isLiked ?  "heart" : "heart-outline"} color={isLiked ? "red" : "black"} title="like button" onPress={handleLike} />
        <IconButton icon="comment-outline" title="comment button" onPress={() => {}} />
      </View>
      <IconButton icon={isFavorite ? "bookmark" : "bookmark-outline"} color={isFavorite ? "yellow" : ""} title="bookmark button" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pair: {
    flexDirection: "row",
    flex: 1,
    gap: Variables.sizes.small,
  }
});

export default PostButtons;