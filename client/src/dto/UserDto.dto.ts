class UserDto {
  public _id?: string;
  public username: string;
  public email?: string;
  public password?: string;

  constructor(data: UserDto) {
    this._id = data._id;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
  }
}

export default UserDto;
