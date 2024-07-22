import { UserModel } from "@/models";
import { UserDto } from "@/dto";
import { BaseService } from "./BaseService";

class UserService implements BaseService<UserDto> {
  public async create(data: UserDto): Promise<UserDto> {
    const user = await UserModel.create(data);
    return user;
  }

  public async delete(id: string): Promise<UserDto | null> {
    const user = await UserModel.findByIdAndDelete(id);
    return user;
  }

  public async update(id: string, data: UserDto): Promise<UserDto | null> {
    const user = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return user;
  }

  public async getAll(): Promise<UserDto[]> {
    const users = await UserModel.find();
    return users;
  }

  public async getById(id: string): Promise<UserDto | null> {
    const user = await UserModel.findById(id);
    return user;
  }
}

export default UserService;
