import { MessageDto } from "@/dto";
import { BaseService } from "./BaseService";
import { RestClient } from "@/utils";

class MessageService extends BaseService<MessageDto> {
  constructor() {
    super("/messages");
  }

  findByRoom = (room: string): Promise<MessageDto[]> =>
    RestClient.get(`${super.endpoint}?room=${room}`);
}

export default MessageService;
