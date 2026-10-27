/* Les portraits des dialogues et du registre, peints par kie.ai (Nano Banana
   Edit) à partir des planches de personnages de Meshy : même visage, même
   tenue que le modèle 3D.

   Usage :
     node tools/kie-portraits.mjs --all        ceux qui manquent
     node tools/kie-portraits.mjs garde moine  quelques-uns
     node tools/kie-portraits.mjs --force noble

   Lit ../samourai/assets/modeles/<nom>.png, écrit assets/kie/portraits/<nom>.png (512 × 512).
   La clé est lue dans KIE_API_KEY (avec Node derrière un proxy : NODE_USE_ENV_PROXY=1). */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const API = 'https://api.kie.ai/api/v1/jobs';
const UPLOAD = 'https://kieai.redpandaai.co/api/file-base64-upload';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sheets = path.join(root, '..', 'samourai', 'assets', 'modeles');
const out = path.join(root, 'assets', 'kie', 'portraits');
const raw = path.join(root, '.kie-raw');

const STYLE = `Turn this character into a painted bust portrait for a dark fantasy samurai video game: the very same
person, same face, same hair, same outfit and colours, seen in three-quarter view, head and shoulders filling the
frame. Rich oil painting style with a touch of ukiyo-e ink linework, dramatic warm lantern light from one side and a
cold moonlit rim light, a deep dark background with a faint crimson ink wash. No text, no letters, no frame.`;
const MOOD = {
  samourai: 'Stern and weary, eyes shadowed under the helmet.',
  ronin: 'Menacing, red eyes glowing through the iron mask, smoke around.',
  garde: 'Suspicious and stern, frowning at the viewer.',
  paysan: 'Tired but kind, a shy smile.',
  villageoise: 'Calm and proud, a faint smile.',
  marchand: 'Sly and jovial, a merchant\'s knowing grin.',
  noble: 'Proud and noble, piercing gaze, the scar clearly visible.',
  moine: 'Severe and calm, eyes shining from the white hood.',
  onnamusha: 'Fierce and graceful, determined gaze.',
  jubei: 'Cocky half smile, the eyepatch clearly visible.',
  kojiro: 'Serene and cold, a thin smile.',
  oyuki: 'Icy and unreadable, the fox mask on the forehead.',
};

const args = process.argv.slice(2);
const flag = f => args.includes(f);
const named = args.filter(a => !a.startsWith('--'));
const unknown = named.filter(n => !MOOD[n]);
if (unknown.length) fail(`Portrait inconnu : ${unknown.join(', ')}. Portraits : ${Object.keys(MOOD).join(', ')}.`);
if (!named.length && !flag('--all')) fail('Indique un personnage (ex. garde) ou --all.');
const todo = (named.length ? named : Object.keys(MOOD)).filter(n => flag('--force') || !fs.existsSync(path.join(out, `${n}.png`)));
if (!todo.length) { console.log('Rien à faire.'); process.exit(0); }
for (const n of todo) if (!fs.existsSync(path.join(sheets, `${n}.png`))) fail(`Planche manquante : ${n}.png`);
const key = process.env.KIE_API_KEY;
if (!key) fail('Définis KIE_API_KEY dans l\'environnement.');
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(raw, { recursive: true });
console.log(`${todo.length} portrait(s) : ${todo.join(', ')}.`);

await Promise.all(todo.map(async n => {
  try {
    const url = await upload(n);
    const task = await call(`${API}/createTask`, {
      model: 'google/nano-banana-edit',
      input: { prompt: `${STYLE} ${MOOD[n]}`, image_urls: [url], output_format: 'png', image_size: '1:1' }
    });
    const result = await waitFor(task.taskId);
    const img = await fetch(result);
    if (!img.ok) throw new Error(`téléchargement HTTP ${img.status}`);
    const file = path.join(raw, `portrait-${n}.png`);
    fs.writeFileSync(file, Buffer.from(await img.arrayBuffer()));
    execFileSync('python3', ['-I', '-c', `
import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert('RGB')
s = min(im.size)
im = im.crop(((im.width - s) // 2, (im.height - s) // 2, (im.width + s) // 2, (im.height + s) // 2))
im.resize((512, 512), Image.LANCZOS).save(sys.argv[2], optimize=True)
`, file, path.join(out, `${n}.png`)]);
    console.log(`✓ ${n}`);
  } catch (e) { console.error(`✗ ${n} : ${e.message}`); }
}));

async function upload(n) {
  const b64 = fs.readFileSync(path.join(sheets, `${n}.png`)).toString('base64');
  const res = await fetch(UPLOAD, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ base64Data: `data:image/png;base64,${b64}`, uploadPath: 'lame-de-cendres', fileName: `${n}.png` })
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.data?.downloadUrl) throw new Error(`envoi de la planche : HTTP ${res.status} ${json.msg || ''}`.trim());
  return json.data.downloadUrl;
}
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
