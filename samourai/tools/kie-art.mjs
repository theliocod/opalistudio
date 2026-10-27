/* Peint le décor de Lame de Cendres avec l'API kie.ai (modèle Nano Banana).
   Chaque image brute passe ensuite par tools/prep-art.py : raccords
   invisibles pour les textures et le ciel, carte de relief, compression.
   Le jeu ne charge que les images présentes, le reste reste généré par le code.

   Usage :
     node tools/kie-art.mjs --dry-run --all     affiche les prompts, ne dépense rien
     node tools/kie-art.mjs sol                 une seule image, pour valider le style
     node tools/kie-art.mjs --all               toutes celles qui manquent
     node tools/kie-art.mjs --force ciel        refait une image qui existe déjà
     node tools/kie-art.mjs --prep              retraite les images brutes déjà téléchargées

   La clé est lue dans KIE_API_KEY. Une image coûte quelques crédits ; le
   script n'en génère jamais plus que MAX_IMAGES par lancement. */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const API = 'https://api.kie.ai/api/v1/jobs';
const MODEL = 'google/nano-banana';
const MAX_IMAGES = 8;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rawDir = path.join(root, 'assets', 'raw');
const outDir = path.join(root, 'assets');
const manifest = path.join(root, 'src', 'art.js');

const TEXTURE = `Seamless tileable texture, square, seen straight from above, flat and evenly lit,
no shadows from the light, no perspective, no horizon, no objects, no text. Photorealistic
albedo texture for a dark fantasy samurai game set in feudal Japan.`;

/* genre : texture (raccord dans les deux sens), ciel (raccord gauche droite), affiche */
const ART = {
  sol: { kind: 'texture', size: '1:1', prompt: `${TEXTURE}
Old temple courtyard paving: large irregular dark grey granite flagstones, wet after rain,
thin moss and black ash in the joints, fine cracks, a few fallen dark red petals.` },
  pierre: { kind: 'texture', size: '1:1', prompt: `${TEXTURE}
Weathered dark granite of an ancient stone lantern: rough chiselled surface, grey lichen,
chipped edges, soot stains, faint green moss.` },
  laque: { kind: 'texture', size: '1:1', prompt: `${TEXTURE}
Old red lacquered wood of a Shinto torii gate: deep crimson lacquer, cracked and peeling,
black wood and vertical grain showing through, worn by centuries of rain.` },
  ecorce: { kind: 'texture', size: '1:1', prompt: `${TEXTURE}
Charred bark of a dead tree: almost black, deep vertical fissures, ash grey ridges,
dry and burnt, no leaves.` },
  ciel: { kind: 'ciel', size: '21:9', prompt: `Wide panoramic matte painting of a night sky for a dark fantasy
samurai game, meant to wrap around the player. Jagged mountain ranges as dark silhouettes in the
lower third, layers of mist between the ridges, a blood red glow along the horizon, heavy clouds
lit crimson from below, drifting embers. No moon, no buildings, no characters, no text. The
bottom edge fades into near black mist, the top edge into a dark night sky. The left and right
edges must continue each other.` },
  titre: { kind: 'affiche', size: '16:9', prompt: `Key art for "Lame de Cendres", a dark fantasy samurai
action game. A lone samurai seen from behind on the lower left, standing in the ruined courtyard
of a Shinto temple at night, katana drawn and lowered. A huge blood red moon behind a broken red
torii gate, ash and red petals falling, silhouettes of cursed ronin rising from the mist.
Cinematic painterly style, sumi-e ink meets dark fantasy, deep blacks, crimson and ember orange.
The centre of the image stays dark and calm enough to hold a title. No text, no letters, no logo.` }
};

const args = process.argv.slice(2);
const flag = f => args.includes(f);
const dry = flag('--dry-run'), force = flag('--force');
const named = args.filter(a => !a.startsWith('--'));
const unknown = named.filter(n => !ART[n]);
if (unknown.length) fail(`Image inconnue : ${unknown.join(', ')}. Images : ${Object.keys(ART).join(', ')}.`);

if (flag('--prep')) {
  for (const name of Object.keys(ART)) {
    const raw = rawFile(name);
    if (raw) prep(name, raw);
  }
  writeManifest();
  process.exit(0);
}
if (!named.length && !flag('--all')) fail('Indique une image (ex. sol) ou --all.');

const todo = (named.length ? named : Object.keys(ART))
  .filter(n => force || !fs.existsSync(path.join(outDir, `${n}.jpg`)));
if (!todo.length) { console.log('Rien à faire : ces images existent déjà (--force pour les refaire).'); process.exit(0); }
if (todo.length > MAX_IMAGES) fail(`Trop d'images demandées (${todo.length} > ${MAX_IMAGES}).`);

if (dry) {
  todo.forEach(n => console.log(`--- ${n} (${ART[n].kind}, ${ART[n].size})\n${ART[n].prompt}\n`));
  console.log(`${todo.length} image(s) seraient générées.`);
  process.exit(0);
}

const key = process.env.KIE_API_KEY;
if (!key) fail('Définis KIE_API_KEY dans l\'environnement.');
fs.mkdirSync(rawDir, { recursive: true });
console.log(`${todo.length} image(s) à générer : ${todo.join(', ')}.`);

/* Toutes les demandes partent ensemble, puis on attend chacune. */
const tasks = await Promise.all(todo.map(async name => {
  try { return { name, id: await createTask(name) }; }
  catch (e) { console.error(`✗ ${name} : ${e.message}`); return null; }
}));
await Promise.all(tasks.filter(Boolean).map(async ({ name, id }) => {
  try {
    const url = await waitFor(id);
    const img = await fetch(url);
    if (!img.ok) throw new Error(`téléchargement HTTP ${img.status}`);
    const ext = (path.extname(new URL(url).pathname) || '.png').toLowerCase();
    const raw = path.join(rawDir, `${name}${ext}`);
    fs.writeFileSync(raw, Buffer.from(await img.arrayBuffer()));
    prep(name, raw);
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name} : ${e.message}`);
  }
}));
writeManifest();

async function call(url, body) {
  const res = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${key}`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || (json.code && json.code !== 200)) throw new Error(`HTTP ${res.status} ${json.msg || ''}`.trim());
  return json.data;
}

async function createTask(name) {
  const data = await call(`${API}/createTask`, {
    model: MODEL,
    input: { prompt: ART[name].prompt, output_format: 'png', image_size: ART[name].size }
  });
  return data.taskId;
}

async function waitFor(taskId) {
  for (let i = 0; i < 90; i++) {
    await new Promise(r => setTimeout(r, 4000));
    const d = await call(`${API}/recordInfo?taskId=${encodeURIComponent(taskId)}`);
    if (d.state === 'success') return JSON.parse(d.resultJson).resultUrls[0];
    if (d.state === 'fail') throw new Error(d.failMsg || 'échec de la génération');
  }
  throw new Error('trop long, abandon après 6 minutes');
}

function rawFile(name) {
  if (!fs.existsSync(rawDir)) return null;
  const f = fs.readdirSync(rawDir).find(f => path.parse(f).name === name);
  return f ? path.join(rawDir, f) : null;
}

function prep(name, raw) {
  execFileSync('python3', ['-I', path.join(root, 'tools', 'prep-art.py'), name, raw, ART[name].kind], { stdio: 'inherit' });
}

/* src/art.js n'importe que les images réellement présentes : esbuild les
   intègre à dist/game.js, et le jeu s'ouvre toujours sans serveur. */
function writeManifest() {
  const files = [];
  for (const [name, a] of Object.entries(ART)) {
    if (!fs.existsSync(path.join(outDir, `${name}.jpg`))) continue;
    files.push([name, `${name}.jpg`]);
    if (a.kind === 'texture') files.push([`${name}N`, `${name}-n.jpg`]);
  }
  const src = `/* Généré par tools/kie-art.mjs : les images peintes présentes dans assets/. */
${files.map(([v, f]) => `import ${v} from '../assets/${f}';`).join('\n')}${files.length ? '\n' : ''}
export default {${files.length ? ` ${files.map(([v]) => v).join(', ')} ` : ''}};
`;
  fs.writeFileSync(manifest, src);
  console.log(`src/art.js : ${files.length} fichier(s).`);
}

function fail(msg) { console.error(msg); process.exit(1); }
