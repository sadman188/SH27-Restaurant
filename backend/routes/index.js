import { Router } from 'express';
import menu from './menuRoutes.js';
import reservations from './reservationRoutes.js';
import contact from './contactRoutes.js';
import newsletter from './newsletterRoutes.js';
import auth from './authRoutes.js';

const r = Router();
r.get('/health', (req, res) => res.json({ status: 'ok', service: 'sh27-api' }));
r.use('/menu', menu);
r.use('/reservations', reservations);
r.use('/contact', contact);
r.use('/newsletter', newsletter);
r.use('/auth', auth);
export default r;
