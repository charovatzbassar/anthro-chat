import { RoomService } from "@/services";
import { Request, Response } from "express";

class RoomController {
  constructor(private roomService: RoomService) {
  }

  getAll = async (req: Request, res: Response) => {
    const { name, user } = req.query;

    if (name) {
      const room = await this.roomService.getByName(name as string);
      return res.json(room);
    }

    if (user) {
      const rooms = await this.roomService.getByUser(user as string);
      return res.json(rooms);
    }

    const rooms = await this.roomService.getAll();
    res.json(rooms);
  };

  create = async (req: Request, res: Response) => {
    const { name } = req.body;

    const existingRoom = await this.roomService.getByName(name);

    if (existingRoom) {
      return res.json(existingRoom);
    }

    const newRoom = await this.roomService.create({ name });

    res.json(newRoom);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { count } = req.query;

    if (count) {
      const userCount = await this.roomService.getRoomUserCount(id);
      return res.json(userCount);
    }

    const room = await this.roomService.getById(id);

    res.json(room);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    const updatedRoom = await this.roomService.update(id, {
      name,
    });

    res.json(updatedRoom);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedRoom = await this.roomService.delete(id);

    res.json(deletedRoom);
  };
}

export default RoomController;
