import { Types } from "mongoose";

class RoomDto {
  public _id?: Types.ObjectId;
  public name: string;

  constructor(name: string, _id?: Types.ObjectId) {
    this._id = _id;
    this.name = name;
  }
}

export default RoomDto;
