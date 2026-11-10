import { NewsletterModel } from '../models/NewsletterModel.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const subscribe = asyncHandler(async (req, res) => {
  await NewsletterModel.subscribe(req.valid.email);
  res.status(201).json({ message: 'Subscribed.' });
});
export const listSubscribers = asyncHandler(async (req, res) => res.json({ subscribers: await NewsletterModel.list() }));
