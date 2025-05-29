import { Request, Response } from 'express';
import { AppError } from './AppError';
import logger from './logger';

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: Function,
) => {
  logger.error(
    `${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );

  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message || 'Something went wrong',
  });
};
