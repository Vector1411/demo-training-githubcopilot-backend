import { db } from '../../../config/firebase';

export const createRegistration = async (payload: any) => {
  const col = db().collection('registrations');
  const docRef = await col.add(payload);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
};

export const listRegistrationsByTour = async (tourId: string) => {
  const snap = await db().collection('registrations').where('tourId','==',tourId).get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export default { createRegistration, listRegistrationsByTour };
/**
 * Copilot: Implement this file according to:
 * - docs/00_COPILOT_MASTER_CONTEXT.md
 * - docs/03_API_CONTRACTS.md
 * - docs/05_ERROR_HANDLING.md
 * Use Express + TypeScript + Firestore repository pattern.
 */
export {};
