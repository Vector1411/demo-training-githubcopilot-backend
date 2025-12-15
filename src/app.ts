import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { requestIdMiddleware } from './middlewares/requestId';
import { errorMiddleware } from './middlewares/error.middleware';
import publicToursRouter from './modules/public/tours/tours.routes';
import publicRegistrationsRouter from './modules/public/registrations/registrations.routes';
import authRouter from './modules/auth/auth.routes';
import adminToursRouter from './modules/admin/tours/tours.routes';
import adminRegistrationsRouter from './modules/admin/registrations/registrations.routes';
import adminDashboardRouter from './modules/admin/dashboard/dashboard.routes';
import { authMiddleware } from './middlewares/auth.middleware';
import { requireRoles } from './middlewares/requireRoles';

export const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(requestIdMiddleware);

  // Public routes
  app.use('/api/public/tours', publicToursRouter);
  app.use('/api/public/registrations', publicRegistrationsRouter);

  // Auth (login)
  app.use('/api/admin/auth', authRouter);

  // Admin routes - require auth
  app.use('/api/admin/dashboard', authMiddleware, requireRoles(['ROLE_ADMIN','ROLE_STAFF']), adminDashboardRouter);
  app.use('/api/admin/tours', authMiddleware, requireRoles(['ROLE_ADMIN','ROLE_STAFF']), adminToursRouter);
  app.use('/api/admin/registrations', authMiddleware, requireRoles(['ROLE_ADMIN','ROLE_STAFF']), adminRegistrationsRouter);

  // Error handler
  app.use(errorMiddleware);

  return app;
};

export default createApp;

