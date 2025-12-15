import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginBody = z.infer<typeof loginSchema>;
/**
 * Copilot: Define zod schemas for this module.
 * Must align with docs/03_API_CONTRACTS.md and API specs.
 */
