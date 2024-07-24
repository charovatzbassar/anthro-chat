import { RoomDto } from "@/dto";
import { BaseService } from "./BaseService";

class RoomService extends BaseService<RoomDto> {
  constructor() {
    super("/rooms");
  }
}

export default RoomService;
