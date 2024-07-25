class RoomDto {
  public _id?: string;
  public name: string;

  constructor(name: string, _id?: string) {
    this._id = _id;
    this.name = name;
  }
}

export default RoomDto;
