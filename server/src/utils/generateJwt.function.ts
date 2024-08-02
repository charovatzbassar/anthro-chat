import { UserDto } from "@/dto";
import { sign } from "jsonwebtoken";

const generateJwt = (
  payload: UserDto,
  expiresIn: string | number = "1h"
): string => {
  return sign({
    _id: payload._id,
    username: payload.username,
    email: payload.email,
  }, process.env.JWT_SECRET || "secret", { expiresIn });
};

export default generateJwt;
