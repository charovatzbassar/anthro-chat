class RoomDto {
  constructor(public name: string, public _id?: string) {
    this._id = _id;
    this.name = name;
  }
}

export default RoomDto;
