import { UserDto } from "@/dto";
import UserService from "./user.service";

class AuthService {
  constructor(private userService: UserService) {}

  login = async (data: UserDto) => {
    const user = await this.userService.getByUsername(data.username);

    if (!user) {
      return null;
    }

    
    delete user.password;

    return user;
  };

  register = async (data: UserDto) => {
    const userExists = await this.userService.getByUsername(data.username);

    if (userExists) {
      return null;
    }

    const user = await this.userService.create(data);

    delete user.password;

    return user;
  };
}

export default AuthService;
