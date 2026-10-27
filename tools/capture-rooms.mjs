/* Capture chaque salle du jeu, vide, sous l'angle de caméra par défaut.
   Ces captures servent de base au générateur d'images : il garde la
   composition et la perspective, et ne refait que le rendu.
   Usage : node tools/capture-rooms.mjs   (sortie dans .dream-loop/refs) */
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, '.dream-loop', 'refs');
fs.mkdirSync(out, { recursive: true });

/* Le cadre capturé, en multiples de la largeur de la salle. Doit rester
   identique à .iso-art dans jeu/scene.css. */
const FRAME_W = 1.68, FRAME_H = 1.12;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1.5 });
await page.goto('file://' + path.join(root, 'jeu', 'index.html'));
await page.addStyleTag({ content: `
  .iso-person, .iso-fx, .iso-art, .p-label { display: none !important; }
  .iso-room { animation: none !important; }
  .scene-foot, .scene-head { visibility: hidden; }` });

const rooms = await page.evaluate(() => {
  newGame('Alex', ORIGINS[0].id, LOOK);
  const seen = {}, list = [];
  [...VENUES.map(v => ['venue', v]), ...PARTIES.map(v => ['party', v])].forEach(([k, v]) => {
    if (!seen[v.room]) { seen[v.room] = 1; list.push([k, v.id, v.room]); }
  });
  return list;
});

for (const [kind, id, room] of rooms) {
  const box = await page.evaluate(([kind, id]) => {
    S.money = 1e9; S.energy = 100; S.scene = null; ROOM_ART_OFF = true;
    openScene(kind, id); render();
    const cam = document.querySelector('#scene .iso-cam').getBoundingClientRect();
    return { cx: cam.left + cam.width / 2, cy: cam.top + cam.height / 2, w: cam.width };
  }, [kind, id]);
  await page.waitForTimeout(600);
  const w = box.w * FRAME_W, h = box.w * FRAME_H;
  await page.screenshot({
    path: path.join(out, `${room}.png`),
    clip: { x: box.cx - w / 2, y: box.cy - h / 2, width: w, height: h }
  });
  console.log(`${room}.png`);
}
await browser.close();
