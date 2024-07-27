import { MessageService } from "@/services";
import { Request, Response } from "express";

class MessageController {
  constructor(private messageService: MessageService) {
    this.messageService = messageService;
  }

  getAll = async (req: Request, res: Response) => {
    const { room } = req.query;

    if (room) {
      const messages = await this.messageService.getByRoom(room as string);
      return res.json(messages);
    }

    const messages = await this.messageService.getAll();
    return res.json(messages);
  };

  create = async (req: Request, res: Response) => {
    const { text, room, user } = req.body;

    const newMessage = await this.messageService.create({ text, room, user });

    res.json(newMessage);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const message = await this.messageService.getById(id);

    res.json(message);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { text, room, user } = req.body;

    const updatedMessage = await this.messageService.update(id, {
      text,
      room,
      user,
    });

    res.json(updatedMessage);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedMessage = await this.messageService.delete(id);

    res.json(deletedMessage);
  };
}

export default MessageController;
