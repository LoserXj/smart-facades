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
  const label = room === 'a' ? 'A 房 · 涂膜玻璃' : 'B 房 · 裸玻璃';
  const image = document.getElementById('room-image');
  image.src = 'assets/img/room-' + room + '.webp';
  image.alt = label + '，房间内可见窗外景物与窗边桌面';
  document.getElementById('room-label').textContent = label;
});

const observations = {
  '08': '早晨的窗边样品。沿时间轴可比较白天的透光变化与夜间的样品外观。',
  '12': '正午的窗边样品。日照下材料逐渐失水，研究人员每两小时记录一次外观。',
  '16': '下午的样品。对照早晨同一观察位置，可以看到透过样品的景物明暗发生变化。',
  '22': '夜间的样品。材料从空气中吸湿，照片保留论文记录的夜间视角。',
  '02': '次日凌晨的样品。夜间序列记录了吸湿阶段的外观变化。',
  '06': '次日清晨的样品。这张照片位于论文夜间观测序列的末端。'
};
bindChoices('[data-hour]', button => {
  const hour = button.dataset.hour;
  const image = document.getElementById('cycle-image');
  image.src = 'assets/img/cycle-' + hour + '.webp';
  image.alt = button.textContent + ' 窗边湿度响应薄膜实拍';
  document.getElementById('cycle-time').textContent = hour + ':00';
  document.getElementById('cycle-description').textContent = observations[hour];
});

bindChoices('[data-scope]', button => {
  const scope = button.dataset.scope;
  document.querySelectorAll('tr[data-area]').forEach(row => {
    row.hidden = scope !== 'all' && row.dataset.area !== scope;
  });
});
