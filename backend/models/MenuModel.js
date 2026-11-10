import { pool } from './db.js';

export const MenuModel = {
  async getAll() {
    const [cats] = await pool.query('SELECT id, code AS `key`, label FROM menu_categories ORDER BY sort_order, id');
    const [items] = await pool.query(
      'SELECT id, category_id, name, description, price FROM menu_items WHERE is_available = 1 ORDER BY sort_order, id');
    return cats.map(c => ({ ...c, items: items.filter(i => i.category_id === c.id).map(i => ({ ...i, price: Number(i.price) })) }));
  },
  async create({ category_id, name, description, price, is_available }) {
    const [r] = await pool.query(
      'INSERT INTO menu_items (category_id, name, description, price, is_available) VALUES (?,?,?,?,?)',
      [category_id, name, description, price, is_available]);
    return r.insertId;
  },
  async update(id, { category_id, name, description, price, is_available }) {
    const [r] = await pool.query(
      'UPDATE menu_items SET category_id=?, name=?, description=?, price=?, is_available=? WHERE id=?',
      [category_id, name, description, price, is_available, id]);
    return r.affectedRows > 0;
  },
  async remove(id) {
    const [r] = await pool.query('DELETE FROM menu_items WHERE id=?', [id]);
    return r.affectedRows > 0;
  }
};
