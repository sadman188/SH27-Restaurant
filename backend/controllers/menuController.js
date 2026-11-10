import { MenuModel } from '../models/MenuModel.js';
import { asyncHandler, HttpError } from '../middleware/errorHandler.js';

export const getMenu = asyncHandler(async (req, res) => res.json({ categories: await MenuModel.getAll() }));

export const createItem = asyncHandler(async (req, res) => {
  const id = await MenuModel.create(req.valid);
  res.status(201).json({ id, message: 'Menu item created.' });
});
export const updateItem = asyncHandler(async (req, res) => {
  if (!(await MenuModel.update(+req.params.id, req.valid))) throw new HttpError(404, 'Menu item not found.');
  res.json({ message: 'Menu item updated.' });
});
export const deleteItem = asyncHandler(async (req, res) => {
  if (!(await MenuModel.remove(+req.params.id))) throw new HttpError(404, 'Menu item not found.');
  res.json({ message: 'Menu item deleted.' });
});
