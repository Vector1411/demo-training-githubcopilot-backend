import { db } from '../../config/firebase';
import bcrypt from 'bcryptjs';
import { signToken } from '../../utils/jwt';
import { ApiError } from '../../utils/errors';

export const login = async (email: string, password: string) => {
  const ref = db().collection('admin_users').where('email','==',email).limit(1);
  const snap = await ref.get();
  if (snap.empty) throw new ApiError(401,'INVALID_CREDENTIALS','Email hoặc mật khẩu không đúng');
  const doc = snap.docs[0];
  const data = doc.data() as any;
  if (!data.isActive) throw new ApiError(403,'FORBIDDEN','Tài khoản bị khoá');
  const ok = await bcrypt.compare(password, data.passwordHash || '');
  if (!ok) throw new ApiError(401,'INVALID_CREDENTIALS','Email hoặc mật khẩu không đúng');
  const user = { id: doc.id, email: data.email, roles: data.roles||['ROLE_ADMIN'], name: data.name };
  const token = signToken(user);
  return { accessToken: token, tokenType: 'Bearer', expiresIn: undefined, user };
};

export default { login };
/**
 * Copilot: Implement this file according to:
 * - docs/00_COPILOT_MASTER_CONTEXT.md
 * - docs/03_API_CONTRACTS.md
 * - docs/05_ERROR_HANDLING.md
 * Use Express + TypeScript + Firestore repository pattern.
 */
export {};
