/**
 * Copilot: Validate req.query/params/body by zod schema.
 */
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { ApiError } from "../utils/errors";

export const validate = (schema: { query?: ZodSchema; params?: ZodSchema; body?: ZodSchema }) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schema.query) (req as any).query = schema.query.parse(req.query);
      if (schema.params) (req as any).params = schema.params.parse(req.params);
      if (schema.body) (req as any).body = schema.body.parse(req.body);
      next();
    } catch (e: any) {
      const details = e?.errors?.map((x: any) => ({ field: x.path?.join(".") || "unknown", issue: x.message })) || [];
      next(new ApiError(400, "VALIDATION_ERROR", "Dữ liệu đầu vào không hợp lệ", details));
    }
  };
};
