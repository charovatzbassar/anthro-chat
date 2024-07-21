import { Types } from "mongoose";

interface MessageDto {
  _id: Types.ObjectId;
  text: string;
  room: string;
  user: Types.ObjectId;
}

export default MessageDto;
