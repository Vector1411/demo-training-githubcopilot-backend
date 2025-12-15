import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ApiError } from '../utils/errors';

export const validate = (schema: ZodSchema<any>, where: 'body'|'params'|'query' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const target = (req as any)[where];
    const result = schema.safeParse(target);
    if (!result.success) {
      const details = result.error.errors.map(e => ({ field: e.path.join('.'), issue: e.message }));
      return next(new ApiError(400, 'VALIDATION_ERROR', 'Validation failed', details));
    }
    // attach parsed
    (req as any)[where] = result.data;
    next();
  };
};

export default validate;
