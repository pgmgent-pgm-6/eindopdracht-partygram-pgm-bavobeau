import { logout } from "@core/modules/auth/api";
import Button from "@design/Button/Button";
import Header from "@design/Header/Header";
import DefaultView from "@design/View/DefaultView"

const ProfilePage = () => {
  return (
    <DefaultView>
      <Header title="Profile" icon="cog" iconTitle="settings" iconOnPress={() => {}} />
      <Button onPress={logout}>Log Out</Button>
    </DefaultView>
  )
}

export default ProfilePage;