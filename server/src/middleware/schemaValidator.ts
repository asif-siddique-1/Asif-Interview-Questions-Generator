import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from '../utils/AppError';

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.errors
        .map((e) => `${e.path.join('.')} is ${e.message}`)
        .join(', ');
      return next(new AppError(`Validation Error: ${errors}`, 400));
    }

    req.body = result.data;
    next();
  };
