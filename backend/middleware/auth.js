import jwt from 'jsonwebtoken';
import { HttpError } from './errorHandler.js';

const secret = () => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not set');
  return process.env.JWT_SECRET;
};
export const signToken = email => jwt.sign({ email, role: 'admin' }, secret(), { expiresIn: '8h' });

export const requireAdmin = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return next(new HttpError(401, 'Please log in.'));
  try { req.admin = jwt.verify(token, secret()); next(); }
  catch { next(new HttpError(401, 'Session expired. Please log in again.')); }
};
