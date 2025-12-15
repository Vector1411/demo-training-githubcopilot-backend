import express from 'express';
import { createController } from './registrations.controller';
import { validate } from '../../../middlewares/validate';
import { registrationSchema } from '../../../schemas/publicRegistrations.schema';

const router = express.Router();
router.post('/', validate(registrationSchema, 'body'), createController);

export default router;
/**
 * Copilot: Define public registrations route.
 * POST /api/public/registrations
 */
import { Router } from "express";
export const publicRegistrationsRouter = Router();
// TODO
