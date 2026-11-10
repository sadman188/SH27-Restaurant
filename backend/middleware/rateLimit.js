import rateLimit from 'express-rate-limit';

const base = { standardHeaders: true, legacyHeaders: false };
export const apiLimiter = rateLimit({ ...base, windowMs: 15 * 60 * 1000, limit: 300,
  message: { message: 'Too many requests. Please try again later.' } });
// Stricter limit for public forms (spam protection)
export const formLimiter = rateLimit({ ...base, windowMs: 15 * 60 * 1000, limit: 10,
  message: { message: 'Too many submissions. Please try again in a few minutes.' } });
export const loginLimiter = rateLimit({ ...base, windowMs: 15 * 60 * 1000, limit: 8,
  message: { message: 'Too many login attempts. Please try again later.' } });
