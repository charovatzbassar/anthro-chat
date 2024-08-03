import { UserDto } from "@/dto";
import { RestClient } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthService {
  static login = async (data: UserDto) => RestClient.post("/auth/login", data);

  static register = async (data: UserDto) =>
    RestClient.post("/auth/register", data);

  static logout = async (): Promise<void> => {
    await AsyncStorage.removeItem("token");
  };

  static getToken = async (): Promise<string | null> =>
    await AsyncStorage.getItem("token");

  static setToken = async (token: string): Promise<void> => {
    await AsyncStorage.setItem("token", token);
  };
}

export default AuthService;
