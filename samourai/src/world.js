/* =========================================================
   LAME DE CENDRES — Le monde
   Une cour de temple en ruine, une nuit sans vent, une lune
   rouge. Tout est généré : aucune image, aucun modèle.
   ========================================================= */
import * as THREE from 'three';

export const ARENA_RADIUS = 13;

/* Petit générateur pseudo-aléatoire, pour que la cour soit la même à chaque partie. */
function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

/* Les dalles : une texture de couleur et une carte de rugosité où
   l'eau stagne entre les pierres. */
function flagstones() {
  const size = 1024, n = 16, cell = size / n;
  const col = document.createElement('canvas'); col.width = col.height = size;
  const rough = document.createElement('canvas'); rough.width = rough.height = size;
  const c = col.getContext('2d'), r = rough.getContext('2d');
  const rand = rng(7);
  c.fillStyle = '#0c0b0d'; c.fillRect(0, 0, size, size);
  r.fillStyle = '#ffffff'; r.fillRect(0, 0, size, size);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const off = (y % 2) * cell / 2;
      const v = 34 + rand() * 26;
      c.fillStyle = `rgb(${v + 4},${v},${v + 2})`;
      c.fillRect(x * cell + off + 3, y * cell + 3, cell - 6, cell - 6);
      /* fissures et mousse */
      for (let k = 0; k < 6; k++) {
        c.fillStyle = `rgba(${rand() < 0.3 ? '40,52,38' : '12,10,12'},${0.25 + rand() * 0.35})`;
        c.fillRect(x * cell + off + rand() * cell, y * cell + rand() * cell, 2 + rand() * 18, 1 + rand() * 3);
      }
      const g = 150 + rand() * 90;
      r.fillStyle = `rgb(${g},${g},${g})`;
      r.fillRect(x * cell + off + 3, y * cell + 3, cell - 6, cell - 6);
    }
  }
  /* Les flaques : des taches lisses qui reflètent la lune */
  for (let i = 0; i < 22; i++) {
    const px = rand() * size, py = rand() * size, rad = 20 + rand() * 70;
    const gr = r.createRadialGradient(px, py, 0, px, py, rad);
    gr.addColorStop(0, 'rgba(10,10,10,0.95)'); gr.addColorStop(1, 'rgba(10,10,10,0)');
    r.fillStyle = gr; r.fillRect(px - rad, py - rad, rad * 2, rad * 2);
    const gc = c.createRadialGradient(px, py, 0, px, py, rad);
    gc.addColorStop(0, 'rgba(4,4,8,0.55)'); gc.addColorStop(1, 'rgba(4,4,8,0)');
    c.fillStyle = gc; c.fillRect(px - rad, py - rad, rad * 2, rad * 2);
  }
  const map = new THREE.CanvasTexture(col), rmap = new THREE.CanvasTexture(rough);
  [map, rmap].forEach(t => { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(9, 9); t.anisotropy = 8; });
  map.colorSpace = THREE.SRGBColorSpace;
  return { map, rmap };
}

function shadowed(m) { m.castShadow = true; m.receiveShadow = true; return m; }

function torii(mat, dark) {
  const g = new THREE.Group();
  [-1, 1].forEach(s => {
    const post = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 7.5, 14), mat));
    post.position.set(s * 3.3, 3.75, 0); g.add(post);
    const foot = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.46, 0.5, 14), dark));
    foot.position.set(s * 3.3, 0.25, 0); g.add(foot);
  });
  const nuki = shadowed(new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.42, 0.34), mat));
  nuki.position.y = 5.6; g.add(nuki);
  /* Le kasagi, la poutre du haut, relevée aux extrémités */
  for (let i = -5; i <= 5; i++) {
    const seg = shadowed(new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.5, 0.62), mat));
    seg.position.set(i * 0.92, 7.35 + (i * i) * 0.018, 0);
    seg.rotation.z = -i * 0.035;
    g.add(seg);
  }
  const cap = shadowed(new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.2, 0.8), dark));
  cap.position.y = 7.72; g.add(cap);
  return g;
}

function stoneLantern(stone) {
  const g = new THREE.Group();
  const parts = [
    [new THREE.CylinderGeometry(0.45, 0.55, 0.3, 6), 0.15],
    [new THREE.CylinderGeometry(0.16, 0.2, 1.1, 8), 0.85],
    [new THREE.CylinderGeometry(0.42, 0.32, 0.22, 6), 1.5],
    [new THREE.BoxGeometry(0.5, 0.45, 0.5), 1.83],
    [new THREE.ConeGeometry(0.62, 0.45, 6), 2.28]
  ];
  parts.forEach(([geo, y]) => { const m = shadowed(new THREE.Mesh(geo, stone)); m.position.y = y; g.add(m); });
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffa040).multiplyScalar(5) }));
  flame.position.y = 1.83; g.add(flame);
  return { group: g, flame };
}

function deadTree(bark, rand) {
  const g = new THREE.Group();
  const grow = (parent, len, r, depth) => {
    const seg = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(r * 0.65, r, len, 6), bark));
    seg.position.y = len / 2; parent.add(seg);
    if (depth <= 0) return;
    const n = depth > 2 ? 2 : 2 + Math.floor(rand() * 2);
    for (let i = 0; i < n; i++) {
      const b = new THREE.Group();
      b.position.y = len * (0.7 + rand() * 0.3);
      b.rotation.set((rand() - 0.5) * 1.3, rand() * Math.PI * 2, (rand() - 0.5) * 1.3);
      parent.add(b);
      grow(b, len * (0.55 + rand() * 0.2), r * 0.6, depth - 1);
    }
  };
  grow(g, 2.6, 0.32, 4);
  return g;
}

/* Une pluie lente de particules : cendres qui montent, pétales qui tombent. */
function drift(count, color, size, up) {
  const pos = new Float32Array(count * 3), vel = new Float32Array(count * 3);
  const rand = rng(up ? 3 : 11);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (rand() - 0.5) * 50; pos[i * 3 + 1] = rand() * 14; pos[i * 3 + 2] = (rand() - 0.5) * 50;
    vel[i * 3] = (rand() - 0.5) * 0.4; vel[i * 3 + 1] = up ? 0.3 + rand() * 0.6 : -(0.25 + rand() * 0.4); vel[i * 3 + 2] = (rand() - 0.5) * 0.4;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending });
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  return {
    pts,
    update(dt, t) {
      for (let i = 0; i < count; i++) {
        pos[i * 3] += (vel[i * 3] + Math.sin(t * 0.7 + i) * 0.25) * dt;
        pos[i * 3 + 1] += vel[i * 3 + 1] * dt;
        pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
        if (pos[i * 3 + 1] > 14) pos[i * 3 + 1] = 0;
        if (pos[i * 3 + 1] < 0) pos[i * 3 + 1] = 14;
      }
      geo.attributes.position.needsUpdate = true;
    }
  };
}

export function buildWorld(scene) {
  const fogColor = new THREE.Color(0x160b10);
  scene.background = fogColor;
  scene.fog = new THREE.FogExp2(fogColor, 0.032);

  /* La lumière : une lune rouge qui découpe les ombres, un ciel froid. */
  scene.add(new THREE.HemisphereLight(0x4a5a80, 0x140809, 0.95));
  const moon = new THREE.DirectionalLight(0xffb3a6, 1.7);
  moon.position.set(-14, 22, -18);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  const sc = moon.shadow.camera;
  sc.left = sc.bottom = -20; sc.right = sc.top = 20; sc.near = 1; sc.far = 70;
  moon.shadow.bias = -0.0004; moon.shadow.normalBias = 0.02;
  scene.add(moon);
  /* une lueur froide, côté caméra, pour détacher les silhouettes */
  const fill = new THREE.DirectionalLight(0x8fa8ff, 0.7);
  fill.position.set(8, 6, 14);
  scene.add(fill);

  const moonDisc = new THREE.Mesh(new THREE.SphereGeometry(9, 32, 16), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xff3a22).multiplyScalar(2.2), fog: false }));
  moonDisc.position.set(-60, 52, -110);
  scene.add(moonDisc);
  const halo = new THREE.Mesh(new THREE.SphereGeometry(15, 32, 16), new THREE.MeshBasicMaterial({ color: 0x5a0d08, transparent: true, opacity: 0.35, fog: false, depthWrite: false }));
  halo.position.copy(moonDisc.position); scene.add(halo);

  /* Le sol */
  const { map, rmap } = flagstones();
  const ground = new THREE.Mesh(new THREE.CircleGeometry(60, 64), new THREE.MeshStandardMaterial({ map, roughnessMap: rmap, roughness: 1, metalness: 0.15 }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true;
  scene.add(ground);

  const rand = rng(42);
  const lacquer = new THREE.MeshStandardMaterial({ color: 0x5c0e0c, roughness: 0.6, metalness: 0.1 });
  const charcoal = new THREE.MeshStandardMaterial({ color: 0x111012, roughness: 0.8 });
  const stone = new THREE.MeshStandardMaterial({ color: 0x3a3836, roughness: 0.95 });
  const bark = new THREE.MeshStandardMaterial({ color: 0x15100e, roughness: 1 });

  const gate = torii(lacquer, charcoal);
  gate.position.set(0, 0, -17); scene.add(gate);

  /* Les ruines du temple, au fond, derrière le portique */
  const hall = new THREE.Group();
  for (let i = -3; i <= 3; i++) {
    const h = 3 + rand() * 4.5;
    const col = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.45, h, 10), lacquer));
    col.position.set(i * 2.6, h / 2, 0); col.rotation.z = (rand() - 0.5) * 0.08;
    hall.add(col);
  }
  const roof = shadowed(new THREE.Mesh(new THREE.BoxGeometry(20, 0.6, 7), charcoal));
  roof.position.set(-2, 6.6, -1.5); roof.rotation.z = 0.12; roof.rotation.x = 0.05;
  hall.add(roof);
  const plinth = shadowed(new THREE.Mesh(new THREE.BoxGeometry(22, 0.8, 9), stone));
  plinth.position.set(0, 0.4, -1.5); hall.add(plinth);
  hall.position.set(0, 0, -28); scene.add(hall);

  /* Un cercle de lanternes et de piliers brisés délimite la cour */
  const lights = [];
  const ring = 15.5;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + 0.13;
    const x = Math.sin(a) * ring, z = Math.cos(a) * ring;
    if (Math.abs(x) < 4.5 && z < -12) continue;          // on laisse le passage du portique
    if (i % 2 === 0) {
      const l = stoneLantern(stone);
      l.group.position.set(x, 0, z); l.group.rotation.y = rand() * 6;
      scene.add(l.group);
      if (lights.length < 4) {
        const p = new THREE.PointLight(0xff7a2e, 6, 9, 1.8);
        p.position.set(x, 1.9, z);
        scene.add(p);
        lights.push({ light: p, flame: l.flame, seed: rand() * 100 });
      }
    } else {
      const h = 1 + rand() * 3.5;
      const p = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.42, h, 8), stone));
      p.position.set(x, h / 2, z); p.rotation.z = (rand() - 0.5) * 0.25;
      scene.add(p);
    }
  }

  /* Des arbres morts et des rochers au-delà */
  for (let i = 0; i < 16; i++) {
    const a = rand() * Math.PI * 2, d = 19 + rand() * 18;
    const t = deadTree(bark, rand);
    t.position.set(Math.sin(a) * d, 0, Math.cos(a) * d);
    t.scale.setScalar(0.8 + rand() * 0.9);
    scene.add(t);
  }
  for (let i = 0; i < 26; i++) {
    const a = rand() * Math.PI * 2, d = 16.5 + rand() * 20;
    const r = shadowed(new THREE.Mesh(new THREE.DodecahedronGeometry(0.4 + rand() * 1.2, 0), stone));
    r.position.set(Math.sin(a) * d, 0.2, Math.cos(a) * d);
    r.rotation.set(rand() * 3, rand() * 3, rand() * 3);
    scene.add(r);
  }
  /* Les montagnes, silhouettes noyées dans la brume */
  for (let i = 0; i < 9; i++) {
    const a = Math.PI / 2 + (i / 8) * Math.PI;   // l'arc derrière le temple
    const m = new THREE.Mesh(new THREE.ConeGeometry(18 + rand() * 14, 26 + rand() * 22, 5), new THREE.MeshBasicMaterial({ color: 0x0d070a }));
    m.position.set(Math.sin(a) * 85, 8, Math.cos(a) * 85 - 20);
    scene.add(m);
  }

  const ash = drift(420, 0xff6a2a, 0.07, true);
  const petals = drift(160, 0xb3122a, 0.12, false);
  scene.add(ash.pts, petals.pts);

  return {
    update(dt, t) {
      ash.update(dt, t); petals.update(dt, t);
      lights.forEach(l => {
        const f = 0.8 + Math.sin(t * 9 + l.seed) * 0.08 + Math.sin(t * 23 + l.seed * 3) * 0.06;
        l.light.intensity = 6 * f;
        l.flame.scale.setScalar(0.9 + (f - 0.8) * 2);
      });
    }
  };
}
