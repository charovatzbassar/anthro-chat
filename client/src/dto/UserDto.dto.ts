class UserDto {
  constructor(
    public username: string,
    public email?: string,
    public password?: string,
    public _id?: string
  ) {
    this._id = _id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

export default UserDto;
