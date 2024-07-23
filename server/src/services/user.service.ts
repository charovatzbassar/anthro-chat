import { UserModel } from "@/models";
import { UserDto } from "@/dto";
import { BaseService } from "./BaseService";

class UserService implements BaseService<UserDto> {
  public create = async (data: UserDto): Promise<UserDto> =>
    await UserModel.create(data);

  public delete = async (id: string): Promise<UserDto | null> =>
    await UserModel.findByIdAndDelete(id);

  public update = async (id: string, data: UserDto): Promise<UserDto | null> =>
    await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    });

  public getAll = async (): Promise<UserDto[]> => await UserModel.find();

  public getById = async (id: string): Promise<UserDto | null> =>
    await UserModel.findById(id);
}

export default UserService;
