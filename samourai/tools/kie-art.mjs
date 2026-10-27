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

/* Les planches de personnages servent de modèle à Meshy (tools/meshy.mjs) :
   un seul personnage, de face, bras écartés, sur fond neutre. */
const SHEET = `Full body character concept for a 3D model, a single character standing in a relaxed
A-pose, arms held slightly away from the body, legs apart, seen straight from the front, whole body
visible from head to feet with margin around it. Plain flat light grey background, soft even studio
lighting, no shadows on the ground, no weapon in the hands, no text. Highly detailed, realistic
materials, dark fantasy feudal Japan.`;

/* genre : texture (raccord dans les deux sens), ciel (raccord gauche droite), affiche,
   modele (planche de personnage, hors du jeu) */
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
The centre of the image stays dark and calm enough to hold a title. No text, no letters, no logo.` },
  samourai: { kind: 'modele', size: '3:4', prompt: `${SHEET}
A lone samurai in full o-yoroi armour: dark navy blue lacquered lamellar plates laced with deep
red silk cords, large rectangular sode shoulder guards, a kabuto helmet with a golden crescent
kuwagata crest, a black iron menpo face mask, red hakama trousers under armoured skirt plates,
armoured sleeves, straw sandals. Worn and battle scarred, ash on the armour. Empty scabbard at the hip.` },
  ronin: { kind: 'modele', size: '3:4', prompt: `${SHEET}
A cursed undead ronin: tattered black and dark grey samurai armour, broken lamellar plates,
torn kimono, a cracked helmet with two short black horns, a skull-like iron face mask with
glowing red eyes, ash grey corpse skin on the hands, black smoke wisps rising from the shoulders.
Lean and menacing.` },
  oni: { kind: 'modele', size: '3:4', prompt: `${SHEET}
The Oni of the Red Moon, a huge demon warlord: massive muscular build, dark crimson skin,
heavy black and blood red samurai armour with spikes, a demonic oni mask with long curved horns
and fangs, wild white hair, glowing red eyes, ragged red cape, clawed hands and feet. Towering
and terrifying.` },
  garde: { kind: 'modele', size: '3:4', prompt: `${SHEET}
An ashigaru town guard of the Hojo clan: a wide conical black lacquered jingasa iron hat with a small
white clan crest, a dark brown lacquered lamellar breastplate (okegawa-do) over an indigo kimono,
a white crest of three circles painted on the chest, short armoured skirt, dark indigo trousers bound
at the shins with white leggings, straw sandals, a stern weathered face with a short beard.` },
  paysan: { kind: 'modele', size: '3:4', prompt: `${SHEET}
A poor rice farmer of a feudal Japanese village: a wide woven straw kasa hat, a patched and faded
indigo short kimono with rolled sleeves tied by a rope belt, loose grey work trousers tied at the
ankles, straw sandals, a cloth towel around the neck, thin and tired, a kind lined face, mud on the legs.` },
  villageoise: { kind: 'modele', size: '3:4', prompt: `${SHEET}
A young village woman of feudal Japan: black hair tied up with a simple wooden comb, a muted
dusty rose short kimono with a dark red obi sash and a pale apron, loose dark grey mompe work
trousers gathered at the ankles so both legs are clearly separate, straw sandals, a calm and proud face.` },
  marchand: { kind: 'modele', size: '3:4', prompt: `${SHEET}
A prosperous travelling sword merchant: a stout older man with a shaved head and a grey topknot,
a rich dark brown haori jacket with golden coin crests over an ochre kimono, a striped grey hakama,
a heavy purse and an abacus tied at the belt, white tabi socks and wooden geta sandals, a sly
friendly smile and a thin moustache.` },
  noble: { kind: 'modele', size: '3:4', prompt: `${SHEET}
A renowned samurai champion of the castle town: no helmet, long black hair tied in a high topknot,
a sharp handsome face with a scar across one cheek, elegant black lacquered armour with gold trim
and white silk lacing, a white haori surcoat with a crimson clan crest on the back and chest,
dark grey hakama, armoured forearms and shins, an empty scabbard at the hip. Proud, noble, deadly.` },
  moine: { kind: 'modele', size: '3:4', prompt: `${SHEET}
A sohei warrior monk: a white cloth hood wrapped around the head leaving only the eyes and nose
visible, dark grey and black monk robes over a light lamellar breastplate, a long string of large
wooden prayer beads across the chest, white leggings, high wooden geta sandals, broad shoulders,
a calm, severe gaze.` },
  onnamusha: { kind: 'modele', size: '3:4', prompt: `${SHEET}
An onna-musha, a female samurai warrior: long black hair tied back with a white hachimaki headband,
a fierce beautiful face, deep crimson lacquered lamellar breastplate and shoulder guards over a white
kimono, a dark purple hakama with both legs clearly separate, armoured sleeves and shin guards,
straw sandals, an empty scabbard at the hip. Graceful and dangerous.` },
  jubei: { kind: 'modele', size: '3:4', prompt: `${SHEET}
Jubei, a legendary one-eyed wandering swordsman: a black leather eyepatch over the left eye, wild
shoulder-length black hair loosely tied, a rugged stubbled face with a confident half smile, a faded
charcoal grey kimono with the sleeves tied back by a cord, a dark blue hakama with both legs clearly
separate, black arm wraps, a straw rope belt with an empty scabbard, straw sandals. Battle worn and cool.` },
  kojiro: { kind: 'modele', size: '3:4', prompt: `${SHEET}
Kojiro, an elegant duelist samurai: very long straight black hair tied low behind the back, a calm
beautiful pale face with sharp eyes, a flowing violet haori with white wave patterns over a white
kimono, a pale grey hakama with both legs clearly separate, a long empty scabbard slung across the
back, white tabi socks and black geta sandals. Refined, serene and lethal.` },
  oyuki: { kind: 'modele', size: '3:4', prompt: `${SHEET}
Oyuki, the Lady of the Snow, a female assassin samurai: a white kitsune fox half mask with red markings
pushed up on the forehead, long silver white hair in a high ponytail, a pale cold face, a short snow
white kimono jacket with ice blue trim over fitted black armour, black fitted trousers with both legs
clearly separate, white arm guards, a short empty scabbard on the back, black tabi boots. Icy and swift.` }
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
  .filter(n => force || !fs.existsSync(outFile(n)));
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

function outFile(name) {
  return ART[name].kind === 'modele' ? path.join(outDir, 'modeles', `${name}.png`) : path.join(outDir, `${name}.jpg`);
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
    if (a.kind === 'modele') continue;
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
