/* Transforme une image peinte par kie.ai (assets/kie/<nom>.png, détourée) en
   modèle 3D texturé, sans squelette, avec l'API Meshy (image vers 3D). Pour
   les animaux : le jeu leur pose ensuite son propre squelette (tools_quadrupede.gd).

   Usage :
     node tools/meshy-objet.mjs --dry-run cheval   affiche ce qui serait lancé
     node tools/meshy-objet.mjs cheval renard      crée les modèles manquants
     node tools/meshy-objet.mjs --force cheval     refait un modèle

   La clé est lue dans MESHY_API_KEY (avec Node derrière un proxy : NODE_USE_ENV_PROXY=1).
   Écrit assets/modeles/<nom>.glb et l'identifiant de la tâche dans assets/modeles/<nom>.json. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const API = 'https://api.meshy.ai/openapi/v1';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'assets', 'modeles');
/* Le nombre de triangles visé : un cheval de près mérite plus de détails qu'un renard */
const OBJECTS = { cheval: 24000, renard: 12000 };

const args = process.argv.slice(2);
const flag = f => args.includes(f);
const named = args.filter(a => !a.startsWith('--'));
const unknown = named.filter(n => !OBJECTS[n]);
if (unknown.length) fail(`Objet inconnu : ${unknown.join(', ')}. Objets : ${Object.keys(OBJECTS).join(', ')}.`);
const todo = named.filter(n => flag('--force') || !fs.existsSync(path.join(dir, `${n}.glb`)));
if (!todo.length) { console.log('Rien à faire.'); process.exit(0); }
for (const n of todo) if (!fs.existsSync(path.join(root, 'assets', 'kie', `${n}.png`))) fail(`Image manquante : node tools/kie-art.mjs ${n}`);
if (flag('--dry-run')) { todo.forEach(n => console.log(`${n} : image vers 3D, ${OBJECTS[n]} triangles`)); process.exit(0); }
const key = process.env.MESHY_API_KEY;
if (!key) fail('Définis MESHY_API_KEY dans l\'environnement.');

await Promise.all(todo.map(async name => {
  try {
    const png = fs.readFileSync(path.join(root, 'assets', 'kie', `${name}.png`)).toString('base64');
    const id = await call('POST', '/image-to-3d', {
      image_url: `data:image/png;base64,${png}`,
      ai_model: 'latest',
      should_remesh: true,
      topology: 'triangle',
      target_polycount: OBJECTS[name],
      should_texture: true,
      enable_pbr: true,
      target_formats: ['glb']
    });
    fs.writeFileSync(path.join(dir, `${name}.json`), JSON.stringify({ modelId: id }, null, 2));
    const t = await waitFor(id, name);
    fs.writeFileSync(path.join(dir, `${name}.glb`), await download(t.model_urls.glb));
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

async function waitFor(id, name) {
  let last = -1;
  for (let i = 0; i < 200; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const t = await call('GET', `/image-to-3d/${id}`);
    if (t.status === 'SUCCEEDED') return t;
    if (t.status === 'FAILED' || t.status === 'CANCELED') throw new Error(t.task_error?.message || t.status);
    if (t.progress !== last) { last = t.progress; console.log(`  ${name} : ${t.progress ?? 0} %`); }
  }
  throw new Error('trop long, abandon');
}

async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`téléchargement HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

function fail(msg) { console.error(msg); process.exit(1); }
