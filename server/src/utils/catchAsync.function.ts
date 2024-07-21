import { NextFunction, Request, Response } from "express";

export const catchAsync = (func: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((e: Error) => next(e));
  };
};
