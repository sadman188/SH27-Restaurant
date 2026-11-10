import { pool } from './db.js';

export const NewsletterModel = {
  // Safe to call twice with the same email
  async subscribe(email) {
    await pool.query('INSERT INTO newsletter_subscribers (email) VALUES (?) ON DUPLICATE KEY UPDATE email = email', [email]);
  },
  async list() {
    const [rows] = await pool.query('SELECT id, email, created_at FROM newsletter_subscribers ORDER BY created_at DESC LIMIT 1000');
    return rows;
  }
};
