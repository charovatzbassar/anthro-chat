import { MessageModel } from "@/models";
import { MessageDto } from "@/dto";
import { BaseService } from "./BaseService";

class MessageService implements BaseService<MessageDto> {
  public create = async (data: MessageDto): Promise<MessageDto> =>
    await MessageModel.create(data);

  public delete = async (id: string): Promise<MessageDto | null> =>
    await MessageModel.findByIdAndDelete(id);

  public update = async (
    id: string,
    data: MessageDto
  ): Promise<MessageDto | null> =>
    await MessageModel.findByIdAndUpdate(id, data, {
      new: true,
    })
      .populate("user")
      .populate("room");

  public getAll = async (): Promise<MessageDto[]> =>
    await MessageModel.find().populate("user").populate("room");

  public getById = async (id: string): Promise<MessageDto | null> =>
    await MessageModel.findById(id).populate("user").populate("room");

  public getByRoom = async (room: string): Promise<MessageDto[]> =>
    await MessageModel.find({ room }).populate("user").populate("room");
}

export default MessageService;
