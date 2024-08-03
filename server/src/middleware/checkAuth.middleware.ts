import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = verify(token, process.env.JWT_SECRET!);
    req.body.user = decoded;
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

export default checkAuth;
