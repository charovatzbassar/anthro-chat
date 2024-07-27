import { Types } from "mongoose";

class UserDto {
  constructor(
    public username: string,
    public email?: string,
    public password?: string,
    public _id?: Types.ObjectId
  ) {
    this._id = _id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

export default UserDto;
