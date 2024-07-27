import { Message } from "@/utils/types";
import { RoomDto, UserDto } from "@/dto";

class MessageDto {
  constructor(
    public text: string,
    public room: RoomDto | string,
    public user: UserDto | string,
    public _id?: string
  ) {
    this._id = _id;
    this.text = text;

    this.room =
      typeof room === "string" ? room : new RoomDto(room.name, room._id);

    this.user =
      user && typeof user === "object" && "username" in user
        ? new UserDto(user.username, user.email, user.password, user._id)
        : user;
  }

  public toMessageState(): Message {
    return {
      username: this.user instanceof UserDto ? this.user.username : this.user,
      text: this.text,
    };
  }
}

export default MessageDto;
