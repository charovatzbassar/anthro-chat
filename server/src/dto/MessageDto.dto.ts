import { Types } from "mongoose";

class MessageDto {
  constructor(
    public text: string,
    public room: Types.ObjectId,
    public user: Types.ObjectId,
    public _id?: Types.ObjectId
  ) {}
}

export default MessageDto;
