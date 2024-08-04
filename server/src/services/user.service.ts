import { RoomUserModel, UserModel } from "@/models";
import { RoomUserDto, UserDto } from "@/dto";
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

  public getByUsername = async (username: string): Promise<UserDto | null> =>
    await UserModel.findOne({ username });

  public joinRoom = async (
    userId: string,
    roomId: string
  ): Promise<RoomUserDto | null> => {
    const existingRoomUser = await RoomUserModel.findOne({
      user: userId,
      room: roomId,
    });

    if (existingRoomUser) return existingRoomUser;

    return await RoomUserModel.create({ user: userId, room: roomId });
  };
}

export default UserService;
