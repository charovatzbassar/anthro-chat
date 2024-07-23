import RoomDto from "./RoomDto.dto";
import UserDto from "./UserDto.dto";

class MessageDto {
  public _id?: string;
  public text: string;
  public room: RoomDto;
  public user: UserDto;

  constructor(data: MessageDto) {
    this._id = data._id;
    this.text = data.text;
    this.room = data.room;
    this.user = data.user;
  }
}

export default MessageDto;
