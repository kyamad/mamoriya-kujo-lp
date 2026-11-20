import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const output = path.join(root, '_site');
const basePath = '/mamoriya-kujo-lp/';
const excluded = new Set(['.git', '.github', '_site', 'scripts']);

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (excluded.has(entry.name) || entry.name === '.gitignore' || entry.name === 'README.md') continue;
  fs.cpSync(path.join(root, entry.name), path.join(output, entry.name), {
    recursive: true,
    filter(source) {
      return !source.split(path.sep).some((part) => excluded.has(part));
    },
  });
}

function rewrite(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      rewrite(target);
      continue;
    }
    if (!/\.(?:html|css|js)$/.test(entry.name) || entry.name.endsWith('.min.js')) continue;
    const source = fs.readFileSync(target, 'utf8');
    const prefixed = source.replace(/(["'])\/(?!\/|mamoriya-kujo-lp\/)/g, `$1${basePath}`);
    if (prefixed !== source) fs.writeFileSync(target, prefixed);
  }
}

rewrite(output);
console.log(`GitHub Pages build created: ${output}`);

