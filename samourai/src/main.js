/* =========================================================
   LAME DE CENDRES — La partie
   La boucle de jeu : commandes, caméra, résolution des coups,
   vagues d'ennemis, interface.
   ========================================================= */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { buildWorld, ARENA_RADIUS } from './world.js';
import { particlePool } from './fx.js';
import { Fighter, ACTIONS, enemyThink } from './combat.js';

const $ = s => document.querySelector(s);

/* ---------- Rendu ---------- */
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
$('#game').appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 400);
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.85, 0.55, 0.82);
composer.addPass(bloom);
composer.addPass(new OutputPass());

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight); composer.setSize(innerWidth, innerHeight);
});

const world = buildWorld(scene);
const fx = particlePool(scene);

/* ---------- Commandes ----------
   On lit la position physique des touches : ZQSD sur un clavier
   français, WASD sur un clavier anglais, sans rien régler. */
const keys = new Set();
const pressed = new Set();
addEventListener('keydown', e => {
  if (!keys.has(e.code)) pressed.add(e.code);
  keys.add(e.code);
  if (['Space', 'Tab'].includes(e.code)) e.preventDefault();
});
addEventListener('keyup', e => keys.delete(e.code));
addEventListener('blur', () => keys.clear());
let mouseL = false, mouseR = false;
const canvas = renderer.domElement;
canvas.addEventListener('contextmenu', e => e.preventDefault());
/* Le premier clic capture la souris. Si le navigateur refuse, les clics
   suivants frappent quand même et la caméra se tourne en glissant. */
let lockRefused = false;
document.addEventListener('pointerlockerror', () => (lockRefused = true));
addEventListener('mousedown', e => {
  if (state !== 'play') return;
  if (document.pointerLockElement !== canvas && !lockRefused && canvas.requestPointerLock) {
    try {
      const r = canvas.requestPointerLock();
      if (r && r.catch) r.catch(() => (lockRefused = true));
    } catch { lockRefused = true; }
    return;
  }
  if (e.button === 0) mouseL = true;
  if (e.button === 2) mouseR = true;
});
let yaw = Math.PI, pitch = 0.32;
addEventListener('mousemove', e => {
  /* sans capture du pointeur, on tourne la caméra en glissant clic enfoncé */
  if (document.pointerLockElement !== canvas && !(e.buttons && state === 'play')) return;
  yaw -= e.movementX * 0.0024;
  pitch = Math.max(0.05, Math.min(0.9, pitch + e.movementY * 0.0018));
});
const take = code => { const had = pressed.has(code); pressed.delete(code); return had; };

/* ---------- État de la partie ---------- */
let state = 'title';             // title | play | dead | win
let player, enemies = [], wave = 0, waveTimer = 0;
let hitstop = 0, slowmo = 0, shake = 0;
let lastLight = -1, comboStep = 0, buffer = null, bufferT = 0;
let stamina = 100, staminaWait = 0;
let blockPressT = 99;            // temps depuis le dernier appui de garde
const token = { free: true };

const WAVES = [
  { title: 'Première vague', foes: ['ronin'] },
  { title: 'Deuxième vague', foes: ['ronin', 'ronin'] },
  { title: 'Troisième vague', foes: ['ronin', 'ronin', 'ronin'] },
  { title: "L'Oni de la Lune Rouge", foes: ['oni'], boss: true }
];

function reset() {
  player?.dispose(); enemies.forEach(e => e.dispose());
  player = new Fighter('player', scene);
  player.pos.set(0, 0, 6); player.yaw = Math.PI;
  enemies = []; wave = 0; waveTimer = 1.2;
  stamina = 100; comboStep = 0; buffer = null; yaw = Math.PI;
  $('#boss').classList.add('hidden');
  banner(WAVES[0].title, 'Défends la cour du temple');
}

function spawnWave(i) {
  const w = WAVES[i];
  w.foes.forEach((kind, k) => {
    const e = new Fighter(kind, scene);
    const a = -0.6 + k * 0.6 + (Math.random() - 0.5) * 0.3;
    e.pos.set(Math.sin(a) * 9, 0, -Math.cos(a) * 9);
    e.yaw = Math.atan2(player.pos.x - e.pos.x, player.pos.z - e.pos.z);
    e.cd = 1.5 + k * 0.8;
    enemies.push(e);
    fx.emit(e.pos.clone().setY(1), 60, { color: 0xff3018, speed: 3, up: 3, gravity: -1, lifeTime: 1.2, intensity: 2 });
  });
  if (w.boss) {
    $('#boss').classList.remove('hidden');
    $('#boss-name').textContent = w.title;
  }
}

/* ---------- Interface ---------- */
let bannerT = 0;
function banner(title, sub = '') {
  $('#banner-title').textContent = title;
  $('#banner-sub').textContent = sub;
  $('#banner').classList.remove('hidden', 'show'); void $('#banner').offsetWidth;
  $('#banner').classList.add('show');
  bannerT = 2.4;
}
let callT = 0;
function callout(text, cls = '') {
  const el = $('#callout');
  el.textContent = text; el.className = 'callout show ' + cls;
  callT = 0.9;
}
function hud() {
  $('#hp').style.width = (player.hp / player.maxHp * 100) + '%';
  $('#st').style.width = stamina + '%';
  const boss = enemies.find(e => e.kind === 'oni');
  if (boss) $('#boss-hp').style.width = Math.max(0, boss.hp / boss.maxHp * 100) + '%';
  $('#wave').textContent = `${Math.max(1, wave)} / ${WAVES.length}`;
}

function show(id) {
  ['#title', '#over', '#win'].forEach(s => $(s).classList.toggle('hidden', s !== id));
  $('#hud').classList.toggle('hidden', id !== null);
}

function start() {
  reset();
  state = 'play';
  show(null);
  try { const r = canvas.requestPointerLock?.(); if (r && r.catch) r.catch(() => (lockRefused = true)); } catch { lockRefused = true; }
}
$('#start-btn').addEventListener('click', start);
$('#retry-btn').addEventListener('click', start);
$('#again-btn').addEventListener('click', start);

/* ---------- Résolution des coups ---------- */
const v = new THREE.Vector3();

function bladeFx(f, color, n, opts) { fx.emit(f.bladeTip(v).clone(), n, { color, ...opts }); }

function strike(att, def, target) {
  if (!target.alive || att.action.hits.has(target)) return;
  const reach = (def.reach || 2.5) * att.scale + (target.scale - 1) * 0.6;
  if (att.pos.distanceTo(target.pos) > reach) return;
  if (att.facingAngleTo(target.pos) > (def.arc || 1.3)) return;
  att.action.hits.add(target);

  const chest = target.pos.clone().setY(1.3 * target.scale);

  if (target === player) {
    /* l'esquive : invulnérable au cœur de la roulade */
    if (player.is('dodge') && player.action.t > 0.03 && player.action.t < 0.34) { callout('Esquive', 'soft'); return; }
    const facing = player.facingAngleTo(att.pos) < 1.4;
    /* la parade : la garde levée juste avant l'impact */
    if (facing && blockPressT < 0.22) {
      att.play('stagger');
      att.posture = 0;
      fx.emit(chest.clone().lerp(att.pos.clone().setY(1.4), 0.5), 70, { color: 0xffd27a, speed: 9, up: 3, intensity: 5 });
      hitstop = 0.11; slowmo = 0.45; shake = 0.35;
      stamina = Math.min(100, stamina + 20);
      callout('Parade', 'gold');
      return;
    }
    if (facing && player.blocking && stamina > 0) {
      stamina -= def.heavy ? 45 : 22; staminaWait = 0.8;
      fx.emit(chest, 30, { color: 0xffc070, speed: 6, up: 2, intensity: 3 });
      player.pos.addScaledVector(att.forward, 0.35);
      shake = 0.15; hitstop = 0.05;
      if (stamina <= 0) { stamina = 0; player.blocking = false; player.play('stagger'); callout('Garde brisée', 'red'); }
      else player.hp -= def.dmg * 0.1;
    } else {
      player.hp -= def.dmg * (att.kind === 'oni' ? 1.4 : 1);
      player.play('hit');
      fx.emit(chest, 40, { color: 0x9a0a12, speed: 5, up: 2, gravity: 10, lifeTime: 0.7, intensity: 2.2 });
      shake = 0.4; hitstop = 0.07;
    }
    if (player.hp <= 0) kill(player);
    return;
  }

  /* un ennemi touché */
  const riposte = target.is('stagger');
  const dmg = def.dmg * (riposte ? 2.6 : 1);
  target.hp -= dmg;
  target.posture += dmg;
  fx.emit(chest, riposte ? 90 : 34, { color: 0x9a0a12, speed: riposte ? 8 : 5, up: 2, gravity: 10, lifeTime: 0.8, intensity: 2.4 });
  fx.emit(chest, 16, { color: 0xffe0b0, speed: 7, up: 1, intensity: 4, lifeTime: 0.25 });
  hitstop = def.heavy || riposte ? 0.1 : 0.055;
  shake = def.heavy || riposte ? 0.3 : 0.12;
  if (riposte) { callout('Riposte', 'red'); slowmo = 0.35; }
  if (target.hp <= 0) return kill(target);
  /* les ronins plient sous les coups ; l'oni n'encaisse qu'au-delà de sa posture */
  const superArmor = target.striking;
  if (target.posture >= target.maxPosture) { target.posture = 0; target.play('stagger'); callout('Posture brisée', 'gold'); }
  else if (!riposte && !superArmor && (target.kind === 'ronin' || def.heavy)) target.play('hit');
}

function kill(f) {
  f.alive = false; f.hp = 0;
  f.play('die');
  if (f === player) {
    slowmo = 1.2; shake = 0.4;
    setTimeout(() => { state = 'dead'; document.exitPointerLock?.(); show('#over'); }, 1800);
    return;
  }
  fx.emit(f.pos.clone().setY(1.2 * f.scale), 120, { color: 0xff5a1a, speed: 3, up: 2.5, gravity: -1.5, lifeTime: 1.8, intensity: 2.5 });
  if (enemies.every(e => !e.alive)) { slowmo = 0.9; callout(f.kind === 'oni' ? 'Oni terrassé' : 'Vague purifiée', 'gold'); }
}

/* ---------- Le joueur ---------- */
function controlPlayer(dt) {
  blockPressT += dt;
  if (!player.alive) { player.speed = 0; return; }

  const f = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
  const r = new THREE.Vector3(-f.z, 0, f.x);
  const move = new THREE.Vector3();
  if (keys.has('KeyW') || keys.has('ArrowUp')) move.add(f);
  if (keys.has('KeyS') || keys.has('ArrowDown')) move.sub(f);
  if (keys.has('KeyD') || keys.has('ArrowRight')) move.add(r);
  if (keys.has('KeyA') || keys.has('ArrowLeft')) move.sub(r);
  if (move.lengthSq()) move.normalize();

  /* on garde en mémoire la dernière demande, pour enchaîner sans attendre */
  if (mouseL || take('KeyJ')) { buffer = 'light'; bufferT = 0.3; }
  if (mouseR || take('KeyK')) { buffer = 'heavy'; bufferT = 0.3; }
  if (take('Space')) { buffer = 'dodge'; bufferT = 0.2; }
  mouseL = mouseR = false;
  bufferT -= dt; if (bufferT <= 0) buffer = null;

  const guardKey = keys.has('ShiftLeft') || keys.has('ShiftRight') || keys.has('KeyL');
  if (take('ShiftLeft') || take('ShiftRight') || take('KeyL')) blockPressT = 0;

  const a = player.action;
  const busy = a && ['hit', 'stagger', 'die'].includes(a.name);
  const free = !a || (a.def.combo !== undefined && a.t >= a.def.combo) || a.name === 'parry' && a.t > 0.2;

  if (!busy && buffer === 'dodge' && stamina > 0 && (!a || a.name !== 'dodge') && (free || (a.def.active && a.t > a.def.active[1]))) {
    const dir = move.lengthSq() ? move.clone() : player.forward.clone().negate();
    player.yaw = Math.atan2(dir.x, dir.z);
    player.play('dodge');
    stamina -= 22; staminaWait = 0.6; buffer = null;
  } else if (!busy && free && (buffer === 'light' || buffer === 'heavy') && stamina > 0) {
    const now = performance.now() / 1000;
    let name;
    if (buffer === 'heavy') { name = 'heavy'; comboStep = 0; }
    else {
      if (now - lastLight > 0.8) comboStep = 0;   // un peu de marge après la fin du coup
      name = ['light1', 'light2', 'light3'][comboStep];
      comboStep = (comboStep + 1) % 3;
      lastLight = now;
    }
    /* on se tourne vers l'ennemi le plus proche avant de frapper */
    const near = nearestEnemy(5.5);
    if (near) player.yaw = Math.atan2(near.pos.x - player.pos.x, near.pos.z - player.pos.z);
    else if (move.lengthSq()) player.yaw = Math.atan2(move.x, move.z);
    player.play(name);
    stamina -= ACTIONS[name].cost; staminaWait = 0.6; buffer = null;
  } else if (!busy && blockPressT === 0 && (!a || free)) {
    player.play('parry');
  }

  player.blocking = guardKey && !player.action && stamina > 0;

  /* déplacement libre quand rien d'autre ne commande le corps */
  if (!player.action) {
    const speed = player.blocking ? 1.8 : 5.2;
    player.pos.addScaledVector(move, speed * dt);
    player.speed = move.length() * speed;
    if (player.blocking) {
      const near = nearestEnemy(8);
      if (near) player.turnTowards(near.pos, 10, dt);
    } else if (move.lengthSq()) {
      const want = Math.atan2(move.x, move.z);
      const d = Math.atan2(Math.sin(want - player.yaw), Math.cos(want - player.yaw));
      player.yaw += d * Math.min(1, dt * 12);
    }
  } else {
    player.speed *= 0.85;
    if (player.is('dodge')) {
      const t = player.action.t;
      player.pos.addScaledVector(player.forward, (t < 0.3 ? 10 : 3) * dt);
    }
  }

  staminaWait -= dt;
  if (staminaWait <= 0) stamina = Math.min(100, stamina + (player.blocking ? 10 : 30) * dt);
}

function nearestEnemy(max) {
  let best = null, bd = max;
  for (const e of enemies) {
    if (!e.alive) continue;
    const d = e.pos.distanceTo(player.pos);
    if (d < bd) { bd = d; best = e; }
  }
  return best;
}

function keepInArena(f) {
  const d = Math.hypot(f.pos.x, f.pos.z);
  if (d > ARENA_RADIUS) f.pos.multiplyScalar(ARENA_RADIUS / d);
}

/* ---------- Caméra ---------- */
const camPos = new THREE.Vector3(0, 4, 12), camLook = new THREE.Vector3();
function updateCamera(dt, real) {
  if (!player) { /* l'écran titre : un lent travelling autour de la cour */
    const t = performance.now() / 1000 * 0.07;
    camera.position.set(Math.sin(t) * 11, 3.2, Math.cos(t) * 11);
    camera.lookAt(0, 2.2, -6);
    return;
  }
  const dist = 5.4;
  const f = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
  const want = player.pos.clone()
    .addScaledVector(f, -dist * Math.cos(pitch))
    .add(new THREE.Vector3(0, 1.5 + dist * Math.sin(pitch), 0));
  camPos.lerp(want, 1 - Math.exp(-real * 10));
  camLook.lerp(player.pos.clone().add(new THREE.Vector3(0, 1.35, 0)).addScaledVector(f, 1.2), 1 - Math.exp(-real * 12));
  camera.position.copy(camPos);
  if (shake > 0) {
    camera.position.x += (Math.random() - 0.5) * shake * 0.5;
    camera.position.y += (Math.random() - 0.5) * shake * 0.5;
  }
  camera.lookAt(camLook);
}

/* ---------- La boucle ---------- */
const clock = new THREE.Clock();
let time = 0;
function frame() {
  requestAnimationFrame(frame);
  const real = Math.min(clock.getDelta(), 1 / 20);

  /* l'arrêt sur impact et le ralenti donnent leur poids aux coups */
  let scale = 1;
  if (hitstop > 0) { hitstop -= real; scale = 0.04; }
  else if (slowmo > 0) { slowmo -= real; scale = 0.3; }
  shake = Math.max(0, shake - real * 1.6);
  const dt = real * scale;
  time += dt;

  if (state === 'play' && player) {
    controlPlayer(dt);
    token.free = !enemies.some(e => e.alive && e.action && e.action.def.windup);
    enemies.forEach(e => enemyThink(e, player, enemies, dt, token));

    player.update(dt, time);
    enemies.forEach(e => e.update(dt, time));

    /* les lames qui frappent cherchent leur cible */
    if (player.striking) enemies.forEach(e => strike(player, player.action.def, e));
    enemies.forEach(e => { if (e.striking) strike(e, e.action.def, player); });

    /* personne ne se traverse */
    enemies.forEach(e => {
      if (!e.alive) return;
      const away = player.pos.clone().sub(e.pos).setY(0);
      const d = away.length(), min = 0.9 * e.scale;
      if (d < min && d > 0.001) player.pos.addScaledVector(away.normalize(), min - d);
    });
    keepInArena(player); enemies.forEach(keepInArena);

    /* les morts disparaissent en cendres */
    enemies = enemies.filter(e => {
      if (!e.alive && e.deadT > 2.6) {
        fx.emit(e.pos.clone().setY(0.4), 50, { color: 0xff6a2a, speed: 2, up: 2, gravity: -2, lifeTime: 1.4, intensity: 2 });
        e.dispose(); return false;
      }
      return true;
    });

    if (!enemies.length && player.alive) {
      if (waveTimer <= 0) {
        if (wave >= WAVES.length) { state = 'win'; document.exitPointerLock?.(); show('#win'); }
        else {
          waveTimer = 2.6;
          if (wave > 0) banner(WAVES[wave].title, WAVES[wave].boss ? 'La lune saigne. Il arrive.' : '');
        }
      } else {
        waveTimer -= real;
        if (waveTimer <= 0 && wave < WAVES.length) { spawnWave(wave); wave++; waveTimer = 0; }
      }
    }
    hud();
  }

  bannerT -= real; if (bannerT <= 0) $('#banner').classList.remove('show');
  callT -= real; if (callT <= 0) $('#callout').classList.remove('show');

  fx.update(dt);
  world.update(dt, time);
  updateCamera(dt, real);
  composer.render();
}

show('#title');
frame();

/* Pour tester sans souris : window.__game expose l'état */
window.__game = {
  get player() { return player; }, get enemies() { return enemies; }, get state() { return state; },
  start, setYaw: y => (yaw = y)
};
