import { UserDto } from "@/dto";
import { sign } from "jsonwebtoken";

const generateJwt = (payload: UserDto): string => {
  return sign(
    {
      _id: payload._id,
      username: payload.username,
      email: payload.email,
    },
    process.env.JWT_SECRET || "secret"
  );
};

export default generateJwt;
