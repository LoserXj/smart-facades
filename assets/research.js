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

const watchDialog = document.querySelector('.watch-dialog');
if (watchDialog && typeof watchDialog.showModal === 'function') {
  const screen = watchDialog.querySelector('.watch-screen');
  const original = watchDialog.querySelector('.watch-original');
  document.querySelectorAll('a[data-player]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const player = link.dataset.player;
      const template = document.getElementById('player-' + player);
      watchDialog.dataset.player = player;
      watchDialog.querySelector('h3').textContent = link.querySelector('strong').textContent;
      original.href = link.href;
      original.textContent = player === 'demo' ? 'Open the video file' : 'Watch on YouTube';
      screen.replaceChildren(template.content.cloneNode(true));
      watchDialog.showModal();
      screen.querySelector('video')?.play().catch(() => {});
    });
  });
  watchDialog.addEventListener('close', () => screen.replaceChildren());
}
