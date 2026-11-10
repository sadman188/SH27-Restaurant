import { Router } from 'express';
import { sendMessage, listMessages } from '../controllers/contactController.js';
import { requireAdmin } from '../middleware/auth.js';
import { formLimiter } from '../middleware/rateLimit.js';
import { validateContact } from '../middleware/validate.js';

const r = Router();
r.post('/', formLimiter, validateContact, sendMessage);
r.get('/', requireAdmin, listMessages);
export default r;
