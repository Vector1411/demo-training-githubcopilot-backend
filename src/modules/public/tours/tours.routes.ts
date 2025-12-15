import express from 'express';
import { listController, getController } from './tours.controller';
import { validate } from '../../../middlewares/validate';
import { listToursQuery, paramsTourId } from '../../../schemas/publicTours.schema';

const router = express.Router();

router.get('/', validate(listToursQuery, 'query'), listController);
router.get('/:tourId', validate(paramsTourId, 'params'), getController);

export default router;
/**
 * Copilot: Define public tours routes.
 * GET /api/public/tours
 * GET /api/public/tours/:tourId
 */
import { Router } from "express";
export const publicToursRouter = Router();
// TODO
