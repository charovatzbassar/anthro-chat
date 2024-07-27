import { Types } from "mongoose";

class RoomUserDto {
  constructor(
    public user: Types.ObjectId,
    public room: Types.ObjectId,
    public _id?: Types.ObjectId
  ) {
    this._id = _id;
    this.user = user;
    this.room = room;
  }
}

export default RoomUserDto;
