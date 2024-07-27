import { Types } from "mongoose";

class RoomUserDto {
  public _id?: Types.ObjectId;
  public user: Types.ObjectId;
  public room: Types.ObjectId;

  constructor(
    user: Types.ObjectId,
    room: Types.ObjectId,
    _id?: Types.ObjectId
  ) {
    this._id = _id;
    this.user = user;
    this.room = room;
  }
}

export default RoomUserDto;
