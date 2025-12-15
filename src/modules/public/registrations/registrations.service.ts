import * as toursRepo from '../tours/tours.repository';
import * as repo from './registrations.repository';
import { ApiError } from '../../../utils/errors';

export const createRegistration = async (payload: any) => {
  const tour = await toursRepo.getTourById(payload.tourId) as any;
  if (!tour) throw new ApiError(404,'NOT_FOUND','Tour not found');
  if (tour.status === 'CLOSED') throw new ApiError(409,'TOUR_CLOSED','Tour này đã đóng đăng ký');
  const now = new Date().toISOString();
  const record = {
    tourId: payload.tourId,
    tourName: tour.name,
    customerName: payload.customerName,
    phone: payload.phone,
    numberOfPeople: payload.numberOfPeople,
    note: payload.note || '',
    contacted: false,
    createdAt: now,
    updatedAt: now,
  };
  return repo.createRegistration(record);
};

export default { createRegistration };
/**
 * Copilot: Implement this file according to:
 * - docs/00_COPILOT_MASTER_CONTEXT.md
 * - docs/03_API_CONTRACTS.md
 * - docs/05_ERROR_HANDLING.md
 * Use Express + TypeScript + Firestore repository pattern.
 */
export {};
