import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => res.json({ data: [], meta: {} }));
router.get('/:registrationId', (_req, res) => res.json({ data: {} }));
router.put('/:registrationId', (_req, res) => res.json({ data: {} }));

export default router;
/**
 * Copilot: Define admin registrations routes (auth required).
 */
import { Router } from "express";
export const adminRegistrationsRouter = Router();
// TODO
