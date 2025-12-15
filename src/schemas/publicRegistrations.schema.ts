import { z } from 'zod';

export const registrationSchema = z.object({
  tourId: z.string(),
  customerName: z.string().min(2).max(100),
  phone: z.string().regex(/^[0-9]{9,11}$/),
  numberOfPeople: z.coerce.number().min(1),
  note: z.string().max(500).optional(),
});

export type RegistrationBody = z.infer<typeof registrationSchema>;
/**
 * Copilot: Define zod schemas for this module.
 * Must align with docs/03_API_CONTRACTS.md and API specs.
 */
