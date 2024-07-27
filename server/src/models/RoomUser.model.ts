import { RoomUserDto } from "@/dto";
import { model, Schema } from "mongoose";

const roomUserSchema = new Schema<RoomUserDto>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
});

export default model<RoomUserDto>("RoomUser", roomUserSchema);
