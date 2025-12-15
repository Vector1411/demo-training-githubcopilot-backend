import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const signToken = (payload: any, expiresIn = env.JWT_EXPIRES_IN) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET) as any;
};
