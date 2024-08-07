import { UserDto } from "@/dto";
import mongoose from "mongoose";
const { model, Schema } = mongoose;

const userSchema = new Schema<UserDto>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
    // match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    // required: true,
  },
});

export default model<UserDto>("User", userSchema);
