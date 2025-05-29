import { NextFunction, Request, Response } from 'express';

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      requestTime?: string;
    }
  }
}

export const requestTime = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.requestTime = new Date().toISOString();
  next();
};
