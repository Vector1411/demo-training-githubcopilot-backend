/**
 * Copilot: Add requestId to req and response.
 */
import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const incoming = req.header("X-Request-Id");
  const id = incoming || `req_${randomUUID()}`;
  (req as any).requestId = id;
  res.setHeader("X-Request-Id", id);
  next();
};
