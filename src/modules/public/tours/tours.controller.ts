import { Request, Response, NextFunction } from 'express';
import * as service from './tours.service';
import { ok } from '../../../utils/response';

export const listController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const q = req.query;
    const page = Number(q.page) || 1;
    const pageSize = Number(q.pageSize) || 10;
    const result = await service.listTours(q, page, pageSize);
    return ok(res, result.items, result.meta);
  } catch (e) { next(e); }
};

export const getController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tourId } = req.params as any;
    const t = await service.getTour(tourId);
    return ok(res, t);
  } catch (e) { next(e); }
};

export default { listController, getController };
/**
 * Copilot: Implement this file according to:
 * - docs/00_COPILOT_MASTER_CONTEXT.md
 * - docs/03_API_CONTRACTS.md
 * - docs/05_ERROR_HANDLING.md
 * Use Express + TypeScript + Firestore repository pattern.
 */
export {};
