// Async Handler Type
import { Request, Response, NextFunction } from "express";

export type AsyncRouteHandler<B = undefined | any, P = any, Q = any> = (
  req: Request<P, any, B, Q>,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any>> | any;

// Error Handler Type
export type ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

// Express
import * as Express from "express-serve-static-core";
import { UserType } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      customField?: string;
      user: UserType;
    }
  }
}
