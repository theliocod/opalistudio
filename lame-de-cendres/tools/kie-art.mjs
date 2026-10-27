/* Peint avec kie.ai (Nano Banana) les images de la version Godot :
   icônes d'objets, illustrations des katanas, feuillages des arbres, sols.
   Chaque image brute passe ensuite par tools/prep-art.py.

   Usage :
     node tools/kie-art.mjs --dry-run --all   affiche les prompts, ne dépense rien
     node tools/kie-art.mjs objets            une seule image
     node tools/kie-art.mjs --all             toutes celles qui manquent
     node tools/kie-art.mjs --force erable    refait une image

   La clé est lue dans KIE_API_KEY (avec Node derrière un proxy : NODE_USE_ENV_PROXY=1). */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const API = 'https://api.kie.ai/api/v1/jobs';
const MODEL = 'google/nano-banana';
const MAX_IMAGES = 8;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rawDir = path.join(root, '.kie-raw');

const STYLE = 'Painterly but realistic dark fantasy feudal Japan, moody rim light, rich detail, no text, no letters, no watermark.';
const TEXTURE = `Seamless tileable texture, square, seen straight from above, flat and evenly lit, no shadows
from the light, no perspective, no horizon, no objects standing up, no text. Photorealistic albedo texture
for a dark fantasy samurai game set in feudal Japan at night.`;
const CUTOUT = `Isolated on a pure flat white background (#FFFFFF), no shadow on the background, crisp edges,
filling most of the frame, botanical photograph style, sharp focus, no text.`;

const ART = {
  objets: { kind: 'grille', size: '1:1', prompt: `Four inventory icons for a video game, arranged in a 2 by 2 grid,
each object alone and centered in its own quarter with a wide empty margin, on a plain very dark charcoal
background, no frames, no borders, no labels. Top left: a small white glazed ceramic sake bottle (tokkuri)
tied with a red cord. Top right: a rice ball onigiri wrapped in black nori, resting on a bamboo leaf.
Bottom left: a handleless green tea cup (yunomi) with thin steam rising. Bottom right: a bronze incense burner
with a curl of violet smoke. ${STYLE}` },
  katanas: { kind: 'bandes', size: '1:1', prompt: `Six Japanese katanas for a game inventory, each one drawn perfectly
horizontal, handle on the left and blade tip on the right, stacked one above the other in six evenly spaced
rows, all the same length, on a plain very dark charcoal background, no labels. Row 1: a plain worn steel katana
with black wrapped handle. Row 2: a katana with a crimson red blade wreathed in orange fire. Row 3: a pale
silver katana wrapped in cold blue ghost flames. Row 4: a steel katana crackling with white and pale blue
lightning. Row 5: a black blade trailing violet shadow smoke. Row 6: a legendary katana with a blood red
blade glowing like a red moon, gold guard. ${STYLE}` },
  katanas2: { kind: 'bandes', size: '1:1', prompt: `Six Japanese katanas for a game inventory, each one drawn perfectly
horizontal, handle on the left and blade tip on the right, stacked one above the other in six evenly spaced
rows, all the same length, on a plain very dark charcoal background, no labels. Row 1: a pale steel katana with a
jade green handle wrap, thin white wind streaks swirling around the blade. Row 2: a katana with a pink-tinted blade
engraved with cherry blossoms, a few pink petals drifting off it. Row 3: a black blade with a dark green sheen and a
coiled serpent engraved near the guard, dripping green venom. Row 4: a thick heavy katana with a wide dark iron blade
and a round iron guard, chipped, a monk's prayer bead tassel on the handle. Row 5: a masterwork katana with a
mirror-bright blade, a golden guard and a white and gold handle wrap, a soft holy light. Row 6: a copper red blade
with a black handle and a smoky dark aura, an assassin's blade. ${STYLE}` },
  objets2: { kind: 'grille', size: '1:1', prompt: `Four inventory icons for a video game, arranged in a 2 by 2 grid,
each object alone and centered in its own quarter with a wide empty margin, on a plain very dark charcoal
background, no frames, no borders, no labels. Top left: a small stack of oval gold koban coins (Japanese ryo).
Top right: a rolled technique scroll tied with a red cord, a bit of brush calligraphy visible. Bottom left: a round
black ninja smoke bomb with a short fuse, a wisp of grey smoke. Bottom right: a smooth round river pebble. ${STYLE}` },
  erable: { kind: 'feuillage', size: '1:1', prompt: `A dense round cluster of Japanese maple leaves (momiji) on thin
dark twigs, deep crimson and blood red autumn leaves with a few darker ones, seen from the side. ${CUTOUT}` },
  pin: { kind: 'feuillage', size: '1:1', prompt: `A dense tuft cluster of Japanese black pine needles on short twigs,
very dark green needles, seen from the side, a bushy layered spray. ${CUTOUT}` },
  washi: { kind: 'texture', size: '1:1', prompt: `Seamless tileable texture, square, flat, evenly lit, seen straight on:
aged Japanese washi paper, warm ivory and pale ochre, visible long plant fibres, faint stains and foxing,
very subtle, no writing, no drawing, no folds, no text.` },
  'carte-icones': { kind: 'grille9', size: '1:1', prompt: `Nine map icons painted in Japanese sumi-e ink brush style, black ink with
a few touches of vermilion red, arranged in a 3 by 3 grid, each icon alone and centered in its own cell with a wide
empty margin, on a plain pure white background (#FFFFFF), no frames, no labels, no text. Row 1: a small Shinto
torii gate; a cluster of three small village houses with thatched roofs; a war camp tent with a banner.
Row 2: a gnarled dead tree with hanging ropes; a small ruined shrine beside water ripples; a great temple with a
curved multi-tiered roof. Row 3: a walled castle town with a gate; a merchant's coin purse with old coins;
a samurai kabuto helmet with crescent crest. Simple, elegant, readable at small size, consistent brush style.` },
  herbe: { kind: 'texture', size: '1:1', prompt: `${TEXTURE}
Wild dark meadow ground: short dry dark olive and brown grass, fallen dark red maple leaves, small stones,
patches of black soil and ash.` },
  terre: { kind: 'texture', size: '1:1', prompt: `${TEXTURE}
A trodden dirt path: packed dark brown earth, small pebbles, faint footprints, a little ash and a few
dry pine needles.` },
};

const args = process.argv.slice(2);
const flag = f => args.includes(f);
const named = args.filter(a => !a.startsWith('--'));
const unknown = named.filter(n => !ART[n]);
if (unknown.length) fail(`Image inconnue : ${unknown.join(', ')}. Images : ${Object.keys(ART).join(', ')}.`);
if (!named.length && !flag('--all')) fail('Indique une image (ex. objets) ou --all.');
const done = n => fs.existsSync(path.join(root, 'assets', 'kie', `${n}.done`));
const todo = (named.length ? named : Object.keys(ART)).filter(n => flag('--force') || !done(n));
if (!todo.length) { console.log('Rien à faire.'); process.exit(0); }
if (todo.length > MAX_IMAGES) fail('Trop d\'images demandées.');
if (flag('--dry-run')) {
  todo.forEach(n => console.log(`--- ${n} (${ART[n].kind})\n${ART[n].prompt}\n`));
  process.exit(0);
}
const key = process.env.KIE_API_KEY;
if (!key) fail('Définis KIE_API_KEY dans l\'environnement.');
fs.mkdirSync(rawDir, { recursive: true });
console.log(`${todo.length} image(s) : ${todo.join(', ')}.`);

const tasks = await Promise.all(todo.map(async n => {
  try { return { n, id: await createTask(n) }; } catch (e) { console.error(`✗ ${n} : ${e.message}`); return null; }
}));
await Promise.all(tasks.filter(Boolean).map(async ({ n, id }) => {
  try {
    const url = await waitFor(id);
    const img = await fetch(url);
    if (!img.ok) throw new Error(`téléchargement HTTP ${img.status}`);
    const raw = path.join(rawDir, `${n}${path.extname(new URL(url).pathname) || '.png'}`);
    fs.writeFileSync(raw, Buffer.from(await img.arrayBuffer()));
    execFileSync('python3', ['-I', path.join(root, 'tools', 'prep-art.py'), n, raw, ART[n].kind], { stdio: 'inherit' });
    console.log(`✓ ${n}`);
  } catch (e) { console.error(`✗ ${n} : ${e.message}`); }
}));

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
async function createTask(n) {
  const d = await call(`${API}/createTask`, { model: MODEL, input: { prompt: ART[n].prompt, output_format: 'png', image_size: ART[n].size } });
  return d.taskId;
}
async function waitFor(id) {
  for (let i = 0; i < 90; i++) {
    await new Promise(r => setTimeout(r, 4000));
    const d = await call(`${API}/recordInfo?taskId=${encodeURIComponent(id)}`);
    if (d.state === 'success') return JSON.parse(d.resultJson).resultUrls[0];
    if (d.state === 'fail') throw new Error(d.failMsg || 'échec de la génération');
  }
  throw new Error('trop long, abandon après 6 minutes');
}
function fail(m) { console.error(m); process.exit(1); }
