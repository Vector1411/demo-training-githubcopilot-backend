/**
 * Copilot: Role-based access control.
 */
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errors";

export const requireRoles = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user as { roles?: string[] } | undefined;
    const userRoles = user?.roles || [];
    const ok = roles.length === 0 || roles.some(r => userRoles.includes(r));
    if (!ok) return next(new ApiError(403, "FORBIDDEN", "Bạn không có quyền thực hiện thao tác này"));
    next();
  };
};
