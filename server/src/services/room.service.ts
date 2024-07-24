import { RoomModel } from "@/models";
import { RoomDto } from "@/dto";
import { BaseService } from "./BaseService";

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
}

export default RoomService;
