import { Router } from 'express';
import { getMenu, createItem, updateItem, deleteItem } from '../controllers/menuController.js';
import { requireAdmin } from '../middleware/auth.js';
import { validateMenuItem } from '../middleware/validate.js';

const r = Router();
r.get('/', getMenu);
r.post('/items', requireAdmin, validateMenuItem, createItem);
r.put('/items/:id', requireAdmin, validateMenuItem, updateItem);
r.delete('/items/:id', requireAdmin, deleteItem);
export default r;
