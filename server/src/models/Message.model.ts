import { MessageDto } from "@/dto";
import mongoose from "mongoose";
const { model, Schema } = mongoose;

const messageSchema = new Schema<MessageDto>({
  text: {
    type: String,
    unique: true,
    required: true,
  },
  room: {
    type: String,
    unique: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default model<MessageDto>("Message", messageSchema);
