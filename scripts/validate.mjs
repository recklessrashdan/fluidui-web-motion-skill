#!/usr/bin/env node
// Local validation for the portable FluidUI skill repository. Node 18+; no dependencies.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const coreSkillFile = path.join(root, 'SKILL.md');
const adapterFile = path.join(root, '.opencode', 'skills', 'fluidui', 'SKILL.md');
const references = [
  'design-decisions.md',
  'motion-guidelines.md',
  'accessibility.md',
  'interactions.md',
  'testing.md',
];
const integrations = [
  'opencode.md',
  'claude-code.md',
  'cursor.md',
  'gemini-cli.md',
  'codex.md',
  'generic-agents.md',
];
const examples = [
  'minimal',
  'futuristic',
  'dashboard',
  'animated-landing',
  'mobile-app',
];
const platforms = ['OpenCode', 'Claude Code', 'Cursor', 'Gemini CLI', 'Codex', 'Generic Agent Skills'];

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
function frontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  assert(match, 'missing closed YAML frontmatter block');
  const body = match[1];
  const field = (key) => {
    const folded = body.match(new RegExp(`^${key}:\\s*>[-\\s]*\\r?\\n((?:\\s+.+\\r?\\n?)+)`, 'm'));
    if (folded) return folded[1].trim();
    const inline = body.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    return inline ? inline[1].trim() : '';
  };
  return { body, field };
}

const core = fs.existsSync(coreSkillFile) ? fs.readFileSync(coreSkillFile, 'utf8') : '';

check('Required files exist', () => {
  const required = [
    'SKILL.md',
    'README.md',
    'LICENSE',
    '.gitignore',
    'CONTRIBUTING.md',
    ...references.map((name) => `references/${name}`),
    ...integrations.map((name) => `integrations/${name}`),
    'docs/COMPATIBILITY.md',
    'docs/VALIDATION_REPORT.md',
    'scripts/validate.mjs',
    'tests/fixtures/basic-page.html',
    'tests/test-scenario.md',
    '.opencode/skills/fluidui/SKILL.md',
    ...examples.map((name) => `examples/${name}/index.html`),
  ];
  const missing = required.filter((rel) => !fs.existsSync(path.join(root, rel)));
  assert(missing.length === 0, `Missing: ${missing.join(', ')}`);
  return `${required.length} files present`;
});

check('Core Agent Skills frontmatter is valid', () => {
  const { body, field } = frontmatter(core);
  const name = field('name');
  const description = field('description');
  const license = field('license');
  const compatibility = field('compatibility');
  assert(name === 'fluidui', `name must be lowercase "fluidui", got "${name}"`);
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name), 'name must be kebab-case');
  assert(description.length >= 1 && description.length <= 1024, 'description must be 1-1024 chars');
  assert(/website|site|web/i.test(description), 'description does not mention websites');
  assert(/when asked|use when/i.test(description), 'description must state when to use the skill');
  assert(license, 'portable license field is missing');
  assert(compatibility && compatibility.length <= 500, 'compatibility must be non-empty and <=500 chars');
  assert(!/<\/?[A-Za-z][^>]*>/.test(body), 'frontmatter contains XML-style tags');
  return `name=${name}, description=${description.length} chars, license=${license}`;
});

check('Core skill is platform-neutral', () => {
  const lower = core.toLowerCase();
  const forbidden = ['@fluidui', '/reload', '/skills', '$fluidui', '.opencode', '.claude', '.cursor', '.gemini', 'codex', 'claude code', 'cursor', 'gemini'];
  const found = forbidden.filter((token) => lower.includes(token));
  assert(found.length === 0, `platform-specific tokens in core skill: ${found.join(', ')}`);
  assert(!/\/(?:reload|skill|skills)\b/.test(core), 'core skill contains a platform slash command');
  return 'no platform commands or paths in SKILL.md';
});

check('Portable directory structure', () => {
  for (const dir of ['references', 'examples', 'integrations', 'scripts', 'tests', 'docs']) {
    assert(fs.statSync(path.join(root, dir)).isDirectory(), `missing directory: ${dir}`);
  }
  const skillFiles = walk(root).filter((file) => path.basename(file) === 'SKILL.md');
  assert(skillFiles.length === 2, `expected core + one thin adapter, found ${skillFiles.length} SKILL.md files`);
  assert(!fs.existsSync(path.join(root, 'fluidui')), 'unexpected duplicate skill directory at root');
  return `${skillFiles.length} SKILL.md files (core + adapter), 6 support directories`;
});

check('Adapters are thin and point to the core skill', () => {
  const adapters = walk(root).filter((file) => path.basename(file) === 'SKILL.md' && file !== coreSkillFile);
  assert(adapters.length > 0, 'no adapter found');
  for (const file of adapters) {
    const text = fs.readFileSync(file, 'utf8');
    const rel = path.relative(root, file);
    assert(text.split(/\r?\n/).length <= 20, `${rel} is too long to be a thin adapter`);
    assert(/`\.\.\/\.\.\/\.\.\/SKILL\.md`/.test(text), `${rel} does not point to the root SKILL.md`);
    const { field } = frontmatter(text);
    assert(field('name') === 'fluidui', `${rel} has an invalid adapter name`);
    for (const section of ['## Workflow', '## Motion rules', '## Accessibility', '## Definition of done']) {
      assert(!text.includes(section), `${rel} duplicates core section: ${section}`);
    }
  }
  return `${adapters.length} thin adapter(s)`;
});

check('Reference guides exist and are linked', () => {
  const linked = [...new Set((core.match(/`references\/[^`]+\.md`/g) || []).map((m) => m.slice(1, -1)))];
  assert(linked.length === references.length, `core should link all ${references.length} references, found ${linked.length}`);
  const existing = fs.readdirSync(path.join(root, 'references')).filter((f) => f.endsWith('.md')).sort();
  assert(JSON.stringify(existing) === JSON.stringify([...references].sort()), 'references directory has unexpected files');
  linked.forEach((ref) => assert(fs.existsSync(path.join(root, ref)), `Missing reference: ${ref}`));
  return `${linked.length} references linked and present`;
});

check('All relative markdown links resolve', () => {
  const markdownFiles = walk(root).filter((file) => file.endsWith('.md'));
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
  return `${markdownFiles.length} markdown files, ${linkCount} relative links`;
});

check('README covers universal installation', () => {
  const readme = read('README.md');
  const fences = (readme.match(/^```/gm) || []).length;
  assert(fences % 2 === 0, 'unclosed code fence');
  assert(/^# FluidUI$/m.test(readme), 'missing top-level title');
  const requiredSections = ['Supported platforms', 'Installation', 'Usage with any supported agent', 'Updating', 'Troubleshooting', 'Compatibility and limitations', 'Repository layout', 'Validation', 'Contributing', 'License'];
  const missing = requiredSections.filter((section) => !readme.includes(`## ${section}`));
  assert(missing.length === 0, `missing sections: ${missing.join(', ')}`);
  for (const platform of platforms) assert(readme.includes(platform), `README missing platform: ${platform}`);
  assert(readme.includes('git clone --depth 1 https://github.com/recklessrashdan/fluidui-web-motion-skill.git'), 'README missing direct GitHub clone command');
  const activations = [
    'make this webpage look premium and modern',
    'improve the motion and responsiveness of this dashboard',
    'create a futuristic landing page with smooth animations',
    'refine the existing interface without changing functionality',
  ];
  for (const phrase of activations) assert(readme.includes(phrase), `README missing activation example: ${phrase}`);
  const headings = (readme.match(/^#+ .+$/gm) || []).length;
  return `${headings} headings, ${fences / 2} code blocks, ${platforms.length} platforms`;
});

check('Platform integration docs are complete', () => {
  for (const name of integrations) {
    const rel = `integrations/${name}`;
    const text = read(rel);
    assert(/official documentation|official docs/i.test(text), `${rel}: no official source cited`);
    assert(/https:\/\//.test(text), `${rel}: no official URL`);
    assert(/verified status/i.test(text), `${rel}: missing verified status`);
    assert(/(?:VERIFIED|DOCUMENTED \/ NOT RUNTIME-TESTED|SPEC-CONFORMANT \/ NOT RUNTIME-TESTED)/.test(text), `${rel}: invalid status label`);
    assert(/\.agents\/skills\/fluidui|\.opencode\/skills\/fluidui|\.claude\/skills\/fluidui|\.cursor\/skills\/fluidui|\.gemini\/skills\/fluidui/.test(text), `${rel}: no concrete install path`);
  }
  return `${integrations.length} integration guides`;
});

check('Compatibility matrix covers all platforms', () => {
  const text = read('docs/COMPATIBILITY.md');
  for (const platform of platforms) assert(text.includes(platform), `matrix missing platform: ${platform}`);
  assert(text.includes('Official sources'), 'matrix missing official sources section');
  for (const url of ['agentskills.io/specification.md', 'opencode.ai/docs/skills', 'code.claude.com/docs/en/skills.md', 'cursor.com/docs/skills.md', 'geminicli.com/docs/cli/skills/', 'developers.openai.com/codex/skills.md']) {
    assert(text.includes(url), `matrix missing official source: ${url}`);
  }
  const rows = (text.match(/^\| (?:OpenCode|Claude Code|Cursor|Gemini CLI|Codex|Generic Agent Skills)/gm) || []).length;
  assert(rows === platforms.length, `expected ${platforms.length} matrix rows, found ${rows}`);
  return `${rows} platform rows with official sources`;
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

check('Tests and scenario are present', () => {
  const fixture = read('tests/fixtures/basic-page.html');
  const scenario = read('tests/test-scenario.md');
  const testing = read('references/testing.md');
  assert(/<nav|header/.test(fixture) && /hero/.test(fixture) && /card/.test(fixture), 'fixture missing baseline structure');
  assert(scenario.includes('tests/fixtures/basic-page.html'), 'scenario does not reference the fixture');
  assert(/passed/i.test(scenario), 'scenario has no recorded result');
  assert(testing.includes('basic-page.html'), 'testing guide does not describe the fixture scenario');
  return 'fixture, recorded scenario, and testing guide aligned';
});

check('No duplicated core instructions', () => {
  const headings = (core.match(/^## .+$/gm) || []).map((h) => h.trim());
  const duplicates = headings.filter((h, i) => headings.indexOf(h) !== i);
  assert(duplicates.length === 0, `Duplicate headings: ${[...new Set(duplicates)].join(', ')}`);
  assert(new Set(references).size === references.length, 'duplicate reference names');
  assert(new Set(examples).size === examples.length, 'duplicate example names');
  assert(new Set(integrations).size === integrations.length, 'duplicate integration names');
  return `${headings.length} unique core sections`;
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
    assert(!/\.(?:env|pem|key|p12|pfx|skill)$/i.test(path.basename(file)), `Sensitive file present: ${rel}`);
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
