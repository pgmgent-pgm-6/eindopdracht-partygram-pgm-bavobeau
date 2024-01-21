import ListHeaderAvatar from "@design/List/ListHeaderAvatar";
import UserEditableAvatar from "./UserAvatar";
import { Profile } from "@core/modules/profiles/types";
import { StyleProp } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getPostsByUser } from "@core/modules/posts/api";
import { getStoriesByUserId } from "@core/modules/stories/api";
import ErrorMessage from "@design/Text/ErrorMessage";
import LoadingIndicator from "@design/LoadingIndicator";
import Avatar from "./Avatar";

type Props = {
  profile: Profile;
  imageStyle?: StyleProp<Object>;
  onPress: () => void;
  editable?: boolean;
};

const UserHeader = ({
  profile,
  imageStyle,
  onPress,
  editable = true,
}: Props) => {
  const {
    data: posts,
    isLoading: postsIsLoading,
    isError: postsIsError,
  } = useQuery({
    queryKey: ["posts", profile.id],
    queryFn: () => getPostsByUser(profile.id),
  });
  const {
    data: stories,
    isLoading: storiesIsLoading,
    isError: storiesIsError,
  } = useQuery({
    queryKey: ["stories", profile.id],
    queryFn: () => getStoriesByUserId(profile.id),
  });

  if (postsIsLoading || storiesIsLoading) {
    return <LoadingIndicator />;
  }

  if (postsIsError || storiesIsError) {
    return <ErrorMessage error="Something went wrong" />;
  }

  if (!posts || !stories) {
    return <ErrorMessage error="Something went wrong" />;
  }

  return (
    <>
      <ListHeaderAvatar
        title={`${profile.first_name} ${profile.last_name}`}
        posts={posts.length}
        stories={stories.length}
        avatar={
          editable ? (
            <UserEditableAvatar imageStyle={imageStyle} />
          ) : (
            <Avatar profile={profile} imageStyle={imageStyle} />
          )
        }
        onPress={onPress}
      />
    </>
  );
};

export default UserHeader;
