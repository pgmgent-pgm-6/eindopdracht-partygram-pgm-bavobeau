import useTitle from "@core/hooks/useTitle";
import { getProfileById, updateProfile } from "@core/modules/profiles/api";
import LoadingIndicator from "@design/LoadingIndicator";
import CenteredView from "@design/View/CenteredView";
import DefaultView from "@design/View/DefaultView";
import { useAuthContext } from "@shared/Auth/AuthProvider"
import ProfileForm from "@shared/Profile/ProfileForm";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "@design/Text/ErrorMessage"
import { useRouter } from "expo-router";

const ProfileEditPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  
  if (!user) {
    return null;
  }

  const { data: profile, isLoading, isError, error } = useQuery({
    queryKey: ["profile", user.id],
    queryFn: () => getProfileById(user.id),
  })

  if (isLoading) {
    return (
      <CenteredView>
        <LoadingIndicator/>
      </CenteredView>
    );
  }

  if (isError) {
    return (
      <CenteredView>
        <ErrorMessage error={error} />
      </CenteredView>
    );
  }

  if (!profile) {
    return null;
  }

  useTitle(`Edit ${profile.username}`);

  return (
    <DefaultView horizontal={true}>
      <ProfileForm
        updateMethod={updateProfile}
        onSuccess={() => router.push("/(app)/(tabs)/profile")}
        label="Edit profile"
        initialValues={{
          id: profile.id,
          username: profile.username,
          first_name: profile.first_name,
          last_name: profile.last_name,
          condition: profile.condition,
        }}
        />
    </DefaultView>
  )
}

export default ProfileEditPage