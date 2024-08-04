import { UserService } from "@/services";
import { Request, Response } from "express";

class UserController {
  constructor(private userService: UserService) {}

  getAll = async (req: Request, res: Response) => {
    const { username, room } = req.query;

    if (username) {
      const user = await this.userService.getByUsername(username as string);
      return res.json(user);
    }

    if (room) {
      const users = await this.userService.getByRoomId(room as string);
      return res.json(users);
    }

    const users = await this.userService.getAll();
    res.json(users);
  };

  create = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    const existingUser = await this.userService.getByUsername(username);

    if (existingUser) {
      return res.json(existingUser);
    }

    const newUser = await this.userService.create({
      username,
      password,
      email,
    });

    res.json(newUser);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await this.userService.getById(id);

    res.json(user);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password, email } = req.body;

    const updatedUser = await this.userService.update(id, {
      username,
      password,
      email,
    });

    res.json(updatedUser);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedUser = await this.userService.delete(id);

    res.json(deletedUser);
  };

  joinRoom = async (req: Request, res: Response) => {
    const { userId, roomId } = req.body;

    const roomUser = await this.userService.joinRoom(userId, roomId);

    res.json(roomUser);
  };

}

export default UserController;
