import ListHeaderAvatar from "@design/List/ListHeaderAvatar";
import UserEditableAvatar from "./UserAvatar";
import { Profile } from "@core/modules/profiles/types";

type Props = {
  profile: Profile;
  totalPosts: number;
  totalStories: number;
  onPress: () => void;
};

const UserHeader = ({ profile, totalPosts, totalStories, onPress }: Props) => {
  return (
    <ListHeaderAvatar
      title={`${profile.first_name} ${profile.last_name}`}
      posts={totalPosts}
      stories={totalStories}
      avatar={<UserEditableAvatar />}
      onPress={onPress}
    />
  );
};

export default UserHeader;