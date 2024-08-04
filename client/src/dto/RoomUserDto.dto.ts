class RoomUserDto {
  constructor(
    public userId: string,
    public roomId: string,
    public _id?: string
  ) {}
}

export default RoomUserDto;