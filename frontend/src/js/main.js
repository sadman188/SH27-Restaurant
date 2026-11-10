import '../css/styles.css';
import { renderLayout } from './layout.js';
import { MENU } from './menu-data.js';
import { api, hasApi } from './api.js';

renderLayout();
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Header: solid on scroll, mobile menu, back-to-top */
const hdr = $('#hdr'), totop = $('#totop'), nav = $('#nav'), burger = $('#burger');
function onScroll() {
  const y = scrollY;
  hdr.classList.toggle('solid', y > 40);
  totop.classList.toggle('show', y > 700);
  const bg = $('.hero .bg');
  if (bg && !reduce && y < 1200) bg.style.translate = `0 ${y * 0.18}px`; // parallax
}
addEventListener('scroll', onScroll, { passive: true }); onScroll();
totop.onclick = () => scrollTo({ top: 0 });
burger.onclick = () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
};
$$('a', nav).forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); document.body.style.overflow = ''; }));

/* Scroll reveal */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); if (e.target.dataset.count !== undefined) count(e.target); }
}), { threshold: .15, rootMargin: '0px 0px -40px 0px' });
$$('[data-reveal],.timeline,.ornament').forEach(el => io.observe(el));

/* Stat counters */
function count(el) {
  const end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now(), dur = 1800;
  const tick = t => { const p = Math.min((t - t0) / dur, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}
$$('[data-count]').forEach(el => io.observe(el));

/* Menu tabs (home preview shows 4 items, full menu page shows all) */
const cols = $('#cols');
if (cols) {
  const limit = cols.dataset.limit ? +cols.dataset.limit : 99;
  let data = MENU;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const show = k => { cols.innerHTML = (data[k]?.items || []).slice(0, limit).map((i, n) =>
    `<div class="item" style="--i:${n}"><div class="r"><h4>${esc(i[0])}</h4><span class="d"></span><span class="p">$${esc(i[1])}</span></div><p>${esc(i[2])}</p></div>`).join(''); };
  show('s');
  // Live menu from the backend (falls back to the built-in menu if the API is unreachable)
  if (hasApi) api.getMenu().then(r => {
    const live = {};
    r.categories.forEach(c => { live[c.key] = { label: c.label, items: c.items.map(i => [i.name, i.price, i.description]) }; });
    data = live; show($('#tabs .on').dataset.t);
  }).catch(() => {});
  $('#tabs').onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('#tabs button').forEach(x => x.classList.toggle('on', x === b)); show(b.dataset.t);
  };
}

/* Forms: reservation, contact, newsletter */
const today = new Date().toISOString().split('T')[0];
$$('input[type=date]').forEach(d => d.min = today);

function wire(form, call, okMsg, out) {
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const msg = out || $('.ok', form), btn = $('button[type=submit]', form);
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const body = Object.fromEntries(new FormData(form));
    const label = btn.textContent; btn.disabled = true; btn.textContent = 'Sending…';
    msg.className = msg.className.replace(/\b(err|pop)\b/g, '').trim();
    try { await call(body); msg.textContent = okMsg; msg.classList.add('pop'); form.reset(); }
    catch (err) { msg.textContent = err.message; msg.classList.add('err'); }
    btn.disabled = false; btn.textContent = label;
  });
}
wire($('#bf'), api.createReservation, 'Thank you! Your table request has been received. We will confirm by email shortly.');
wire($('#cf'), api.sendContact, 'Message sent. We usually reply within one working day.');
wire($('#nl'), api.subscribe, 'Thanks for joining!', $('#nl-msg'));
