'use strict';
const filters = document.querySelector('.filters');
const projects = [...document.querySelectorAll('[data-category]')];
if (filters && projects.length) {
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    const selected = button.dataset.filter;
    filters.querySelectorAll('button').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    projects.forEach((project) => {
      project.hidden = selected !== 'all' && project.dataset.category !== selected;
    });
    const count = projects.filter((project) => !project.hidden).length;
    document.querySelector('#filter-status').textContent = `${count} project${count === 1 ? '' : 's'} shown`;
  });
}

// GIFs load only on request; still previews avoid unsolicited motion.
document.querySelectorAll('[data-demo]').forEach((button) => {
  const image = document.getElementById(`demo-${button.dataset.demo}`);
  if (!image) return;
  button.hidden = false;
  const playLabel = button.getAttribute('aria-label');
  button.addEventListener('click', () => {
    const playing = button.getAttribute('aria-pressed') !== 'true';
    image.src = `assets/projects/${button.dataset.demo}${playing ? '.gif' : '-still.png'}`;
    button.setAttribute('aria-pressed', String(playing));
    button.setAttribute('aria-label', playing ? playLabel.replace('Play ', 'Stop ') : playLabel);
    button.textContent = playing ? 'Stop GIF ■' : 'Play GIF ↗';
  });
});
