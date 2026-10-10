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
