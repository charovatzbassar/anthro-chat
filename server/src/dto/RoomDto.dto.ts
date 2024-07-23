import { Types } from "mongoose";

class RoomDto {
  public _id?: Types.ObjectId;
  public name: string;

  constructor(data: RoomDto) {
    this._id = data._id;
    this.name = data.name;
  }
}

export default RoomDto;
