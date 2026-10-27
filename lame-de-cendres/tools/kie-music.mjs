/* Compose la musique du jeu avec kie.ai (Suno), puis la convertit en .ogg.
   Chaque demande donne deux variantes.
   Usage : NODE_USE_ENV_PROXY=1 node tools/kie-music.mjs exploration combat ...
           NODE_USE_ENV_PROXY=1 node tools/kie-music.mjs --fetch <nom> <taskId>   (récupère une composition déjà faite)
   La clé est lue dans KIE_API_KEY. */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'assets', 'audio', 'musique');
const BASE = 'instrumental only, no vocals, no singing, feudal Japan, dark fantasy game soundtrack';
const TRACKS = {
  exploration: { title: 'Vallée des Cendres', style: `dark ambient Japanese score, solo shakuhachi, low taiko pulses, koto plucks, wind, melancholic, cinematic, slow, ${BASE}` },
  combat: { title: 'Lames sous la lune', style: `intense battle music, fast thundering taiko ensemble, aggressive shamisen riffs, shakuhachi screams, dark strings, driving rhythm, ${BASE}` },
  ville: { title: 'Hōjō aux lanternes', style: `calm town music at night, warm koto and shamisen melody, soft shinobue flute, gentle hand drums, distant festival, peaceful but melancholic, ${BASE}` },
  infiltration: { title: 'Ombres', style: `tense stealth music, minimal, low drones, sparse koto plucks, muted taiko heartbeat, suspense, quiet, ${BASE}` },
  boss: { title: "L'Oni de la Lune Rouge", style: `epic boss battle, huge taiko and odaiko drums, distorted biwa, ominous low brass, dissonant strings, demonic, relentless, ${BASE}` },
};

const key = process.env.KIE_API_KEY;
if (!key) { console.error('Définis KIE_API_KEY.'); process.exit(1); }
fs.mkdirSync(out, { recursive: true });
const call = async (url, body) => {
  const r = await fetch(url, { method: body ? 'POST' : 'GET', headers: { Authorization: `Bearer ${key}`, ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || (j.code && j.code !== 200)) throw new Error(`HTTP ${r.status} ${j.msg || ''}`);
  return j.data;
};

async function fetchTask(name, id) {
  for (let i = 0; i < 90; i++) {
    const d = await call(`https://api.kie.ai/api/v1/generate/record-info?taskId=${id}`);
    if (d.status === 'SUCCESS') {
      let k = 0;
      for (const s of d.response.sunoData) {
        k++;
        const a = await fetch(s.audio_url);
        if (!a.ok) throw new Error(`téléchargement HTTP ${a.status}`);
        const mp3 = path.join(out, `${name}-${k}.mp3`);
        fs.writeFileSync(mp3, Buffer.from(await a.arrayBuffer()));
        execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', mp3, '-c:a', 'libvorbis', '-q:a', '2', path.join(out, `${name}-${k}.ogg`)]);
        fs.rmSync(mp3);
        console.log(`✓ ${name}-${k} (${Math.round(s.duration)} s)`);
      }
      return;
    }
    if (/FAILED|ERROR/.test(d.status || '')) throw new Error(d.errorMessage || d.status);
    await new Promise(r => setTimeout(r, 8000));
  }
  throw new Error('trop long');
}

const args = process.argv.slice(2);
if (args[0] === '--fetch') { await fetchTask(args[1], args[2]); process.exit(0); }
await Promise.all(args.map(async name => {
  const t = TRACKS[name];
  if (!t) return console.error(`✗ morceau inconnu : ${name}`);
  try {
    const d = await call('https://api.kie.ai/api/v1/generate', { customMode: true, instrumental: true, model: 'V4_5', title: t.title, style: t.style, callBackUrl: 'https://example.com/lame-de-cendres' });
    console.log(`… ${name} : ${d.taskId}`);
    await fetchTask(name, d.taskId);
  } catch (e) { console.error(`✗ ${name} : ${e.message}`); }
}));
