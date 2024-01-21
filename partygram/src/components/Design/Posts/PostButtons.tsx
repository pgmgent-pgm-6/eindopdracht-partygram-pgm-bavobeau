import { createFavorite, deleteFavorite, getFavoriteByPostAndUser } from '@core/modules/favorites/api';
import { createLike, deleteLike, getLikeByPostAndOwner } from '@core/modules/likes/api';
import IconButton from '@design/Button/IconButton';
import { useAuthContext } from '@shared/Auth/AuthProvider';
import { Variables } from '@style';
import { useQueries } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  id: number;
}

const PostButtons = ({id}: Props) => {
  const { user } = useAuthContext();
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const results = useQueries({
    queries: [
      {
        queryKey: ['like', id, user!.id],
        queryFn: () => getLikeByPostAndOwner(id, user!.id),
      },{
        queryKey: ['favorite', id, user!.id],
        queryFn: () => getFavoriteByPostAndUser(user!.id, id),
      }
    ]
  });

  useEffect(() => {
    if (results[0].data) {
      setIsLiked(true);
    }
    if (results[1].data) {
      setIsFavorite(true);
    }
  }, [results[0].data, results[0].data]);

  const handleLike = () => {
    if (isLiked) {
      deleteLike(id, user!.id).finally(() => setIsLiked(false));
    } else {
      createLike(id, user!.id).finally(() => setIsLiked(true));
    }
  };

  const handleComment = () => {
    router.push(`/comments/${id}`);
  }

  const handleFavorite = () => {
    if (isFavorite) {
      deleteFavorite(user!.id, id).finally(() => setIsFavorite(false));
    } else {
      createFavorite(user!.id, id).finally(() => setIsFavorite(true));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.pair}>
        <IconButton icon={isLiked ?  "heart" : "heart-outline"} color={isLiked ? "red" : "black"} title="like button" onPress={handleLike} />
        <IconButton icon="comment-outline" title="comment button" onPress={handleComment} />
      </View>
      <IconButton icon={isFavorite ? "bookmark" : "bookmark-outline"} color={isFavorite ? "yellow" : "black"} title="bookmark button" onPress={handleFavorite} />
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