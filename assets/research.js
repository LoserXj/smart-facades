function bindChoices(selector, onChange) {
  const buttons = Array.from(document.querySelectorAll(selector));
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      onChange(button);
    });
  });
}

bindChoices('[data-room]', button => {
  const room = button.dataset.room;
  const label = button.dataset.label;
  const image = document.getElementById('room-image');
  image.src = 'assets/img/room-' + room + '.webp';
  image.alt = label;
  document.getElementById('room-label').textContent = label;
});

bindChoices('[data-scope]', button => {
  const scope = button.dataset.scope;
  document.querySelectorAll('tr[data-area]').forEach(row => {
    row.hidden = scope !== 'all' && row.dataset.area !== scope;
  });
});

// Gentle reveal of content blocks as they scroll into view
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const blocks = document.querySelectorAll('.section-head, .sample-pair, .metrics, .film-study, .chart, .table-scroll, .research-interview, .reading, .about-grid');
  document.documentElement.classList.add('reveal-ready');
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  blocks.forEach(b => io.observe(b));
}
// Header shadow once the page scrolls
addEventListener('scroll', () => document.body.classList.toggle('scrolled', scrollY > 8), { passive: true });
