import * as repo from './tours.repository';
import { ApiError } from '../../../utils/errors';

export const listTours = async (filters: any, page = 1, pageSize = 10) => {
  return repo.listPublicTours(filters, page, pageSize);
};

export const getTour = async (tourId: string) => {
  const t = await repo.getTourById(tourId) as any;
  if (!t || t.status !== 'OPEN') throw new ApiError(404,'NOT_FOUND','Tour not found');
  return t as any;
};

export default { listTours, getTour };
/**
 * Copilot: Implement this file according to:
 * - docs/00_COPILOT_MASTER_CONTEXT.md
 * - docs/03_API_CONTRACTS.md
 * - docs/05_ERROR_HANDLING.md
 * Use Express + TypeScript + Firestore repository pattern.
 */
export {};
