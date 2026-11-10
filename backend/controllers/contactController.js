import { ContactModel } from '../models/ContactModel.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const sendMessage = asyncHandler(async (req, res) => {
  await ContactModel.create(req.valid);
  res.status(201).json({ message: 'Message sent.' });
});
export const listMessages = asyncHandler(async (req, res) => res.json({ messages: await ContactModel.list() }));
