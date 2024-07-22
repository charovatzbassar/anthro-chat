import { UserService } from "@/services";
import { catchAsync } from "@/utils";
import express, { Request, Response } from "express";
import { Router } from "express";

const router: Router = express.Router();

const userService: UserService = new UserService();

router
  .route("/")
  .get(
    catchAsync(async (req: Request, res: Response) => {
      const users = await userService.getAll();
      res.json(users);
    })
  )
  .post(
    catchAsync(async (req: Request, res: Response) => {
      const { username, password, email } = req.body;

      const newUser = await userService.create({ username, password, email });

      res.json(newUser);
    })
  );

router
  .route("/:id")
  .get(
    catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;

      const user = await userService.getById(id);

      res.json(user);
    })
  )
  .put(
    catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;
      const { username, password, email } = req.body;

      const updatedUser = await userService.update(id, {
        username,
        password,
        email,
      });

      res.json(updatedUser);
    })
  )
  .delete(
    catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;

      const deletedUser = await userService.delete(id);

      res.json(deletedUser);
    })
  );

export default router;
