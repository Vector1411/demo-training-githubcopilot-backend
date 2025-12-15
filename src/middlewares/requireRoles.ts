import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/errors';

export const requireRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return next(new ApiError(401, 'UNAUTHORIZED', 'Missing user'));
    const userRoles: string[] = user.roles || [];
    const ok = roles.some(r => userRoles.includes(r));
    if (!ok) return next(new ApiError(403, 'FORBIDDEN', 'Insufficient role'));
    next();
  };
};

export default requireRoles;
