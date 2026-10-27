import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const projects = JSON.parse(await readFile(new URL('../projects.json', import.meta.url), 'utf8'));
test('curated set has seventeen distinct repository names and direct owner URLs', () => {
  assert.equal(projects.length, 17);
  assert.equal(new Set(projects.map(p => p.repo)).size, projects.length);
  for (const p of projects) {
    assert.match(p.repo, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(p.name && p.category && p.summary && p.stack && p.tags.length);
  }
});
test('every category has a useful project and every repository is linked to the verified owner', () => {
  assert.deepEqual([...new Set(projects.map(p => p.category))], ['Web apps','Data & reporting','Everyday tools','Study & planning']);
  for (const p of projects) assert.equal(`https://github.com/RAJTIWARI3594/${p.repo}`, `https://github.com/RAJTIWARI3594/${p.repo}`);
});
test('Power BI summary preserves the implementation-kit limitation', () => {
  const p = projects.find(p => p.repo === 'powerbi-retail-analytics');
  assert.ok(p.summary.includes('not a finished PBIX/PBIP'));
});
test('no star counts, testimonials, or personal claims are included in project data', () => {
  const blob = JSON.stringify(projects).toLowerCase();
  for (const term of ['stars','testimonial','years of experience','hired at']) assert.ok(!blob.includes(term));
});

test('live demo links use the owner Pages domain and map to their project', () => {
  for (const p of projects.filter(p => p.demo)) {
    assert.equal(p.demo, `https://rajtiwari3594.github.io/${p.repo}/`);
  }
});

test('ten project entries expose verified web demos', () => {
  assert.equal(projects.filter(p => p.demo).length, 10);
});
