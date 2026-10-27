/* Repeint les salles du jeu avec l'API kie.ai (modèle Nano Banana Edit).
   Chaque salle part de sa capture vide (tools/capture-rooms.mjs) : le
   modèle garde la composition et l'angle, et ne refait que le rendu.

   Usage :
     node tools/kie-rooms.mjs --dry-run party      affiche le prompt, ne dépense rien
     node tools/kie-rooms.mjs party                une seule salle, pour valider le style
     node tools/kie-rooms.mjs --all                toutes les salles qui n'ont pas encore d'image
     node tools/kie-rooms.mjs --force party        refait une salle qui a déjà son image

   La clé est lue dans KIE_API_KEY. Une image coûte quelques crédits ; le
   script n'en génère jamais plus que MAX_IMAGES par lancement. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const API = 'https://api.kie.ai/api/v1/jobs';
const UPLOAD = 'https://kieai.redpandaai.co/api/file-base64-upload';
const MODEL = 'google/nano-banana-edit';
const MAX_IMAGES = 8;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const refs = path.join(root, '.dream-loop', 'refs');
const outDir = path.join(root, 'jeu', 'assets', 'rooms');
const manifest = path.join(root, 'jeu', 'room-art.js');

const STYLE = `Repaint this exact image as a finished, high-end isometric 3D game screenshot,
in the polished style of a premium life-simulation game. Keep EXACTLY the same camera angle,
framing, room shape, wall positions, floor outline and the position and size of every piece
of furniture, so the new image can be laid pixel for pixel over the original. Replace the flat
geometric shapes with detailed, realistic materials: textured floors, real furniture, soft
global illumination, ambient occlusion, warm practical lights, subtle reflections. The room is
EMPTY: no people, no characters, no text labels, no UI. Keep the dark background outside the
room. Not concept art, not a painting: a real in-engine render.`;

const ROOMS = {
  bar: 'A cosy back room of a Parisian bar during an afterwork: wooden bar counter, bottles on shelves, warm amber lamps, small tables.',
  coworking: 'A bright modern startup coworking space during a meetup: desks, laptops, a projector screen, plants, pizza boxes, daylight.',
  salon: 'A professional trade show hall: branded exhibition booths, carpet aisles, display stands, bright even lighting.',
  conference: 'A conference auditorium: rows of seats facing a stage with a large screen and a lectern, purple stage lights, dim room.',
  gala: 'A luxurious charity gala: round tables with white tablecloths, candles and flower centrepieces, red velvet curtains, gold accents, red carpet.',
  home: 'A friendly apartment living room for drinks with friends: sofa, coffee table with snacks and glasses, rug, shelves, warm lamps.',
  party: 'A big house party turned nightclub: LED dance floor, DJ booth with speakers, disco ball, neon CLUB sign, lounge sofa, cocktail tables, pink and purple lights.',
  rooftop: 'An exclusive private rooftop party at night: wooden deck, lounge seating, bar, string lights, glass railing, city skyline glowing behind.'
};

const args = process.argv.slice(2);
const flag = f => args.includes(f);
const dry = flag('--dry-run'), force = flag('--force');
const named = args.filter(a => !a.startsWith('--'));
const unknown = named.filter(r => !ROOMS[r]);
if (unknown.length) fail(`Salle inconnue : ${unknown.join(', ')}. Salles : ${Object.keys(ROOMS).join(', ')}.`);
if (!named.length && !flag('--all')) fail('Indique une salle (ex. party) ou --all.');

const todo = (named.length ? named : Object.keys(ROOMS))
  .filter(r => force || !fs.existsSync(path.join(outDir, `${r}.jpg`)));
if (!todo.length) { console.log('Rien à faire : ces salles ont déjà leur image (--force pour les refaire).'); process.exit(0); }
if (todo.length > MAX_IMAGES) fail(`Trop d'images demandées (${todo.length} > ${MAX_IMAGES}).`);
for (const r of todo) if (!fs.existsSync(path.join(refs, `${r}.png`))) fail(`Capture manquante : lance d'abord node tools/capture-rooms.mjs.`);

if (dry) {
  todo.forEach(r => console.log(`--- ${r}\n${STYLE}\n${ROOMS[r]}\n`));
  console.log(`${todo.length} image(s) seraient générées.`);
  process.exit(0);
}

const key = process.env.KIE_API_KEY;
if (!key) fail('Définis KIE_API_KEY dans l\'environnement.');
fs.mkdirSync(outDir, { recursive: true });
console.log(`${todo.length} image(s) à générer : ${todo.join(', ')}.`);

for (const room of todo) {
  try {
    const ref = await upload(room);
    const taskId = await createTask(room, ref);
    const url = await waitFor(taskId);
    const img = await fetch(url);
    if (!img.ok) throw new Error(`téléchargement HTTP ${img.status}`);
    fs.writeFileSync(path.join(outDir, `${room}.jpg`), Buffer.from(await img.arrayBuffer()));
    console.log(`✓ ${room}`);
  } catch (e) {
    console.error(`✗ ${room} : ${e.message}`);
  }
}
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

async function upload(room) {
  const b64 = fs.readFileSync(path.join(refs, `${room}.png`)).toString('base64');
  const data = await call(UPLOAD, {
    base64Data: `data:image/png;base64,${b64}`, uploadPath: 'empire/refs', fileName: `${room}.png`
  });
  return data.downloadUrl || data.fileUrl || data.url;
}

async function createTask(room, ref) {
  const data = await call(`${API}/createTask`, {
    model: MODEL,
    input: { prompt: `${STYLE}\n${ROOMS[room]}`, image_urls: [ref], output_format: 'jpeg', image_size: '3:2' }
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

/* Ne déclare que les images réellement présentes sur le disque. */
function writeManifest() {
  const src = fs.readFileSync(manifest, 'utf8');
  const have = Object.keys(ROOMS).filter(r => fs.existsSync(path.join(outDir, `${r}.jpg`)));
  const body = have.map(r => `  ${r}: 'assets/rooms/${r}.jpg'`).join(',\n');
  fs.writeFileSync(manifest, src.replace(/const ROOM_ART = \{[^}]*\};/, `const ROOM_ART = {${body ? `\n${body}\n` : ''}};`));
  console.log(`room-art.js : ${have.length} salle(s) peinte(s).`);
}

function fail(msg) { console.error(msg); process.exit(1); }
