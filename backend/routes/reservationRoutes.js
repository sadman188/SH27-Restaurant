import { Router } from 'express';
import { createReservation, listReservations, updateStatus } from '../controllers/reservationController.js';
import { requireAdmin } from '../middleware/auth.js';
import { formLimiter } from '../middleware/rateLimit.js';
import { validateReservation, validateStatus } from '../middleware/validate.js';

const r = Router();
r.post('/', formLimiter, validateReservation, createReservation);
r.get('/', requireAdmin, listReservations);
r.patch('/:id/status', requireAdmin, validateStatus, updateStatus);
export default r;
