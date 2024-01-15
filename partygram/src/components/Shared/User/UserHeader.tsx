import ListHeaderAvatar from "@design/List/ListHeaderAvatar";
import UserEditableAvatar from "./UserAvatar";
import { Profile } from "@core/modules/profiles/types";
import { StyleProp } from "react-native";

type Props = {
  profile: Profile;
  totalPosts: number;
  totalStories: number;
  imageStyle?: StyleProp<Object>;
  onPress: () => void;
};

const UserHeader = ({ profile, totalPosts, totalStories, imageStyle, onPress }: Props) => {
  return (
    <ListHeaderAvatar
      title={`${profile.first_name} ${profile.last_name}`}
      posts={totalPosts}
      stories={totalStories}
      avatar={<UserEditableAvatar imageStyle={imageStyle} />}
      onPress={onPress}
    />
  );
};

export default UserHeader;