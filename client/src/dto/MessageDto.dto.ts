import { Message } from "@/utils/types";
import { RoomDto, UserDto } from "@/dto";

class MessageDto {
  public _id?: string;
  public text: string;
  public room: RoomDto | string;
  public user: UserDto | string;

  constructor(data: MessageDto) {
    this._id = data._id;
    this.text = data.text;

    this.room =
      typeof data.room === "string" ? data.room : new RoomDto(data.room);

    this.user =
      data.user && typeof data.user === "object" && "username" in data.user
        ? new UserDto(data.user)
        : data.user;
  }

  public toMessageState(): Message {
    return {
      username: this.user instanceof UserDto ? this.user.username : this.user,
      text: this.text,
    };
  }
}

export default MessageDto;
