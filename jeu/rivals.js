/* =========================================================
   EMPIRE — La concurrence
   Chaque marché est occupé par d'autres entreprises qui
   grandissent, réagissent quand tu perces, cassent les prix
   et débauchent. On peut les racheter, elles peuvent
   te racheter.
   ========================================================= */

/* Noms plausibles selon le secteur */
const RIVAL_NAMES = {
  tech: ['Nimbus', 'Cortex', 'Flowly', 'Vantar', 'Datum', 'Kairos', 'Zenith Labs', 'Orbis', 'Novaflux', 'Helix'],
  commerce: ['Maison Verte', 'Kaptn', 'Lumen', 'Bastide', 'Orya', 'Comptoir Nord', 'Velvet', 'Aurore', 'Nova Store', 'Brindille'],
  service: ['Atelier 7', 'Cabinet Roussel', 'Meridian', 'Praxis', 'Groupe Alcyon', 'Studio Vertigo', 'Convergence', 'Pilotis', 'Axiome', 'Boréal'],
  food: ['Chez Marcel', 'Le Comptoir', 'Braise', 'Fournil & Co', 'Table Ronde', 'Miam', 'La Cantine', 'Origan', 'Bouchon 12', 'Saveurs']
};

const SECTOR_OF = {
  saas: 'tech', ia: 'tech', studio: 'tech', creator: 'tech',
  dropship: 'commerce', dtc: 'commerce',
  freelance: 'service', agence: 'service', immo: 'service', holding: 'service',
  foodtruck: 'food', resto: 'food'
};

/* Archétypes de concurrents : chacun se bat autrement */
const RIVAL_KINDS = [
  { id: 'leader', name: 'Leader historique', icon: 'fa-crown',
    strength: [0.75, 1.15], quality: [62, 88], price: [1.05, 1.3], aggression: [0.15, 0.4],
    desc: "Installé depuis longtemps, cher, un peu lent à réagir." },
  { id: 'discount', name: 'Casseur de prix', icon: 'fa-tags',
    strength: [0.4, 0.8], quality: [30, 52], price: [0.6, 0.82], aggression: [0.5, 0.85],
    desc: "Vend moins cher que tout le monde et rogne sur la qualité." },
  { id: 'premium', name: 'Acteur premium', icon: 'fa-gem',
    strength: [0.35, 0.7], quality: [80, 97], price: [1.3, 1.6], aggression: [0.2, 0.45],
    desc: "Produit irréprochable, prix élevé, clientèle fidèle." },
  { id: 'funded', name: 'Concurrent financé', icon: 'fa-rocket',
    strength: [0.5, 0.95], quality: [55, 78], price: [0.85, 1.05], aggression: [0.7, 1],
    desc: "Brûle l'argent de ses investisseurs pour prendre des parts vite." },
  { id: 'small', name: 'Petit indépendant', icon: 'fa-store',
    strength: [0.12, 0.35], quality: [45, 75], price: [0.9, 1.15], aggression: [0.1, 0.3],
    desc: "Discret, solide sur sa niche, sans ambition de conquête." }
];

function rivalKind(r) { return RIVAL_KINDS.find(k => k.id === r.kind); }

function makeRival(typeId, kindId, marketTotal) {
  const kind = kindId ? RIVAL_KINDS.find(k => k.id === kindId) : pick(RIVAL_KINDS);
  const sector = SECTOR_OF[typeId] || 'service';
  const strength = rand(kind.strength[0], kind.strength[1]);
  return {
    id: 'r' + Math.random().toString(36).slice(2, 8),
    name: pick(RIVAL_NAMES[sector]),
    kind: kind.id,
    strength,
    quality: Math.round(rand(kind.quality[0], kind.quality[1])),
    price: +rand(kind.price[0], kind.price[1]).toFixed(2),
    aggression: +rand(kind.aggression[0], kind.aggression[1]).toFixed(2),
    clients: Math.round(marketTotal * strength * rand(0.015, 0.04)),
    known: false,
    grudge: 0
  };
}

/* Un marché n'est jamais vide : on l'occupe déjà quand tu arrives. */
function seedRivals(c) {
  const t = getType(c);
  const n = t.market > 5000 ? 4 : 3;
  const kinds = ['leader', 'discount', 'premium', 'funded', 'small'];
  c.rivals = [];
  for (let i = 0; i < n; i++) {
    const r = makeRival(t.id, kinds[i % kinds.length], t.market);
    let guard = 0;
    while (c.rivals.some(x => x.name === r.name) && guard++ < 20) {
      r.name = pick(RIVAL_NAMES[SECTOR_OF[t.id] || 'service']);
    }
    c.rivals.push(r);
  }
}

/* ---------------------------------------------------------
   PRESSION CONCURRENTIELLE
   Ce que la concurrence te coûte, en clients gagnés et perdus.
   --------------------------------------------------------- */

function rivalClients(c) {
  return (c.rivals || []).reduce((a, r) => a + r.clients, 0);
}

/* Part du marché déjà prise, toi compris : c'est elle qui sature. */
function occupiedShare(c) {
  return clamp((c.clients + rivalClients(c)) / marketSize(c), 0, 1);
}

/* 0,5 = tu offres autant qu'eux. En dessous, ton offre est meilleure et
   tu gagnes des clients plus facilement. Au-dessus, tu rames.
   C'est un rapport qualité/prix, pas une histoire de taille : un géant
   médiocre et cher te gêne moins qu'un petit excellent et bon marché. */
function marketPressure(c) {
  const rivals = c.rivals || [];
  if (!rivals.length) return 0.25;
  const value = (q, p) => (0.4 + q / 90) / Math.max(0.4, p);
  const mine = value(c.quality, c.price);
  const totalR = Math.max(1, rivalClients(c));
  const theirs = rivals.reduce((a, r) =>
    a + value(r.quality, r.price) * (r.clients / totalR) * (0.85 + r.aggression * 0.3), 0);
  return clamp(theirs / (mine + theirs), 0.08, 0.82);
}

/* Le concurrent qui te fait le plus mal en ce moment */
function toughestRival(c) {
  if (!c.rivals || !c.rivals.length) return null;
  return c.rivals.slice().sort((a, b) =>
    (b.clients * (0.4 + b.quality / 90) / b.price) - (a.clients * (0.4 + a.quality / 90) / a.price))[0];
}

/* ---------------------------------------------------------
   VIE DES CONCURRENTS
   --------------------------------------------------------- */

function tickRivals(c) {
  const t = getType(c);
  const total = marketSize(c);
  const free = Math.max(0, total - c.clients - rivalClients(c));
  const myShare = c.clients / total;

  (c.rivals || []).forEach(r => {
    // Croissance propre, freinée par ce qui reste à prendre
    const attract = r.strength * (0.45 + r.quality / 110) / Math.max(0.5, r.price);
    const target = total * clamp(attract * 0.14, 0.01, 0.24);
    const pull = (target - r.clients) * 0.0009 * (1 + r.aggression);
    const grab = free > 0 ? pull : Math.min(0, pull);
    r.clients = Math.max(0, r.clients + grab + rand(-0.4, 0.4) * Math.sqrt(Math.max(1, r.clients)) * 0.05);
    r.clients = Math.min(r.clients, total * 0.32);

    // Ils te regardent grandir, et ça les agace
    const seen = r.seenShare === undefined ? myShare : r.seenShare;
    if (myShare > seen + 0.004) {
      r.aggression = clamp(r.aggression + 0.004, 0, 1.4);
      r.grudge = clamp(r.grudge + 0.004, 0, 1);
    } else if (myShare < seen - 0.004) {
      r.aggression = clamp(r.aggression - 0.002, 0.05, 1.4);
    }
    r.seenShare = seen + (myShare - seen) * 0.02;

    // Un concurrent agacé casse ses prix ou soigne son produit
    if (Math.random() < 0.0016 * (1 + r.aggression * 2)) {
      if (rivalKind(r).id === 'premium' || Math.random() < 0.4) {
        r.quality = Math.round(clamp(r.quality + rand(1, 4), 10, 99));
      } else {
        r.price = clamp(r.price * rand(0.94, 0.985), 0.5, 1.8);
      }
    }

    // Les petits meurent parfois, remplacés par de nouveaux entrants
    if (r.clients < total * 0.002 && Math.random() < 0.0008) {
      const fresh = makeRival(t.id, undefined, total);
      Object.assign(r, fresh);
      if (S.day > 200) addLog(S, `${c.name} : un nouvel entrant, ${r.name}, se positionne sur ton marché.`, 'info');
    }
  });
}

/* ---------------------------------------------------------
   OPÉRATIONS SUR LES CONCURRENTS
   --------------------------------------------------------- */

// Ce que vaut un concurrent : on paie ses clients et sa position
function rivalValue(c, r) {
  const t = getType(c);
  const annualRevenue = r.clients * t.revPerClient * r.price * 12;
  const margin = clamp(0.1 + r.quality / 400 - (1 - r.price) * 0.1, 0.04, 0.3);
  const base = annualRevenue * margin * t.multiple;
  let v = Math.max(t.cost * 0.5, base) * (1 + r.aggression * 0.15);
  // On n'achète pas au même prix selon le moment : en euphorie tout le
  // monde surenchérit, en crise les vendeurs n'ont plus le choix.
  v *= ecoValuation(S);
  // Et si tu t'es mis en chasse quand les autres paniquaient, tu sais
  // lesquels ne passeront pas l'hiver.
  if (S.crisisHunter && S.day - S.crisisHunter < 540) v *= 0.78;
  return v;
}

function scoutRival(uid, rivalId) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const r = c.rivals.find(x => x.id === rivalId);
  if (!r || r.known) return;
  const cost = Math.round(getType(c).fixedCost * 1.5);
  if (c.cash < cost) return toast(`Une étude de marché coûte ${fmt(cost)}.`);
  c.cash -= cost;
  r.known = true;
  addLog(S, `${c.name} : tu fais analyser ${r.name}. Tu sais maintenant à qui tu as affaire.`, 'info');
  render();
}

function buyRival(uid, rivalId) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const r = c.rivals.find(x => x.id === rivalId);
  if (!r) return;
  const price = Math.round(rivalValue(c, r) * (1.15 - S.skills.finance / 500));
  if (S.money + c.cash < price) return toast(`Il faudrait ${fmt(price)} pour racheter ${r.name}.`);

  const fromCompany = Math.min(c.cash, price);
  c.cash -= fromCompany;
  S.money -= price - fromCompany;

  // On récupère ses clients, mais une partie s'en va pendant la fusion
  const kept = Math.round(r.clients * rand(0.6, 0.82));
  c.clients += kept;
  c.quality = clamp((c.quality * c.clients + r.quality * kept) / Math.max(1, c.clients + kept), 0, 100);
  c.rivals = c.rivals.filter(x => x.id !== rivalId);
  S.reputation = clamp(S.reputation + 4, 0, 100);
  addLog(S, `${c.name} rachète ${r.name} pour ${fmt(price)} : ${num(kept)} clients absorbés sur ${num(r.clients)}.`, 'good');
  render();
}

/* Réponse commerciale : une campagne ciblée contre un concurrent */
function attackRival(uid, rivalId) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const r = c.rivals.find(x => x.id === rivalId);
  if (!r) return;
  const cost = Math.round(projectedRevenue(c) * 0.25 + getType(c).fixedCost * 2);
  if (c.cash < cost) return toast(`Une campagne comparative coûte ${fmt(cost)}.`);
  c.cash -= cost;

  const power = (0.3 + S.skills.marketing / 130) * (0.5 + c.quality / 100) / Math.max(0.5, marketPressure(c) + 0.3);
  if (Math.random() < clamp(power * 0.55, 0.15, 0.85)) {
    const stolen = Math.round(r.clients * rand(0.06, 0.16));
    r.clients -= stolen;
    c.clients += stolen;
    r.grudge = clamp(r.grudge + 0.25, 0, 1);
    r.aggression = clamp(r.aggression + 0.1, 0, 1.4);
    addLog(S, `${c.name} : ta campagne contre ${r.name} lui prend ${num(stolen)} clients. Il ne va pas laisser passer.`, 'good');
  } else {
    S.reputation = clamp(S.reputation - 3, 0, 100);
    r.aggression = clamp(r.aggression + 0.15, 0, 1.4);
    addLog(S, `${c.name} : ta campagne contre ${r.name} tombe à plat et te fait passer pour un mauvais perdant.`, 'bad');
  }
  render();
}
