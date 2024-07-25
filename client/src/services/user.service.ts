import { UserDto } from "@/dto";
import { BaseService } from "./BaseService";
import { RestClient } from "@/utils";

class UserService extends BaseService<UserDto> {
  constructor() {
    super("/users");
  }

  findByUsername = (username: string): Promise<UserDto | null> =>
    RestClient.get(`${super.endpoint}?username=${username}`);
}

export default UserService;
