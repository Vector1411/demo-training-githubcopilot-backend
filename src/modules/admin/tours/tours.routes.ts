import express from 'express';
const router = express.Router();

// Minimal placeholders to satisfy routing; full implementations can be added later.
router.get('/', (_req, res) => res.json({ data: [], meta: {} }));
router.post('/', (_req, res) => res.status(201).json({ data: {} }));
router.put('/:tourId', (_req, res) => res.json({ data: {} }));
router.put('/:tourId/status', (_req, res) => res.json({ data: {} }));

export default router;
/**
 * Copilot: Define admin tours routes (auth required).
 */
import { Router } from "express";
export const adminToursRouter = Router();
// TODO
