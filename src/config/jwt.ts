/**
 * Copilot: JWT helper to sign/verify tokens.
 */
import jwt from "jsonwebtoken";
import { env } from "./env";

export type JwtUser = { id: string; email: string; roles: string[]; name?: string };

export const signToken = (user: JwtUser) => {
  return jwt.sign(user, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET) as JwtUser;
};
