import { Request, Response, NextFunction } from 'express';
import { randomBytes } from 'crypto';

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const id = req.headers['x-request-id'] || randomBytes(6).toString('hex');
  res.locals.requestId = id;
  res.setHeader('x-request-id', String(id));
  next();
};

export default requestIdMiddleware;
