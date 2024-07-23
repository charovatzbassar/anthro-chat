import { NextFunction, Request, Response } from "express";

const catchAsync = (func: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((e: Error) => next(e));
  };
};

export default catchAsync;