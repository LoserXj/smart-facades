// ---------- Day–night viewer (AEM 2025, Fig. 4d) ----------
(function () {
  const frames = [
    { t: '08:00', f: 't0800', p: 'day' }, { t: '10:00', f: 't1000', p: 'day' },
    { t: '12:00', f: 't1200', p: 'day' }, { t: '14:00', f: 't1400', p: 'day' },
    { t: '16:00', f: 't1600', p: 'day' }, { t: '18:00', f: 't1800', p: 'day' },
    { t: '20:00', f: 't2000', p: 'night' }, { t: '22:00', f: 't2200', p: 'night' },
    { t: '00:00', f: 't0000', p: 'night' }, { t: '02:00', f: 't0200', p: 'night' },
    { t: '04:00', f: 't0400', p: 'night' }, { t: '06:00', f: 't0600', p: 'night' },
  ];
  const label = {
    day: '<span class="state day">Day</span>Moisture desorption · light regulation',
    night: '<span class="state night">Night</span>Moisture absorption · privacy protection',
  };
  const box = document.getElementById('dnButtons');
  const img = document.getElementById('dnImg');
  const cap = document.getElementById('dnCap');
  if (!box) return;
  const src = (f) => `assets/img/daynight/${f}.jpg`;
  const btns = [];
  ['day', 'night'].forEach((phase) => {
    const g = document.createElement('div');
    g.className = 'grp';
    g.textContent = phase === 'day' ? 'Daytime' : 'Night-time';
    box.appendChild(g);
    frames.filter((x) => x.p === phase).forEach((fr) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.className = phase;
      b.innerHTML = `<img src="${src(fr.f)}" alt="" loading="lazy"><span>${fr.t}</span>`;
      b.addEventListener('click', () => select(frames.indexOf(fr)));
      box.appendChild(b);
      btns[frames.indexOf(fr)] = b;
    });
  });
  function select(i) {
    const fr = frames[i];
    img.src = src(fr.f);
    img.alt = `MRLR film sample photographed at ${fr.t}`;
    cap.innerHTML = `<b>${fr.t}</b> · ${label[fr.p]}`;
    btns.forEach((b, k) => {
      b.setAttribute('aria-checked', String(k === i));
      b.tabIndex = k === i ? 0 : -1;
    });
  }
  box.addEventListener('keydown', (e) => {
    const cur = btns.findIndex((b) => b.getAttribute('aria-checked') === 'true');
    let n = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (cur + 1) % frames.length;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (cur - 1 + frames.length) % frames.length;
    if (n !== null) { e.preventDefault(); select(n); btns[n].focus(); }
  });
  select(0);
})();

// ---------- HKJC retrofit options (Supporting materials Fig. 6) ----------
(function () {
  const rows = [
    { g: 'lowe', strategy: 'Replace with vacuum low-E glass', opt: 'STS 1.16', scope: 'Whole building', short: 'STS 1.16\nWhole', save: 11.27, kwh: 864622, inv: 18000000, pay: 13.01 },
    { g: 'lowe', strategy: 'Replace with vacuum low-E glass', opt: 'STS 1.16', scope: 'South façade', short: 'STS 1.16\nSouth', save: 5.18, kwh: 397595, inv: 6331521, pay: 9.95 },
    { g: 'coat', strategy: 'Solar-selective coating', opt: 'Single glazing', scope: 'Whole building', short: 'Single\nWhole', save: 5.06, kwh: 388082, inv: 119845, pay: 0.19 },
    { g: 'coat', strategy: 'Solar-selective coating', opt: 'Single glazing', scope: 'South façade', short: 'Single\nSouth', save: 2.95, kwh: 226267, inv: 42154, pay: 0.12 },
    { g: 'coat', strategy: 'Solar-selective coating', opt: 'Double glazing', scope: 'Whole building', short: 'Double\nWhole', save: 9.74, kwh: 746633, inv: 2857496, pay: 2.39 },
    { g: 'coat', strategy: 'Solar-selective coating', opt: 'Double glazing', scope: 'South façade', short: 'Double\nSouth', save: 8.66, kwh: 663744, inv: 2802269, pay: 2.64 },
  ];
  const tbody = document.querySelector('#rfTable tbody');
  const charts = document.getElementById('rfCharts');
  if (!tbody) return;
  const fmt = (n) => n.toLocaleString('en-US');
  rows.forEach((r) => {
    const tr = document.createElement('tr');
    tr.className = 'grp-' + r.g;
    tr.dataset.scope = r.scope;
    tr.innerHTML = `<td>${r.strategy}</td><td>${r.opt}</td><td>${r.scope}</td>
      <td class="r"><b>${r.save.toFixed(2)}%</b></td><td class="r">${fmt(r.kwh)}</td>
      <td class="r">${fmt(r.inv)}</td><td class="r"><b>${r.pay.toFixed(2)}</b></td>`;
    tbody.appendChild(tr);
  });

  const COL = { lowe: '#3e6fb0', coat: '#d2522b' };
  function chart(title, key, max, unit, list) {
    const W = 360, H = 210, padL = 30, padB = 40, padT = 18;
    const n = list.length, bw = (W - padL) / n;
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${title}">`;
    const ticks = 4;
    for (let k = 0; k <= ticks; k++) {
      const v = (max / ticks) * k, y = H - padB - (v / max) * (H - padB - padT);
      s += `<line x1="${padL}" x2="${W}" y1="${y}" y2="${y}" stroke="#e6eaea"/>`;
      s += `<text x="${padL - 6}" y="${y + 4}" text-anchor="end">${+v.toFixed(1)}</text>`;
    }
    list.forEach((r, i) => {
      const v = r[key], h = (v / max) * (H - padB - padT);
      const x = padL + i * bw + bw * 0.18, w = bw * 0.64, y = H - padB - h;
      s += `<rect x="${x}" y="${y}" width="${w}" height="${Math.max(h, 1.5)}" rx="3" fill="${COL[r.g]}"/>`;
      s += `<text class="val" x="${x + w / 2}" y="${y - 5}" text-anchor="middle">${v.toFixed(2)}</text>`;
      r.short.split('\n').forEach((ln, j) => {
        s += `<text x="${x + w / 2}" y="${H - padB + 15 + j * 13}" text-anchor="middle">${ln}</text>`;
      });
    });
    s += '</svg>';
    return `<div class="rf-chart"><h4>${title} <span style="font-weight:400;color:#6a7680">(${unit})</span></h4>${s}
      <div style="font-size:12px;color:#3c4954;margin-top:4px"><span style="color:${COL.lowe}">■</span> Vacuum low-E glass replacement &nbsp; <span style="color:${COL.coat}">■</span> Solar-selective coating</div></div>`;
  }
  function render(scope) {
    const list = scope === 'all' ? rows : rows.filter((r) => r.scope === scope);
    charts.innerHTML = chart('Energy saving', 'save', 12, '%', list) + chart('Payback period', 'pay', 14, 'years', list);
    tbody.querySelectorAll('tr').forEach((tr) => tr.classList.toggle('hide', scope !== 'all' && tr.dataset.scope !== scope));
  }
  document.querySelectorAll('.rf-controls button').forEach((b) => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.rf-controls button').forEach((x) => x.setAttribute('aria-selected', String(x === b)));
      render(b.dataset.scope);
    });
  });
  render('all');
})();

// ---------- Lightbox ----------
(function () {
  const dlg = document.getElementById('lightbox');
  const im = document.getElementById('lbImg');
  if (!dlg || !dlg.showModal) return;
  document.querySelectorAll('.zoom').forEach((z) => {
    z.addEventListener('click', () => {
      im.src = z.dataset.full;
      im.alt = z.querySelector('img')?.alt || '';
      dlg.showModal();
    });
  });
  dlg.addEventListener('click', () => dlg.close());
})();

// ---------- Active nav ----------
(function () {
  const links = [...document.querySelectorAll('.nav a')];
  const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (e.isIntersecting) { links.forEach((a) => a.classList.remove('on')); map.get(e.target.id)?.classList.add('on'); }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
})();
