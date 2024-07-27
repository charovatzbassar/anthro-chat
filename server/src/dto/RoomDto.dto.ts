import { Types } from "mongoose";

class RoomDto {
  constructor(public name: string, public _id?: Types.ObjectId) {
    this._id = _id;
    this.name = name;
  }
}

export default RoomDto;
