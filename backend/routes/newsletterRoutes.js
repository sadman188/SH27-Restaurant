import { Router } from 'express';
import { subscribe, listSubscribers } from '../controllers/newsletterController.js';
import { requireAdmin } from '../middleware/auth.js';
import { formLimiter } from '../middleware/rateLimit.js';
import { validateNewsletter } from '../middleware/validate.js';

const r = Router();
r.post('/', formLimiter, validateNewsletter, subscribe);
r.get('/', requireAdmin, listSubscribers);
export default r;
