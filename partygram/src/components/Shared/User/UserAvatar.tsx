import { Pressable, StyleProp } from "react-native";
import ImageAvatar from "@design/Avatar/ImageAvatar";
import TextAvatar from "@design/Avatar/TextAvatar";
import { useAuthContext } from "../Auth/AuthProvider";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import LoadingAvatar from "@design/Avatar/LoadingAvatar";
import isVoid from "@core/utils/isVoid";
import ImagePickerDialog from "@design/ImagePicker/ImagePickerDialog";
import {
  getProfileById,
  updateProfileAvatar,
} from "@core/modules/profiles/api";
import { getAvatarUrl } from "@core/modules/profiles/utils";
import { Profile } from "@core/modules/profiles/types";

type Props = {
  imageStyle?: StyleProp<Object>;
};

const userEditableAvatar = ({ imageStyle }: Props) => {
  const [showPicker, setShowPicker] = useState(false);
  const [profile, setProfile] = useState<Profile>();
  const { user } = useAuthContext();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (file: string) => updateProfileAvatar(file),
  });

  const handleAvatarPress = () => {
    setShowPicker(true);
  };

  useEffect(() => {
    if (user) {
      getProfileById(user.id).then((profile) => setProfile(profile));
    }
  }, [showPicker, user]);

  useEffect(() => {
    if (isError) {
      alert(error);
    }
  }, [isError]);

  const handleImage = async (image: string) => {
    // hide picker
    setShowPicker(false);
    if (!isVoid(image)) {
      mutate(image);
    }
  };

  if (isPending) {
    return <LoadingAvatar />;
  }

  // get full path to avatar
  const avatarUrl = getAvatarUrl(profile);

  if (!user || !profile) {
    return;
  }

  return (
    <>
      <Pressable onPress={handleAvatarPress}>
        {!avatarUrl ? (
          <TextAvatar style={imageStyle}>{`${profile.first_name.charAt(
            0
          )}${profile.last_name.charAt(0)}`}</TextAvatar>
        ) : (
          <ImageAvatar source={{ uri: avatarUrl }} style={imageStyle} />
        )}
      </Pressable>
      {showPicker && (
        <ImagePickerDialog
          onDismiss={() => setShowPicker(false)}
          onImage={handleImage}
        />
      )}
    </>
  );
};

export default userEditableAvatar;
