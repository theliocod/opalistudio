/* =========================================================
   EMPIRE — Le monde et la pierre
   Où l'on vit change tout : ce que coûte une journée, ce
   qu'on paie d'impôts, les gens qu'on croise, la taille du
   marché qu'on adresse et les profils qu'on peut recruter.
   Et la pierre n'est pas un décor : on l'achète, on la loue,
   on l'entretient, on la revend.
   ========================================================= */

/* ---------------------------------------------------------
   LES VILLES
   cost   : multiplicateur du coût de la vie
   tax    : ce qui s'ajoute (ou se retire) à la fiscalité
   talent : qualité des profils qu'on trouve à recruter
   market : taille du marché adressable
   net    : niveau des gens qu'on croise en réseautant
   price  : indice du prix de la pierre
   growth : appréciation annuelle de l'immobilier
   --------------------------------------------------------- */

const CITIES = [
  {
    id: 'paris', name: 'Paris', pays: 'France', icon: 'fa-tower-eiffel',
    cost: 1, tax: 0, talent: 1, market: 1, net: 0, joy: 0, health: 0,
    price: 1, growth: 0.022, yield: 0.033, req: {},
    desc: "Cher, dense, épuisant. Tout s'y passe quand même."
  },
  {
    id: 'lyon', name: 'Lyon', pays: 'France', icon: 'fa-utensils',
    cost: 0.74, tax: 0, talent: 0.92, market: 0.82, net: -6, joy: 3, health: 2,
    price: 0.58, growth: 0.021, yield: 0.042, req: {},
    desc: "On y vit mieux pour moins cher, et on y travaille aussi bien."
  },
  {
    id: 'bordeaux', name: 'Bordeaux', pays: 'France', icon: 'fa-wine-glass',
    cost: 0.71, tax: 0, talent: 0.85, market: 0.7, net: -9, joy: 5, health: 3,
    price: 0.55, growth: 0.024, yield: 0.041, req: {},
    desc: "Une heure de la mer, deux de Paris. On y ralentit sans s'endormir."
  },
  {
    id: 'marseille', name: 'Marseille', pays: 'France', icon: 'fa-anchor',
    cost: 0.62, tax: 0, talent: 0.78, market: 0.72, net: -10, joy: 6, health: 4,
    price: 0.4, growth: 0.028, yield: 0.055, req: {},
    desc: "Le soleil, la mer, et un rapport au temps qui n'est pas celui de Paris."
  },
  {
    id: 'lisbonne', name: 'Lisbonne', pays: 'Portugal', icon: 'fa-sun',
    cost: 0.6, tax: -0.05, talent: 0.9, market: 0.66, net: -3, joy: 8, health: 5,
    price: 0.48, growth: 0.045, yield: 0.05, req: { money: 20000 },
    desc: "Fiscalité douce, climat idéal, et la moitié des fondateurs européens y sont passés."
  },
  {
    id: 'barcelone', name: 'Barcelone', pays: 'Espagne', icon: 'fa-umbrella-beach',
    cost: 0.72, tax: -0.01, talent: 0.95, market: 0.85, net: -1, joy: 9, health: 6,
    price: 0.62, growth: 0.03, yield: 0.045, req: { money: 20000 },
    desc: "La mer le matin, les bureaux l'après-midi. Il faut de la discipline."
  },
  {
    id: 'berlin', name: 'Berlin', pays: 'Allemagne', icon: 'fa-code',
    cost: 0.82, tax: 0.01, talent: 1.15, market: 1.05, net: 3, joy: 4, health: 1,
    price: 0.66, growth: 0.032, yield: 0.04, req: { money: 30000 },
    desc: "Le vivier technique le plus profond d'Europe, et des loyers qui restent tenables."
  },
  {
    id: 'londres', name: 'Londres', pays: 'Royaume-Uni', icon: 'fa-crown',
    cost: 1.55, tax: 0.02, talent: 1.2, market: 1.45, net: 9, joy: -2, health: -2,
    price: 1.7, growth: 0.02, yield: 0.028, req: { reputation: 25, money: 120000 },
    desc: "L'argent y est, les talents aussi. La pluie et les loyers également."
  },
  {
    id: 'newyork', name: 'New York', pays: 'États-Unis', icon: 'fa-city',
    cost: 1.85, tax: 0.03, talent: 1.3, market: 1.9, net: 14, joy: -3, health: -4,
    price: 2.1, growth: 0.023, yield: 0.03, req: { reputation: 40, money: 300000 },
    desc: "Le plus grand marché du monde occidental, et le rythme qui va avec."
  },
  {
    id: 'dubai', name: 'Dubaï', pays: 'Émirats', icon: 'fa-building',
    cost: 1.35, tax: -0.16, talent: 0.95, market: 1.1, net: 8, joy: -1, health: -1,
    price: 1.25, growth: 0.05, yield: 0.062, req: { reputation: 35, money: 250000 },
    desc: "Zéro impôt sur le revenu. On y gagne beaucoup et on y laisse quelque chose."
  },
  {
    id: 'singapour', name: 'Singapour', pays: 'Singapour', icon: 'fa-ship',
    cost: 1.5, tax: -0.08, talent: 1.25, market: 1.5, net: 11, joy: 0, health: 1,
    price: 1.9, growth: 0.028, yield: 0.026, req: { reputation: 45, money: 400000 },
    desc: "La porte de l'Asie, une fiscalité clémente et une exigence de tous les instants."
  },
  {
    id: 'bali', name: 'Bali', pays: 'Indonésie', icon: 'fa-leaf',
    cost: 0.34, tax: -0.04, talent: 0.55, market: 0.32, net: -16, joy: 13, health: 9,
    price: 0.3, growth: 0.055, yield: 0.07, req: {},
    desc: "On y vit pour trois fois rien et on y est très heureux. On n'y construit pas grand-chose."
  }
];

function getCity(id) { return CITIES.find(c => c.id === id) || CITIES[0]; }
function currentCity(s = S) { return getCity(s.cityId || 'paris'); }

/* ---------------------------------------------------------
   VOYAGER
   Partir coûte de l'argent et des jours de calendrier. Ça
   rend de l'énergie, du moral, parfois une idée ou une
   rencontre — et ça ne se remplace par rien d'autre.
   --------------------------------------------------------- */

const TRIPS = [
  { id: 'weekend', name: 'Un week-end', days: 3, mult: 0.5, icon: 'fa-suitcase-rolling',
    desc: "Trois jours pour couper. Suffisant pour respirer, pas pour décrocher." },
  { id: 'semaine', name: 'Une semaine', days: 8, mult: 1, icon: 'fa-plane-departure',
    desc: "Le format classique. On revient reposé et un peu moins bête." },
  { id: 'long', name: 'Trois semaines', days: 22, mult: 2.4, icon: 'fa-earth-europe',
    desc: "Assez long pour que la boîte tourne sans toi — ou pour découvrir qu'elle n'y arrive pas." },
  { id: 'sabbat', name: 'Deux mois de rupture', days: 60, mult: 5, icon: 'fa-mountain-sun',
    desc: "On part en se disant qu'on va tout arrêter. On revient rarement le même." }
];

function tripCost(city, trip) {
  return Math.round((450 + city.cost * 900 + city.price * 700) * trip.mult * (1 + luxuryRep(S) / 260));
}

function travel(cityId, tripId) {
  const city = getCity(cityId);
  const trip = TRIPS.find(t => t.id === tripId);
  if (!trip) return;
  const cost = tripCost(city, trip);
  if (S.money < cost) return toast(`Ce voyage coûte ${fmt(cost)}.`);
  if (S.travelBack && S.day < S.travelBack) return toast("Tu rentres à peine.");

  S.money -= cost;
  addLog(S, `Tu pars ${trip.name.toLowerCase()} à ${city.name} (${fmt(cost)}).`, 'good');

  // les jours passent vraiment : la boîte tourne sans toi
  const before = { happy: S.happiness, energy: S.energy };
  S.away = { city: cityId, until: S.day + trip.days };
  for (let i = 0; i < trip.days; i++) { if (!tick()) return; }
  S.away = null;
  S.travelBack = S.day + 20;

  const gain = trip.mult;
  addHappiness(9 * gain * (1 + city.joy / 40));
  S.health = clamp(S.health + 3 * gain * (1 + city.health / 30), 0, 100);
  S.energy = clamp(S.energy + 22 * Math.min(2, gain), 0, energyCeiling(S));

  // ce qu'on ramène
  if (Math.random() < 0.3 + trip.mult * 0.12) {
    const k = makeContact(1);
    k.level = Math.round(clamp(reachableLevel(S, city.net) + trip.mult * 3, 8, 99));
    k.relation = 24; k.trust = 60;
    k.metWhere = `rencontré à ${city.name}`;
    S.contacts.push(k);
    addLog(S, `À ${city.name}, tu rencontres ${k.name}. Le genre de hasard qui n'arrive qu'en partant.`, 'good');
  }
  if (S.companies.length && Math.random() < 0.22 + trip.mult * 0.1) {
    const c = biggest(S);
    c.quality = clamp(c.quality + 4 + trip.mult * 2, 0, 100);
    addLog(S, `Tu reviens avec une idée claire pour ${c.name}. Le produit y gagne.`, 'good');
  }
  if (trip.mult >= 2.4) {
    gainSkill({ social: 1.2 * trip.mult, business: 0.6 * trip.mult }, 1, 'field');
  }
  addLog(S, `Retour de ${city.name}. Moral ${Math.round(S.happiness - before.happy) >= 0 ? '+' : ''}${Math.round(S.happiness - before.happy)}, énergie refaite.`, 'info');
  render();
}

/* ---------------------------------------------------------
   S'INSTALLER AILLEURS
   Déménager change durablement la partie — et coûte ce que
   coûte de tout recommencer socialement.
   --------------------------------------------------------- */

function canMoveTo(city) {
  const r = city.req || {};
  if (r.reputation && S.reputation < r.reputation)
    return { ok: false, why: `Réputation ${r.reputation} requise pour obtenir le visa et les papiers.` };
  if (r.money && S.money < r.money)
    return { ok: false, why: `Il faut ${fmt(r.money)} d'avance pour s'installer là-bas.` };
  return { ok: true };
}

function moveCost(city) {
  return Math.round((2500 + city.cost * 4200) * (1 + S.family.children.length * 0.4));
}

function moveTo(cityId) {
  const city = getCity(cityId);
  if (city.id === currentCity(S).id) return;
  const check = canMoveTo(city);
  if (!check.ok) return toast(check.why);
  const cost = moveCost(city);
  if (S.money < cost) return toast(`Le déménagement coûte ${fmt(cost)}.`);

  S.money -= cost;
  const old = currentCity(S);
  S.cityId = city.id;
  S.movedAt = S.day;

  // on ne déménage pas seul : le logement loué ne suit pas
  if (!String(S.housingId).startsWith('prop:')) S.housingId = 'parents';
  else {
    const p = propOf(S.housingId.slice(5));
    if (!p || p.cityId !== city.id) S.housingId = 'coloc';
  }

  // repartir de zéro socialement, c'est le vrai prix d'un départ
  S.contacts.forEach(k => {
    if (Math.random() < 0.55) k.away = true;
    k.relation = clamp(k.relation - 8, 0, 100);
  });
  (S.friends || []).forEach(f => {
    f.closeness = clamp(f.closeness - 14, 0, 100);
    f.envy = clamp(f.envy + 6, 0, 100);
  });
  if (S.family.partner) S.family.partner.relation = clamp(S.family.partner.relation - 10, 0, 100);
  addHappiness(city.joy > old.joy ? 6 : -6);
  S.energy = clamp(S.energy - 25, 0, energyCeiling(S));

  addLog(S, `Tu quittes ${old.name} pour ${city.name} (${fmt(cost)}). Il va falloir tout reconstruire sur place.`, 'warn');
  render();
}

/* ---------------------------------------------------------
   CE QUE LA VILLE CHANGE DANS LE JEU
   --------------------------------------------------------- */

function cityCostFactor(s = S) { return currentCity(s).cost; }
function cityTax(s = S) { return currentCity(s).tax; }
function cityTalent(s = S) { return currentCity(s).talent; }
function cityMarket(s = S) { return currentCity(s).market; }
function cityNet(s = S) { return currentCity(s).net; }

function tickCity(s) {
  const c = currentCity(s);
  addHappiness(c.joy * 0.0025);
  s.health = clamp(s.health + c.health * 0.0018, 0, 100);
}

/* ---------------------------------------------------------
   LA PIERRE
   --------------------------------------------------------- */

const PROPERTY_TYPES = [
  { id: 'studio', name: 'Studio', icon: 'fa-door-closed', base: 145000, rest: 1.05, happy: 1,
    charges: 130, tier: 1, desc: "25 m². On y dort, on n'y reçoit pas." },
  { id: 'deuxpieces', name: 'Deux-pièces', icon: 'fa-house', base: 245000, rest: 1.12, happy: 3,
    charges: 190, tier: 2, desc: "De quoi séparer le lit du bureau. Ça change plus qu'on ne croit." },
  { id: 'familial', name: 'Appartement familial', icon: 'fa-people-roof', base: 470000, rest: 1.22, happy: 6,
    charges: 320, tier: 3, desc: "Trois chambres, un vrai salon. On peut y élever des enfants." },
  { id: 'loft', name: 'Loft d\'artiste', icon: 'fa-industry', base: 620000, rest: 1.2, happy: 9,
    charges: 380, tier: 3, desc: "Volume, lumière, sol en béton ciré. Impossible à chauffer." },
  { id: 'maisonville', name: 'Maison de ville', icon: 'fa-house-chimney', base: 720000, rest: 1.28, happy: 8,
    charges: 420, tier: 4, desc: "Sur trois niveaux, avec une courette. Le compromis parfait." },
  { id: 'maisonjardin', name: 'Maison avec jardin', icon: 'fa-tree', base: 950000, rest: 1.34, happy: 11,
    charges: 560, tier: 4, desc: "De l'herbe, un barbecue, des voisins. Une autre vie." },
  { id: 'penthouse', name: 'Penthouse', icon: 'fa-city', base: 1900000, rest: 1.46, happy: 16,
    charges: 1400, tier: 5, desc: "Dernier étage, terrasse filante, la ville à tes pieds." },
  { id: 'villa', name: 'Villa avec piscine', icon: 'fa-water-ladder', base: 2600000, rest: 1.48, happy: 18,
    charges: 2200, tier: 5, desc: "Piscine, pool house, et un jardinier qui vient deux fois par semaine." },
  { id: 'domaine', name: 'Domaine avec parc', icon: 'fa-landmark-dome', base: 5200000, rest: 1.58, happy: 24,
    charges: 6500, tier: 6, desc: "Quatre hectares, une allée de gravier, de la place pour trois cents invités." },
  { id: 'immeuble', name: 'Immeuble de rapport', icon: 'fa-building-columns', base: 1600000, rest: 1, happy: 0,
    charges: 1900, tier: 0, rental: true, units: 6,
    desc: "Six lots à louer. On n'y habite pas : on l'exploite." }
];

function propType(p) { return PROPERTY_TYPES.find(t => t.id === p.typeId) || PROPERTY_TYPES[0]; }
function propOf(id) { return (S.props || []).find(p => p.id === id); }

function propPrice(typeId, cityId) {
  const t = PROPERTY_TYPES.find(x => x.id === typeId);
  const c = getCity(cityId);
  return Math.round(t.base * c.price);
}

/* Loyer mensuel qu'un bien peut sortir, entretien déduit du rendement. */
function propRent(p) {
  const t = propType(p);
  const c = getCity(p.cityId);
  const units = t.units || 1;
  return Math.round(p.value * c.yield / 12 * (0.55 + p.cond / 130) * (units > 1 ? 1.12 : 1));
}

function propCharges(p) {
  const t = propType(p);
  return Math.round(t.charges * getCity(p.cityId).cost * (1.4 - p.cond / 140));
}

function propEquity(p) { return Math.max(0, p.value - (p.loan ? p.loan.principal : 0)); }
function propertyEquity(s = S) { return (s.props || []).reduce((a, p) => a + propEquity(p), 0); }
function propertyDebt(s = S) { return (s.props || []).reduce((a, p) => a + (p.loan ? p.loan.principal : 0), 0); }

/* Revenus locatifs nets, hors mensualités d'emprunt */
function rentalIncome(s = S) {
  return (s.props || []).filter(p => p.mode === 'rent' && p.tenant)
    .reduce((a, p) => a + propRent(p) - propCharges(p), 0);
}
/* Ce que la pierre coûte tous les mois quoi qu'il arrive */
function propertyOutflow(s = S) {
  return (s.props || []).reduce((a, p) =>
    a + (p.mode === 'rent' && p.tenant ? 0 : propCharges(p)) + (p.loan ? p.loan.monthly : 0), 0);
}

/* ---------------------------------------------------------
   ACHETER, EMPRUNTER, LOUER, VENDRE
   --------------------------------------------------------- */

/* La banque prête sur les revenus, pas sur les rêves : la mensualité
   ne doit pas dépasser un tiers de ce qui rentre tous les mois. */
function monthlyIncome(s = S) {
  return (s.job ? s.job.salary : 0) + monthlyBusinessProfit(s) + rentalIncome(s);
}
function mortgageCapacity(s = S) {
  const free = monthlyIncome(s) / 3 - (s.props || []).reduce((a, p) => a + (p.loan ? p.loan.monthly : 0), 0);
  if (free <= 50) return 0;
  const rate = mortgageRate(s);
  const i = rate / 12, n = 240;
  return Math.max(0, Math.round(free * (1 - Math.pow(1 + i, -n)) / i));
}
function mortgageRate(s = S) {
  return +clamp(0.048 + currentCity(s).growth * 0.35 - s.skills.finance / 3000 + ecoRate(s), 0.02, 0.11).toFixed(4);
}

function buyProperty(typeId, cityId, useLoan) {
  const t = PROPERTY_TYPES.find(x => x.id === typeId);
  const price = propPrice(typeId, cityId);
  const fees = Math.round(price * 0.08);                 // notaire et agence
  S.props = S.props || [];

  let loan = null;
  let cash = price + fees;
  if (useLoan) {
    const down = Math.round(price * 0.2) + fees;
    const borrowed = price - Math.round(price * 0.2);
    if (borrowed > mortgageCapacity(S))
      return toast(`La banque te suivrait jusqu'à ${fmt(mortgageCapacity(S))} d'emprunt, pas plus.`);
    if (S.money < down) return toast(`Il te faut ${fmt(down)} d'apport et de frais.`);
    const rate = mortgageRate(S), i = rate / 12, n = 240;
    loan = {
      principal: borrowed, borrowed, rate, term: n,
      monthly: Math.round(borrowed * i / (1 - Math.pow(1 + i, -n)))
    };
    cash = down;
  }
  if (S.money < cash) return toast(`Il te faut ${fmt(cash)}.`);
  S.money -= cash;

  const p = {
    id: 'b' + Math.random().toString(36).slice(2, 8),
    typeId, cityId, bought: S.day, price, value: price, cond: 92,
    mode: t.rental ? 'rent' : 'empty', tenant: null, loan, rentedDays: 0
  };
  S.props.push(p);
  if (t.rental) findTenant(p, true);
  addLog(S, `Tu achètes ${t.name.toLowerCase()} à ${getCity(cityId).name} pour ${fmt(price)}${loan ? ` (${fmt(loan.monthly)}/mois sur 20 ans)` : ''}. Frais : ${fmt(fees)}.`, 'good');
  addHappiness(t.rental ? 4 : 10);
  render();
}

function moveIntoProp(pid) {
  const p = propOf(pid);
  if (!p) return;
  const t = propType(p);
  if (t.rental) return toast("On n'habite pas un immeuble de rapport.");
  if (p.cityId !== currentCity(S).id) return toast(`Ce bien est à ${getCity(p.cityId).name}. Il faudrait d'abord t'y installer.`);
  if (p.tenant) return toast("Il y a un locataire dedans. Donne-lui congé d'abord.");
  S.housingId = 'prop:' + p.id;
  p.mode = 'live';
  addLog(S, `Tu emménages dans ton ${t.name.toLowerCase()} de ${getCity(p.cityId).name}. Plus de loyer.`, 'good');
  addHappiness(8);
  render();
}

function rentOut(pid) {
  const p = propOf(pid);
  if (!p) return;
  if (S.housingId === 'prop:' + p.id) return toast("Tu y habites. Déménage d'abord.");
  p.mode = 'rent';
  findTenant(p);
  render();
}

function stopRenting(pid) {
  const p = propOf(pid);
  if (!p) return;
  if (p.tenant) addLog(S, `Tu donnes congé à ${p.tenant.name}. Le bien se libère.`, 'info');
  p.tenant = null; p.mode = 'empty';
  render();
}

function findTenant(p, quiet) {
  const c = getCity(p.cityId);
  const t = propType(p);
  p.tenant = {
    name: randomName(),
    since: S.day,
    reliability: Math.round(clamp(rand(45, 96) + p.cond / 6 - c.yield * 180, 20, 99)),
    rent: propRent(p)
  };
  if (!quiet) addLog(S, `${p.tenant.name} emménage dans ton ${t.name.toLowerCase()} : ${fmt(p.tenant.rent)}/mois.`, 'good');
}

function renovate(pid) {
  const p = propOf(pid);
  if (!p) return;
  const cost = Math.round(p.value * (0.055 + (100 - p.cond) / 700));
  if (S.money < cost) return toast(`Ces travaux coûtent ${fmt(cost)}.`);
  S.money -= cost;
  const before = p.cond;
  p.cond = clamp(p.cond + 26 + rand(0, 10), 0, 100);
  p.value = Math.round(p.value * (1 + (p.cond - before) / 620));
  addLog(S, `Travaux sur ton bien de ${getCity(p.cityId).name} (${fmt(cost)}) : état ${Math.round(before)} → ${Math.round(p.cond)}.`, 'good');
  render();
}

function sellProperty(pid) {
  const p = propOf(pid);
  if (!p) return;
  const t = propType(p);
  const fees = Math.round(p.value * 0.06);
  const held = (S.day - p.bought) / DAYS_PER_YEAR;
  const gain = Math.max(0, p.value - p.price);
  // plus-value : exonérée si c'est ta résidence, taxée si tu la détiens peu
  const taxed = S.housingId === 'prop:' + p.id ? 0 : gain * clamp(0.28 - held * 0.028, 0, 0.28);
  const net = Math.round(p.value - fees - taxed - (p.loan ? p.loan.principal : 0));

  S.money += net;
  if (S.housingId === 'prop:' + p.id) S.housingId = 'coloc';
  S.props = S.props.filter(x => x !== p);
  addLog(S,
    `Tu revends ton ${t.name.toLowerCase()} de ${getCity(p.cityId).name} : ${fmt(p.value)}, ${fmt(net)} nets` +
    `${taxed > 0 ? ` (${fmt(taxed)} de plus-value taxée)` : ''}${p.loan ? `, crédit soldé` : ''}.`,
    'good');
  render();
}

/* ---------------------------------------------------------
   LA VIE DES BIENS
   --------------------------------------------------------- */

function tickProperties(s) {
  const D = DAYS_PER_MONTH;
  (s.props || []).forEach(p => {
    const c = getCity(p.cityId);

    // la pierre se dégrade et prend de la valeur
    p.cond = clamp(p.cond - (p.tenant ? 0.028 : 0.016), 0, 100);
    const cycle = ecoProperty(s) * (1 + Math.sin(s.day / 900) * 0.1);
    p.value = Math.round(p.value * (1 + (c.growth * cycle) / DAYS_PER_YEAR) * (1 - (p.cond < 40 ? 0.00006 : 0)));

    // charges, crédit
    s.money -= propCharges(p) / D * (p.tenant ? 0.35 : 1);
    if (p.loan) {
      const interest = p.loan.principal * p.loan.rate / DAYS_PER_YEAR;
      const due = p.loan.monthly / D;
      s.money -= due;
      p.loan.principal = Math.max(0, p.loan.principal - (due - interest));
      if (p.loan.principal <= 0.5) {
        p.loan = null;
        addLog(s, `Crédit soldé sur ton bien de ${c.name}. Il est à toi, entièrement.`, 'good');
      }
    }

    // loyers
    if (p.mode === 'rent') {
      if (p.tenant) {
        p.rentedDays++;
        const late = p.tenant.reliability < 55 && Math.random() < 0.0016;
        if (late) {
          addLog(s, `${p.tenant.name} ne paie pas ce mois-ci. Ça arrive, et ça se règle rarement vite.`, 'warn');
          p.tenant.reliability = clamp(p.tenant.reliability - 8, 0, 100);
        } else {
          s.money += p.tenant.rent / D;
        }
        // départs
        if (s.day - p.tenant.since > 700 && Math.random() < 0.004) {
          addLog(s, `${p.tenant.name} quitte ton bien de ${c.name} après ${Math.round((s.day - p.tenant.since) / 360)} ans.`, 'info');
          p.tenant = null;
        }
        // dégâts
        if (Math.random() < 0.0006) {
          const dmg = Math.round(p.value * rand(0.004, 0.02));
          s.money -= dmg;
          p.cond = clamp(p.cond - rand(3, 9), 0, 100);
          addLog(s, `Dégât des eaux dans ton bien de ${c.name} : ${fmt(dmg)} de réparations.`, 'bad');
        }
      } else if (Math.random() < 0.012 * (0.5 + p.cond / 100)) {
        findTenant(p);
      }
    }
  });
}

function tickWorld(s) {
  tickCity(s);
  tickProperties(s);
}

/* ---------------------------------------------------------
   AFFICHAGE
   --------------------------------------------------------- */

function renderWorld() {
  return `
  <div class="grid">
    ${renderWhereYouLive()}
    ${renderProperties()}
    ${renderCities()}
    ${renderMarket()}
  </div>`;
}

function renderWhereYouLive() {
  const c = currentCity(S);
  const h = housing(S);
  const own = String(S.housingId).startsWith('prop:');
  return `
  <section class="card wide">
    <h2><i class="fas ${c.icon}"></i> Tu vis à ${c.name}</h2>
    <p class="muted">${c.desc}</p>
    <div class="city-stats">
      <div><span>Coût de la vie</span><b class="${c.cost > 1 ? 'neg' : 'pos'}">×${c.cost.toFixed(2)}</b></div>
      <div><span>Fiscalité</span><b class="${c.tax > 0 ? 'neg' : c.tax < 0 ? 'pos' : ''}">${c.tax === 0 ? 'standard' : (c.tax > 0 ? '+' : '') + Math.round(c.tax * 100) + ' pts'}</b></div>
      <div><span>Marché adressable</span><b class="${c.market >= 1 ? 'pos' : 'neg'}">×${c.market.toFixed(2)}</b></div>
      <div><span>Vivier de talents</span><b class="${c.talent >= 1 ? 'pos' : ''}">×${c.talent.toFixed(2)}</b></div>
      <div><span>Niveau des gens croisés</span><b class="${c.net >= 0 ? 'pos' : 'neg'}">${c.net >= 0 ? '+' : ''}${c.net}</b></div>
      <div><span>Prix de la pierre</span><b>indice ${c.price.toFixed(2)}</b></div>
    </div>
    <div class="metric" style="margin-top:14px">
      <span>${own ? 'Tu es chez toi' : 'Tu loues'} — ${h.name}</span>
      <b>${own ? 'aucun loyer' : fmt(h.cost) + '/mois'}</b>
    </div>
    <p class="row-sub">Récupération ×${h.rest} · moral ${h.happy >= 0 ? '+' : ''}${h.happy}</p>
  </section>`;
}

function renderCities() {
  return `
  <section class="card wide">
    <h2><i class="fas fa-earth-europe"></i> Partir</h2>
    <p class="muted">
      Un voyage fait passer de vrais jours : la boîte tourne sans toi pendant ce temps-là.
      S'installer ailleurs change durablement ce que coûte ta vie, ce que tu paies d'impôts,
      les gens que tu croises et la taille de ton marché — et t'oblige à reconstruire ton réseau sur place.
    </p>
    <div class="cities">
      ${CITIES.map(c => {
        const here = c.id === currentCity(S).id;
        const check = canMoveTo(c);
        return `
        <div class="city ${here ? 'here' : ''} ${check.ok ? '' : 'locked'}">
          <div class="city-head">
            <i class="fas ${c.icon}"></i>
            <div><b>${c.name}</b><span class="row-sub">${c.pays}</span></div>
            ${here ? '<span class="chip ok">ici</span>' : ''}
          </div>
          <p class="row-sub">${c.desc}</p>
          <div class="city-mini">
            <span title="coût de la vie"><i class="fas fa-euro-sign"></i> ×${c.cost.toFixed(2)}</span>
            <span title="marché"><i class="fas fa-users"></i> ×${c.market.toFixed(2)}</span>
            <span title="fiscalité"><i class="fas fa-landmark"></i> ${c.tax === 0 ? '=' : (c.tax > 0 ? '+' : '') + Math.round(c.tax * 100)}</span>
            <span title="moral"><i class="fas fa-face-smile"></i> ${c.joy >= 0 ? '+' : ''}${c.joy}</span>
          </div>
          ${here ? '' : !check.ok
            ? `<span class="phone-lockmsg">${check.why}</span>`
            : `<div class="btn-row">
                 <button class="btn btn-sm btn-ghost" data-act="tripBox" data-id="${c.id}"><i class="fas fa-plane"></i> Y voyager</button>
                 <button class="btn btn-sm" data-act="move" data-id="${c.id}">S'y installer (${fmt(moveCost(c))})</button>
               </div>`}
        </div>`;
      }).join('')}
    </div>
  </section>`;
}

function renderProperties() {
  const list = S.props || [];
  const rent = rentalIncome(S);
  const out = propertyOutflow(S);
  return `
  <section class="card wide">
    <h2><i class="fas fa-key"></i> Ton patrimoine immobilier</h2>
    ${list.length ? `
    <div class="net-sum">
      <div><span>Valeur des biens</span><b class="accent">${fmt(list.reduce((a, p) => a + p.value, 0))}</b></div>
      <div><span>Crédits restants</span><b class="${propertyDebt(S) ? 'neg' : ''}">${fmt(propertyDebt(S))}</b></div>
      <div><span>Ce que tu possèdes vraiment</span><b>${fmt(propertyEquity(S))}</b></div>
      <div><span>Loyers nets</span><b class="pos">+${fmt(rent)}/mois</b></div>
      <div><span>Charges et mensualités</span><b class="neg">-${fmt(out)}/mois</b></div>
    </div>
    <div class="props">
      ${list.map(p => {
        const t = propType(p);
        const city = getCity(p.cityId);
        const here = S.housingId === 'prop:' + p.id;
        const gain = p.value - p.price;
        return `
        <div class="prop ${here ? 'lived' : ''}">
          <div class="prop-head">
            <i class="fas ${t.icon}"></i>
            <div>
              <b>${t.name}</b>
              <span class="row-sub">${city.name} · acheté ${Math.max(1, Math.round((S.day - p.bought) / 30))} mois plus tôt</span>
            </div>
            <span class="chip ${here ? 'ok' : p.mode === 'rent' ? '' : 'ko'}">
              ${here ? 'tu y habites' : p.mode === 'rent' ? (p.tenant ? 'loué' : 'à louer') : 'vide'}
            </span>
          </div>
          <div class="metric"><span>Valeur</span><b class="${gain >= 0 ? 'pos' : 'neg'}">${fmt(p.value)} <em class="row-sub">(${gain >= 0 ? '+' : ''}${fmt(gain)})</em></b></div>
          <div class="metric"><span>État</span><b class="${p.cond > 60 ? '' : 'warn'}">${Math.round(p.cond)}/100</b></div>
          ${bar(p.cond, 100, p.cond > 55 ? 'happy' : 'health')}
          ${p.loan ? `<div class="metric"><span>Crédit</span><b class="neg">${fmt(p.loan.principal)} · ${fmt(p.loan.monthly)}/mois</b></div>` : ''}
          ${p.tenant
            ? `<p class="row-sub"><i class="fas fa-user"></i> ${p.tenant.name} — ${fmt(p.tenant.rent)}/mois, fiabilité ${p.tenant.reliability}/100</p>`
            : p.mode === 'rent' ? `<p class="row-sub warn">Aucun locataire pour l'instant. Un bien en bon état se reloue plus vite.</p>`
            : `<p class="row-sub">${fmt(propCharges(p))}/mois de charges, pour rien.</p>`}
          <div class="btn-row">
            ${!here && !t.rental && !p.tenant ? `<button class="btn btn-sm" data-act="moveIn" data-id="${p.id}">Y habiter</button>` : ''}
            ${!here && p.mode !== 'rent' ? `<button class="btn btn-sm btn-ghost" data-act="rentOut" data-id="${p.id}">Le mettre en location (~${fmt(propRent(p))}/mois)</button>` : ''}
            ${p.mode === 'rent' ? `<button class="btn btn-sm btn-ghost" data-act="stopRent" data-id="${p.id}">Arrêter la location</button>` : ''}
            <button class="btn btn-sm btn-ghost" data-act="renovate" data-id="${p.id}">Rénover</button>
            <button class="btn btn-sm btn-danger" data-act="sellProp" data-id="${p.id}">Revendre</button>
          </div>
        </div>`;
      }).join('')}
    </div>`
    : `<div class="empty-inline"><i class="fas fa-house-circle-check"></i> Tu ne possèdes rien. Tu paies un loyer tous les mois à quelqu'un d'autre.</div>`}
  </section>`;
}

function renderMarket() {
  const city = currentCity(S);
  const cap = mortgageCapacity(S);
  return `
  <section class="card wide">
    <h2><i class="fas fa-house-flag"></i> Le marché à ${city.name}</h2>
    <p class="muted">
      Frais de notaire et d'agence : 8 % à l'achat, 6 % à la revente. Avec un crédit, tu apportes 20 %
      et la banque suit tant que tes mensualités restent sous un tiers de tes revenus —
      soit <b>${fmt(cap)}</b> d'emprunt possible aujourd'hui (${(mortgageRate(S) * 100).toFixed(2)}% sur 20 ans).
      La pierre se dégrade toute seule et prend ${Math.round(city.growth * 100)} % par an ici.
    </p>
    <div class="biz-grid">
      ${PROPERTY_TYPES.map(t => {
        const price = propPrice(t.id, city.id);
        const fees = Math.round(price * 0.08);
        const down = Math.round(price * 0.2) + fees;
        const borrowed = price - Math.round(price * 0.2);
        const canCash = S.money >= price + fees;
        const canLoan = S.money >= down && borrowed <= cap;
        return `
        <div class="biz-card ${canCash || canLoan ? '' : 'row-locked'}">
          <div class="biz-head"><i class="fas ${t.icon}"></i><h3>${t.name}</h3></div>
          <p class="row-sub">${t.desc}</p>
          <div class="biz-meta">
            <span><i class="fas fa-coins"></i> ${fmt(price)}</span>
            <span><i class="fas fa-file-invoice"></i> ${fmt(fees)} de frais</span>
            <span><i class="fas fa-hand-holding-dollar"></i> ${fmt(Math.round(price * getCity(city.id).yield / 12))}/mois de loyer</span>
            ${t.rental ? `<span><i class="fas fa-door-open"></i> ${t.units} lots</span>`
              : `<span><i class="fas fa-bed"></i> récup. ×${t.rest} · moral +${t.happy}</span>`}
          </div>
          <div class="btn-row">
            <button class="btn btn-sm" data-act="buyProp" data-id="${t.id}" data-loan="0" ${canCash ? '' : 'disabled'}>
              Comptant ${fmt(price + fees)}
            </button>
            <button class="btn btn-sm btn-ghost" data-act="buyProp" data-id="${t.id}" data-loan="1" ${canLoan ? '' : 'disabled'}>
              À crédit — ${fmt(down)} d'apport
            </button>
          </div>
        </div>`;
      }).join('')}
    </div>
  </section>`;
}

/* Choisir la durée d'un voyage */
function tripBox(cityId) {
  const city = getCity(cityId);
  const m = $('#modal');
  m.innerHTML = `
    <div class="modal-box">
      <h2><i class="fas ${city.icon}"></i> Partir à ${city.name}</h2>
      <p class="muted">${city.desc}</p>
      <p class="row-sub">Les jours passent vraiment : tes entreprises tournent sans toi, et les échéances tombent.</p>
      <div class="talk-choices">
        ${TRIPS.map(t => {
          const cost = tripCost(city, t);
          return `
          <button class="talk-btn" data-trip="${t.id}" ${S.money >= cost ? '' : 'disabled'}>
            <span><i class="fas ${t.icon}"></i> ${t.name}<em class="row-sub" style="display:block">${t.desc}</em></span>
            <em class="chip ${S.money >= cost ? 'ok' : 'ko'}">${fmt(cost)} · ${t.days} j</em>
          </button>`;
        }).join('')}
        <button class="btn btn-ghost btn-sm" data-trip="cancel">Pas maintenant</button>
      </div>
    </div>`;
  m.classList.remove('hidden');
  $$('#modal [data-trip]').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.trip;
    closeModal();
    if (id !== 'cancel') travel(cityId, id);
  }));
}
