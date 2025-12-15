import { Request, Response, NextFunction } from 'express';
import { mapError, ApiError } from '../utils/errors';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const mapped = mapError(err);
  const payload: any = {
    code: mapped.code,
    message: mapped.message,
    requestId: res.locals.requestId || null,
  };
  if (mapped.details) payload.details = mapped.details;
  res.status(mapped.status || 500).json({ error: payload });
};

export default errorMiddleware;
 