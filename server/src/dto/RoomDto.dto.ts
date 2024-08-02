import { Types } from "mongoose";

class RoomDto {
  constructor(public name: string, public _id?: Types.ObjectId) {}
}

export default RoomDto;
