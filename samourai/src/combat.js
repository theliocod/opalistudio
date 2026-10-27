/* =========================================================
   LAME DE CENDRES — Les combattants
   Un combattant joue une « action » à la fois : un coup, une
   parade, une esquive, une blessure. Chaque action a ses clés
   d'animation, sa fenêtre où la lame blesse, ses dégâts.
   ========================================================= */
import * as THREE from 'three';
import { buildRig, GUARD, mixPose, samplePose } from './rig.js';
import { slashTrail } from './fx.js';
import spinKick from './anims/spin-kick.json';
import dying from './anims/dying.json';

/* Les animations converties de Mixamo : chaque image donne un quaternion
   par articulation, la hauteur des hanches et leur position au sol. */
function prepareClip(c) {
  c.q = c.frames.map(f => c.joints.map((_, i) => new THREE.Quaternion().fromArray(f.q, i * 4)));
  return c;
}
const CLIPS = { spinKick: prepareClip(spinKick), dying: prepareClip(dying) };

/* ---------- Les poses clés ---------- */
const P = {
  wind1: { chest: [0, -0.8, 0], shR: [-2.7, 0.1, -0.5], elR: [-0.35, 0, 0], wrR: [0.5, 0, 0], shL: [-0.4, -0.4, 0.3], elL: [-0.8, 0, 0], hipsY: -0.04 },
  end1: {
    chest: [0.18, 0.8, 0], neck: [0, -0.4, 0], shR: [-0.55, 1.2, 0.35], elR: [-0.15, 0, 0], wrR: [0.15, 0, 0],
    shL: [-0.3, 0.2, 0.4], elL: [-0.5, 0, 0], hipsY: -0.16,
    hipL: [-0.6, 0, 0.1], knL: [0.7, 0, 0], hipR: [0.35, 0, -0.1], knR: [0.45, 0, 0]
  },
  wind2: { chest: [0.1, 0.7, 0], neck: [0, -0.3, 0], shR: [-0.3, 1.3, 0.5], elR: [-0.2, 0, 0], wrR: [-0.2, 0, 0], hipsY: -0.14 },
  end2: { chest: [-0.1, -0.9, 0], neck: [0, 0.5, 0], shR: [-2.5, -0.5, -0.9], elR: [-0.2, 0, 0], wrR: [0.4, 0, 0], shL: [-0.6, -0.9, 0.2], hipsY: -0.08 },
  wind3: {
    chest: [0, -1.2, 0], neck: [0, 0.7, 0], shR: [-1.5, -0.9, -0.2], elR: [-0.25, 0, 0], wrR: [1.4, 0, 0], hipsY: -0.22,
    hipL: [-0.5, 0, 0.3], knL: [0.6, 0, 0], hipR: [0.3, 0, -0.3], knR: [0.5, 0, 0]
  },
  end3: {
    chest: [0, 1.3, 0], neck: [0, -0.7, 0], shR: [-1.5, 1.4, 0.1], elR: [-0.1, 0, 0], wrR: [1.4, 0, 0], hipsY: -0.22,
    hipL: [-0.5, 0, 0.3], knL: [0.6, 0, 0], hipR: [0.3, 0, -0.3], knR: [0.5, 0, 0]
  },
  windH: { chest: [-0.3, -0.2, 0], shR: [-3.1, 0.3, 0.1], elR: [-0.5, 0, 0], wrR: [0.2, 0, 0], shL: [-2.9, -0.3, 0], elL: [-0.6, 0, 0], hipsY: 0 },
  endH: {
    chest: [0.45, 0, 0], spine: [0.2, 0, 0], shR: [-0.7, 0.25, 0], elR: [-0.1, 0, 0], wrR: [0.6, 0, 0],
    shL: [-0.75, -0.3, 0], elL: [-0.2, 0, 0], hipsY: -0.3,
    hipL: [-1.0, 0, 0], knL: [1.0, 0, 0], hipR: [0.6, 0, 0], knR: [0.7, 0, 0]
  },
  windT: { chest: [0, -0.6, 0], shR: [-1.3, -0.4, -0.3], elR: [-1.6, 0, 0], wrR: [1.5, 0, 0], hipsY: -0.2 },
  endT: {
    chest: [0.2, 0.3, 0], shR: [-1.55, 0.25, 0], elR: [0, 0, 0], wrR: [1.55, 0, 0], hipsY: -0.3,
    hipL: [-1.0, 0, 0], knL: [0.9, 0, 0], hipR: [0.6, 0, 0], knR: [0.5, 0, 0]
  },
  parry: { chest: [0, 0.35, 0], shR: [-1.7, 0.7, 0.1], elR: [-1.1, 0, 0], wrR: [1.1, 0.3, 1.2], shL: [-1.2, -0.3, 0], elL: [-1.4, 0, 0], hipsY: -0.12 },
  dodge: {
    hipsY: -0.38, spine: [0.5, 0, 0], chest: [0.3, 0, 0],
    hipL: [-1.3, 0, 0], knL: [1.7, 0, 0], hipR: [-0.3, 0, 0], knR: [1.9, 0, 0], shR: [-0.4, 0.3, 0], elR: [-0.6, 0, 0]
  },
  hit: { chest: [-0.45, 0.3, 0], head: [-0.4, 0, 0], hipsY: -0.1, shR: [-0.3, 0.3, -0.5], shL: [-0.4, 0, 0.5] },
  stagger: {
    chest: [-0.6, -0.4, 0], head: [-0.5, 0, 0], shR: [0.2, 0, -1.0], elR: [-0.3, 0, 0], shL: [0.2, 0, 1.0], hipsY: -0.15,
    hipL: [0.3, 0, 0.2], knL: [0.5, 0, 0]
  },
  dead: {
    hipsY: -0.55, chest: [0.6, 0, 0], head: [0.6, 0, 0], shR: [0.2, 0, -0.6], shL: [0.2, 0, 0.6],
    hipL: [-1.4, 0, 0], knL: [2.2, 0, 0], hipR: [-1.3, 0, 0], knR: [2.2, 0, 0]
  }
};
P.stagger2 = { ...P.stagger, chest: [-0.4, -0.2, 0], hipsY: -0.25 };

/* ---------- Les actions ----------
   dur     : durée totale
   active  : fenêtre où la lame blesse
   combo   : à partir de quand on peut enchaîner
   lunge   : [début, fin, vitesse] d'un élan vers l'avant
   reach, arc : portée et angle du coup */
export const ACTIONS = {
  light1: { dur: 0.46, active: [0.12, 0.24], combo: 0.24, dmg: 18, cost: 12, lunge: [0.06, 0.2, 3.2], keys: [[0, {}], [0.11, P.wind1], [0.24, P.end1], [0.46, {}]] },
  light2: { dur: 0.46, active: [0.12, 0.23], combo: 0.24, dmg: 18, cost: 12, lunge: [0.06, 0.2, 3.2], keys: [[0, P.end1], [0.1, P.wind2], [0.23, P.end2], [0.46, {}]] },
  light3: { dur: 0.64, active: [0.18, 0.34], combo: 0.5, dmg: 28, cost: 16, lunge: [0.12, 0.3, 4.5], arc: 1.9, keys: [[0, P.end2], [0.15, P.wind3], [0.34, P.end3], [0.64, {}]] },
  heavy: { dur: 0.95, active: [0.42, 0.54], combo: 0.8, dmg: 46, cost: 28, heavy: true, lunge: [0.34, 0.5, 8], keys: [[0, {}], [0.36, P.windH], [0.5, P.endH], [0.95, {}]] },
  parry: { dur: 0.38, keys: [[0, {}], [0.07, P.parry], [0.26, P.parry], [0.38, {}]] },
  dodge: { dur: 0.42, keys: [[0, {}], [0.08, P.dodge], [0.3, P.dodge], [0.42, {}]] },
  hit: { dur: 0.34, keys: [[0, {}], [0.06, P.hit], [0.34, {}]] },
  stagger: { dur: 1.35, keys: [[0, {}], [0.12, P.stagger], [1.05, P.stagger2], [1.35, {}]] },
  /* Animations Mixamo : from/to découpent le clip, speed l'accélère */
  kick: { clip: 'spinKick', from: 0.25, to: 1.9, speed: 1.35, active: [0.5, 0.78], dmg: 10, posture: 45, kick: true, cost: 20, arc: 3.2, reach: 2.4 },
  /* la mort des ennemis : ils titubent, puis s'effondrent ; on garde la dernière image */
  dying: { clip: 'dying', from: 0.6, to: 4.6, speed: 1.5, hold: true },
  die: { dur: 1.1, hold: true, keys: [[0, {}], [0.25, P.hit], [1.1, P.dead]] },

  /* Les ennemis : de longues préparations, lisibles, que l'on peut parer */
  slash: { dur: 1.25, windup: 0.6, active: [0.62, 0.75], dmg: 18, keys: [[0, {}], [0.6, P.wind1], [0.75, P.end1], [1.25, {}]] },
  rising: { dur: 0.95, windup: 0.3, active: [0.3, 0.42], dmg: 18, keys: [[0, P.end1], [0.28, P.wind2], [0.42, P.end2], [0.95, {}]] },
  thrust: { dur: 1.3, windup: 0.66, active: [0.68, 0.82], dmg: 22, lunge: [0.62, 0.82, 10], arc: 0.7, reach: 2.2, keys: [[0, {}], [0.62, P.windT], [0.82, P.endT], [1.3, {}]] },
  smash: { dur: 1.5, windup: 0.85, active: [0.86, 0.98], dmg: 34, heavy: true, lunge: [0.78, 0.95, 6], keys: [[0, {}], [0.82, P.windH], [0.98, P.endH], [1.5, {}]] }
};

for (const a of Object.values(ACTIONS)) {
  if (a.clip) a.dur = (a.to - a.from) / a.speed;
}

const tmp = new THREE.Vector3();
const qa = new THREE.Quaternion(), qb = new THREE.Quaternion(), eul = new THREE.Euler();

export class Fighter {
  constructor(kind, scene) {
    this.kind = kind;
    this.rig = buildRig(kind);
    scene.add(this.rig.root);
    this.scene = scene;
    this.pos = new THREE.Vector3();
    this.yaw = 0;
    this.speed = 0;            // vitesse de marche, pour l'animation
    this.phase = 0;
    this.action = null;
    this.alive = true;
    this.deadT = 0;
    this.trail = slashTrail(scene, kind === 'player' ? 0xbfe6ff : 0xff3a2a);
    const stats = { player: [100, 0], ronin: [70, 50], oni: [340, 120] }[kind];
    this.maxHp = this.hp = stats[0];
    this.maxPosture = stats[1];
    this.posture = 0;
    this.blocking = false;
    this.glow = 0;
  }

  get scale() { return this.rig.scale; }
  get forward() { return tmp.set(Math.sin(this.yaw), 0, Math.cos(this.yaw)); }

  play(name) {
    this.action = { name, def: ACTIONS[name], t: 0, hits: new Set() };
  }

  is(...names) { return !!this.action && names.includes(this.action.name); }

  /* La lame blesse-t-elle en ce moment ? */
  get striking() {
    const a = this.action;
    return !!(a && a.def.active && a.t >= a.def.active[0] && a.t <= a.def.active[1]);
  }

  /* Le temps de préparation d'une attaque ennemie, de 0 à 1 */
  get windup() {
    const a = this.action;
    if (!a || !a.def.windup) return 0;
    return Math.min(1, a.t / a.def.windup);
  }

  facingAngleTo(p) {
    const want = Math.atan2(p.x - this.pos.x, p.z - this.pos.z);
    return Math.abs(Math.atan2(Math.sin(want - this.yaw), Math.cos(want - this.yaw)));
  }

  turnTowards(p, rate, dt) {
    const want = Math.atan2(p.x - this.pos.x, p.z - this.pos.z);
    const d = Math.atan2(Math.sin(want - this.yaw), Math.cos(want - this.yaw));
    this.yaw += Math.max(-rate * dt, Math.min(rate * dt, d));
  }

  update(dt, time) {
    const a = this.action;
    if (a) {
      a.t += dt;
      const l = a.def.lunge;
      if (l && a.t >= l[0] && a.t <= l[1]) this.pos.addScaledVector(this.forward, l[2] * dt * this.scale);
      if (a.t >= a.def.dur && !a.def.hold) this.action = null;
    }

    /* La marche : on fait tourner un cycle de jambes selon la vitesse */
    const k = Math.min(1, this.speed / 4.5);
    this.phase += dt * (3 + this.speed * 2.1);
    const s = Math.sin(this.phase), c = Math.cos(this.phase);
    const breathe = Math.sin(time * 2.1 + this.pos.x) * 0.025;
    const loco = mixPose(GUARD, GUARD, 0);
    loco.chest = [GUARD.chest[0] + breathe + k * 0.18, GUARD.chest[1], GUARD.chest[2]];
    loco.hipsY = GUARD.hipsY + Math.abs(c) * 0.05 * k - k * 0.05;
    loco.hipL = [GUARD.hipL[0] * (1 - k) - s * 0.75 * k, 0, 0.04];
    loco.hipR = [GUARD.hipR[0] * (1 - k) + s * 0.75 * k, 0, -0.04];
    loco.knL = [GUARD.knL[0] * (1 - k) + (0.25 + Math.max(0, -c) * 1.1) * k, 0, 0];
    loco.knR = [GUARD.knR[0] * (1 - k) + (0.25 + Math.max(0, c) * 1.1) * k, 0, 0];
    loco.shL = [GUARD.shL[0] + s * 0.15 * k, GUARD.shL[1], GUARD.shL[2]];
    if (this.blocking) Object.assign(loco, { chest: P.parry.chest, shR: P.parry.shR, elR: P.parry.elR, wrR: P.parry.wrR, shL: P.parry.shL, elL: P.parry.elL });

    let pose = loco;
    if (this.action && this.action.def.clip) return this.playClip(dt, loco);
    if (this.action) {
      const d = this.action.def;
      const ap = samplePose(d.keys, this.action.t, loco);
      /* les jambes continuent de marcher si l'action ne les commande pas */
      const fade = d.hold ? 1 : Math.min(1, (d.dur - this.action.t) / 0.1, this.action.t / 0.04);
      pose = mixPose(loco, ap, Math.max(0, fade));
    }
    this.rig.setPose(pose);
    this.finish(dt);
  }

  /* Joue une animation Mixamo, mélangée à la pose de marche au début et à la fin */
  playClip(dt, loco) {
    const a = this.action, d = a.def, c = CLIPS[d.clip];
    const ct = Math.min(d.to, d.from + a.t * d.speed);
    const f = ct * c.fps, i0 = Math.min(c.frames.length - 1, Math.floor(f)), i1 = Math.min(c.frames.length - 1, i0 + 1), u = f - i0;
    const F0 = c.frames[i0], F1 = c.frames[i1];
    /* l'élan de l'animation déplace vraiment le combattant */
    const rx = F0.x + (F1.x - F0.x) * u, rz = F0.z + (F1.z - F0.z) * u;
    if (a.root) {
      const dx = (rx - a.root[0]) * this.scale, dz = (rz - a.root[1]) * this.scale;
      const cy = Math.cos(this.yaw), sy = Math.sin(this.yaw);
      this.pos.x += dx * cy + dz * sy; this.pos.z += -dx * sy + dz * cy;
    }
    a.root = [rx, rz];
    const w = Math.max(0, Math.min(1, a.t / 0.1, d.hold ? 1 : (d.dur - a.t) / 0.15));
    const q = {};
    c.joints.forEach((k, i) => {
      const r = loco[k] || [0, 0, 0];
      qa.setFromEuler(eul.set(r[0], r[1], r[2]));
      qb.copy(c.q[i0][i]).slerp(c.q[i1][i], u);
      q[k] = qa.clone().slerp(qb, w);
    });
    const y = F0.y + (F1.y - F0.y) * u;
    this.rig.setQuats(q, (loco.hipsY || 0) * (1 - w) + y * w);
    this.finish(dt);
  }

  finish(dt) {
    /* Les morts s'affaissent, puis se dissipent en cendres */
    if (!this.alive && this.action && this.action.def.clip) {
      /* une fois à terre, le corps s'efface */
      this.deadT += dt;
      const f = Math.max(0, Math.min(1, (this.deadT - this.action.def.dur - 0.3) / 1.1));
      if (f > 0) Object.values(this.rig.mats).forEach(m => { m.transparent = true; m.opacity = 1 - f; });
    } else if (!this.alive) {
      this.deadT += dt;
      if (this.deadT > 1.1) {
        const f = Math.min(1, (this.deadT - 1.1) / 1.2);
        this.rig.root.rotation.x = -f * 1.35;
        this.rig.root.position.y = -f * 0.2;
      }
    }

    this.rig.root.position.x = this.pos.x;
    this.rig.root.position.z = this.pos.z;
    this.rig.root.rotation.y = this.yaw;

    /* La lame des démons rougeoie pendant qu'ils préparent leur coup */
    if (this.kind !== 'player') {
      const target = this.alive ? (this.striking ? 1.2 : this.windup ** 2 * 5) : 0;
      this.glow += (target - this.glow) * Math.min(1, dt * 12);
      this.rig.mats.steel.emissiveIntensity = 0.15 + this.glow;
    }

    this.rig.root.updateMatrixWorld(true);
    this.trail.update(this.rig.blade.base, this.rig.blade.tip, this.striking && !this.action.def.kick, dt);
  }

  /* le corps a fini de s'effacer : on peut le retirer de la scène */
  get gone() {
    if (this.alive) return false;
    const d = this.action && this.action.def;
    return this.deadT > (d && d.clip ? d.dur + 1.5 : 2.6);
  }

  bladeTip(out) { return this.rig.blade.tip.getWorldPosition(out); }

  dispose() {
    this.scene.remove(this.rig.root);
    this.rig.root.traverse(o => o.geometry && o.geometry.dispose());
  }
}

/* ---------- L'intelligence des damnés ---------- */
export function enemyThink(e, player, others, dt, token) {
  if (!e.alive || !player.alive) { e.speed *= 0.9; return; }
  e.cd = (e.cd ?? 1 + Math.random()) - dt;

  /* pendant la préparation, il suit encore sa cible ; ensuite il est engagé */
  if (e.action) {
    if (e.action.def.windup && e.action.t < e.action.def.windup * 0.75) e.turnTowards(player.pos, 4, dt);
    /* l'oni enchaîne parfois un second coup, remontant */
    if (e.combo && e.is('slash') && e.action.t >= e.action.def.dur - 0.05) { e.combo = false; e.play('rising'); }
    e.speed *= 0.85;
    return;
  }

  const d = e.pos.distanceTo(player.pos);
  const range = 2.2 * e.scale;
  e.turnTowards(player.pos, 5, dt);
  let mv = new THREE.Vector3();
  if (d > range + 0.4) {
    mv.copy(player.pos).sub(e.pos).setY(0).normalize().multiplyScalar(e.kind === 'oni' ? 2.4 : 2.9);
  } else {
    /* il tourne autour de sa proie en attendant son tour */
    const side = (e.side ??= Math.random() < 0.5 ? -1 : 1);
    const f = e.forward.clone();
    mv.set(f.z, 0, -f.x).multiplyScalar(side * 1.1);
    if (d < range - 0.5) mv.addScaledVector(f, -1.6);
  }
  /* ils ne se marchent pas dessus */
  for (const o of others) {
    if (o === e || !o.alive) continue;
    const away = e.pos.clone().sub(o.pos).setY(0);
    const dist = away.length();
    if (dist < 1.6 && dist > 0.001) mv.addScaledVector(away.normalize(), (1.6 - dist) * 3);
  }
  e.pos.addScaledVector(mv, dt);
  e.speed = mv.length();

  if (e.cd <= 0 && d < range + 1.2 && token.free) {
    token.free = false;
    if (e.kind === 'oni') { e.play(Math.random() < 0.45 ? 'smash' : 'slash'); e.combo = Math.random() < 0.6; }
    else e.play(d > range - 0.1 && Math.random() < 0.6 ? 'thrust' : 'slash');
    e.cd = (e.kind === 'oni' ? 1.4 : 1.8) + Math.random() * 1.6;
  }
}
