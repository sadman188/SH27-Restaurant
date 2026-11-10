import 'dotenv/config';
import app from './app.js';
import { pool } from './models/db.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  console.log(`SH27 API running on http://localhost:${PORT}/api`);
  try { await pool.query('SELECT 1'); console.log('Database connected'); }
  catch (e) { console.error('Database connection failed:', e.message); }
});

const stop = () => server.close(() => pool.end().then(() => process.exit(0)));
process.on('SIGINT', stop); process.on('SIGTERM', stop);
