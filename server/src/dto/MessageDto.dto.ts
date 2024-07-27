import { Types } from "mongoose";

class MessageDto {
  constructor(
    public text: string,
    public room: Types.ObjectId,
    public user: Types.ObjectId,
    public _id?: Types.ObjectId
  ) {
    this._id = _id;
    this.text = text;
    this.room = room;
    this.user = user;
  }
}

export default MessageDto;
