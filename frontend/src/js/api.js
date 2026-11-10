// API layer. With no VITE_API_URL set, runs in demo mode (simulated success)
// so the frontend works on its own. Backend phase: set VITE_API_URL=http://localhost:5000/api
const BASE = import.meta.env.VITE_API_URL || '';
export const hasApi = !!BASE;

async function request(path, options = {}) {
  if (!BASE) { // demo mode
    await new Promise(r => setTimeout(r, 700));
    return { demo: true, ok: true };
  }
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json' }, ...options
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong. Please try again.');
  return data;
}

export const api = {
  getMenu: () => request('/menu'),
  createReservation: body => request('/reservations', { method: 'POST', body: JSON.stringify(body) }),
  sendContact: body => request('/contact', { method: 'POST', body: JSON.stringify(body) }),
  subscribe: body => request('/newsletter', { method: 'POST', body: JSON.stringify(body) })
};
