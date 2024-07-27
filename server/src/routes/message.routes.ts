import { MessageController } from "@/controllers";
import { MessageService } from "@/services";
import { catchAsync } from "@/utils";
import express from "express";
import { Router } from "express";

const router: Router = express.Router();

const controller: MessageController = new MessageController(
  new MessageService()
);

router
  .route("/")
  .get(catchAsync(controller.getAll))
  .post(catchAsync(controller.create));

router
  .route("/:id")
  .get(catchAsync(controller.getById))
  .put(catchAsync(controller.update))
  .delete(catchAsync(controller.delete));

export default router;
