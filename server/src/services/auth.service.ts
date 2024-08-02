import { UserDto } from "@/dto";
import UserService from "./user.service";
import { generateJwt, hashPassword } from "@/utils";

class AuthService {
  constructor(private userService: UserService) {}

  login = async (data: UserDto) => {
    const user = await this.userService.getByUsername(data.username);

    if (!user) {
      return null;
    }

    delete user.password;

    const token = generateJwt(user);

    return new UserDto(user.username, user.email, undefined, token, user._id);
  };

  register = async (data: UserDto) => {
    const userExists = await this.userService.getByUsername(data.username);

    if (userExists) {
      return null;
    }

    const hashedPassword = await hashPassword(data.password || "");

    const user = await this.userService.create({
      ...data,
      password: hashedPassword,
    });

    delete user.password;

    const token = generateJwt(user);

    return new UserDto(user.username, user.email, undefined, token, user._id);
  };
}

export default AuthService;
