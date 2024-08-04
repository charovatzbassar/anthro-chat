class UserDto {
  constructor(
    public username: string,
    public email?: string,
    public password?: string,
    public token?: string,
    public _id?: string
  ) {}
}

export default UserDto;
