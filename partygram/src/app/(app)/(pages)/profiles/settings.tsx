import useTitle from "@core/hooks/useTitle";
import { logout } from "@core/modules/auth/api";
import { getData, storeData } from "@core/modules/data/api";
import { Data } from "@core/modules/data/types";
import Button from "@design/Button/Button";
import DefaultView from "@design/View/DefaultView";
import DataForm from "@shared/Data/DataForm";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const ProfileSettingsPage = () => {
  const router = useRouter();
  useTitle("Profile settings");
  const [data, setData] = useState<Data>();

  useEffect(() => {
    getData().then((res) => {
      if (!res) {
        setData({
          likes: true,
          stories: true,
        });
      }
      setData(res);
    });
  }, []);

  return (
    <DefaultView horizontal={true}>
      {data && (
        <DataForm
          updateMethod={storeData}
          onSuccess={() => router.push("/(app)/(tabs)/profile")}
          label="Edit data"
          initialValues={{
            likes: data.likes,
            stories: data.stories,
          }}
        />
      )}
      <Button onPress={logout}>Logout</Button>
    </DefaultView>
  );
};

export default ProfileSettingsPage;
