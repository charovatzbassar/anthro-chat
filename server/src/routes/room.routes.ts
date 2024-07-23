import { RoomService } from "@/services";
import { catchAsync } from "@/utils";
import express, { Request, Response } from "express";
import { Router } from "express";

const router: Router = express.Router();

const roomService: RoomService = new RoomService();

router
  .route("/")
  .get(
    catchAsync(async (req: Request, res: Response) => {
      const rooms = await roomService.getAll();
      res.json(rooms);
    })
  )
  .post(
    catchAsync(async (req: Request, res: Response) => {
      const { name } = req.body;

      const newRoom = await roomService.create({ name });

      res.json(newRoom);
    })
  );

router
  .route("/:id")
  .get(
    catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;

      const room = await roomService.getById(id);

      res.json(room);
    })
  )
  .put(
    catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;
      const { name } = req.body;

      const updatedRoom = await roomService.update(id, {
        name,
      });

      res.json(updatedRoom);
    })
  )
  .delete(
    catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;

      const deletedRoom = await roomService.delete(id);

      res.json(deletedRoom);
    })
  );

export default router;
