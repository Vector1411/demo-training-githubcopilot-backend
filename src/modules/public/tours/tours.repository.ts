import { db } from '../../../config/firebase';

export const listPublicTours = async (filters: any, page = 1, pageSize = 10) => {
  const col = db().collection('tours');
  // enforce OPEN status
  let q: any = col.where('status','==','OPEN');
  if (filters.location) q = q.where('location','==',filters.location);
  // basic name contains using simple client-side filter (Firestore doesn't support contains easily)
  const snap = await q.orderBy('startDate','desc').offset((page-1)*pageSize).limit(pageSize).get();
  const items = snap.docs.map((d: any) => ({ id: d.id, ...d.data() }));
  // total count approximation: use separate count query if needed; here we omit total to keep simple
  return { items, meta: { page, pageSize } };
};

export const getTourById = async (tourId: string) => {
  const doc = await db().collection('tours').doc(tourId).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...(doc.data() as any) } as any;
};

export default { listPublicTours, getTourById };
/**
 * Copilot: Implement this file according to:
 * - docs/00_COPILOT_MASTER_CONTEXT.md
 * - docs/03_API_CONTRACTS.md
 * - docs/05_ERROR_HANDLING.md
 * Use Express + TypeScript + Firestore repository pattern.
 */
export {};
