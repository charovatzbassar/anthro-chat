import { MessageService } from "@/services";
import { catchAsync } from "@/utils";
import express, { Request, Response } from "express";
import { Router } from "express";

const router: Router = express.Router();

const messageService: MessageService = new MessageService();

router
  .route("/")
  .get(
    catchAsync(async (req: Request, res: Response) => {
      const messages = await messageService.getAll();
      res.json(messages);
    })
  )
  .post(
    catchAsync(async (req: Request, res: Response) => {
      const { text, room, user } = req.body;

      const newMessage = await messageService.create({ text, room, user });

      res.json(newMessage);
    })
  );

router
  .route("/:id")
  .get(
    catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;

      const message = await messageService.getById(id);

      res.json(message);
    })
  )
  .put(
    catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;
      const { text, room, user } = req.body;

      const updatedMessage = await messageService.update(id, {
        text,
        room,
        user,
      });

      res.json(updatedMessage);
    })
  )
  .delete(
    catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;

      const deletedMessage = await messageService.delete(id);

      res.json(deletedMessage);
    })
  );

export default router;
