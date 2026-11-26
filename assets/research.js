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

bindChoices('[data-hour]', button => {
  const hour = button.dataset.hour;
  const image = document.getElementById('cycle-image');
  image.src = 'assets/img/cycle-' + hour + '.webp';
  image.alt = document.querySelector('.cycle-photo figcaption').textContent + ' · ' + button.textContent;
  document.getElementById('cycle-time').textContent = hour + ':00';
  document.getElementById('cycle-description').textContent = button.dataset.description;
});

bindChoices('[data-scope]', button => {
  const scope = button.dataset.scope;
  document.querySelectorAll('tr[data-area]').forEach(row => {
    row.hidden = scope !== 'all' && row.dataset.area !== scope;
  });
});
