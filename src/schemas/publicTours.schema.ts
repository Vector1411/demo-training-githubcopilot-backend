import { z } from 'zod';

export const listToursQuery = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(10),
  sort: z.string().optional(),
});

export const paramsTourId = z.object({ tourId: z.string() });
/**
 * Copilot: Define zod schemas for this module.
 * Must align with docs/03_API_CONTRACTS.md and API specs.
 */
