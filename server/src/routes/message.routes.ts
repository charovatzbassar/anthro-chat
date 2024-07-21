import express, { Request, Response } from "express";
import { Router } from "express";

const router: Router = express.Router();

router
  .route("/")
  .get((req: Request, res: Response) => {
    res.send("All messages");
  })
  .post((req: Request, res: Response) => {
    res.send("Create a message");
  });

router
  .route("/:id")
  .get((req: Request, res: Response) => {
    res.send(`Message with id ${req.params.id}`);
  })
  .put((req: Request, res: Response) => {
    res.send(`Update message with id ${req.params.id}`);
  })
  .delete((req: Request, res: Response) => {
    res.send(`Delete message with id ${req.params.id}`);
  });

export default router;
