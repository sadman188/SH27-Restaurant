import { Router } from 'express';
import { login } from '../controllers/authController.js';
import { loginLimiter } from '../middleware/rateLimit.js';
import { validateLogin } from '../middleware/validate.js';

const r = Router();
r.post('/login', loginLimiter, validateLogin, login);
export default r;
