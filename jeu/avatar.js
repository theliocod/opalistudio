/* =========================================================
   EMPIRE — Avatars
   Personnages dessinés en SVG à partir d'un « look » :
   quelques nombres suffisent à décrire un visage, ce qui
   permet de donner un visage à tout le monde (joueur,
   contacts, salariés, candidats, invités d'une soirée)
   sans une seule image à charger.
   ========================================================= */

const SKINS = ['#f8d9c0', '#f0c19b', '#dda57c', '#c58a5e', '#a06a41', '#7b4b2a', '#5d3720', '#f5e0d0'];
const HAIR_COLORS = ['#2b2119', '#4a3423', '#6b4423', '#8b5a2b', '#b5793a', '#d9a441', '#e8c46a', '#9b9b9b', '#e5e5e5', '#8c2f2f', '#3a5a8c', '#6b3f8c'];
const OUTFIT_COLORS = ['#e05a3a', '#f2994a', '#2f6fed', '#1f9d6b', '#7b52d3', '#d94f8a', '#2b3446', '#e8e8ec', '#c9a227', '#0f766e'];

/* Coiffures : chacune est une fonction qui renvoie du SVG.
   Les coordonnées sont dans un repère tête centré en (50, 42). */
const HAIRSTYLES = [
  { id: 'court', name: 'Court', draw: c => `<path d="M28 40c0-14 10-22 22-22s22 8 22 22c0-6-4-9-8-9-3 0-4 2-8 2-5 0-6-3-11-3-6 0-9 4-9 10z" fill="${c}"/>` },
  { id: 'rase', name: 'Rasé', draw: c => `<path d="M29 40c0-13 9-21 21-21s21 8 21 21c-2-4-8-7-21-7s-19 3-21 7z" fill="${c}" opacity=".85"/>` },
  { id: 'ondule', name: 'Ondulé', draw: c => `<path d="M27 43c-1-16 10-25 23-25s24 9 23 25c-2-5-3-11-7-9-3 2-4-4-9-3-4 1-5 3-10 2-4-1-6-4-10-2-4 2-5 8-10 12z" fill="${c}"/>` },
  { id: 'boucle', name: 'Bouclé', draw: c => `<g fill="${c}"><circle cx="34" cy="30" r="9"/><circle cx="46" cy="24" r="10"/><circle cx="58" cy="27" r="9"/><circle cx="66" cy="36" r="8"/><circle cx="30" cy="40" r="7"/><circle cx="70" cy="44" r="6"/></g>` },
  { id: 'long', name: 'Long', draw: c => `<path d="M26 44c0-16 10-26 24-26s24 10 24 26v26c0 3-3 5-6 4-2-1-2-4-2-8V44c-4 4-9 6-16 6s-12-2-16-6v22c0 4 0 7-2 8-3 1-6-1-6-4z" fill="${c}"/>` },
  { id: 'chignon', name: 'Chignon', draw: c => `<g fill="${c}"><circle cx="50" cy="14" r="9"/><path d="M27 43c0-15 10-24 23-24s23 9 23 24c-3-5-4-9-9-11-4-2-8 1-14 1s-10-3-14-1c-5 2-6 6-9 11z"/></g>` },
  { id: 'crete', name: 'Crête', draw: c => `<path d="M44 40c0-8 1-16 3-24 1-4 5-4 6 0 2 8 3 16 3 24z" fill="${c}"/><path d="M30 42c1-8 6-13 12-15-1 5-1 10-1 15zm40 0c-1-8-6-13-12-15 1 5 1 10 1 15z" fill="${c}" opacity=".9"/>` },
  { id: 'afro', name: 'Afro', draw: c => `<circle cx="50" cy="34" r="27" fill="${c}"/>` },
  { id: 'tresses', name: 'Tresses', draw: c => `<g fill="${c}"><path d="M27 42c0-15 10-24 23-24s23 9 23 24c-4-6-10-9-23-9s-19 3-23 9z"/><rect x="24" y="40" width="6" height="30" rx="3"/><rect x="70" y="40" width="6" height="30" rx="3"/></g>` },
  { id: 'degarni', name: 'Dégarni', draw: c => `<path d="M28 46c1-7 4-11 9-13-2 3-3 7-3 11zm44 0c-1-7-4-11-9-13 2 3 3 7 3 11z" fill="${c}"/><path d="M30 45c2-9 9-14 20-14s18 5 20 14c-4-11-36-11-40 0z" fill="${c}" opacity=".55"/>` },
  { id: 'queue', name: 'Queue de cheval', draw: c => `<g fill="${c}"><path d="M27 43c0-15 10-25 23-25s23 10 23 25c-3-6-5-10-10-12-4-2-7 1-13 1s-9-3-13-1c-5 2-7 6-10 12z"/><path d="M72 40c7 2 11 9 10 18-1 8-5 12-9 11-3-1-2-5-1-9 2-7 1-14-4-18z"/></g>` },
  { id: 'undercut', name: 'Undercut', draw: c => `<path d="M30 40c0-13 9-21 20-21s20 8 20 21c-3-3-7-5-12-5-8 0-11 3-16 3-5 0-8 0-12 2z" fill="${c}"/><path d="M30 44c3-3 8-4 14-4 9 0 14 3 21 3-2 2-5 3-9 3-8 0-12-2-18-2-3 0-6 0-8 1z" fill="${c}" opacity=".5"/>` }
];

const BEARDS = [
  { id: 'none', name: 'Aucune', draw: () => '' },
  { id: 'barbe3j', name: 'Barbe de 3 jours', draw: c => `<path d="M32 52c0 14 8 24 18 24s18-10 18-24c0 9-8 13-18 13s-18-4-18-13z" fill="${c}" opacity=".28"/>` },
  { id: 'bouc', name: 'Bouc', draw: c => `<path d="M43 62c0-2 3-3 7-3s7 1 7 3c0 6-3 10-7 10s-7-4-7-10z" fill="${c}"/><path d="M40 54c3-2 17-2 20 0-2 3-18 3-20 0z" fill="${c}"/>` },
  { id: 'moustache', name: 'Moustache', draw: c => `<path d="M40 55c3-2 6-1 10-1s7-1 10 1c-3 3-7 3-10 3s-7 0-10-3z" fill="${c}"/>` },
  { id: 'pleine', name: 'Barbe pleine', draw: c => `<path d="M31 48c0 18 9 30 19 30s19-12 19-30c0 11-9 16-19 16s-19-5-19-16z" fill="${c}"/><path d="M40 55c3-2 6-1 10-1s7-1 10 1c-3 3-7 3-10 3s-7 0-10-3z" fill="${c}"/>` }
];

const OUTFITS = [
  { id: 'tshirt', name: 'T-shirt', formal: 0 },
  { id: 'hoodie', name: 'Sweat à capuche', formal: 0 },
  { id: 'chemise', name: 'Chemise', formal: 1 },
  { id: 'polo', name: 'Polo', formal: 1 },
  { id: 'costume', name: 'Costume', formal: 2 },
  { id: 'blazer', name: 'Blazer', formal: 2 },
  { id: 'veste', name: 'Veste en cuir', formal: 1 },
  { id: 'smoking', name: 'Smoking', formal: 3 }
];

const ACCESSORIES = [
  { id: 'none', name: 'Aucun' },
  { id: 'lunettes', name: 'Lunettes' },
  { id: 'solaires', name: 'Lunettes de soleil' },
  { id: 'casquette', name: 'Casquette' },
  { id: 'bonnet', name: 'Bonnet' },
  { id: 'boucle', name: "Boucle d'oreille" }
];

const EYE_SHAPES = ['ronds', 'amandes', 'fins', 'grands'];

function defaultLook(seed) {
  const r = seed === undefined ? Math.random : mulberry(seed);
  return {
    skin: Math.floor(r() * SKINS.length),
    hair: Math.floor(r() * HAIRSTYLES.length),
    hairColor: Math.floor(r() * HAIR_COLORS.length),
    beard: Math.random() < 0.55 ? 0 : Math.floor(r() * BEARDS.length),
    eyes: Math.floor(r() * EYE_SHAPES.length),
    outfit: Math.floor(r() * OUTFITS.length),
    outfitColor: Math.floor(r() * OUTFIT_COLORS.length),
    accessory: r() < 0.6 ? 0 : Math.floor(r() * ACCESSORIES.length)
  };
}

/* Générateur pseudo-aléatoire déterministe : un même identifiant
   redonne toujours le même visage d'une session à l'autre. */
function mulberry(seed) {
  let a = typeof seed === 'string'
    ? seed.split('').reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7)
    : seed >>> 0;
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function lookFor(id) {
  const r = mulberry(id);
  return {
    skin: Math.floor(r() * SKINS.length),
    hair: Math.floor(r() * HAIRSTYLES.length),
    hairColor: Math.floor(r() * HAIR_COLORS.length),
    beard: r() < 0.6 ? 0 : Math.floor(r() * BEARDS.length),
    eyes: Math.floor(r() * EYE_SHAPES.length),
    outfit: Math.floor(r() * OUTFITS.length),
    outfitColor: Math.floor(r() * OUTFIT_COLORS.length),
    accessory: r() < 0.65 ? 0 : Math.floor(r() * ACCESSORIES.length)
  };
}

/* ---------------------------------------------------------
   Éléments de dessin
   --------------------------------------------------------- */

function drawEyes(shape, dark) {
  const c = dark ? '#1b2436' : '#2b3446';
  switch (EYE_SHAPES[shape]) {
    case 'amandes':
      return `<path d="M38 44c2-3 7-3 9 0-2 3-7 3-9 0z" fill="#fff"/><path d="M53 44c2-3 7-3 9 0-2 3-7 3-9 0z" fill="#fff"/>
              <circle cx="42.5" cy="44" r="2.4" fill="${c}"/><circle cx="57.5" cy="44" r="2.4" fill="${c}"/>`;
    case 'fins':
      return `<rect x="38" y="43" width="9" height="3" rx="1.5" fill="${c}"/><rect x="53" y="43" width="9" height="3" rx="1.5" fill="${c}"/>`;
    case 'grands':
      return `<ellipse cx="42.5" cy="44" rx="5" ry="5.4" fill="#fff"/><ellipse cx="57.5" cy="44" rx="5" ry="5.4" fill="#fff"/>
              <circle cx="42.5" cy="44.4" r="3" fill="${c}"/><circle cx="57.5" cy="44.4" r="3" fill="${c}"/>
              <circle cx="41.4" cy="43" r="1" fill="#fff"/><circle cx="56.4" cy="43" r="1" fill="#fff"/>`;
    default:
      return `<circle cx="42.5" cy="44" r="4.2" fill="#fff"/><circle cx="57.5" cy="44" r="4.2" fill="#fff"/>
              <circle cx="42.5" cy="44.3" r="2.5" fill="${c}"/><circle cx="57.5" cy="44.3" r="2.5" fill="${c}"/>`;
  }
}

function drawAccessory(id, hairColor) {
  switch (ACCESSORIES[id] && ACCESSORIES[id].id) {
    case 'lunettes':
      return `<g fill="none" stroke="#2b3446" stroke-width="2">
        <rect x="36" y="39" width="13" height="11" rx="4"/><rect x="51" y="39" width="13" height="11" rx="4"/>
        <path d="M49 44h2M36 43l-5 1M64 43l5 1"/></g>`;
    case 'solaires':
      return `<g><rect x="35" y="39" width="14" height="11" rx="4" fill="#1b2436"/><rect x="51" y="39" width="14" height="11" rx="4" fill="#1b2436"/>
        <path d="M49 43h2" stroke="#1b2436" stroke-width="3"/><path d="M37 41l4 3" stroke="#5a6a86" stroke-width="1.6"/></g>`;
    case 'casquette':
      return `<g><path d="M26 36c0-13 10-21 24-21s24 8 24 21z" fill="#2f6fed"/><path d="M74 36c8 0 14 2 16 6H70z" fill="#2557bd"/></g>`;
    case 'bonnet':
      return `<g><path d="M27 38c0-14 10-22 23-22s23 8 23 22z" fill="#d94f8a"/><rect x="26" y="35" width="48" height="8" rx="4" fill="#c13f78"/></g>`;
    case 'boucle':
      return `<circle cx="29" cy="50" r="2.4" fill="#e8c46a"/>`;
    default: return '';
  }
}

function drawOutfit(look, w) {
  const col = OUTFIT_COLORS[look.outfitColor];
  const dark = shade(col, -22);
  const skin = SKINS[look.skin];
  const o = OUTFITS[look.outfit] && OUTFITS[look.outfit].id;

  const shoulders = `<path d="M18 100c0-15 12-24 32-24s32 9 32 24z" fill="${col}"/>`;
  switch (o) {
    case 'hoodie':
      return `${shoulders}
        <path d="M33 78c4 6 11 9 17 9s13-3 17-9c4 2 5 5 5 9-8 5-14 7-22 7s-14-2-22-7c0-4 1-7 5-9z" fill="${dark}"/>
        <path d="M47 84h6v14h-6z" fill="${shade(col, 10)}"/>`;
    case 'chemise':
      return `${shoulders}
        <path d="M42 77l8 10 8-10 5 2-13 15-13-15z" fill="#f4f6fb"/>
        <path d="M50 87l-4 5 4 8 4-8z" fill="${dark}"/>`;
    case 'polo':
      return `${shoulders}
        <path d="M43 77l7 8 7-8 3 2-10 11-10-11z" fill="${shade(col, 22)}"/>`;
    case 'costume':
    case 'blazer':
      return `${shoulders}
        <path d="M40 78l10 12 10-12 4 2-6 20H42l-6-20z" fill="#f4f6fb"/>
        <path d="M40 78l-8 4 6 18h6l-6-16zM60 78l8 4-6 18h-6l6-16z" fill="${dark}"/>
        <path d="M48 88h4l-2 6z" fill="${o === 'costume' ? '#c0392b' : dark}"/>`;
    case 'smoking':
      return `<path d="M18 100c0-15 12-24 32-24s32 9 32 24z" fill="#161c28"/>
        <path d="M41 78l9 11 9-11 4 2-6 20H43l-6-20z" fill="#f7f8fb"/>
        <path d="M41 78l-8 4 5 18h6l-5-16zM59 78l8 4-5 18h-6l5-16z" fill="#0d121b"/>
        <path d="M46 88h8l-4 5z" fill="#8b1f2f"/>`;
    case 'veste':
      return `${shoulders}
        <path d="M40 77l10 12 10-12 3 2-5 21H42l-5-21z" fill="${skin}" opacity=".95"/>
        <path d="M40 77l-9 5 7 18h6l-6-17zM60 77l9 5-7 18h-6l6-17z" fill="${shade(col, -35)}"/>`;
    default: // t-shirt
      return `${shoulders}
        <path d="M42 77c2 5 5 7 8 7s6-2 8-7l4 2-6 8h-12l-6-8z" fill="${shade(col, 14)}"/>`;
  }
}

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const r = clamp((n >> 16) + amt, 0, 255);
  const g = clamp(((n >> 8) & 255) + amt, 0, 255);
  const b = clamp((n & 255) + amt, 0, 255);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/* ---------------------------------------------------------
   Avatar en buste — listes, dialogues, fiches
   --------------------------------------------------------- */
function avatarSVG(look, size = 64, opts = {}) {
  if (!look) look = defaultLook(1);
  const skin = SKINS[look.skin];
  const hairC = HAIR_COLORS[look.hairColor];
  const hair = HAIRSTYLES[look.hair] || HAIRSTYLES[0];
  const beard = BEARDS[look.beard] || BEARDS[0];
  const acc = ACCESSORIES[look.accessory] && ACCESSORIES[look.accessory].id;
  const hideHair = acc === 'casquette' || acc === 'bonnet';
  const bg = opts.bg === false ? '' :
    `<circle cx="50" cy="50" r="50" fill="${opts.bg || 'rgba(255,255,255,.06)'}"/>`;

  return `<svg class="avatar" viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true">
    ${bg}
    <g>
      ${drawOutfit(look, size)}
      <path d="M44 68h12v10H44z" fill="${shade(skin, -14)}"/>
      <ellipse cx="50" cy="45" rx="21" ry="23" fill="${skin}"/>
      <ellipse cx="29.5" cy="48" rx="3.2" ry="4.4" fill="${skin}"/>
      <ellipse cx="70.5" cy="48" rx="3.2" ry="4.4" fill="${skin}"/>
      ${hideHair ? '' : hair.draw(hairC)}
      ${drawEyes(look.eyes, true)}
      <path d="M46 52h8" stroke="${shade(skin, -30)}" stroke-width="1.6" stroke-linecap="round" opacity=".55"/>
      ${opts.mood === 'sad'
        ? `<path d="M43 62c4-4 10-4 14 0" stroke="${shade(skin, -45)}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
        : `<path d="M43 58c4 5 10 5 14 0" stroke="${shade(skin, -45)}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`}
      ${beard.draw(hairC)}
      ${drawAccessory(look.accessory, hairC)}
    </g>
  </svg>`;
}

/* ---------------------------------------------------------
   Avatar en pied — scènes isométriques
   --------------------------------------------------------- */
function avatarBody(look, size = 90) {
  if (!look) look = defaultLook(2);
  const skin = SKINS[look.skin];
  const hairC = HAIR_COLORS[look.hairColor];
  const hair = HAIRSTYLES[look.hair] || HAIRSTYLES[0];
  const beard = BEARDS[look.beard] || BEARDS[0];
  const col = OUTFIT_COLORS[look.outfitColor];
  const acc = ACCESSORIES[look.accessory] && ACCESSORIES[look.accessory].id;
  const hideHair = acc === 'casquette' || acc === 'bonnet';
  const formal = (OUTFITS[look.outfit] || OUTFITS[0]).formal;
  const pants = formal >= 2 ? '#232a3a' : (formal === 1 ? '#38445c' : '#2f3b52');

  return `<svg class="avatar-body" viewBox="0 0 100 190" width="${size}" height="${size * 1.9}" aria-hidden="true">
    <g>
      <rect x="40" y="120" width="9" height="46" rx="4" fill="${pants}"/>
      <rect x="51" y="120" width="9" height="46" rx="4" fill="${shade(pants, 8)}"/>
      <rect x="37" y="162" width="15" height="7" rx="3.5" fill="#1b2130"/>
      <rect x="48" y="162" width="15" height="7" rx="3.5" fill="#232a3a"/>
      <path d="M32 90c0-14 8-22 18-22s18 8 18 22v34H32z" fill="${col}"/>
      ${formal >= 2 ? `<path d="M44 70l6 9 6-9 4 2-4 30h-12l-4-30z" fill="#f4f6fb"/>
        <path d="M44 70l-8 5 4 28h5l-5-24zM56 70l8 5-4 28h-5l5-24z" fill="${shade(col, -28)}"/>
        <path d="M47 79h6l-3 6z" fill="#c0392b"/>` : ''}
      <rect x="24" y="88" width="9" height="34" rx="4.5" fill="${shade(col, -10)}"/>
      <rect x="67" y="88" width="9" height="34" rx="4.5" fill="${shade(col, -10)}"/>
      <circle cx="28.5" cy="124" r="5" fill="${skin}"/>
      <circle cx="71.5" cy="124" r="5" fill="${skin}"/>
      <ellipse cx="50" cy="42" rx="20" ry="22" fill="${skin}"/>
      <ellipse cx="30" cy="45" rx="3" ry="4.2" fill="${skin}"/>
      <ellipse cx="70" cy="45" rx="3" ry="4.2" fill="${skin}"/>
      ${hideHair ? '' : hair.draw(hairC)}
      ${drawEyes(look.eyes, true)}
      <path d="M43 56c4 5 10 5 14 0" stroke="${shade(skin, -45)}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      ${beard.draw(hairC)}
      ${drawAccessory(look.accessory, hairC)}
      <rect x="44" y="62" width="12" height="9" fill="${shade(skin, -12)}"/>
    </g>
  </svg>`;
}

/* Avatar d'une personne du jeu (contact, salarié, candidat, invité) */
function personAvatar(person, size = 56, opts) {
  if (!person.look) person.look = lookFor(person.id || person.name || 'x');
  return avatarSVG(person.look, size, opts);
}
function personBody(person, size = 80) {
  if (!person.look) person.look = lookFor(person.id || person.name || 'x');
  return avatarBody(person.look, size);
}
