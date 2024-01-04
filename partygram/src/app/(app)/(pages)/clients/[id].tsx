import { getClientById } from "@core/modules/clients/api";
import { Client } from "@core/modules/clients/types";
import DataView from "@shared/Data/DataView";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const ClientDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  return (
    <DataView
      method={() => getClientById(id)}
      name={["clients", id]}
      showTitle={true}
      getTitle={(data: Client) => data.name}
      render={(data: Client) => (
        <View>
          <Text>{data.name}</Text>
        </View>
      )}
    />
  )
}

export default ClientDetailScreen;