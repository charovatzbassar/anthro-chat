import { Types } from "mongoose";

class MessageDto {
  public _id?: Types.ObjectId;
  public text: string;
  public room: Types.ObjectId;
  public user: Types.ObjectId;

  constructor(data: MessageDto) {
    this._id = data._id;
    this.text = data.text;
    this.room = data.room;
    this.user = data.user;
  }
}

export default MessageDto;
