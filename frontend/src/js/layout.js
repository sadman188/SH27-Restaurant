// Injects the shared header + footer so all 5 pages stay in sync.
const links = [
  ['index.html', 'Home', 'home'], ['menu.html', 'Menus', 'menu'], ['about.html', 'Our Story', 'about'],
  ['reservation.html', 'Reservations', 'reservation'], ['contact.html', 'Contact', 'contact']
];

export function renderLayout() {
  const page = document.body.dataset.page;
  const nav = links.map(([h, t, k]) => `<a href="/${h}" class="${k === page ? 'on' : ''}">${t}</a>`).join('');
  document.getElementById('site-header').outerHTML = `
  <header class="site" id="hdr">
    <div class="top"><div class="wrap"><span>27 Harbour Lane, Dhaka 1212</span><span>+880 1700 000027 · booking@sh27.com</span></div></div>
    <div class="wrap bar">
      <a class="logo" href="/index.html" aria-label="SH27 home">SH<b>27</b></a>
      <button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav class="main" id="nav">${nav}</nav>
    </div>
  </header>`;
  document.getElementById('site-footer').outerHTML = `
  <footer class="site"><div class="wrap"><div class="g">
    <div><div class="logo" style="color:#f1e8d8;margin-bottom:12px">SH<b>27</b></div><p>Seasonal cooking, open fire and good company since 2009.</p></div>
    <div><h5>Working Hours</h5><table><tr><td>Mon – Fri</td><td>09:00 – 22:00</td></tr><tr><td>Saturday</td><td>11:00 – 00:00</td></tr><tr><td>Sunday</td><td>11:00 – 23:00</td></tr><tr><td>Happy hour</td><td>17:00 – 21:00</td></tr></table></div>
    <div><h5>Our Address</h5><p>27 Harbour Lane<br>Gulshan, Dhaka 1212<br><a href="tel:+8801700000027">+880 1700 000027</a><br><a href="mailto:booking@sh27.com">booking@sh27.com</a></p></div>
    <div><h5>Newsletter</h5><p>Receive the latest news from us.</p>
      <form class="nl" id="nl" novalidate><input type="email" name="email" placeholder="Your email" aria-label="Email" required><button class="btn fill" type="submit">Join</button></form>
      <div class="nl-msg" id="nl-msg" role="status"></div></div>
  </div><div class="copy"><span>© 2026 SH27 Restaurant &amp; Bar. All rights reserved.</span><span>Privacy · Terms · Policy</span></div></div></footer>
  <button class="totop" id="totop" aria-label="Back to top">↑</button>`;
}
