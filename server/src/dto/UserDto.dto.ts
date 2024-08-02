import { Types } from "mongoose";

class UserDto {
  constructor(
    public username: string,
    public email?: string,
    public password?: string,
    public _id?: Types.ObjectId
  ) {}
}

export default UserDto;
