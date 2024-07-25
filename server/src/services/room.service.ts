import { RoomModel, RoomUserModel } from "@/models";
import { RoomDto } from "@/dto";
import { BaseService } from "./BaseService";
import { Types } from "mongoose";

class RoomService implements BaseService<RoomDto> {
  public create = async (data: RoomDto): Promise<RoomDto> =>
    await RoomModel.create(data);

  public delete = async (id: string): Promise<RoomDto | null> =>
    await RoomModel.findByIdAndDelete(id);

  public update = async (id: string, data: RoomDto): Promise<RoomDto | null> =>
    await RoomModel.findByIdAndUpdate(id, data, {
      new: true,
    });

  public getAll = async (): Promise<RoomDto[]> => await RoomModel.find();

  public getById = async (id: string): Promise<RoomDto | null> =>
    await RoomModel.findById(id);

  public getByName = async (name: string): Promise<RoomDto | null> =>
    await RoomModel.findOne({ name });

  public getByUser = async (userId: string): Promise<Types.ObjectId[]> => {
    const userRooms = await RoomUserModel.find({ user: userId }).populate(
      "room"
    );

    return userRooms.map((roomUser) => roomUser.room);
  };
}

export default RoomService;
