import express from 'express';
const router = express.Router();

router.get('/overview', (_req, res) => res.json({ data: {} }));
router.get('/stats', (_req, res) => res.json({ data: {} }));
router.get('/pending-registrations', (_req, res) => res.json({ data: [], meta: {} }));

export default router;
/**
 * Copilot: Define admin dashboard routes (auth required).
 */
import { Router } from "express";
export const adminDashboardRouter = Router();
// TODO
