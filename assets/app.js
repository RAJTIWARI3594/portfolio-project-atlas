(() => {
  let data = [];
  const grid = document.getElementById('project-list');
  const search = document.getElementById('project-search');
  const filters = document.getElementById('filters');
  const count = document.getElementById('result-count');
  const empty = document.getElementById('empty-state');
  const clear = document.getElementById('clear-filters');
  let active = 'All projects';
  function buildFilters() {
    const categories = ['All projects', ...new Set(data.map(project => project.category))];
    categories.forEach(category => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'filter-button';
      button.textContent = category; button.setAttribute('aria-pressed', String(category === active));
      button.addEventListener('click', () => { active = category; update(); });
      filters.append(button);
    });
  }
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function update() {
    const query = search.value.trim().toLocaleLowerCase();
    const shown = data.filter(project => (active === 'All projects' || project.category === active) &&
      [project.name, project.repo, project.category, project.summary, project.stack, ...project.tags].join(' ').toLocaleLowerCase().includes(query));
    grid.innerHTML = shown.map((project, index) => `<article class="project-card"><div class="card-top"><span class="category-label">${esc(project.category)}</span><span class="card-index">${String(data.indexOf(project)+1).padStart(2,'0')}</span></div><h3>${esc(project.name)}</h3><p>${esc(project.summary)}</p><div class="card-bottom"><span class="stack">${esc(project.stack)}</span><a class="repo-link" href="https://github.com/RAJTIWARI3594/${encodeURIComponent(project.repo)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(project.name)} source repository in a new tab">View source <span aria-hidden="true">↗</span></a></div></article>`).join('');
    count.textContent = `${shown.length} ${shown.length === 1 ? 'project' : 'projects'}${query || active !== 'All projects' ? ' found' : ' in the collection'}`;
    empty.hidden = shown.length !== 0; grid.hidden = shown.length === 0;
    filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.textContent === active)));
    clear.hidden = !query && active === 'All projects';
  }
  function reset() { active = 'All projects'; search.value = ''; update(); search.focus(); }
  search.addEventListener('input', update);
  clear.addEventListener('click', reset);
  document.getElementById('empty-clear').addEventListener('click', reset);
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) { event.preventDefault(); search.focus(); }
    if (event.key === 'Escape' && document.activeElement === search && search.value) reset();
  });
  fetch('projects.json').then(response => { if (!response.ok) throw new Error('Project list could not be loaded.'); return response.json(); }).then(projects => { data = projects; buildFilters(); update(); }).catch(() => { grid.hidden = true; count.textContent = 'Project list could not be loaded'; empty.hidden = false; empty.querySelector('h3').textContent = 'The index could not load'; empty.querySelector('p').textContent = 'Serve this folder over HTTP and try again.'; document.getElementById('empty-clear').hidden = true; });
})();
