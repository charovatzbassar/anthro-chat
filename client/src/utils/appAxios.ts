import axios from "axios";
import Constants from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const appAxios = axios.create({
  baseURL: `${Constants.SERVER_URL}/api`,
  timeout: 10000,
});

appAxios.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default appAxios;
