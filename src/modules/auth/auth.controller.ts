import { Request, Response, NextFunction } from 'express';
import { login } from './auth.service';
import { ok } from '../../utils/response';

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    return ok(res, result);
  } catch (e) {
    next(e);
  }
};

export default { loginController };
/**
 * Copilot: Implement this file according to:
 * - docs/00_COPILOT_MASTER_CONTEXT.md
 * - docs/03_API_CONTRACTS.md
 * - docs/05_ERROR_HANDLING.md
 * Use Express + TypeScript + Firestore repository pattern.
 */
export {};
