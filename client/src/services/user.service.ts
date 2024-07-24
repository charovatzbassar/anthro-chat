import { UserDto } from "@/dto";
import { BaseService } from "./BaseService";

class UserService extends BaseService<UserDto> {
  constructor() {
    super("/users");
  }
}

export default UserService;
