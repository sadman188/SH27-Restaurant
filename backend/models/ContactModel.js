import { pool } from './db.js';

export const ContactModel = {
  async create({ name, email, subject, message }) {
    const [r] = await pool.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?,?,?,?)', [name, email, subject || null, message]);
    return r.insertId;
  },
  async list() {
    const [rows] = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 500');
    return rows;
  }
};
