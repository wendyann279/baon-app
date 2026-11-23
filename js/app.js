
/** app.js — BAON single-page app: routing, views, events. MIT */

const view = document.getElementById('view');
const toastEl = document.getElementById('toast');

/* ---------- helpers ---------- */

const ESC = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (ch) => ESC[ch]);

function toast(msg, action) {
  toastEl.innerHTML = `<span>${esc(msg)}</span>`;

  if (action) {
    const b = document.createElement('button');
    b.textContent = action.label;
    b.onclick = action.run;

    toastEl.append(b);
  }

  toastEl.hidden = false;

  clearTimeout(toast.timer);

  const hide = () => {
    toastEl.hidden = true;
  };

  if (!action) {
    toast.timer = setTimeout(hide, 2500);
  }
}

/* ---------- views (placeholders for now) ---------- */

function renderHome() {
  view.innerHTML = `<section class="card"><h2>Home</h2>

    <p class="muted">Your remaining baon will show here.</p></section>`;
}

function renderAdd() {
  view.innerHTML = `<section class="card"><h2>Add expense</h2>

    <p class="muted">The expense form will go here.</p></section>`;
}


function renderHistory() {
  view.innerHTML = `<section class="card"><h2>History</h2>

    <p class="muted">Your expenses will be listed here.</p></section>`;
}

function renderSettings() {
  view.innerHTML = `<section class="card"><h2>My baon</h2>

    <p class="muted">The budget form will go here.</p></section>`;
}

/* ---------- router ---------- */

const routes = {
  home: renderHome,
  add: renderAdd,
  history: renderHistory,
  settings: renderSettings,
};

async function router() {
  const name = location.hash.replace('#/', '') || 'home';
  const render = routes[name] ?? renderHome;

  document.querySelectorAll('.tabbar a').forEach((a) =>
    a.classList.toggle('active', a.dataset.route === name)
  );

  await render();

  window.scrollTo(0, 0);

  view.focus({ preventScroll: true });
}

/* ---------- start ---------- */

window.addEventListener('hashchange', router);

router();
