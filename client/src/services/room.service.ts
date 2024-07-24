import { RoomDto } from "@/dto";
import { BaseService } from "./BaseService";
import { RestClient } from "@/utils";

class RoomService extends BaseService<RoomDto> {
  constructor() {
    super("/rooms");
  }

  findByName = (name: string): Promise<RoomDto | null> =>
    RestClient.get(`${super.endpoint}?name=${name}`);
}

export default RoomService;
