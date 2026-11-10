import { ReservationModel } from '../models/ReservationModel.js';
import { asyncHandler, HttpError } from '../middleware/errorHandler.js';

export const createReservation = asyncHandler(async (req, res) => {
  const result = await ReservationModel.create(req.valid);
  if (result.full) throw new HttpError(409, 'Sorry, that time is fully booked. Please choose another time.');
  res.status(201).json({
    message: 'Your table request has been received.',
    reference: `SH27-${String(result.id).padStart(6, '0')}`
  });
});
export const listReservations = asyncHandler(async (req, res) =>
  res.json({ reservations: await ReservationModel.list({ status: req.query.status, date: req.query.date }) }));

export const updateStatus = asyncHandler(async (req, res) => {
  if (!(await ReservationModel.setStatus(+req.params.id, req.valid.status))) throw new HttpError(404, 'Reservation not found.');
  res.json({ message: 'Status updated.' });
});
