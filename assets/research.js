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
