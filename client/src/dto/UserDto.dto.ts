class UserDto {
  public _id?: string;
  public username: string;
  public email?: string;
  public password?: string;

  constructor(
    username: string,
    email?: string,
    password?: string,
    _id?: string
  ) {
    this._id = _id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

export default UserDto;
