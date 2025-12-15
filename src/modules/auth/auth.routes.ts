import express from 'express';
import { loginController } from './auth.controller';
import { validate } from '../../middlewares/validate';
import { loginSchema } from '../../schemas/auth.schema';

const router = express.Router();
router.post('/login', validate(loginSchema, 'body'), loginController);

export default router;
/**
 * Copilot: Define /api/admin/auth/login route.
 */
import { Router } from "express";
export const authRouter = Router();
// TODO: router.post("/login", ...)
