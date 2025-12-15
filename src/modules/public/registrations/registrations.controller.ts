import { Request, Response, NextFunction } from 'express';
import { createRegistration } from './registrations.service';
import { created } from '../../../utils/response';

export const createController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const resRec = await createRegistration(body);
    return created(res, resRec);
  } catch (e) { next(e); }
};

export default { createController };
/**
 * Copilot: Implement this file according to:
 * - docs/00_COPILOT_MASTER_CONTEXT.md
 * - docs/03_API_CONTRACTS.md
 * - docs/05_ERROR_HANDLING.md
 * Use Express + TypeScript + Firestore repository pattern.
 */
export {};
