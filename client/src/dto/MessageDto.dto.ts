import { Message } from "@/utils/types";
import RoomDto from "./RoomDto.dto";
import UserDto from "./UserDto.dto";

class MessageDto {
  public _id?: string;
  public text: string;
  public room: RoomDto | string;
  public user: UserDto | string;

  constructor(data: MessageDto) {
    this._id = data._id;
    this.text = data.text;
    this.room = data.room;
    this.user = data.user;
  }

  public toMessage(): Message {
    return {
      username: this.user instanceof UserDto ? this.user.username : this.user,
      text: this.text,
    };
  }
}

export default MessageDto;
