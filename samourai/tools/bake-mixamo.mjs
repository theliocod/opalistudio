/* Convertit des animations Mixamo en animations du samouraï.
   Usage : node tools/bake-mixamo.mjs <fichier.fbx> <nom> [<fichier.fbx> <nom> ...]
   Un .glb qui contient plusieurs animations : <fichier.glb#animation> <nom>
   Écrit src/anims/<nom>.json. Les FBX bruts ne sont pas versionnés. */
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
if (!args.length || args.length % 2) { console.error('Usage : node tools/bake-mixamo.mjs <fichier.fbx> <nom> ...'); process.exit(1); }

const bundle = path.join(root, 'tools', '.bake-bundle.js');
execFileSync(path.join(root, 'node_modules', '.bin', 'esbuild'), [path.join(root, 'tools', 'bake-page.js'), '--bundle', '--format=iife', `--outfile=${bundle}`], { stdio: 'inherit' });

/* Un petit serveur local : le navigateur n'a le droit de lire les fichiers que par HTTP */
const files = { '/bake.js': bundle };
const clipOf = {};
for (let i = 0; i < args.length; i += 2) {
  const [file, clip] = args[i].split('#');
  const ext = path.extname(file).toLowerCase();
  files[`/${i}${ext}`] = path.resolve(file);
  clipOf[i] = [`/${i}${ext}`, clip || ''];
}
const server = http.createServer((req, res) => {
  if (req.url === '/') return res.end('<script src="/bake.js"></script>');
  const f = files[req.url];
  if (!f) { res.statusCode = 404; return res.end(); }
  res.end(fs.readFileSync(f));
}).listen(0, '127.0.0.1');
await new Promise(r => server.once('listening', r));
const url = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url + '/');
for (let i = 0; i < args.length; i += 2) {
  const [route, clip] = clipOf[i];
  const data = await page.evaluate(([u, c]) => window.bake(u, 30, c), [`${url}${route}`, clip]);
  const out = path.join(root, 'src', 'anims', `${args[i + 1]}.json`);
  fs.writeFileSync(out, JSON.stringify(data));
  console.log(`${args[i + 1]} : ${data.frames.length} images, ${data.duration} s → ${path.relative(root, out)}`);
}
await browser.close();
server.close();
fs.rmSync(bundle);
