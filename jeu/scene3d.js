/* =========================================================
   EMPIRE — Moteur de décors isométriques
   Tout est construit en CSS 3D : un sol, deux murs qui
   portent leur décoration dans leur propre plan, des volumes
   à trois faces éclairées, des panneaux redressés face à la
   caméra pour tout ce qui est fin, et une couche d'effets
   lumineux par-dessus.
   Aucune image, aucune bibliothèque.
   ========================================================= */

/* ---------------------------------------------------------
   PRIMITIVES
   x, y sont le centre de l'objet en % du sol.
   w, d sont sa largeur et sa profondeur en % du sol.
   h est sa hauteur en pixels — le sol fait 100% = 760 px.
   --------------------------------------------------------- */

/* Un volume : trois faces visibles, une ombre de contact,
   et de quoi le faire briller s'il est lumineux. */
function pBox(o) {
  const st = [
    `left:${o.x}%`, `top:${o.y}%`, `width:${o.w}%`, `height:${o.d}%`,
    `--h:${o.h}px`, `--c:${o.c}`
  ];
  if (o.top) st.push(`--ct:${o.top}`);
  if (o.r !== undefined) st.push(`--r:${o.r}px`);
  if (o.glow) st.push(`--gc:${o.glow}`);
  if (o.rot) st.push(`--rot:${o.rot}deg`);
  return `<div class="p3 p-box ${o.cls || ''}" style="${st.join(';')}">
    <i class="ao"></i><i class="f-top"></i><i class="f-y"></i><i class="f-x"></i>
    ${o.label ? `<span class="p-label">${o.label}</span>` : ''}
    ${o.on || ''}
  </div>`;
}

/* Un cylindre : un disque en l'air et un corps redressé.
   Tabourets, tables rondes, enceintes, seaux, poteaux. */
function pCyl(o) {
  const st = [
    `left:${o.x}%`, `top:${o.y}%`, `width:${o.d}%`, `height:${o.d}%`,
    `--h:${o.h}px`, `--c:${o.c}`
  ];
  if (o.top) st.push(`--ct:${o.top}`);
  if (o.glow) st.push(`--gc:${o.glow}`);
  return `<div class="p3 p-cyl ${o.cls || ''}" style="${st.join(';')}">
    <i class="ao"></i><i class="cyl-body"></i><i class="cyl-top"></i>
    ${o.on || ''}
  </div>`;
}

/* Un aplat posé au sol : tapis, piste de danse, flaque, moquette. */
function pPlane(o) {
  const st = [
    `left:${o.x}%`, `top:${o.y}%`, `width:${o.w}%`, `height:${o.d}%`,
    `--c:${o.c || 'transparent'}`, `--z:${o.z || 0.6}px`
  ];
  if (o.r !== undefined) st.push(`--r:${o.r}`);
  return `<div class="p3 p-plane ${o.cls || ''}" style="${st.join(';')}">${o.on || ''}</div>`;
}

/* Une nappe de lumière au sol, en fusion additive. */
function pGlow(o) {
  return `<div class="p3 p-lightpool" style="
    left:${o.x}%; top:${o.y}%; width:${o.w}%; height:${o.d || o.w}%;
    --c:${o.c}; --o:${o.o === undefined ? 0.55 : o.o}"></div>`;
}

/* Un panneau toujours redressé face à la caméra : tout ce qui
   est trop fin pour être un volume — plantes, bouteilles,
   écrans, enseignes, verres, micros. */
function pBill(o) {
  return `<div class="p3 p-bill ${o.cls || ''}" style="
    left:${o.x}%; top:${o.y}%; --z:${o.z || 0}px;
    --w:${o.w}px; --h:${o.h}px">${o.on || ''}</div>`;
}

/* Un faisceau de lumière descendant du plafond. */
function pBeam(o) {
  return `<div class="p3 p-beam ${o.cls || ''}" style="
    left:${o.x}%; top:${o.y}%;
    --w:${o.w}px; --h:${o.h}px; --c:${o.c}; --d:${o.delay || 0}s"></div>`;
}

/* ---------------------------------------------------------
   PETITS GÉNÉRATEURS
   --------------------------------------------------------- */

/* Suite déterministe : un décor ne doit pas changer entre deux rendus. */
function seedRand(seed) {
  let t = seed * 1103515245 + 12345;
  return () => {
    t = (t * 1103515245 + 12345) % 2147483648;
    return t / 2147483648;
  };
}

/* Une rangée de sièges, comme dans un auditorium. */
function seatRow(y, n, c) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = 12 + (i / (n - 1)) * 76;
    out += pBox({ x, y, w: 6, d: 5, h: 13, c, top: shade3(c, 10), r: 2 });
    out += pBox({ x, y: y - 2.4, w: 6, d: 1.6, h: 26, c: shade3(c, -12), r: 2 });
  }
  return out;
}

/* Des bouteilles alignées sur un comptoir ou une étagère. */
function bottles(x, y, n, z, spread) {
  const r = seedRand(Math.round(x * 100 + y));
  const cols = ['#7ac0a0', '#c9a227', '#8b4a3a', '#3f6fae', '#b8873f', '#5c8c5a', '#a33f52'];
  let out = '';
  for (let i = 0; i < n; i++) {
    const bx = x + (i - (n - 1) / 2) * (spread || 1.7);
    const hh = 16 + Math.round(r() * 10);
    out += pBill({
      x: bx, y, z: z || 0, w: 7, h: hh,
      on: `<span class="sp-bottle" style="--c:${cols[Math.floor(r() * cols.length)]}"></span>`
    });
  }
  return out;
}

/* Une plante verte, en pot. */
function plant(x, y, s) {
  const k = s || 1;
  return pBill({ x, y, w: 46 * k, h: 62 * k, on: `<span class="sp-plant"></span>` });
}

/* Une guirlande d'ampoules, accrochée dans le plan d'un mur. */
function garland(n) {
  let out = '';
  for (let i = 0; i < n; i++) {
    out += `<i class="bulb" style="left:${(i + 0.5) / n * 100}%; --d:${(i % 5) * 0.4}s"></i>`;
  }
  return `<div class="wall-garland"><svg class="garland-wire" viewBox="0 0 100 12" preserveAspectRatio="none">
    <path d="M0 1 Q 12 11 25 2 Q 38 11 50 2 Q 62 11 75 2 Q 88 11 100 1" fill="none"
      stroke="rgba(255,255,255,.22)" stroke-width=".6"/></svg>${out}</div>`;
}

/* Une skyline nocturne, avec des fenêtres qui s'allument. */
function skyline(seed, n) {
  const r = seedRand(seed);
  let out = '';
  for (let i = 0; i < n; i++) {
    const w = 4 + r() * 8;
    const h = 22 + r() * 62;
    const left = (i / n) * 100 + r() * 1.5;
    const lit = [];
    const rows = Math.floor(h / 9);
    const cols = Math.max(1, Math.floor(w / 2.6));
    for (let a = 0; a < rows; a++) for (let b = 0; b < cols; b++) {
      if (r() < 0.42) lit.push(`<i style="left:${(b + 0.5) / cols * 100}%; top:${(a + 0.5) / rows * 100}%; --d:${(r() * 8).toFixed(1)}s"></i>`);
    }
    out += `<div class="bldg" style="left:${left}%; width:${w}%; height:${h}%; --z:${(0.5 + r() * 0.5).toFixed(2)}">
      <div class="bldg-win">${lit.join('')}</div>
      ${r() < 0.3 ? '<b class="antenna"></b>' : ''}
    </div>`;
  }
  return `<div class="city">${out}</div>`;
}

/* Une piste de danse en dalles lumineuses. */
function danceFloor(x, y, w, d, n) {
  let cells = '';
  const N = n || 8;
  for (let a = 0; a < N; a++) for (let b = 0; b < N; b++) {
    cells += `<i style="left:${b / N * 100}%; top:${a / N * 100}%; width:${100 / N}%; height:${100 / N}%;
      --d:${(((a * 3 + b * 5) % 12) * 0.18).toFixed(2)}s; --k:${(a + b) % 4}"></i>`;
  }
  return pPlane({ x, y, w, d, cls: 'dance-floor', on: `<div class="df-grid">${cells}</div>` });
}

/* Éclaircir ou assombrir une couleur hexadécimale. */
function shade3(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v) => Math.max(0, Math.min(255, v + amt));
  return '#' + [f(n >> 16), f((n >> 8) & 255), f(n & 255)]
    .map(v => v.toString(16).padStart(2, '0')).join('');
}

/* ---------------------------------------------------------
   LES DÉCORS
   Chaque salle décrit son ambiance, son sol, ses deux murs,
   son mobilier, ses effets, et les zones où les gens se
   tiennent — avec la posture qui va avec.
   --------------------------------------------------------- */

const ROOMS = {

  /* ======================= BAR ======================= */
  bar: {
    name: 'Arrière-salle de bar', me: { x: 74, y: 86 },
    tint: 'rgba(201,130,47,.14)', dark: 0.55,
    floor: { cls: 'fl-parquet', a: '#5e4630', b: '#6d5238' },
    wall: { cls: 'wl-brick', c: '#3a2c22', h: 118 },
    zones: [
      { x: 32, y: 30, r: 12, pose: 'drink', w: 3 },
      { x: 70, y: 34, r: 10, pose: 'talk', w: 2 },
      { x: 30, y: 68, r: 12, pose: 'idle', w: 2 },
      { x: 68, y: 70, r: 12, pose: 'drink', w: 2 }
    ],
    build() {
      let s = '';
      // le comptoir et son plateau de zinc
      s += pBox({ x: 50, y: 15, w: 62, d: 11, h: 52, c: '#7a5433', top: '#9c7040', r: 3, label: 'Comptoir' });
      s += pBox({ x: 50, y: 20.4, w: 62, d: 1.2, h: 14, c: '#4e3620', r: 1 });
      s += pBox({ x: 50, y: 8.5, w: 62, d: 2, h: 62, c: '#4a3220', r: 2 });
      s += bottles(50, 12, 11, 52, 4.4);
      // tabourets de bar
      [26, 38, 50, 62, 74].forEach(x => {
        s += pCyl({ x, y: 25, d: 6, h: 34, c: '#3b2f24', top: '#5c4633' });
      });
      // tables hautes et leurs verres
      [[28, 62], [66, 66], [46, 78]].forEach(([x, y]) => {
        s += pCyl({ x, y, d: 13, h: 30, c: '#4a3a2a', top: '#7a5c3c' });
        s += pBill({ x: x - 2.5, y: y - 1, z: 30, w: 12, h: 20, on: '<span class="sp-glass"></span>' });
        s += pBill({ x: x + 2.5, y: y + 1, z: 30, w: 12, h: 20, on: '<span class="sp-glass"></span>' });
      });
      // suspensions au-dessus du comptoir
      [30, 50, 70].forEach(x => {
        s += pBill({ x, y: 20, z: 118, w: 34, h: 40, on: '<span class="sp-lamp" style="--c:#ffcf8a"></span>' });
        s += pGlow({ x, y: 22, w: 30, c: 'rgba(255,190,110,.75)', o: 0.5 });
      });
      // un coin banquette au fond à droite
      s += pBox({ x: 88, y: 44, w: 14, d: 22, h: 20, c: '#5b4a38', top: '#75604a', r: 4 });
      s += pBox({ x: 94.5, y: 44, w: 3, d: 22, h: 40, c: '#4c3d2e', r: 4 });
      s += plant(90, 74, 1.1);
      s += plant(6, 46, 1);
      return s;
    },
    wallL: () => `
      <div class="w-shelf" style="top:26%"></div>
      <div class="w-shelf" style="top:44%"></div>
      <div class="w-neon" style="left:64%; top:8%; --c:#ff7a3c">BIÈRES</div>
      <div class="w-frame" style="left:8%; top:12%; width:11%; height:26%"></div>
      <div class="w-frame" style="left:22%; top:16%; width:9%; height:20%"></div>`,
    wallR: () => `
      <div class="w-frame" style="left:18%; top:22%; width:22%; height:34%"></div>
      <div class="w-frame" style="left:52%; top:30%; width:16%; height:26%"></div>`,
    fx: ['dust', 'warmhaze']
  },

  /* ==================== COWORKING ==================== */
  coworking: {
    name: 'Espace de coworking', me: { x: 62, y: 86 },
    tint: 'rgba(120,170,255,.06)', dark: 0.18,
    floor: { cls: 'fl-concrete', a: '#cdc8bd', b: '#d9d4c9' },
    wall: { cls: 'wl-plaster', c: '#e8e4dc', h: 120 },
    zones: [
      { x: 26, y: 30, r: 10, pose: 'idle', w: 2 },
      { x: 72, y: 30, r: 10, pose: 'talk', w: 2 },
      { x: 50, y: 62, r: 14, pose: 'talk', w: 3 },
      { x: 84, y: 74, r: 8, pose: 'drink', w: 1 }
    ],
    build() {
      let s = '';
      // trois îlots de bureaux avec leurs écrans allumés
      [[24, 26], [72, 26], [48, 66]].forEach(([x, y], i) => {
        s += pBox({ x, y, w: 30, d: 13, h: 26, c: '#a97f52', top: '#c19a68', r: 2 });
        s += pBill({ x: x - 8, y: y - 2, z: 26, w: 44, h: 30, on: `<span class="sp-screen" style="--c:#5ea8ff"></span>` });
        s += pBill({ x: x + 6, y: y - 2, z: 26, w: 44, h: 30, on: `<span class="sp-screen" style="--c:#7de0b8"></span>` });
        s += pGlow({ x, y: y + 1, w: 26, c: 'rgba(120,190,255,.5)', o: 0.35 });
        s += pCyl({ x: x - 8, y: y + 9, d: 7, h: 22, c: '#39415a', top: '#4b5678' });
        s += pCyl({ x: x + 8, y: y + 9, d: 7, h: 22, c: '#39415a', top: '#4b5678' });
      });
      // le coin café
      s += pBox({ x: 88, y: 68, w: 16, d: 12, h: 40, c: '#5a6478', top: '#77839a', r: 3 });
      s += pBill({ x: 88, y: 66, z: 40, w: 26, h: 30, on: '<span class="sp-cup"></span>' });
      s += plant(8, 62, 1.25);
      s += plant(14, 84, 1);
      s += plant(93, 34, 1.1);
      // le coin détente, devant
      s += pPlane({ x: 34, y: 84, w: 44, d: 26, c: '#8a8478', cls: 'rug' });
      s += pBox({ x: 24, y: 80, w: 22, d: 10, h: 18, c: '#4e5c78', top: '#647596', r: 4 });
      s += pBox({ x: 24, y: 74.5, w: 22, d: 3, h: 36, c: '#455370', r: 4 });
      s += pBox({ x: 46, y: 88, w: 10, d: 10, h: 18, c: '#4e5c78', top: '#647596', r: 4 });
      s += pCyl({ x: 34, y: 88, d: 12, h: 14, c: '#8b6b4a', top: '#a98356' });
      s += pBill({ x: 34, y: 87, z: 14, w: 22, h: 24, on: '<span class="sp-cup"></span>' });
      s += plant(58, 92, 1.15);
      // les bandeaux lumineux du plafond
      [30, 70].forEach(x => { s += pGlow({ x, y: 48, w: 62, d: 26, c: 'rgba(255,255,255,.5)', o: 0.28 }); });
      return s;
    },
    wallL: () => `
      <div class="w-window" style="left:6%; top:14%; width:38%; height:62%"><i></i><i></i></div>
      <div class="w-board" style="left:56%; top:16%; width:34%; height:52%"></div>`,
    wallR: () => `
      <div class="w-poster" style="left:14%; top:18%; width:18%; height:40%; --c:#f97316"></div>
      <div class="w-poster" style="left:38%; top:24%; width:16%; height:34%; --c:#2f6fed"></div>
      <div class="w-poster" style="left:60%; top:20%; width:17%; height:38%; --c:#1f9d6b"></div>`,
    fx: ['daylight']
  },

  /* ====================== SALON ====================== */
  salon: {
    name: 'Salon professionnel', me: { x: 50, y: 90 },
    tint: 'rgba(255,255,255,.05)', dark: 0.3,
    floor: { cls: 'fl-carpet', a: '#585f6d', b: '#616978' },
    wall: { cls: 'wl-dark', c: '#232936', h: 130 },
    zones: [
      { x: 22, y: 40, r: 9, pose: 'talk', w: 2 },
      { x: 52, y: 40, r: 9, pose: 'idle', w: 2 },
      { x: 82, y: 40, r: 9, pose: 'talk', w: 2 },
      { x: 50, y: 76, r: 16, pose: 'idle', w: 2 }
    ],
    build() {
      let s = '';
      const stands = [
        { x: 20, c: '#e05a3a', n: 'NOVA' },
        { x: 50, c: '#2f6fed', n: 'AXIOM' },
        { x: 80, c: '#1f9d6b', n: 'KAIROS' }
      ];
      stands.forEach(st => {
        // le fond du stand, son comptoir et son écran
        s += pBox({ x: st.x, y: 13, w: 26, d: 2.5, h: 96, c: shade3(st.c, -60), top: st.c, r: 2 });
        s += pBox({ x: st.x, y: 24, w: 20, d: 8, h: 34, c: '#e9ecf3', top: '#ffffff', r: 2, label: st.n });
        s += pBill({ x: st.x, y: 14, z: 40, w: 82, h: 46, on: `<span class="sp-screen" style="--c:${st.c}"></span>` });
        s += pBill({ x: st.x - 12, y: 18, z: 0, w: 26, h: 88, on: `<span class="sp-rollup" style="--c:${st.c}"></span>` });
        s += pGlow({ x: st.x, y: 26, w: 34, c: `${st.c}bb`, o: 0.4 });
        s += pBeam({ x: st.x, y: 24, w: 84, h: 124, c: st.c, delay: st.x / 40 });
      });
      // une seconde rangée de stands, plus petits, au fond de l'allée
      [{ x: 22, c: '#7b52d3', n: 'ORBIS' }, { x: 50, c: '#c9a227', n: 'HELIX' }, { x: 78, c: '#e05a3a', n: 'VELVET' }]
        .forEach(st => {
          s += pBox({ x: st.x, y: 86, w: 22, d: 2.5, h: 74, c: shade3(st.c, -60), top: st.c, r: 2 });
          s += pBox({ x: st.x, y: 78, w: 17, d: 7, h: 30, c: '#e9ecf3', top: '#ffffff', r: 2, label: st.n });
          s += pGlow({ x: st.x, y: 80, w: 26, c: `${st.c}aa`, o: 0.3 });
        });
      // l'îlot café au milieu de l'allée
      s += pBox({ x: 50, y: 60, w: 24, d: 11, h: 30, c: '#3d4557', top: '#525c72', r: 3 });
      s += bottles(50, 58, 5, 30, 3.6);
      [36, 64].forEach(x => s += pCyl({ x, y: 64, d: 8, h: 26, c: '#39415a', top: '#4b5678' }));
      s += plant(9, 60, 1.15);
      s += plant(91, 62, 1.15);
      s += pPlane({ x: 50, y: 50, w: 94, d: 14, c: '#6b7385', cls: 'aisle' });
      return s;
    },
    wallL: () => `<div class="w-banner" style="left:12%; top:12%; width:76%; height:22%">SALON DES ENTREPRENEURS</div>`,
    wallR: () => `<div class="w-poster" style="left:20%; top:20%; width:24%; height:44%; --c:#f97316"></div>
      <div class="w-poster" style="left:52%; top:26%; width:22%; height:38%; --c:#7b52d3"></div>`,
    fx: ['haze']
  },

  /* =================== CONFÉRENCE =================== */
  conference: {
    name: 'Auditorium', me: { x: 50, y: 92 },
    tint: 'rgba(123,82,211,.16)', dark: 0.66,
    floor: { cls: 'fl-carpet', a: '#2b3042', b: '#333950' },
    wall: { cls: 'wl-acoustic', c: '#1a1e2a', h: 150 },
    zones: [
      { x: 24, y: 56, r: 8, pose: 'idle', w: 2 },
      { x: 76, y: 56, r: 8, pose: 'idle', w: 2 },
      { x: 50, y: 82, r: 16, pose: 'talk', w: 3 },
      { x: 50, y: 30, r: 10, pose: 'idle', w: 1 }
    ],
    build() {
      let s = '';
      // la scène et son grand écran
      s += pBox({ x: 50, y: 14, w: 74, d: 16, h: 30, c: '#2b3247', top: '#3b455f', r: 2 });
      s += pBill({ x: 50, y: 9, z: 30, w: 340, h: 140, on: '<span class="sp-bigscreen"></span>' });
      s += pBox({ x: 36, y: 18, w: 7, d: 6, h: 46, c: '#0f131c', top: '#1b2130', r: 2 });
      s += pBill({ x: 36, y: 17, z: 46, w: 18, h: 26, on: '<span class="sp-mic"></span>' });
      s += pGlow({ x: 50, y: 22, w: 78, d: 30, c: 'rgba(150,110,255,.75)', o: 0.5 });
      // les rangées de sièges
      s += seatRow(46, 11, '#2b3348');
      s += seatRow(58, 11, '#2b3348');
      s += seatRow(70, 11, '#2b3348');
      s += seatRow(82, 11, '#2b3348');
      // les projecteurs suspendus
      [26, 42, 58, 74].forEach((x, i) => {
        s += pBeam({ x, y: 22, w: 110, h: 142, c: i % 2 ? '#7b52d3' : '#38bdf8', delay: i * 0.7 });
      });
      return s;
    },
    wallL: () => `<div class="w-acoustic"></div><div class="w-neon" style="left:40%; top:6%; --c:#7b52d3">SUMMIT</div>`,
    wallR: () => `<div class="w-acoustic"></div>`,
    fx: ['haze', 'beams']
  },

  /* ====================== GALA ====================== */
  gala: {
    name: 'Gala', me: { x: 50, y: 92 },
    tint: 'rgba(232,196,106,.16)', dark: 0.6,
    floor: { cls: 'fl-marble', a: '#302739', b: '#3c3247' },
    wall: { cls: 'wl-drape', c: '#432233', h: 150 },
    zones: [
      { x: 24, y: 32, r: 12, pose: 'drink', w: 2 },
      { x: 76, y: 32, r: 12, pose: 'talk', w: 2 },
      { x: 24, y: 74, r: 12, pose: 'talk', w: 2 },
      { x: 76, y: 74, r: 12, pose: 'drink', w: 2 },
      { x: 50, y: 56, r: 10, pose: 'idle', w: 1 }
    ],
    build() {
      let s = '';
      // le tapis rouge jusqu'à la scène
      s += pPlane({ x: 50, y: 60, w: 22, d: 78, c: '#7d1a2b', cls: 'redcarpet' });
      // les tables rondes nappées, avec bougies et centres de table
      [[24, 32], [76, 32], [24, 74], [76, 74]].forEach(([x, y]) => {
        // les chaises d'abord : elles passent derrière la nappe
        [0, 60, 120, 180, 240, 300].forEach(a => {
          const rad = a * Math.PI / 180;
          const cx = x + Math.cos(rad) * 15, cy = y + Math.sin(rad) * 13;
          s += pBox({ x: cx, y: cy, w: 7, d: 6, h: 20, c: '#4e3f52', top: '#6d5a72', r: 2 });
          s += pBox({ x: cx, y: cy - 2.6, w: 7, d: 1.6, h: 42, c: '#463849', top: '#5f4e63', r: 2 });
        });
        s += pCyl({ x, y, d: 22, h: 32, c: '#ddd6c6', top: '#fbf7ee' });
        s += pBill({ x, y: y - 1.5, z: 32, w: 46, h: 50, on: '<span class="sp-flowers"></span>' });
        s += pBill({ x: x - 6, y: y + 4, z: 32, w: 15, h: 38, on: '<span class="sp-candle"></span>' });
        s += pBill({ x: x + 6, y: y + 4, z: 32, w: 15, h: 38, on: '<span class="sp-candle"></span>' });
        s += pGlow({ x, y, w: 20, c: 'rgba(255,196,110,.6)', o: 0.34 });
      });
      // la scène du fond
      s += pBox({ x: 50, y: 12, w: 46, d: 12, h: 26, c: '#3a2334', top: '#4d3046', r: 2 });
      s += pBill({ x: 50, y: 10, z: 26, w: 150, h: 70, on: '<span class="sp-drape-stage"></span>' });
      // la pyramide de coupes
      s += pCyl({ x: 50, y: 88, d: 18, h: 32, c: '#d8cfbc', top: '#f2ecdd' });
      s += pBill({ x: 50, y: 87, z: 32, w: 76, h: 66, on: '<span class="sp-tower"></span>' });
      // le lustre
      s += pBill({ x: 50, y: 52, z: 132, w: 150, h: 110, cls: 'chandelier', on: '<span class="sp-chandelier"></span>' });
      s += pGlow({ x: 50, y: 52, w: 42, c: 'rgba(255,214,140,.7)', o: 0.3 });
      return s;
    },
    wallL: () => `<div class="w-drape"></div><div class="w-gold-line"></div>`,
    wallR: () => `<div class="w-drape"></div><div class="w-gold-line"></div>`,
    fx: ['goldbokeh', 'haze']
  },

  /* ==================== CHEZ TOI ==================== */
  home: {
    name: 'Chez toi', me: { x: 44, y: 88 },
    tint: 'rgba(255,170,90,.1)', dark: 0.35,
    floor: { cls: 'fl-parquet', a: '#b78d5f', b: '#c69a69' },
    wall: { cls: 'wl-plaster', c: '#d9cfc0', h: 120 },
    zones: [
      { x: 30, y: 40, r: 12, pose: 'talk', w: 3 },
      { x: 72, y: 34, r: 10, pose: 'drink', w: 2 },
      { x: 60, y: 74, r: 12, pose: 'idle', w: 2 }
    ],
    build() {
      let s = '';
      s += pPlane({ x: 34, y: 46, w: 44, d: 34, c: '#8d6f8e', cls: 'rug' });
      // canapé : assise, dossier, accoudoirs
      s += pBox({ x: 24, y: 30, w: 34, d: 13, h: 20, c: '#4e5c78', top: '#5f7092', r: 4 });
      s += pBox({ x: 24, y: 23.5, w: 34, d: 3, h: 40, c: '#455370', r: 4 });
      s += pBox({ x: 7.5, y: 30, w: 3.5, d: 13, h: 30, c: '#455370', r: 4 });
      s += pBox({ x: 40.5, y: 30, w: 3.5, d: 13, h: 30, c: '#455370', r: 4 });
      // table basse, bouteilles, verres
      s += pBox({ x: 30, y: 50, w: 24, d: 12, h: 16, c: '#7b5433', top: '#976a44', r: 3 });
      s += bottles(30, 49, 4, 16, 3.4);
      s += pBill({ x: 24, y: 52, z: 16, w: 12, h: 18, on: '<span class="sp-glass"></span>' });
      // meuble télé
      s += pBox({ x: 78, y: 22, w: 22, d: 8, h: 18, c: '#5a4632', top: '#6d5540', r: 2 });
      s += pBill({ x: 78, y: 21, z: 18, w: 92, h: 54, on: '<span class="sp-tv"></span>' });
      s += pGlow({ x: 78, y: 28, w: 40, c: 'rgba(120,180,255,.6)', o: 0.4 });
      // bibliothèque et cuisine
      s += pBox({ x: 92, y: 56, w: 8, d: 26, h: 90, c: '#5e4a35', top: '#775e44', r: 2 });
      s += pBox({ x: 62, y: 82, w: 34, d: 12, h: 44, c: '#3f4859', top: '#e7e2d8', r: 3, label: 'Cuisine' });
      s += bottles(62, 80, 5, 44, 4);
      s += plant(10, 74, 1.2);
      s += pBill({ x: 46, y: 26, z: 0, w: 30, h: 96, on: '<span class="sp-floorlamp"></span>' });
      s += pGlow({ x: 46, y: 30, w: 40, c: 'rgba(255,190,120,.7)', o: 0.45 });
      return s;
    },
    wallL: () => `
      <div class="w-window" style="left:8%; top:16%; width:26%; height:52%"><i></i><i></i></div>
      <div class="w-frame" style="left:46%; top:18%; width:14%; height:28%"></div>
      <div class="w-frame" style="left:64%; top:24%; width:12%; height:22%"></div>`,
    wallR: () => `<div class="w-frame" style="left:16%; top:20%; width:20%; height:34%"></div>
      <div class="w-shelf" style="top:56%"></div>`,
    fx: ['warmhaze', 'dust']
  },

  /* ================== GRANDE FÊTE ================== */
  party: {
    name: 'Club privé', me: { x: 66, y: 88 },
    tint: 'rgba(217,79,138,.2)', dark: 0.76,
    floor: { cls: 'fl-gloss', a: '#1b1530', b: '#221a3c' },
    wall: { cls: 'wl-led', c: '#241a42', h: 165 },
    zones: [
      { x: 50, y: 56, r: 16, pose: 'dance', w: 5 },
      { x: 20, y: 72, r: 10, pose: 'drink', w: 2 },
      { x: 80, y: 70, r: 10, pose: 'talk', w: 2 },
      { x: 50, y: 30, r: 12, pose: 'dance', w: 2 }
    ],
    build() {
      let s = '';
      // la piste
      s += danceFloor(50, 56, 48, 42, 10);
      // la cabine du DJ, ses platines et son écran
      s += pBox({ x: 50, y: 15, w: 30, d: 11, h: 46, c: '#2e2150', top: '#4a3578', r: 3, glow: '#d94f8a', cls: 'dj-booth', label: 'DJ' });
      s += pBox({ x: 43, y: 14, w: 8, d: 6, h: 52, c: '#1a1428', top: '#2b2142', r: 2 });
      s += pBox({ x: 57, y: 14, w: 8, d: 6, h: 52, c: '#1a1428', top: '#2b2142', r: 2 });
      s += pBill({ x: 50, y: 10, z: 46, w: 200, h: 84, on: '<span class="sp-vj"></span>' });
      // les enceintes, qui respirent avec la basse
      [[22, 16], [78, 16]].forEach(([x, y]) => {
        s += pBox({ x, y, w: 11, d: 9, h: 96, c: '#181327', top: '#2a2242', r: 2, cls: 'bass' });
        s += pBill({ x, y: y - 0.5, z: 20, w: 44, h: 60, on: '<span class="sp-speaker"></span>' });
      });
      // le bar, en néon
      s += pBox({ x: 19, y: 62, w: 26, d: 11, h: 44, c: '#372a5c', top: '#54407f', r: 3, glow: '#38bdf8', label: 'Bar' });
      s += pBox({ x: 19, y: 55.5, w: 26, d: 2, h: 82, c: '#2a2047', top: '#3d2f66', r: 2 });
      s += bottles(19, 57, 8, 82, 3);
      s += bottles(19, 60, 5, 44, 3.6);
      // le carré lounge
      s += pBox({ x: 82, y: 74, w: 22, d: 11, h: 20, c: '#3b2c56', top: '#4e3a70', r: 4 });
      s += pBox({ x: 82, y: 68.5, w: 22, d: 3, h: 40, c: '#33264b', r: 4 });
      s += pCyl({ x: 82, y: 84, d: 11, h: 16, c: '#3b2b52', top: '#4c3868' });
      // tabourets le long du bar
      [10, 19, 28].forEach(x => s += pCyl({ x, y: 72, d: 6, h: 34, c: '#443464', top: '#63508e' }));
      // mange-debout devant la piste, avec leurs verres
      [[36, 86], [60, 90], [78, 44]].forEach(([x, y]) => {
        s += pCyl({ x, y, d: 10, h: 36, c: '#2f2448', top: '#463668' });
        s += pBill({ x: x - 2, y: y - 1, z: 36, w: 11, h: 18, on: '<span class="sp-glass"></span>' });
        s += pBill({ x: x + 2, y: y + 1, z: 36, w: 11, h: 18, on: '<span class="sp-glass"></span>' });
      });
      // la banquette VIP surélevée, sur la droite
      s += pPlane({ x: 84, y: 62, w: 26, d: 40, c: '#3a2b57', cls: 'rug' });
      s += pCyl({ x: 92, y: 46, d: 9, h: 40, c: '#3b2b52', top: '#4c3868' });
      // machine à fumée et enceintes de rappel
      s += pBox({ x: 34, y: 24, w: 6, d: 5, h: 16, c: '#221a35', top: '#332851', r: 2 });
      s += pGlow({ x: 34, y: 26, w: 22, c: 'rgba(200,200,255,.5)', o: 0.3 });
      // nappes de couleur au sol
      s += pGlow({ x: 50, y: 20, w: 60, c: 'rgba(217,79,138,.9)', o: 0.55 });
      s += pGlow({ x: 19, y: 64, w: 36, c: 'rgba(56,189,248,.8)', o: 0.4 });
      s += pGlow({ x: 82, y: 76, w: 36, c: 'rgba(123,82,211,.8)', o: 0.4 });
      // faisceaux mobiles
      [[32, 38, '#d94f8a'], [50, 32, '#38bdf8'], [68, 38, '#7b52d3']]
        .forEach(([x, y, c], i) => { s += pBeam({ x, y, w: 120, h: 158, c, delay: i * 0.9 }); });
      return s;
    },
    wallL: () => `<div class="w-eq">${Array.from({ length: 26 }, (_, i) => `<i style="--d:${(i % 7) * 0.13}s"></i>`).join('')}</div>
      <div class="w-neon" style="left:8%; top:8%; --c:#d94f8a">CLUB</div>`,
    wallR: () => `<div class="w-eq">${Array.from({ length: 26 }, (_, i) => `<i style="--d:${(i % 5) * 0.17}s"></i>`).join('')}</div>`,
    fx: ['disco', 'lasers', 'haze', 'confetti', 'strobe']
  },

  /* ===================== ROOFTOP ===================== */
  rooftop: {
    name: 'Rooftop privatisé', me: { x: 52, y: 90 },
    tint: 'rgba(56,189,248,.12)', dark: 0.68,
    floor: { cls: 'fl-deck', a: '#3a3f4d', b: '#434a5b' },
    wall: { cls: 'wl-glass', c: 'rgba(120,180,220,.12)', h: 78 },
    sky: true,
    zones: [
      { x: 30, y: 34, r: 12, pose: 'drink', w: 3 },
      { x: 70, y: 30, r: 10, pose: 'talk', w: 2 },
      { x: 32, y: 74, r: 12, pose: 'dance', w: 2 },
      { x: 62, y: 60, r: 10, pose: 'idle', w: 1 }
    ],
    build() {
      let s = '';
      // la piscine, éclairée par-dessous
      s += pPlane({ x: 78, y: 74, w: 34, d: 26, c: '#1d6f96', cls: 'pool', on: '<div class="pool-caustics"></div>' });
      s += pGlow({ x: 78, y: 74, w: 46, d: 38, c: 'rgba(56,189,248,.9)', o: 0.55 });
      // le bar et ses bouteilles
      s += pBox({ x: 16, y: 20, w: 26, d: 11, h: 44, c: '#39434f', top: '#525f70', r: 3, glow: '#38bdf8', label: 'Bar' });
      s += bottles(16, 18, 7, 44, 3.2);
      [10, 22].forEach(x => s += pCyl({ x, y: 30, d: 6, h: 32, c: '#2b3343', top: '#3d4759' }));
      // le coin DJ
      s += pBox({ x: 52, y: 12, w: 20, d: 9, h: 40, c: '#333c4c', top: '#48546a', r: 3, glow: '#a855f7' });
      s += pBill({ x: 52, y: 11, z: 40, w: 70, h: 34, on: '<span class="sp-vj"></span>' });
      // bains de soleil et parasols
      [[30, 56], [30, 76]].forEach(([x, y]) => {
        s += pBox({ x, y, w: 20, d: 9, h: 20, c: '#cfc9ba', top: '#eae5d9', r: 5 });
        s += pBox({ x: x - 7.5, y, w: 5, d: 9, h: 38, c: '#bdb7a8', top: '#d9d3c5', r: 5 });
      });
      s += pBill({ x: 44, y: 66, z: 0, w: 110, h: 120, on: '<span class="sp-parasol"></span>' });
      // le brasero
      s += pCyl({ x: 62, y: 42, d: 13, h: 18, c: '#4a5262', top: '#20262f' });
      s += pBill({ x: 62, y: 41, z: 18, w: 44, h: 46, on: '<span class="sp-fire"></span>' });
      s += pGlow({ x: 62, y: 44, w: 34, c: 'rgba(255,140,60,.85)', o: 0.55 });
      // plantes en bac
      s += plant(6, 62, 1.2); s += plant(8, 84, 1.05); s += plant(92, 26, 1.15);
      s += pPlane({ x: 46, y: 62, w: 30, d: 24, c: '#4b5364', cls: 'rug soft' });
      // salon extérieur, devant
      s += pPlane({ x: 62, y: 86, w: 40, d: 24, c: '#5a6273', cls: 'rug soft' });
      s += pBox({ x: 50, y: 86, w: 20, d: 10, h: 18, c: '#4e5867', top: '#697488', r: 5 });
      s += pBox({ x: 50, y: 81, w: 20, d: 3, h: 34, c: '#454e5c', r: 5 });
      s += pBox({ x: 74, y: 90, w: 18, d: 9, h: 18, c: '#4e5867', top: '#697488', r: 5 });
      s += pCyl({ x: 62, y: 88, d: 11, h: 16, c: '#3f4756', top: '#59647a' });
      s += pBill({ x: 62, y: 87, z: 16, w: 11, h: 18, on: '<span class="sp-glass"></span>' });
      // chauffage d'extérieur
      s += pCyl({ x: 34, y: 44, d: 5, h: 76, c: '#3f4756', top: '#6b7688' });
      s += pGlow({ x: 34, y: 46, w: 26, c: 'rgba(255,150,70,.7)', o: 0.4 });
      s += plant(22, 92, 1.1);
      return s;
    },
    wallL: () => garland(9),
    wallR: () => garland(9),
    fx: ['stars', 'city', 'bokeh', 'haze']
  }
};

/* ---------------------------------------------------------
   RENDU D'UNE SALLE
   --------------------------------------------------------- */

/* Les effets qui vivent dans l'espace 3D de la salle */
const FX_3D = {
  disco: () => `
    <div class="p3 fx-disco" style="left:50%; top:52%">
      <i class="db-wire"></i><i class="db-ball"></i><i class="db-sparks"></i>
    </div>
    <div class="p3 fx-discofloor" style="left:50%; top:56%"></div>`,
  lasers: () => `<div class="p3 fx-lasers" style="left:50%; top:52%"></div>`
};

/* Les effets posés à plat par-dessus la scène */
const FX_FLAT = {
  strobe: () => `<div class="fx-strobe"></div>`,
  haze: () => `<div class="fx-haze"></div>`,
  warmhaze: () => `<div class="fx-haze warm"></div>`,
  daylight: () => `<div class="fx-daylight"></div>`,
  beams: () => `<div class="fx-scan"></div>`,
  dust: () => `<div class="fx-parts dust">${particles(26, 'dust')}</div>`,
  bokeh: () => `<div class="fx-parts bokeh">${particles(22, 'bokeh')}</div>`,
  goldbokeh: () => `<div class="fx-parts gold">${particles(24, 'gold')}</div>`,
  confetti: () => `<div class="fx-parts conf">${particles(34, 'conf')}</div>`
};

/* Le fond lointain : ciel, étoiles, ville */
const FX_BACK = {
  stars: () => `<div class="fx-stars">${particles(60, 'star')}</div>`,
  city: () => skyline(7, 26)
};

/* La scène complète : fond lointain, salle en 3D, ambiance à plat. */
function stageHTML(roomId, peopleHTML) {
  const r = ROOMS[roomId] || ROOMS.bar;
  const list = r.fx || [];
  const grab = (table) => list.filter(f => table[f]).map(f => table[f]()).join('');

  return `
    <div class="iso-back">${grab(FX_BACK)}</div>
    <div class="iso-cam">
      <div class="iso-room"
           style="--fa:${r.floor.a}; --fb:${r.floor.b}; --wc:${r.wall.c}; --wh:${r.wall.h}px">
        <div class="iso-wall iso-wall-l ${r.wall.cls}">${r.wallL ? r.wallL() : ''}</div>
        <div class="iso-wall iso-wall-r ${r.wall.cls}">${r.wallR ? r.wallR() : ''}</div>
        <div class="p3 p-box iso-slab" style="left:50%; top:50%; width:100%; height:100%;
             --c:${shade3(r.floor.a, -34)}"><i class="f-y"></i><i class="f-x"></i></div>
        <div class="iso-floor ${r.floor.cls}"><i class="fl-sheen"></i></div>
        ${r.build()}
        ${grab(FX_3D)}
        ${peopleHTML}
      </div>
    </div>
    <div class="iso-fx">${grab(FX_FLAT)}</div>`;
}

function particles(n, kind) {
  const r = seedRand(kind.length * 977 + n);
  let out = '';
  for (let i = 0; i < n; i++) {
    const sz = kind === 'conf' ? 4 + r() * 5 : kind === 'star' ? 1 + r() * 1.6 : 3 + r() * 7;
    const hue = Math.floor(r() * 360);
    out += `<i class="pt pt-${kind}" style="
      left:${(r() * 100).toFixed(1)}%; top:${(r() * 100).toFixed(1)}%;
      --s:${sz.toFixed(1)}px; --d:${(r() * 9).toFixed(1)}s; --t:${(6 + r() * 10).toFixed(1)}s;
      --hue:${hue}; --o:${(0.25 + r() * 0.6).toFixed(2)}"></i>`;
  }
  return out;
}

/* ---------------------------------------------------------
   PLACEMENT DES INVITÉS
   On répartit les gens dans les zones de la salle, chacun
   avec la posture qui correspond à l'endroit où il se tient.
   --------------------------------------------------------- */

function placeGuests(roomId, guests) {
  const room = ROOMS[roomId] || ROOMS.bar;
  const zones = room.zones || [{ x: 50, y: 55, r: 22, pose: 'idle', w: 1 }];
  const slots = [];
  zones.forEach(z => { for (let i = 0; i < (z.w || 1); i++) slots.push(z); });

  /* En vue isométrique, l'axe horizontal de l'écran suit (x + y) et la
     profondeur suit (y - x). Deux personnes séparées en profondeur se
     masquent l'une l'autre ; séparées horizontalement, jamais. On étale
     donc les gens le long de (1, 1) et on ne décale la profondeur qu'à
     peine. */
  const perZone = {};
  guests.forEach((g, i) => {
    const z = slots[i % slots.length];
    const key = z.x + ':' + z.y;
    const n = perZone[key] = (perZone[key] || 0) + 1;
    const spread = (n - 1.5) * 0.62;                 // -0,9 … +0,9 selon le rang
    const u = spread * z.r * 1.25;                   // le long de l'axe écran
    const v = ((i % 3) - 1) * z.r * 0.22;            // un soupçon de profondeur
    g.x = clamp(z.x + u - v, 8, 92);
    g.y = clamp(z.y + u + v, 13, 88);
    g.pose = z.pose;
    g.flip = (i % 3 === 0);
    g.delay = ((i * 313) % 100) / 100;
  });
  return guests;
}

/* Où se tient le joueur : devant, au bord de la scène. */
function playerSpot(roomId) {
  const room = ROOMS[roomId] || ROOMS.bar;
  return room.me || { x: 50, y: 93 };
}
