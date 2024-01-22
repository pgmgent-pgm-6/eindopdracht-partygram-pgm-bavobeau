import AsyncStorage from "@react-native-async-storage/async-storage"
import { Data } from "./types";

export const storeData = async (value: Data) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('partygram', jsonValue);
  } catch (e) {
    return e;
  }
};

export const getData = async (): Promise<Data> => {
  try {
    const jsonValue = await AsyncStorage.getItem('partygram');
    return jsonValue != null ? JSON.parse(jsonValue) : { likes: true, stories: true };
  } catch(e) {
    return Promise.reject(e);
  }
};

