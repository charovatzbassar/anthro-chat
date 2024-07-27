import { RoomDto } from "@/dto";
import { BaseService } from "./BaseService";
import { RestClient } from "@/utils";

class RoomService extends BaseService<RoomDto> {
  constructor() {
    super("/rooms");
  }

  findByName = (name: string): Promise<RoomDto | null> =>
    RestClient.get(`${super.endpoint}?name=${name}`);

  findByUser = (userId: string): Promise<RoomDto[]> =>
    RestClient.get(`${super.endpoint}?user=${userId}`);

  getRoomUserCount = (roomId: string): Promise<number | null> =>
    RestClient.get(`${super.endpoint}/${roomId}?count=true`);
}

export default RoomService;
