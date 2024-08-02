import { UserDto } from "@/dto";
import { RestClient } from "@/utils";

class AuthService {
  static login = async (data: UserDto) => RestClient.post("/auth/login", data);

  static register = async (data: UserDto) =>
    RestClient.post("/auth/register", data);
}

export default AuthService;
