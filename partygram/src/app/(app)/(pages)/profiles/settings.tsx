import { getData, storeData } from "@core/modules/data/api";
import { Data } from "@core/modules/data/types";
import DefaultView from "@design/View/DefaultView";
import DataForm from "@shared/Data/DataForm";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const ProfileSettingsPage = () => {
  const router = useRouter();
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
    </DefaultView>
  );
};

export default ProfileSettingsPage;
