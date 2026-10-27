/* Transforme les planches de personnages (assets/modeles/*.png, peintes par
   tools/kie-art.mjs) en modèles 3D texturés et dotés d'un squelette, avec
   l'API Meshy : image vers 3D, puis rigging automatique.

   Usage :
     node tools/meshy.mjs --dry-run --all      affiche ce qui serait lancé, ne dépense rien
     node tools/meshy.mjs samourai             un seul personnage
     node tools/meshy.mjs --all                ceux qui n'ont pas encore de modèle
     node tools/meshy.mjs --force ronin        refait un modèle existant

   La clé est lue dans MESHY_API_KEY. Écrit assets/modeles/<nom>.glb (le
   modèle rigué) et garde l'identifiant des tâches dans <nom>.json. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const API = 'https://api.meshy.ai/openapi/v1';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'assets', 'modeles');

/* Taille réelle de chaque personnage, pour que Meshy place bien le squelette */
const CHARACTERS = { samourai: 1.78, ronin: 1.8, oni: 2.45 };

const args = process.argv.slice(2);
const flag = f => args.includes(f);
const dry = flag('--dry-run'), force = flag('--force');
const named = args.filter(a => !a.startsWith('--'));
const unknown = named.filter(n => !CHARACTERS[n]);
if (unknown.length) fail(`Personnage inconnu : ${unknown.join(', ')}. Personnages : ${Object.keys(CHARACTERS).join(', ')}.`);
if (!named.length && !flag('--all')) fail('Indique un personnage (ex. samourai) ou --all.');

const todo = (named.length ? named : Object.keys(CHARACTERS))
  .filter(n => force || !fs.existsSync(path.join(dir, `${n}.glb`)));
if (!todo.length) { console.log('Rien à faire : ces modèles existent déjà (--force pour les refaire).'); process.exit(0); }
for (const n of todo) if (!fs.existsSync(path.join(dir, `${n}.png`))) fail(`Planche manquante : node tools/kie-art.mjs ${n}`);

if (dry) {
  todo.forEach(n => console.log(`${n} : image vers 3D puis rigging, ${CHARACTERS[n]} m`));
  process.exit(0);
}

const key = process.env.MESHY_API_KEY;
if (!key) fail('Définis MESHY_API_KEY dans l\'environnement.');
console.log(`${todo.length} modèle(s) à créer : ${todo.join(', ')}.`);

await Promise.all(todo.map(async name => {
  const log = path.join(dir, `${name}.json`);
  try {
    const png = fs.readFileSync(path.join(dir, `${name}.png`)).toString('base64');
    const modelId = await call('POST', '/image-to-3d', {
      image_url: `data:image/png;base64,${png}`,
      ai_model: 'latest',
      /* sans remesh, Meshy ignore target_polycount et le modèle est trop lourd pour le jeu */
      should_remesh: true,
      topology: 'triangle',
      target_polycount: 30000,
      should_texture: true,
      enable_pbr: true,
      pose_mode: 'a-pose',
      target_formats: ['glb']
    });
    fs.writeFileSync(log, JSON.stringify({ modelId }, null, 2));
    const model = await waitFor('/image-to-3d', modelId, name, 'modèle');
    fs.writeFileSync(path.join(dir, `${name}-statique.glb`), await download(model.model_urls.glb));

    const rigId = await call('POST', '/rigging', { input_task_id: modelId, height_meters: CHARACTERS[name] });
    fs.writeFileSync(log, JSON.stringify({ modelId, rigId }, null, 2));
    const rig = await waitFor('/rigging', rigId, name, 'squelette');
    fs.writeFileSync(path.join(dir, `${name}.glb`), await download(rig.result.rigged_character_glb_url));
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name} : ${e.message}`);
  }
}));

async function call(method, route, body) {
  const res = await fetch(API + route, {
    method,
    headers: { Authorization: `Bearer ${key}`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`HTTP ${res.status} ${json.message || ''}`.trim());
  return method === 'POST' ? json.result : json;
}

async function waitFor(route, id, name, what) {
  let last = -1;
  for (let i = 0; i < 180; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const t = await call('GET', `${route}/${id}`);
    if (t.status === 'SUCCEEDED') return t;
    if (t.status === 'FAILED' || t.status === 'CANCELED') throw new Error(`${what} : ${t.task_error?.message || t.status}`);
    if (t.progress !== last) { last = t.progress; console.log(`  ${name}, ${what} : ${t.progress ?? 0} %`); }
  }
  throw new Error(`${what} : trop long, abandon après 15 minutes`);
}

async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`téléchargement HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

function fail(msg) { console.error(msg); process.exit(1); }
