import { MessageModel } from "@/models";
import { MessageDto } from "@/dto";

class MessageService {
  public async createMessage(messageDto: MessageDto) {
    const message = await MessageModel.create(messageDto);
    return message;
  }

  public async getMessagesByRoom(room: string): Promise<MessageDto[]> {
    const messages = await MessageModel.find({ room });
    return messages;
  }

  public async getMessagesByUser(user: string): Promise<MessageDto[]> {
    const messages = await MessageModel.find({ user });
    return messages;
  }

  public async deleteMessage(id: string) {
    const message = await MessageModel.findByIdAndDelete(id);
    return message;
  }

  public async updateMessage(id: string, messageDto: MessageDto) {
    const message = await MessageModel.findByIdAndUpdate(id, messageDto, {
      new: true,
    });
    return message;
  }
}

export default MessageService;
