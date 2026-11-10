import { HttpError } from './errorHandler.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// "7:00 pm" or "19:00" -> "19:00:00"
export function parseTime(v) {
  const m = /^(\d{1,2}):(\d{2})\s*(am|pm)?$/i.exec(str(v, 10));
  if (!m) return null;
  let h = +m[1]; const min = +m[2]; const ap = m[3]?.toLowerCase();
  if (ap) { if (h < 1 || h > 12) return null; h = (h % 12) + (ap === 'pm' ? 12 : 0); }
  if (h > 23 || min > 59) return null;
  return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}:00`;
}

const run = (rules) => (req, res, next) => {
  const errors = {}, data = {};
  for (const [field, fn] of Object.entries(rules)) {
    const r = fn(req.body?.[field]);
    if (r.error) errors[field] = r.error; else data[field] = r.value;
  }
  if (Object.keys(errors).length) return next(new HttpError(400, Object.values(errors)[0], errors));
  req.valid = data; next();
};
const ok = value => ({ value }), bad = error => ({ error });
const text = (label, min, max, required = true) => v => {
  const s = str(v, max + 1);
  if (!s) return required ? bad(`${label} is required.`) : ok('');
  if (s.length < min) return bad(`${label} is too short.`);
  if (s.length > max) return bad(`${label} is too long.`);
  return ok(s);
};
const email = v => EMAIL.test(str(v, 255)) ? ok(str(v, 255).toLowerCase()) : bad('Please enter a valid email address.');

export const validateReservation = run({
  guests: v => { const n = parseInt(v, 10); return n >= 1 && n <= 20 ? ok(n) : bad('Guests must be between 1 and 20.'); },
  date: v => {
    const s = str(v, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s) || Number.isNaN(Date.parse(s))) return bad('Please choose a valid date.');
    const t = new Date(); const today = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
    return s < today ? bad('Please choose today or a future date.') : ok(s);
  },
  time: v => { const t = parseTime(v); return t ? ok(t) : bad('Please choose a valid time.'); },
  name: text('Name', 2, 100),
  email,
  phone: v => { const s = str(v, 31); return !s || /^[+\d][\d\s\-()]{5,29}$/.test(s) ? ok(s) : bad('Please enter a valid phone number.'); },
  notes: text('Notes', 0, 500, false)
});
export const validateContact = run({
  name: text('Name', 2, 100), email, subject: text('Subject', 0, 150, false), message: text('Message', 5, 2000)
});
export const validateNewsletter = run({ email });
export const validateLogin = run({ email: v => ok(str(v, 255).toLowerCase()), password: v => ok(typeof v === 'string' ? v : '') });
export const validateStatus = run({
  status: v => ['pending', 'confirmed', 'cancelled', 'completed'].includes(v) ? ok(v) : bad('Invalid status.')
});
export const validateMenuItem = run({
  category_id: v => { const n = parseInt(v, 10); return n > 0 ? ok(n) : bad('Category is required.'); },
  name: text('Name', 2, 120),
  description: text('Description', 0, 300, false),
  price: v => { const n = Number(v); return n >= 0 && n < 100000 ? ok(Math.round(n * 100) / 100) : bad('Price must be a positive number.'); },
  is_available: v => ok(v === false || v === 0 || v === '0' ? 0 : 1)
});
