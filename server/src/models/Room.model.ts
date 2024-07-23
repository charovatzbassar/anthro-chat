import { RoomDto } from "@/dto";
import mongoose from "mongoose";
const { model, Schema } = mongoose;

const roomSchema = new Schema<RoomDto>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

export default model<RoomDto>("Room", roomSchema);
