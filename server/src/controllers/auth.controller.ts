import { AuthService } from "@/services";
import { Request, Response } from "express";

class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await this.authService.login({ username, password });

    res.json(user);
  };

  register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const user = await this.authService.register({ username, password, email });

    res.json(user);
  };
}

export default AuthController;
