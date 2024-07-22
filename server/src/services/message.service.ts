import { MessageModel } from "@/models";
import { MessageDto } from "@/dto";
import { BaseService } from "./BaseService";

class MessageService implements BaseService<MessageDto> {
  public async create(data: MessageDto): Promise<MessageDto> {
    const message = await MessageModel.create(data);
    return message;
  }

  public async delete(id: string): Promise<MessageDto | null> {
    const message = await MessageModel.findByIdAndDelete(id);
    return message;
  }

  public async update(
    id: string,
    data: MessageDto
  ): Promise<MessageDto | null> {
    const message = await MessageModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return message;
  }

  public async getAll(): Promise<MessageDto[]> {
    const messages = await MessageModel.find();
    return messages;
  }

  public async getById(id: string): Promise<MessageDto | null> {
    const message = await MessageModel.findById(id);
    return message;
  }
}

export default MessageService;
