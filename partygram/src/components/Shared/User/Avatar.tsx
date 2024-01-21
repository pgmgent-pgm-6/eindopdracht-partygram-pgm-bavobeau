import { Profile } from "@core/modules/profiles/types";
import { getAvatarUrl } from "@core/modules/profiles/utils";
import ImageAvatar from "@design/Avatar/ImageAvatar";
import TextAvatar from "@design/Avatar/TextAvatar";
import { StyleProp } from "react-native";

type Props = {
  profile: Profile;
  imageStyle?: StyleProp<Object>;
}

const Avatar = ({profile, imageStyle}: Props) => {
  // get full path to avatar
  const avatarUrl = getAvatarUrl(profile);
  return (
    !avatarUrl ? (
      <TextAvatar style={imageStyle}>{`${profile.first_name.charAt(
        0
      )}${profile.last_name.charAt(0)}`}</TextAvatar>
    ) : (
      <ImageAvatar source={{ uri: avatarUrl }} style={imageStyle} />
    )
  )
}

export default Avatar