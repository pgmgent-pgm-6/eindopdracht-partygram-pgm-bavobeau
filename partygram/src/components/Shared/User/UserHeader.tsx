import ListHeaderAvatar from "@design/List/ListHeaderAvatar";
import { useAuthContext } from "../Auth/AuthProvider";
import UserEditableAvatar from "./UserAvatar";
import { Profile } from "@core/modules/profiles/types";
import { useEffect, useState } from "react";
import { getProfileById } from "@core/modules/profiles/api";

type Props = {
  onPress: () => void;
};

const UserHeader = ({ onPress }: Props) => {
  const [profile, setProfile] = useState<Profile>();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      getProfileById(user.id).then((profile) => setProfile(profile));
    }
  }, [user]);

  if (!user || !profile) {
    return null;
  }
  return (
    <ListHeaderAvatar
      title={`${profile.first_name} ${profile.last_name}`}
      description={user.email}
      avatar={<UserEditableAvatar />}
      onPress={onPress}
    />
  );
};

export default UserHeader;