import { MessageDto } from "@/dto";
import { model, Schema } from "mongoose";

const messageSchema = new Schema<MessageDto>({
  text: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default model<MessageDto>("Message", messageSchema);
