import { AuthController } from "@/controllers";
import { AuthService, UserService } from "@/services";
import { catchAsync } from "@/utils";
import express from "express";
import { Router } from "express";

const router: Router = express.Router();

const controller: AuthController = new AuthController(
  new AuthService(new UserService())
);

router.route("/login").post(catchAsync(controller.login));

router.route("/register").post(catchAsync(controller.register));

export default router;
