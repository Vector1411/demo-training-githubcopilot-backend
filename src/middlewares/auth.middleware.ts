import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { ApiError } from '../utils/errors';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) return next(new ApiError(401, 'UNAUTHORIZED', 'Missing Authorization header'));
  const parts = auth.split(' ');
  if (parts.length !== 2) return next(new ApiError(401, 'UNAUTHORIZED', 'Invalid Authorization header'));
  const token = parts[1];
  try {
    const payload = verifyToken(token);
    (req as any).user = payload;
    next();
  } catch (e: any) {
    return next(new ApiError(401, 'UNAUTHORIZED', 'Invalid token'));
  }
};

export default authMiddleware;
 