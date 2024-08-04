import { Types } from "mongoose";

class RoomUserDto {
  constructor(
    public user: Types.ObjectId,
    public room: Types.ObjectId,
    public _id?: Types.ObjectId
  ) {}
}

export default RoomUserDto;
