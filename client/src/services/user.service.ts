import { RoomUserDto, UserDto } from "@/dto";
import { BaseService } from "./BaseService";
import { RestClient } from "@/utils";

class UserService extends BaseService<UserDto> {
  constructor() {
    super("/users");
  }

  findByUsername = (username: string): Promise<UserDto | null> =>
    RestClient.get(`${super.endpoint}?username=${username}`);

  joinRoom = (data: RoomUserDto): Promise<RoomUserDto | null> =>
    RestClient.post(`${super.endpoint}/join`, {
      userId: data.userId,
      roomId: data.roomId,
    });

  getByRoomId = (roomId: string): Promise<UserDto[]> =>
    RestClient.get(`${super.endpoint}?room=${roomId}`);
}

export default UserService;
