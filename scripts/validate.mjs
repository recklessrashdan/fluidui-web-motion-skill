#!/usr/bin/env node
// Local validation for the FluidUI skill repository. Node 18+; no dependencies.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skillDir = path.join(root, '.opencode', 'skills', 'fluidui');
const skillFile = path.join(skillDir, 'SKILL.md');
const examples = [
  'minimal-professional',
  'bold-futuristic',
  'smooth-dashboard',
  'animated-landing',
  'responsive-mobile',
];

const results = [];
function check(name, fn) {
  try {
    const detail = fn();
    results.push({ name, ok: true, detail: detail || '' });
  } catch (error) {
    results.push({ name, ok: false, detail: error.message });
  }
}
function assert(condition, message) {
  if (!condition) throw new Error(message);
}
function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}
function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const skill = fs.existsSync(skillFile) ? fs.readFileSync(skillFile, 'utf8') : '';

check('Required files exist', () => {
  const required = [
    '.opencode/skills/fluidui/SKILL.md',
    'README.md',
    'LICENSE',
    '.gitignore',
    'CONTRIBUTING.md',
    'tests/fixtures/basic-page.html',
    'tests/test-scenario.md',
    'docs/VALIDATION_REPORT.md',
    'scripts/validate.mjs',
    ...examples.map((name) => `examples/${name}/index.html`),
  ];
  const missing = required.filter((rel) => !fs.existsSync(path.join(root, rel)));
  assert(missing.length === 0, `Missing: ${missing.join(', ')}`);
  return `${required.length} files present`;
});

check('Frontmatter is valid', () => {
  const match = skill.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  assert(match, 'SKILL.md has no closed YAML frontmatter block');
  const body = match[1];
  const name = body.match(/^name:\s*(.+)$/m);
  const description = body.match(/^description:\s*>[-\s]*\r?\n((?:\s+.+\r?\n?)+)/m)
    || body.match(/^description:\s*(.+)$/m);
  assert(name && name[1].trim() === 'FluidUI', 'name must be FluidUI');
  assert(description, 'description is missing');
  const text = description[1].trim();
  assert(text.length >= 80, 'description is too short to support discovery');
  assert(/website|site|web/i.test(text), 'description does not mention websites');
  assert(!/<\/?[A-Za-z][^>]*>/.test(body), 'frontmatter contains XML-style tags');
  return `name=FluidUI, description=${text.length} chars`;
});

check('Skill ID follows OpenCode convention', () => {
  assert(path.basename(skillDir) === 'fluidui', 'directory must be fluidui');
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test('fluidui'), 'ID must be kebab-case');
  assert(fs.existsSync(path.join(skillDir, 'SKILL.md')), 'SKILL.md missing');
  return 'fluidui/.opencode skill layout';
});

check('Skill contains required guidance', () => {
  const requiredSections = [
    '## Purpose', '## Core principle', '## Workflow', '## Design direction guardrails',
    '## Motion rules', '## Accessibility', '## Responsive rules', '## Interaction standards',
    '## Technology adaptability', '## Testing guidelines', '## Safety constraints', '## References',
  ];
  const missing = requiredSections.filter((section) => !skill.includes(section));
  assert(missing.length === 0, `Missing sections: ${missing.join(', ')}`);
  const terms = ['prefers-reduced-motion', 'transform', 'opacity', 'responsive', 'keyboard', 'focus', 'performance', 'contrast'];
  const missingTerms = terms.filter((term) => !skill.toLowerCase().includes(term));
  assert(missingTerms.length === 0, `Missing guidance: ${missingTerms.join(', ')}`);
  const headings = (skill.match(/^## .+$/gm) || []).map((h) => h.trim());
  const duplicates = headings.filter((h, i) => headings.indexOf(h) !== i);
  assert(duplicates.length === 0, `Duplicate headings: ${[...new Set(duplicates)].join(', ')}`);
  return `${requiredSections.length} sections, ${terms.length} required concepts`;
});

check('Reference links resolve', () => {
  const refFiles = [...new Set((skill.match(/`references\/[^`]+\.md`/g) || []).map((m) => m.slice(1, -1)))];
  assert(refFiles.length >= 4, 'SKILL.md should point to detailed references');
  refFiles.forEach((ref) => assert(fs.existsSync(path.join(skillDir, ref)), `Missing reference: ${ref}`));
  const markdownFiles = walk(root).filter((f) => f.endsWith('.md'));
  let linkCount = 0;
  for (const file of markdownFiles) {
    const text = fs.readFileSync(file, 'utf8');
    for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const target = match[1].split('#')[0];
      if (!target || /^(?:https?:|mailto:)/.test(target)) continue;
      linkCount++;
      assert(fs.existsSync(path.resolve(path.dirname(file), target)), `Broken link in ${path.relative(root, file)}: ${target}`);
    }
  }
  return `${refFiles.length} references, ${linkCount} relative markdown links`;
});

check('README markdown formatting', () => {
  const readme = read('README.md');
  const fences = (readme.match(/^```/gm) || []).length;
  assert(fences % 2 === 0, 'unclosed code fence');
  assert(/^# FluidUI$/m.test(readme), 'missing top-level title');
  const headings = (readme.match(/^#+ .+$/gm) || []).length;
  assert(headings >= 10, 'README is missing expected sections');
  for (const section of ['Installation', 'Usage with OpenCode', 'Features', 'Accessibility', 'Limitations', 'Contributing', 'License']) {
    assert(readme.includes(`## ${section}`), `missing section: ${section}`);
  }
  return `${headings} headings, ${fences / 2} code blocks`;
});

check('Examples are self-contained and accessible-aware', () => {
  for (const name of examples) {
    const rel = `examples/${name}/index.html`;
    const html = read(rel);
    assert(/^<!doctype html>/i.test(html.trim()), `${rel}: missing doctype`);
    assert(/<meta name="viewport"/.test(html), `${rel}: missing viewport meta`);
    assert(/<title>.+<\/title>/.test(html), `${rel}: missing title`);
    assert(html.includes('prefers-reduced-motion'), `${rel}: missing reduced-motion handling`);
    assert(/<script>/.test(html), `${rel}: missing working interaction script`);
    assert(!/https?:\/\//.test(html), `${rel}: external URL found`);
    assert(!/<script[^>]+src=/.test(html), `${rel}: external script found`);
    assert(!/<link[^>]+href=/.test(html), `${rel}: external stylesheet found`);
  }
  return `${examples.length} standalone examples`;
});

check('Security scan: no secrets, personal paths, or extra artifacts', () => {
  const files = walk(root);
  const suspicious = [
    /gh[pousr]_[A-Za-z0-9]{20,}/,
    /sk-[A-Za-z0-9_-]{20,}/,
    /AKIA[0-9A-Z]{16}/,
    /(?:api[_-]?key|secret|password|passwd|access[_-]?token)\s*[:=]\s*["'][^"']{6,}["']/i,
    /[A-Za-z]:\\Users\\/,
    /[A-Za-z]:\\(?:Users|My|Program Files|Temp)[\\/]/i,
    /(?:\/Users\/|\/home\/)[A-Za-z0-9._-]+\//,
    /[A-Za-z0-9._%+-]+@(?:gmail|outlook|hotmail|yahoo)\./i,
  ];
  const findings = [];
  for (const file of files) {
    const rel = path.relative(root, file);
    assert(!/\.(?:env|pem|key|p12|pfx)$/i.test(path.basename(file)), `Sensitive file present: ${rel}`);
    const text = fs.readFileSync(file, 'utf8');
    suspicious.forEach((pattern) => { if (pattern.test(text)) findings.push(`${rel}: ${pattern}`); });
  }
  assert(findings.length === 0, `Suspicious content: ${findings.join('; ')}`);
  return `${files.length} files scanned`;
});

const failed = results.filter((r) => !r.ok);
for (const result of results) {
  console.log(`${result.ok ? 'PASS' : 'FAIL'}  ${result.name}${result.detail ? ` — ${result.detail}` : ''}`);
}
console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
process.exit(failed.length ? 1 : 0);
