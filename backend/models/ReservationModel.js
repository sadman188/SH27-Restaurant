import { pool } from './db.js';

const MAX_SEATS = +(process.env.MAX_SEATS_PER_SLOT || 40);

export const ReservationModel = {
  // Returns { id } or { full: true } when the time slot has no seats left
  async create({ guests, date, time, name, email, phone, notes }) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const [[row]] = await conn.query(
        `SELECT COALESCE(SUM(guests),0) AS booked FROM reservations
         WHERE reservation_date=? AND reservation_time=? AND status <> 'cancelled' FOR UPDATE`, [date, time]);
      if (Number(row.booked) + guests > MAX_SEATS) { await conn.rollback(); return { full: true }; }
      const [r] = await conn.query(
        `INSERT INTO reservations (guests, reservation_date, reservation_time, name, email, phone, notes)
         VALUES (?,?,?,?,?,?,?)`, [guests, date, time, name, email, phone || null, notes || null]);
      await conn.commit();
      return { id: r.insertId };
    } catch (e) { await conn.rollback(); throw e; }
    finally { conn.release(); }
  },
  async list({ status, date } = {}) {
    const where = [], args = [];
    if (status) { where.push('status = ?'); args.push(status); }
    if (date) { where.push('reservation_date = ?'); args.push(date); }
    const [rows] = await pool.query(
      `SELECT * FROM reservations ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
       ORDER BY reservation_date DESC, reservation_time DESC LIMIT 500`, args);
    return rows;
  },
  async setStatus(id, status) {
    const [r] = await pool.query('UPDATE reservations SET status=? WHERE id=?', [status, id]);
    return r.affectedRows > 0;
  }
};
