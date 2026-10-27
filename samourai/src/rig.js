/* =========================================================
   LAME DE CENDRES — Le corps
   Un squelette fait de groupes imbriqués, habillé de formes
   simples. Chaque articulation se règle par trois angles ;
   une « pose » est la liste de ces angles.
   Le personnage regarde vers +z, sa droite est en -x.
   ========================================================= */
import * as THREE from 'three';

export const JOINTS = ['hips', 'spine', 'chest', 'neck', 'head', 'shL', 'elL', 'shR', 'elR', 'wrR', 'hipL', 'knL', 'hipR', 'knR'];

/* La garde : le sabre tenu devant soi, pointe vers l'adversaire. */
export const GUARD = {
  hipsY: -0.06,
  hips: [0, 0, 0], spine: [0.06, 0, 0], chest: [0, -0.3, 0], neck: [0, 0.22, 0], head: [0, 0, 0],
  shR: [-0.75, 0.35, 0.05], elR: [-0.95, 0, 0], wrR: [0.75, 0.15, 0],
  shL: [-0.85, -0.55, -0.15], elL: [-1.0, 0, 0],
  hipL: [-0.3, 0, 0.06], knL: [0.4, 0, 0], hipR: [0.22, 0, -0.06], knR: [0.32, 0, 0]
};

function capsule(r, len, mat) {
  const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 4, 10), mat);
  m.position.y = -len / 2;
  m.castShadow = true;
  return m;
}

function box(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

/* Un membre : un os qui pend vers -y, et l'articulation suivante à son bout. */
function limb(parent, len, r, mat, extra) {
  parent.add(capsule(r, len, mat));
  if (extra) parent.add(extra);
  const next = new THREE.Group();
  next.position.y = -len;
  parent.add(next);
  return next;
}

function katana(steel, accent) {
  const k = new THREE.Group();
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.26, 8), accent);
  handle.rotation.x = Math.PI / 2; handle.position.z = -0.06;
  const tsuba = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.012, 12), new THREE.MeshStandardMaterial({ color: 0x2a2620, metalness: 0.8, roughness: 0.4 }));
  tsuba.rotation.x = Math.PI / 2; tsuba.position.z = 0.08;
  /* La lame, légèrement cambrée : trois segments qui s'inclinent. */
  const blade = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const seg = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.032 - i * 0.004, 0.31), steel);
    seg.position.set(0, i * i * 0.012, 0.24 + i * 0.3);
    seg.rotation.x = -i * 0.05;
    seg.castShadow = true;
    blade.add(seg);
  }
  k.add(handle, tsuba, blade);
  const base = new THREE.Object3D(); base.position.z = 0.14;
  const tip = new THREE.Object3D(); tip.position.set(0, 0.05, 1.02);
  k.add(base, tip);
  [handle, tsuba].forEach(m => (m.castShadow = true));
  return { group: k, base, tip };
}

/* kind : 'player' | 'ronin' | 'oni' */
export function buildRig(kind) {
  const evil = kind !== 'player';
  const mats = {
    armor: new THREE.MeshStandardMaterial({ color: evil ? 0x1d171f : 0x2c2f3d, roughness: 0.38, metalness: 0.35 }),
    plate: new THREE.MeshStandardMaterial({ color: evil ? 0x3a0e14 : 0x8a1a18, roughness: 0.5, metalness: 0.25 }),
    cloth: new THREE.MeshStandardMaterial({ color: evil ? 0x16131a : 0x221c22, roughness: 0.95 }),
    skin: new THREE.MeshStandardMaterial({ color: evil ? 0x4a3e44 : 0xb89074, roughness: 0.7 }),
    gold: new THREE.MeshStandardMaterial({ color: 0xc9a24a, roughness: 0.3, metalness: 1, emissive: 0x2a1a00 }),
    steel: new THREE.MeshStandardMaterial({
      color: evil ? 0x8a8f99 : 0xdfe5ee, roughness: 0.16, metalness: 1,
      emissive: evil ? 0xff1a1a : 0x9fd6ff, emissiveIntensity: evil ? 0.15 : 0.08
    }),
    eye: new THREE.MeshBasicMaterial({ color: evil ? 0xff2a1a : 0xffffff })
  };
  mats.eye.color.multiplyScalar(4);   // assez fort pour que le bloom s'en empare

  const root = new THREE.Group();
  const j = {};
  j.hips = new THREE.Group(); j.hips.position.y = 0.98; root.add(j.hips);
  j.hips.add(box(0.34, 0.18, 0.22, mats.cloth));
  /* Le kusazuri, la jupe d'armure en lamelles */
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + 0.3;
    const p = box(0.16, 0.26, 0.03, mats.plate, Math.sin(a) * 0.17, -0.16, Math.cos(a) * 0.13);
    p.rotation.y = a; p.rotation.x = 0.18;
    j.hips.add(p);
  }

  j.spine = new THREE.Group(); j.spine.position.y = 0.08; j.hips.add(j.spine);
  j.chest = new THREE.Group(); j.chest.position.y = 0.2; j.spine.add(j.chest);
  j.chest.add(box(0.44, 0.46, 0.27, mats.armor, 0, 0.12, 0));
  j.chest.add(box(0.46, 0.06, 0.29, mats.plate, 0, -0.08, 0));    // la ceinture
  j.chest.add(box(0.4, 0.04, 0.285, mats.gold, 0, 0.3, 0));       // le liseré du plastron

  j.neck = new THREE.Group(); j.neck.position.y = 0.38; j.chest.add(j.neck);
  j.head = new THREE.Group(); j.head.position.y = 0.06; j.neck.add(j.head);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.115, 16, 12), mats.skin);
  head.position.y = 0.09; head.castShadow = true; j.head.add(head);
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.15, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), mats.armor);
  helmet.position.y = 0.11; helmet.castShadow = true; j.head.add(helmet);
  const shikoro = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 0.13, 18, 1, true, Math.PI * 0.25, Math.PI * 1.5), mats.plate);
  shikoro.position.set(0, 0.07, -0.01); shikoro.rotation.y = Math.PI; j.head.add(shikoro);
  /* Le masque de fer, et des yeux qui brûlent pour les damnés */
  j.head.add(box(0.17, 0.09, 0.05, mats.armor, 0, 0.04, 0.1));
  [-1, 1].forEach(s => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(evil ? 0.017 : 0.011, 8, 6), mats.eye);
    eye.position.set(s * 0.045, 0.1, 0.105);
    j.head.add(eye);
  });
  if (kind === 'player') {
    /* Le kuwagata, le croissant doré sur le casque */
    [-1, 1].forEach(s => {
      const c = box(0.02, 0.24, 0.015, mats.gold, s * 0.06, 0.3, 0.1);
      c.rotation.z = -s * 0.42;
      j.head.add(c);
    });
  } else {
    /* Des cornes */
    [-1, 1].forEach(s => {
      const h = new THREE.Mesh(new THREE.ConeGeometry(0.03, kind === 'oni' ? 0.3 : 0.18, 8), mats.armor);
      h.position.set(s * 0.1, 0.27, 0.02); h.rotation.z = -s * 0.5;
      h.castShadow = true; j.head.add(h);
    });
  }

  /* Les bras. Les sode, les grandes épaulières, pendent des épaules. */
  const arm = side => {
    const sh = new THREE.Group(); sh.position.set(side * 0.28, 0.3, 0); j.chest.add(sh);
    const sode = box(0.2, 0.22, 0.24, mats.plate, side * 0.07, -0.08, 0);
    sode.rotation.z = side * 0.2;
    const el = limb(sh, 0.28, 0.05, mats.cloth, sode);
    const wr = limb(el, 0.25, 0.045, mats.armor);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), mats.skin);
    hand.castShadow = true; wr.add(hand);
    return { sh, el, wr };
  };
  const L = arm(1), R = arm(-1);
  j.shL = L.sh; j.elL = L.el; j.shR = R.sh; j.elR = R.el; j.wrR = R.wr;
  const sword = katana(mats.steel, mats.plate);
  j.wrR.add(sword.group);

  const leg = side => {
    const hip = new THREE.Group(); hip.position.set(side * 0.11, -0.07, 0); j.hips.add(hip);
    const kn = limb(hip, 0.44, 0.075, mats.cloth);
    const ankle = limb(kn, 0.44, 0.06, mats.armor);
    ankle.add(box(0.1, 0.06, 0.24, mats.armor, 0, -0.02, 0.05));
    return { hip, kn };
  };
  const LL = leg(1), RL = leg(-1);
  j.hipL = LL.hip; j.knL = LL.kn; j.hipR = RL.hip; j.knR = RL.kn;

  const scale = kind === 'oni' ? 1.38 : 1;
  root.scale.setScalar(scale);

  return {
    root, joints: j, mats, scale,
    blade: sword,
    /* Pose donnée en quaternions, pour les animations converties de Mixamo */
    setQuats(q, hipsY) {
      for (const k of JOINTS) if (q[k]) j[k].quaternion.copy(q[k]);
      j.hips.position.y = 0.98 + hipsY;
    },
    setPose(p) {
      for (const k of JOINTS) {
        const r = p[k];
        if (r) j[k].rotation.set(r[0], r[1], r[2]);
      }
      j.hips.position.y = 0.98 + (p.hipsY || 0);
    }
  };
}

/* ---------- Mélanges de poses ---------- */
export function mixPose(a, b, t) {
  const out = { hipsY: (a.hipsY || 0) + ((b.hipsY || 0) - (a.hipsY || 0)) * t };
  for (const k of JOINTS) {
    const x = a[k] || [0, 0, 0], y = b[k] || x;
    out[k] = [x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t];
  }
  return out;
}

const ease = t => t * t * (3 - 2 * t);

/* Lit une animation à clés : [[temps, pose partielle], ...]. Les
   articulations absentes d'une clé gardent celles de la garde. */
export function samplePose(keys, time, base = GUARD) {
  if (time <= keys[0][0]) return mixPose(base, { ...base, ...keys[0][1] }, 1);
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, p0] = keys[i], [t1, p1] = keys[i + 1];
    if (time <= t1) {
      const u = ease((time - t0) / (t1 - t0));
      return mixPose({ ...base, ...p0 }, { ...base, ...p1 }, u);
    }
  }
  return { ...base, ...keys[keys.length - 1][1] };
}
