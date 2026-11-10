import crypto from 'node:crypto';
import { signToken } from '../middleware/auth.js';
import { asyncHandler, HttpError } from '../middleware/errorHandler.js';

const digest = s => crypto.createHash('sha256').update(String(s)).digest();
const same = (a, b) => crypto.timingSafeEqual(digest(a), digest(b));

// Single admin account defined in .env (ADMIN_EMAIL / ADMIN_PASSWORD)
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.valid;
  const okEmail = same(email, (process.env.ADMIN_EMAIL || '').toLowerCase());
  const okPass = process.env.ADMIN_PASSWORD ? same(password, process.env.ADMIN_PASSWORD) : false;
  if (!okEmail || !okPass) throw new HttpError(401, 'Incorrect email or password.');
  res.json({ token: signToken(email) });
});
