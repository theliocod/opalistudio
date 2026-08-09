/* =========================================================
   EMPIRE — Moteur de jeu
   Simulation au jour le jour : planning du joueur, équipes,
   canaux d'acquisition, apprentissage, marché du travail.
   ========================================================= */

const SAVE_KEY = 'empire_save_v3';

let S = null;          // état de la partie
let PENDING = null;    // événement en attente de décision

/* ================= Helpers généraux ================= */

function fmt(n) {
  n = Math.round(n);
  const sign = n < 0 ? '-' : '';
  const a = Math.abs(n);
  if (a >= 1000000000) return sign + (a / 1000000000).toFixed(2).replace('.', ',') + ' Md€';
  if (a >= 1000000) return sign + (a / 1000000).toFixed(2).replace('.', ',') + ' M€';
  if (a >= 10000) return sign + Math.round(a / 1000) + ' k€';
  return sign + a.toLocaleString('fr-FR') + ' €';
}
function fmtFull(n) { return Math.round(n).toLocaleString('fr-FR') + ' €'; }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function rand(a, b) { return a + Math.random() * (b - a); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function num(n) { return Math.round(n).toLocaleString('fr-FR'); }

const MONTH_NAMES = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function dayOfMonth(s) { return (s.day % DAYS_PER_MONTH) + 1; }
function monthIndex(s) { return Math.floor(s.day / DAYS_PER_MONTH) % 12; }
function dateLabel(s) { return `${dayOfMonth(s)} ${MONTH_NAMES[monthIndex(s)]} · ${s.age} ans`; }

function addLog(s, text, type = 'info') {
  const last = s.log[0];
  if (last && last.text === text && last.day === s.day) return;
  s.log.unshift({ day: s.day, age: s.age, month: monthIndex(s), text, type });
  if (s.log.length > 300) s.log.pop();
}

function getType(c) { return BUSINESS_TYPES.find(t => t.id === c.typeId); }
function getRole(id) { return ROLES.find(r => r.id === id); }
function getChannel(id) { return CHANNELS.find(c => c.id === id); }

function biggest(s) {
  if (!s.companies.length) return null;
  return s.companies.slice().sort((a, b) => projectedRevenue(b) - projectedRevenue(a))[0];
}

/* ================= Création de partie ================= */

function createCompany(type, name) {
  const budgets = {};
  CHANNELS.forEach(ch => budgets[ch.id] = 0);
  const stock = {};
  CHANNELS.forEach(ch => stock[ch.id] = 0);
  return {
    uid: 'c' + Math.random().toString(36).slice(2, 9),
    typeId: type.id,
    name: name || type.name,
    level: 1,
    quality: 40,
    clients: 0,
    cash: 0,
    equity: 1,
    price: 1,
    costMod: 1,
    loyalty: 1,
    marketBonus: 1,
    hype: 1,
    budgets,
    stock,
    rd: 0,
    support: 0,
    payMod: 1,
    staff: [],
    applicants: [],
    openings: {},
    days: 0,
    negDays: 0,
    lastRevenue: 0,
    lastCosts: 0,
    lastProfit: 0,
    avgRevenue: 0,
    avgProfit: 0,
    history: [],
    growth: 0,
    revenueAgo: 0,
    blocked: null,
    channelBoost: null,
    rivals: []
  };
}

function hireFrom(cand) {
  return {
    id: cand.id, name: cand.name, role: cand.role, skill: cand.skill,
    trait: cand.trait, salary: cand.ask, morale: cand.morale,
    days: 0, equity: 0, variable: false
  };
}

function newGame(name, originId, look) {
  const o = ORIGINS.find(x => x.id === originId);
  S = {
    name: name || 'Alex',
    originId: o.id,
    day: 0,
    age: CONFIG.startAge,
    money: o.money,
    debt: o.debt,
    energy: 100,
    maxEnergy: 100,
    happiness: o.happiness,
    health: o.health,
    reputation: o.reputation,
    skills: Object.assign({ business: 0, marketing: 0, tech: 0, social: 0, finance: 0 }, o.skills),
    job: null,
    jobDays: 0,
    jobWarnings: 0,
    companies: [],
    contacts: [],
    portfolio: {},
    prices: {},
    housingId: 'parents',
    lifeCost: 0,
    look: null,
    plan: [{ act: 'sport', hours: 1 }, { act: 'social', hours: 1 }],
    calendar: [],
    family: { partner: null, children: [], friends: 55 },
    forcedEvent: null,
    luxury: [],
    attending: null,
    scene: null,
    partyCount: 0,
    training: null,
    doneTrainings: [],
    flags: o.flags.slice(),
    focusBonus: 0,
    marketMood: 1,
    wageIndex: 1,
    exits: [],
    goals: [],
    log: [],
    seen: {},
    seenAt: {},
    over: false,
    overReason: '',
    history: []
  };
  ASSETS.forEach(a => S.prices[a.id] = a.price);
  S.look = look || defaultLook();
  refreshCalendar();
  if (S.flags.includes('connected')) { S.contacts.push(makeContact(45)); S.contacts.push(makeContact(35)); }
  addLog(S, `${S.name}, ${CONFIG.startAge} ans. ${o.name}. Tout commence maintenant.`, 'info');
  addLog(S, o.perk, 'info');
  save();
  return S;
}

/* ================= Compétences ================= */

// Plus tu montes, plus chaque point coûte cher, et chaque source
// d'apprentissage a son propre plafond.
function skillCapFor(source) {
  let cap = SKILL_CAPS[source] || SKILL_CAPS.auto;
  if (source === 'auto' && S.flags.includes('educated')) cap += 8;
  return cap;
}

function gainSkill(obj, mult = 1, source = 'field', hardCap = 100) {
  const bonus = S.flags.includes('educated') && source === 'paid' ? 1.25 : 1;
  const cap = Math.min(skillCapFor(source), hardCap);
  Object.entries(obj).forEach(([k, v]) => {
    const cur = S.skills[k];
    // courbe très dure en haut de tableau
    let decay = Math.pow(Math.max(0, 1 - cur / 100), 2.9);
    // au-delà du plafond de la source, la progression est quasi nulle
    if (cur >= cap) decay *= 0.04;
    S.skills[k] = clamp(cur + v * mult * bonus * decay * efficiency(), 0, 100);
  });
}

function addHappiness(v) {
  if (v > 0) v *= Math.max(0.15, 1 - S.happiness / 115);
  else if (S.flags.includes('resilient')) v *= 0.6;
  S.happiness = clamp(S.happiness + v, 0, 100);
}

function efficiency() {
  return (1 + (S.focusBonus || 0)) * (0.65 + S.energy / 280) * (0.85 + S.happiness / 660);
}

/* ================= Planning ================= */

function maxHours() {
  return CONFIG.maxHours + (S.flags.includes('grinder') ? 2 : 0) - (S.flags.includes('parent') ? 2 : 0);
}

function plannedHours(s = S) {
  return s.plan.reduce((a, p) => a + p.hours, 0);
}

function planEntry(act, ref) {
  return S.plan.find(p => p.act === act && (ref === undefined || p.ref === ref));
}

function setPlan(act, hours, ref, role) {
  hours = Math.max(0, Math.round(hours));
  let e = planEntry(act, ref);
  const others = S.plan.filter(p => p !== e).reduce((a, p) => a + p.hours, 0);
  if (others + hours > maxHours()) {
    hours = Math.max(0, maxHours() - others);
    toast(`Tu ne peux pas dépasser ${maxHours()} heures utiles par jour.`);
  }
  if (!e) {
    if (hours <= 0) return render();
    e = { act, hours, ref, role };
    S.plan.push(e);
  } else {
    e.hours = hours;
    if (role) e.role = role;
    if (hours <= 0) S.plan = S.plan.filter(p => p !== e);
  }
  render();
}

function setPlanRole(uid, role) {
  const e = planEntry('biz', uid);
  if (e) { e.role = role; render(); }
}

const FOUNDER_ROLES = [
  { id: 'sales', name: 'Vente & prospection', icon: 'fa-handshake', skills: ['social', 'business'],
    desc: "Tu vas chercher les clients toi-même." },
  { id: 'marketing', name: 'Acquisition', icon: 'fa-bullhorn', skills: ['marketing'],
    desc: "Tu pilotes les campagnes : chaque euro dépensé rend davantage." },
  { id: 'product', name: 'Produit', icon: 'fa-screwdriver-wrench', skills: ['tech', 'business'],
    desc: "Tu construis et améliores : la qualité monte, le churn baisse." },
  { id: 'manage', name: 'Direction & équipe', icon: 'fa-sitemap', skills: ['business', 'social'],
    desc: "Tu encadres : moral de l'équipe en hausse, plus de monde gérable." }
];

function founderRole(id) { return FOUNDER_ROLES.find(r => r.id === id); }

/* ================= Économie d'entreprise ================= */

function staffPerf(c, e) {
  const t = getTrait(e.trait);
  const over = Math.max(0, c.staff.length - spanOfControl(c));
  const spanPenalty = over > 0 ? Math.max(0.35, 1 - over * 0.09) : 1;
  const variable = e.variable ? 1.12 : 1;
  return (e.skill / 100) * (0.45 + e.morale / 180) * t.perf * spanPenalty * variable;
}

function roleForce(c, roleId) {
  return c.staff.filter(e => e.role === roleId).reduce((a, e) => a + staffPerf(c, e), 0);
}

function spanOfControl(c) {
  const managers = c.staff.filter(e => e.role === 'manager');
  const mgrPower = managers.reduce((a, e) => a + (3 + e.skill / 22) * (0.45 + e.morale / 180), 0);
  const founder = planEntry('biz', c.uid);
  const founderBonus = founder && founder.role === 'manage' ? 2 + founder.hours / 3 : 0;
  return 3 + S.skills.business / 9 + mgrPower + founderBonus;
}

// La capacité croît plus vite que le niveau : structurer une entreprise
// démultiplie ce qu'une même équipe peut servir.
function capacity(c) {
  const t = getType(c);
  const infra = t.capPerLevel * Math.pow(c.level, 1.35);
  const team = roleForce(c, 'ops') * t.roleCap * Math.pow(c.level, 0.9);
  // Personne ne sert des millions de clients tout seul : chaque tête ne
  // peut en couvrir qu'un nombre fini, que l'outillage démultiplie.
  const heads = 1 + c.staff.length;
  const perHead = t.roleCap * Math.pow(c.level, 0.6) * 1.6;
  return Math.min(infra + team, heads * perHead);
}

function marketSize(c) {
  return getType(c).market * (c.marketBonus || 1);
}

function marketShare(c) {
  return clamp(c.clients / marketSize(c), 0, 1);
}

/* Ce que vaut ton produit aux yeux du marché. Un produit médiocre
   vendu cher ne trouve pas preneur ; un excellent produit se vend
   plus cher sans perdre de clients. */
function perceivedValue(c) {
  return 0.5 + c.quality / 100;
}

/* Rapport prix demandé / valeur perçue. 1 = prix juste. */
function priceRatio(c) {
  return c.price / Math.max(0.25, perceivedValue(c));
}

/* Élasticité de la demande au prix : au-delà du prix juste, les
   clients partent plus vite qu'ils n'arrivent. */
function priceDemandFactor(c) {
  return clamp(Math.pow(priceRatio(c), -1.6), 0.12, 3.2);
}

/* Efficacité d'un canal : c'est ici que les compétences du joueur
   pèsent vraiment. Un bon marketeur fait rendre deux fois plus le
   même budget publicitaire. */
function channelEfficiency(c, ch) {
  let eff = 0.5 + S.skills[ch.skill] / 100;                    // 0,5 → 1,5
  // un bon produit convertit mieux, se recommande et coûte moins cher à vendre
  eff *= 0.45 + c.quality / 70;                                // 0,45 → 1,88
  eff *= 1 + roleForce(c, 'marketer') * 0.22;                  // les marketeurs salariés
  const founder = planEntry('biz', c.uid);
  if (founder && founder.role === 'marketing') eff *= 1 + founder.hours / 26;
  if (c.channelBoost && c.channelBoost.channel === ch.id) eff *= c.channelBoost.mult;
  return eff;
}

/* Clients apportés par un canal, en clients par jour.
   Modèle : budget / coût d'acquisition, avec un plafond propre au canal
   (il ne capte au mieux qu'une fraction du marché chaque mois).
   Doubler le budget d'un canal déjà saturé ne double donc pas les clients :
   mieux vaut répartir. */
function channelOutput(c, ch) {
  if (c.blocked && c.blocked.channel === ch.id) return 0;
  const t = getType(c);
  // On paie le budget du mois, mais ce sont les euros déjà « installés »
  // qui rapportent : une campagne, une audience ou un fichier de prospects
  // mettent des semaines à produire leur plein effet.
  const spendDay = c.stock[ch.id] || 0;
  if (spendDay <= 0) return 0;

  let power = ch.power * channelEfficiency(c, ch);
  if (ch.id === 'influence') power *= 0.5 + S.reputation / 70;

  const cacEff = t.cac / Math.max(0.05, power);
  const raw = spendDay / cacEff;                                     // clients/jour sans plafond
  const satDay = marketSize(c) * ch.satShare / DAYS_PER_MONTH;       // plafond du canal
  return raw / (1 + raw / satDay);
}

function totalChannelPower(c) {
  return CHANNELS.reduce((a, ch) => a + channelOutput(c, ch), 0);
}

/* Coût d'acquisition effectif constaté, pour l'affichage */
function currentCAC(c) {
  const clients = totalChannelPower(c);
  if (clients <= 0) return 0;
  return (adSpendMonthly(c) / DAYS_PER_MONTH) / clients;
}

function rampFactor(c) {
  const t = getType(c);
  return clamp(0.12 + (c.days / t.ramp) * 0.88, 0.12, 1);
}

function dailyAcquisition(c) {
  const t = getType(c);
  const base = t.acqBase / DAYS_PER_MONTH;

  // canaux payants : exprimés directement en clients par jour
  let acq = totalChannelPower(c);

  // bouche-à-oreille : proportionnel à la qualité et à la base installée
  acq += Math.pow(Math.max(0, c.clients), 0.7) * (c.quality / 100) * 0.004;

  // commerciaux salariés
  acq += base * roleForce(c, 'sales') * 1.6;

  // le fondateur qui vend lui-même
  const founder = planEntry('biz', c.uid);
  if (founder && founder.role === 'sales') {
    const skill = (S.skills.social + S.skills.business) / 2;
    acq += base * (0.3 + skill / 70) * (founder.hours / 8) * efficiency();
  }

  acq = acq
    * priceDemandFactor(c)
    * (1 + S.reputation / 260)
    * S.marketMood
    * (c.hype || 1)
    * rampFactor(c)
    * (1 - occupiedShare(c))
    * clamp(1 - (marketPressure(c) - 0.5) * 0.9, 0.45, 1.45)
    * rand(0.9, 1.1);

  // Une entreprise n'absorbe pas une croissance illimitée : recruter, livrer,
  // servir et structurer prennent du temps. Au-delà d'environ 18 % de croissance
  // mensuelle, chaque client supplémentaire coûte de plus en plus cher à aller
  // chercher — l'argent n'est pas perdu, mais son rendement s'effondre.
  const cap = absorptionCap(c);
  if (acq <= cap) return acq;
  return cap * (1 + Math.log1p((acq - cap) / cap) * 0.3);
}

/* Ce que l'entreprise peut absorber de nouveaux clients par jour sans casser. */
function absorptionCap(c) {
  const socle = Math.max(marketSize(c) * 0.0002, 1.5) / DAYS_PER_MONTH;
  return socle + c.clients * 0.18 / DAYS_PER_MONTH;
}

/* ---- Économie de l'acquisition, telle que le joueur doit la lire ---- */

// Marge dégagée par un client chaque mois, une fois les coûts variables payés
function clientMargin(c) {
  const t = getType(c);
  return t.revPerClient * c.price * S.marketMood * (1 - t.varCost * (c.costMod || 1));
}

// Combien de mois un client reste, en moyenne
function clientLifetime(c) {
  const monthly = dailyChurn(c) * DAYS_PER_MONTH;
  return monthly > 0 ? 1 / monthly : 0;
}

// Ce que rapporte un client sur toute sa durée de vie
function clientValue(c) {
  return clientMargin(c) * clientLifetime(c);
}

// Ce que te coûte réellement un client acquis, budgets d'acquisition compris
function realCAC(c) {
  const perMonth = dailyAcquisition(c) * DAYS_PER_MONTH;
  if (perMonth <= 0.01) return Infinity;
  return adSpendMonthly(c) / perMonth;
}

// Rapport entre ce qu'un client rapporte et ce qu'il coûte : au-dessus de 1,
// chaque euro de publicité crée de la valeur ; en dessous, il en détruit.
function acquisitionReturn(c) {
  const cac = realCAC(c);
  if (!isFinite(cac) || cac <= 0) return 0;
  return clientValue(c) / cac;
}

function dailyChurn(c) {
  const t = getType(c);
  let churn = t.churn * (1.3 - c.quality / 180) / (c.loyalty || 1);
  churn *= clamp(Math.pow(priceRatio(c), 0.8), 0.7, 2.2);   // payer trop cher pour ce qu'on reçoit
  churn *= Math.max(0.45, 1 - roleForce(c, 'support') * 0.14);
  churn *= Math.max(0.7, 1 - (c.support / DAYS_PER_MONTH) / Math.max(80, c.clients * 2) * 0.5);
  const cap = capacity(c);
  if (c.clients > cap) churn += ((c.clients - cap) / Math.max(1, c.clients)) * 0.5;
  if (S.rivals) churn *= 1 + S.rivals * 0.04;
  churn *= clamp(1 + (marketPressure(c) - 0.5) * 0.7, 0.7, 1.45);
  return clamp(churn, 0.005, 0.8) / DAYS_PER_MONTH;
}

function payrollMonthly(c) {
  const over = Math.max(0, c.staff.length - spanOfControl(c));
  const coordination = 1 + over * 0.02;
  return c.staff.reduce((a, e) => a + e.salary, 0) * c.payMod * coordination;
}

function adSpendMonthly(c) {
  return CHANNELS.reduce((a, ch) => a + (c.budgets[ch.id] || 0), 0);
}

function projectedRevenue(c) {
  const t = getType(c);
  return c.clients * t.revPerClient * c.price * S.marketMood;
}

function projectedCosts(c) {
  const t = getType(c);
  // locaux, systèmes, administration : les charges de structure croissent
  // plus vite que la taille, et un bon gestionnaire les contient un peu.
  const fixed = t.fixedCost * Math.pow(c.level, 1.35) * Math.max(0.72, 1 - S.skills.business / 400);
  return fixed
    + payrollMonthly(c)
    + adSpendMonthly(c)
    + c.rd + c.support
    + projectedRevenue(c) * t.varCost * (c.costMod || 1) * Math.max(0.8, 1 - S.skills.tech / 500);
}

function projectedProfit(c) {
  const p = projectedRevenue(c) - projectedCosts(c);
  const taxRate = Math.max(0.18, 0.25 - S.skills.finance / 800);
  return p > 0 ? p * (1 - taxRate) : p;
}

function valuation(c) {
  const t = getType(c);

  // On valorise sur des résultats installés, pas sur le mois en cours :
  // les acheteurs regardent une moyenne, pas un pic.
  const profit = c.avgProfit !== undefined ? c.avgProfit : projectedProfit(c);
  const revenue = c.avgRevenue !== undefined ? c.avgRevenue : projectedRevenue(c);
  const annual = Math.max(0, profit) * 12;

  // Prime de croissance : une entreprise qui grossit vite se paie plus cher.
  const growth = clamp(c.growth || 0, -0.5, 1.5);
  const growthMult = clamp(1 + growth * 0.9, 0.6, 2.4);

  // Une jeune société sans historique ne se valorise pas comme une société installée.
  const maturity = clamp(c.days / 540, 0.35, 1);

  const earnings = annual * t.multiple * growthMult * maturity;
  const topline = revenue * 12 * Math.min(1.2, t.multiple * 0.22) * growthMult * 0.35;
  const floor = t.cost * 0.35;

  const dealBonus = 1 + S.skills.finance / 400;
  const base = Math.max(floor, earnings * 0.75 + topline * 0.25) * dealBonus * (c.hype || 1);
  return base;
}

function monthlyBusinessProfit(s) {
  return s.companies.reduce((a, c) => a + Math.max(0, c.lastProfit) * c.equity, 0);
}
function portfolioValue(s) {
  return Object.entries(s.portfolio).reduce((a, [id, qty]) => a + qty * s.prices[id], 0);
}
function netWorth(s) {
  const comp = s.companies.reduce((a, c) => a + valuation(c) * c.equity + c.cash * c.equity, 0);
  return s.money - s.debt + comp + portfolioValue(s) + luxuryValue(s);
}
function housing(s) {
  const h = HOUSING.find(x => x.id === s.housingId);
  if (h) return h;
  const lux = LUXURY.find(l => l.id === s.housingId);
  if (lux && lux.housing) return { id: lux.id, name: lux.name, cost: 0, icon: lux.icon, desc: lux.desc, ...lux.housing };
  return HOUSING[0];
}

/* Niveau de standing du logement, utilisé pour savoir quelles
   soirées on peut recevoir chez soi. */
function housingTier(s) {
  const i = HOUSING.findIndex(h => h.id === s.housingId);
  if (i >= 0) return i;
  const lux = LUXURY.find(l => l.id === s.housingId);
  return lux && lux.housing ? 5 : 0;
}
function totalLifeCost(s) { return housing(s).cost + (s.lifeCost || 0); }
function debtCeiling(s) {
  return Math.max(15000, netWorth(s) * 0.5 + monthlyBusinessProfit(s) * 24 + (s.job ? s.job.salary * 20 : 0));
}

/* ================= Actions du joueur ================= */

function spendEnergy(e) {
  if (S.energy < e) { toast("Tu es à bout. Il te faut du repos."); return false; }
  S.energy -= e;
  return true;
}

function applyForJob(jobId) {
  const j = JOBS.find(x => x.id === jobId);
  if (!spendEnergy(6)) return;
  const missing = Object.entries(j.req || {}).filter(([k, v]) => S.skills[k] < v);
  if (missing.length) { addLog(S, `Candidature refusée chez « ${j.name} » : niveau insuffisant.`, 'bad'); return render(); }
  const chance = 0.5 + S.reputation / 250 + S.skills.social / 300;
  if (Math.random() < chance) {
    S.job = { id: j.id, name: j.name, salary: j.salary, hours: j.hours, strain: j.strain, gain: j.gain };
    S.jobDays = 0; S.jobWarnings = 0;
    setPlan('job', j.hours);
    addLog(S, `Embauché : ${j.name}, ${fmt(j.salary)} net par mois, ${j.hours}h par jour.`, 'good');
  } else {
    addLog(S, `Entretien raté pour « ${j.name} ».`, 'bad');
    addHappiness(-2);
  }
  render();
}

function quitJob() {
  if (!S.job) return;
  addLog(S, `Tu démissionnes de ton poste de ${S.job.name}.`, 'warn');
  S.job = null; S.jobDays = 0;
  S.plan = S.plan.filter(p => p.act !== 'job');
  render();
}

function trainingCount(id) {
  return S.doneTrainings.filter(x => x === id).length;
}

function trainingCost(t) {
  // Se reformer coûte un peu plus cher à chaque fois : on va chercher
  // des programmes plus pointus.
  return Math.round(t.cost * Math.pow(1.35, trainingCount(t.id)));
}

function startTraining(id) {
  const t = TRAININGS.find(x => x.id === id);
  if (!t.repeat && S.doneTrainings.includes(id)) return toast("Tu as déjà suivi cette formation.");
  if (t.req && Object.entries(t.req).some(([k, v]) => S.skills[k] < v)) return toast("Tu n'as pas le niveau requis.");
  const cost = trainingCost(t);
  if (S.money < cost) return toast("Pas assez d'argent.");
  S.money -= cost;
  S.training = { id, progress: 0 };
  if (!planEntry('study')) setPlan('study', 2);
  addLog(S, `Tu commences : ${t.name}${cost ? ` (${fmt(cost)})` : ''}. Alloue-lui des heures dans ton planning.`, 'info');
  render();
}

function setHousing(id) {
  const h = HOUSING.find(x => x.id === id);
  if (h.cost > 1000 && S.money < h.cost * 2) return toast("Il te faut au moins 2 mois de loyer d'avance.");
  S.housingId = id;
  addLog(S, `Déménagement : ${h.name} (${fmt(h.cost)}/mois).`, 'info');
  render();
}

/* ----- Contacts ----- */

function meetContact(id) {
  const k = S.contacts.find(x => x.id === id);
  if (!k) return;
  if (S.day - k.lastSeen < 20) return toast("Tu l'as vu récemment. Laisse passer un peu de temps.");
  if (!spendEnergy(8)) return;
  k.lastSeen = S.day;
  const gain = 6 + S.skills.social / 12;
  k.relation = clamp(k.relation + gain, 0, 100);

  const kind = contactKind(k);
  if (k.relation >= 30) {
    const obj = {};
    kind.skills.forEach(sk => obj[sk] = 0.9 + k.level / 45);
    gainSkill(obj, 1, 'mentor', k.level - 4);
    addLog(S, `Déjeuner avec ${k.name} : il te transmet ce qu'il sait (${kind.skills.map(skillName).join(', ')}).`, 'good');
  } else {
    addLog(S, `Tu revois ${k.name}. La relation se construit (${Math.round(k.relation)}/100).`, 'info');
  }
  render();
}

function askFavor(id) {
  const k = S.contacts.find(x => x.id === id);
  if (!k || k.relation < 45) return toast("Votre relation n'est pas assez solide pour ça.");
  if (!spendEnergy(6)) return;
  k.relation = clamp(k.relation - 18, 0, 100);
  k.favors++;
  const kind = contactKind(k);
  const c = biggest(S);

  if (kind.id === 'investor' && c) {
    const cash = Math.round(valuation(c) * 0.1 * (0.6 + k.level / 100));
    c.equity -= 0.08; c.cash += cash;
    addLog(S, `${k.name} investit ${fmt(cash)} dans ${c.name} contre 8%.`, 'good');
  } else if (kind.id === 'recruiter' && c) {
    const cand = makeCandidate(pick(ROLES).id, 0.5 + k.level / 200);
    cand.revealed = true; c.applicants.push(cand);
    addLog(S, `${k.name} t'envoie ${cand.name}, niveau ${cand.skill}.`, 'good');
  } else if (kind.id === 'client' && c) {
    const n = Math.max(1, Math.round(capacity(c) * 0.1 * (k.level / 60)));
    c.clients += n;
    addLog(S, `${k.name} te signe ${n} client${n > 1 ? 's' : ''} chez ${c.name}.`, 'good');
  } else if (kind.id === 'closer' && c) {
    c.loyalty = (c.loyalty || 1) * 1.08;
    addLog(S, `${k.name} forme ton équipe commerciale. Tes clients restent plus longtemps.`, 'good');
  } else if (kind.id === 'cto' && c) {
    c.quality = clamp(c.quality + 8 + k.level / 12, 0, 100);
    addLog(S, `${k.name} audite ton produit et corrige ce qui coince.`, 'good');
  } else if (kind.id === 'marketer' && c) {
    c.stock.organic = (c.stock.organic || 0) + 0.6;
    addLog(S, `${k.name} refait ta stratégie de contenu. L'organique décolle.`, 'good');
  } else {
    S.reputation = clamp(S.reputation + 6, 0, 100);
    addLog(S, `${k.name} parle de toi en bien autour de lui.`, 'good');
  }
  render();
}

/* ================= Entreprises ================= */

function foundCompany(typeId, name) {
  const t = BUSINESS_TYPES.find(x => x.id === typeId);
  let cost = t.cost;
  if (t.id === 'saas' && S.flags.includes('builder')) cost = Math.round(cost / 2);
  if (Object.entries(t.req || {}).some(([k, v]) => S.skills[k] < v)) return toast("Compétences insuffisantes.");
  if (S.money < cost) return toast("Capital insuffisant.");
  if (!spendEnergy(10)) return;
  S.money -= cost;
  const c = createCompany(t, name && name.trim() ? name.trim() : t.name);
  seedRivals(c);
  c.cash = Math.round(cost * 0.4);
  c.budgets.paid = Math.round(t.fixedCost * 0.35);
  c.budgets.organic = Math.round(t.fixedCost * 0.15);
  S.companies.push(c);
  setPlan('biz', 3, c.uid, 'sales');
  addLog(S, `Création de « ${c.name} » (${fmt(cost)} investis). Alloue-lui des heures et ouvre des postes.`, 'good');
  render();
}

function setBudget(uid, channel, value) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  c.budgets[channel] = Math.max(0, Math.round(value));
}
function setCompanyField(uid, field, value) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  c[field] = value;
  render();
}

function upgradeCompany(uid) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const t = getType(c);
  const cost = Math.round(t.upgradeCost * Math.pow(1.55, c.level - 1));
  if (c.cash < cost) return toast(`Il faut ${fmt(cost)} en trésorerie d'entreprise.`);
  c.cash -= cost; c.level++;
  addLog(S, `${c.name} passe au niveau ${c.level} : capacité augmentée.`, 'good');
  render();
}

function transfer(uid, amount) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  amount = Math.round(amount);
  if (amount > 0) {
    const a = Math.min(amount, Math.floor(c.cash));
    if (a <= 0) return toast("Trésorerie vide.");
    c.cash -= a;
    const flat = Math.max(0.22, 0.3 - S.skills.finance / 700);
    const net = Math.round(a * c.equity * (1 - flat));
    S.money += net;
    addLog(S, `${c.name} : ${fmt(a)} de dividendes, ${fmt(net)} nets.`, 'info');
  } else {
    const a = Math.min(-amount, Math.floor(S.money));
    if (a <= 0) return toast("Pas assez d'argent personnel.");
    S.money -= a; c.cash += a;
    addLog(S, `${c.name} : apport de ${fmt(a)}.`, 'info');
  }
  render();
}

function sellCompany(uid) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const price = Math.round((valuation(c) + c.cash) * c.equity);
  S.money += price;
  S.exits.push({ name: c.name, price, day: S.day });
  S.companies = S.companies.filter(x => x.uid !== uid);
  S.plan = S.plan.filter(p => !(p.act === 'biz' && p.ref === uid));
  S.reputation = clamp(S.reputation + 6, 0, 100);
  addLog(S, `Cession de ${c.name} pour ${fmt(price)}.`, 'good');
  render();
}

function raiseFunds(uid) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  if (c.investorAngry) return toast("Ton investisseur actuel bloque toute nouvelle opération.");
  if (c.lastProfit <= 0 && c.clients < 10) return toast("Aucun investisseur ne suivra avec ces chiffres.");
  const pct = 0.18;
  const bonus = S.flags.includes('connected') ? 1.25 : 1;
  const cash = Math.round(valuation(c) * pct * bonus * (0.8 + S.skills.finance / 200));
  if (c.equity - pct < 0.15) return toast("Tu ne peux pas descendre sous 15% du capital.");
  c.equity -= pct; c.cash += cash;
  addLog(S, `Levée sur ${c.name} : ${fmt(cash)} contre ${Math.round(pct * 100)}% (tu gardes ${Math.round(c.equity * 100)}%).`, 'good');
  render();
}

/* ----- Recrutement ----- */

function openPosition(uid, roleId, salary) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  c.openings[roleId] = { salary: Math.round(salary) };
  addLog(S, `${c.name} : poste de ${getRole(roleId).name.toLowerCase()} ouvert à ${fmt(salary)}.`, 'info');
  render();
}

function closePosition(uid, roleId) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  delete c.openings[roleId];
  render();
}

function interview(uid, candId) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const cand = c.applicants.find(a => a.id === candId);
  if (!cand || cand.revealed) return;
  if (!spendEnergy(7)) return;
  cand.revealed = true;
  addLog(S, `Entretien avec ${cand.name} : niveau réel ${cand.skill}, ${getTrait(cand.trait).name.toLowerCase()}.`, 'info');
  render();
}

function hireCandidate(uid, candId) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const cand = c.applicants.find(a => a.id === candId);
  if (!cand) return;
  const firstMonth = cand.ask * 1.5;
  if (c.cash < firstMonth) return toast(`Il faut ${fmt(firstMonth)} en trésorerie pour couvrir l'embauche.`);
  c.cash -= Math.round(cand.ask * 0.5);
  c.staff.push(hireFrom(cand));
  c.applicants = c.applicants.filter(a => a.id !== candId);
  addLog(S, `${c.name} recrute ${cand.name} (${getRole(cand.role).name}, niveau ${cand.skill}) à ${fmt(cand.ask)}.`, 'good');
  render();
}

function negotiate(uid, candId) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const cand = c.applicants.find(a => a.id === candId);
  if (!cand || cand.negotiated) return;
  if (!spendEnergy(5)) return;
  cand.negotiated = true;
  const power = S.skills.social + S.skills.business / 2;
  if (Math.random() < 0.3 + power / 220) {
    const cut = 0.06 + power / 900;
    cand.ask = Math.round(cand.ask * (1 - cut) / 50) * 50;
    addLog(S, `${cand.name} accepte de descendre à ${fmt(cand.ask)}.`, 'good');
  } else {
    cand.morale = clamp(cand.morale - 12, 0, 100);
    if (Math.random() < 0.3) {
      c.applicants = c.applicants.filter(a => a.id !== candId);
      addLog(S, `${cand.name} se vexe et retire sa candidature.`, 'bad');
    } else addLog(S, `${cand.name} ne bouge pas sur son salaire.`, 'warn');
  }
  render();
}

function fireStaff(uid, staffId) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const e = c.staff.find(x => x.id === staffId);
  if (!e) return;
  c.cash -= e.salary * 2;
  c.staff = c.staff.filter(x => x !== e);
  c.staff.forEach(x => x.morale = clamp(x.morale - 6, 0, 100));
  addLog(S, `${c.name} : ${e.name} est licencié (2 mois d'indemnités).`, 'warn');
  render();
}

function raiseSalary(uid, staffId) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const e = c.staff.find(x => x.id === staffId);
  if (!e) return;
  e.salary = Math.round(e.salary * 1.12);
  e.morale = clamp(e.morale + 20, 0, 100);
  addLog(S, `${e.name} passe à ${fmt(e.salary)}.`, 'info');
  render();
}

function useHeadhunter(uid, roleId) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const role = getRole(roleId);
  const price = Math.round(role.salary * 3 * S.wageIndex);
  if (S.money < price) return toast(`Le cabinet demande ${fmt(price)}.`);
  S.money -= price;
  for (let i = 0; i < 3; i++) {
    const cand = makeCandidate(roleId, rand(0.55, 0.9));
    cand.revealed = true;
    c.applicants.push(cand);
  }
  addLog(S, `Cabinet de recrutement payé ${fmt(price)} : trois profils évalués arrivent chez ${c.name}.`, 'good');
  render();
}

/* ================= Placements & banque ================= */

function buyAsset(id, amount) {
  const price = S.prices[id];
  amount = Math.round(amount);
  if (amount <= 0) return;
  if (S.money < amount) return toast("Pas assez d'argent.");
  S.money -= amount;
  S.portfolio[id] = (S.portfolio[id] || 0) + amount / price;
  addLog(S, `Investissement de ${fmt(amount)} en ${ASSETS.find(a => a.id === id).name}.`, 'info');
  render();
}
function sellAsset(id, amount) {
  const price = S.prices[id];
  const held = (S.portfolio[id] || 0) * price;
  const a = Math.min(amount, held);
  if (a <= 0) return toast("Tu ne détiens rien sur cette ligne.");
  S.portfolio[id] -= a / price;
  if (S.portfolio[id] < 0.0001) delete S.portfolio[id];
  S.money += a;
  addLog(S, `Vente de ${fmt(a)} en ${ASSETS.find(x => x.id === id).name}.`, 'info');
  render();
}
function borrow(amount) {
  const maxDebt = debtCeiling(S);
  if (S.debt + amount > maxDebt) return toast(`La banque refuse : plafond à ${fmt(maxDebt)}.`);
  S.debt += amount; S.money += amount;
  addLog(S, `Emprunt de ${fmt(amount)} accordé.`, 'warn');
  render();
}
function repay(amount) {
  const a = Math.min(amount, S.debt, S.money);
  if (a <= 0) return toast("Rien à rembourser.");
  S.debt -= a; S.money -= a;
  addLog(S, `Remboursement de ${fmt(a)}. Dette restante : ${fmt(S.debt)}.`, 'info');
  render();
}

/* =========================================================
   LE TICK JOURNALIER
   ========================================================= */

function tick() {
  if (S.over) return false;
  const D = DAYS_PER_MONTH;
  let dayIncome = 0, dayOutcome = 0;

  const hours = {};
  S.plan.forEach(p => hours[p.act] = (hours[p.act] || 0) + p.hours);
  const totalHours = plannedHours();

  /* ---------- Emploi salarié ---------- */
  if (S.job) {
    const need = S.job.hours;
    const done = hours.job || 0;
    const ratio = clamp(done / need, 0, 1);
    dayIncome += (S.job.salary / D) * (0.35 + 0.65 * ratio);
    gainSkill(S.job.gain, ratio / D * 3, 'field');
    S.jobDays++;
    if (ratio < 0.75) {
      S.jobWarnings++;
      if (S.jobWarnings === 20) addLog(S, `Ton employeur te fait une remarque sur ton implication.`, 'warn');
      if (S.jobWarnings > 55) {
        addLog(S, `Licenciement : tu n'assurais plus ton poste de ${S.job.name}.`, 'bad');
        S.job = null; S.jobWarnings = 0;
        S.plan = S.plan.filter(p => p.act !== 'job');
      }
    } else if (S.jobWarnings > 0) S.jobWarnings--;
    if (S.job && S.jobDays % 420 === 0) {
      S.job.salary = Math.round(S.job.salary * 1.06);
      addLog(S, `Augmentation : ton salaire passe à ${fmt(S.job.salary)}.`, 'good');
    }
  }

  /* ---------- Formation ---------- */
  if (S.training) {
    const t = TRAININGS.find(x => x.id === S.training.id);
    const h = hours.study || 0;
    if (h > 0) {
      S.training.progress += h / 3;
      const done = clamp(S.training.progress / t.days, 0, 1);
      gainSkill(t.gain, (h / 3) / t.days, t.source);
      if (S.training.progress >= t.days) {
        addLog(S, `Formation terminée : ${t.name}.`, 'good');
        S.doneTrainings.push(t.id);
        if (t.contacts) for (let i = 0; i < t.contacts; i++) S.contacts.push(makeContact(45));
        S.training = null;
        S.plan = S.plan.filter(p => p.act !== 'study');
      }
    }
  }

  /* ---------- Sport, vie sociale, réseau ---------- */
  if (hours.sport) {
    S.health = clamp(S.health + hours.sport * 0.10, 0, 100);
    S.maxEnergy = clamp(S.maxEnergy + hours.sport * 0.008, 60, 130);
    addHappiness(hours.sport * 0.05);
  }
  if (hours.social) {
    addHappiness(hours.social * 0.32);
    S.money -= hours.social * 8;
    dayOutcome += hours.social * 8;
  }
  if (hours.family) {
    // du temps donné aux siens repose autant qu'il coûte
    S.energy = clamp(S.energy + hours.family * 0.25, 0, S.maxEnergy);
  }
  if (hours.network) {
    gainSkill({ social: hours.network * 0.05 }, 1, 'field');
    S.reputation = clamp(S.reputation + hours.network * 0.012, 0, 100);
    // rencontrer quelqu'un de nouveau
    const chance = hours.network * 0.006 * (1 + S.reputation / 120);
    if (Math.random() < chance && S.contacts.length < 14) {
      const k = makeContact(15 + S.reputation / 2.2);
      S.contacts.push(k);
      addLog(S, `Tu rencontres ${k.name} — ${contactKind(k).name.toLowerCase()}, niveau ${k.level}.`, 'good');
    }
  }

  /* ---------- Entreprises ---------- */
  S.companies.forEach(c => {
    const t = getType(c);
    c.days++;

    if (c.blocked) { c.blocked.days--; if (c.blocked.days <= 0) { addLog(S, `${c.name} : le canal ${getChannel(c.blocked.channel).name.toLowerCase()} est rétabli.`, 'good'); c.blocked = null; } }
    if (c.channelBoost) { c.channelBoost.days--; if (c.channelBoost.days <= 0) c.channelBoost = null; }

    // Montée en charge des canaux : le budget mis aujourd'hui met des
    // semaines à porter, et s'éteint aussi progressivement si on coupe.
    CHANNELS.forEach(ch => {
      const target = (c.budgets[ch.id] || 0) / D;
      const speed = 1 / ch.rampDays;
      c.stock[ch.id] = (c.stock[ch.id] || 0) + (target - (c.stock[ch.id] || 0)) * speed;
    });

    // clients
    const acq = dailyAcquisition(c);
    const churn = dailyChurn(c);
    c.clients = Math.max(0, c.clients * (1 - churn) + acq);
    c.clients = Math.min(c.clients, capacity(c) * 1.2, marketSize(c));

    // qualité : R&D, équipe produit, fondateur ; se dégrade sinon
    // Un produit qu'on n'entretient plus vieillit, mais il reste utilisable :
    // la qualité redescend vers un plancher, pas vers zéro.
    let q = -0.055 * clamp((c.quality - 18) / 70, 0, 1.4);
    q += roleForce(c, 'product') * 0.085;
    q += (c.rd / Math.max(120, t.fixedCost)) * 0.18;   // un budget R&D égal aux charges fixes ≈ +5 qualité/mois
    const founder = planEntry('biz', c.uid);
    if (founder && founder.role === 'product') {
      const skill = (S.skills.tech + S.skills.business) / 2;
      q += (0.05 + skill / 900) * founder.hours * efficiency();
    }
    if (c.clients > capacity(c)) q -= 0.12;
    if (c.debtTech) q -= 0.02 * c.debtTech;
    c.quality = clamp(c.quality + q, 0, 100);

    if (c.hype > 1) c.hype = Math.max(1, c.hype - 0.002);

    // comptes
    const revenue = projectedRevenue(c) / D;
    const costs = projectedCosts(c) / D;
    const taxRate = Math.max(0.18, 0.25 - S.skills.finance / 800);
    let profit = revenue - costs;
    if (profit > 0) profit *= (1 - taxRate);
    c.lastRevenue = revenue * D;
    c.lastCosts = costs * D;
    c.lastProfit = profit * D;
    c.cash += profit;

    // Moyennes glissantes sur environ six mois : c'est ce que regarde
    // un repreneur, et cela évite que la valorisation saute chaque jour.
    const k = 1 / 180;
    c.avgRevenue = c.avgRevenue === undefined ? c.lastRevenue : c.avgRevenue + (c.lastRevenue - c.avgRevenue) * k;
    c.avgProfit = c.avgProfit === undefined ? c.lastProfit : c.avgProfit + (c.lastProfit - c.avgProfit) * k;

    // Photo mensuelle des comptes, pour l'onglet Finances
    if (c.days % 30 === 0) {
      const tt = getType(c);
      c.history.push({
        d: S.day,
        rev: c.lastRevenue,
        cost: c.lastCosts,
        profit: c.lastProfit,
        clients: Math.round(c.clients),
        cash: Math.round(c.cash),
        staff: c.staff.length,
        ads: adSpendMonthly(c),
        payroll: payrollMonthly(c),
        fixed: tt.fixedCost * Math.pow(c.level, 1.35),
        variable: c.lastRevenue * tt.varCost * (c.costMod || 1)
      });
      if (c.history.length > 600) c.history.shift();
    }

    // Croissance annualisée du chiffre d'affaires, elle aussi lissée
    if (c.days % 30 === 0) {
      const prev = c.revenueAgo || c.lastRevenue;
      const g = prev > 0 ? (c.lastRevenue - prev) / prev * 12 : 0;
      c.growth = c.growth === undefined ? g : c.growth + (g - c.growth) * 0.25;
      c.revenueAgo = c.lastRevenue;
    }

    // aléa sectoriel
    if (Math.random() < t.risk * 0.0035) {
      c.clients *= rand(0.7, 0.9);
      addLog(S, `${c.name} : coup dur sectoriel, perte de clients.`, 'bad');
    }

    tickStaff(c);
    tickRecruiting(c);
    tickRivals(c);

    // trésorerie négative
    if (c.cash < 0) {
      // On ne paie pas des campagnes avec de l'argent qu'on n'a pas :
      // les budgets se coupent d'eux-mêmes, un peu plus chaque jour.
      CHANNELS.forEach(ch => c.budgets[ch.id] = Math.round((c.budgets[ch.id] || 0) * 0.9));
      c.rd = Math.round(c.rd * 0.92);
      c.support = Math.round(c.support * 0.95);
      c.negDays++;
      if (c.negDays === 1) addLog(S, `⚠️ ${c.name} est en trésorerie négative. Injecte du cash ou réduis les coûts.`, 'warn');
      if (c.negDays === 45) addLog(S, `⚠️ ${c.name} : encore 45 jours avant le dépôt de bilan.`, 'warn');
      if (c.negDays >= 90) {
        addLog(S, `💀 ${c.name} dépose le bilan. Tout est perdu.`, 'bad');
        addHappiness(-14);
        S.reputation = clamp(S.reputation - 6, 0, 100);
        S.companies = S.companies.filter(x => x.uid !== c.uid);
        S.plan = S.plan.filter(p => !(p.act === 'biz' && p.ref === c.uid));
      }
    } else c.negDays = 0;
  });

  /* ---------- Coût de vie, dettes ---------- */
  const life = (totalLifeCost(S) + luxuryUpkeep(S)) / D;
  dayOutcome += life;
  if (S.debt > 0) {
    const interest = S.debt * CONFIG.debtInterest * Math.max(0.7, 1 - S.skills.finance / 300);
    const principal = Math.min(S.debt, Math.max(200 / D, S.debt * 0.012 / D));
    S.debt = Math.max(0, S.debt - principal);
    dayOutcome += interest + principal;
  }
  S.money += dayIncome - dayOutcome;

  /* ---------- Placements ---------- */
  const immo = ASSETS.find(a => a.id === 'immobilier');
  if (S.portfolio.immobilier) S.money += S.portfolio.immobilier * S.prices.immobilier * immo.yield;
  ASSETS.forEach(a => {
    const shock = (S.marketMood - 1) * 0.008;
    const move = a.drift + shock * (a.vol > 0.003 ? 1 : 0.2) + (Math.random() * 2 - 1) * a.vol;
    S.prices[a.id] = Math.max(5, S.prices[a.id] * (1 + move));
  });

  /* ---------- Filet familial / découvert ---------- */
  if (S.money < 0 && S.flags.includes('safetynet')) {
    S.money += 1500;
    S.flags = S.flags.filter(f => f !== 'safetynet');
    addLog(S, "Tes parents t'avancent 1 500€. Une seule fois, ils te l'ont dit.", 'info');
  }
  if (S.money < 0) {
    const need = -S.money;
    S.debt += need * 1.05;
    S.money = 0;
    if (S.day % 30 === 0) addLog(S, `Découvert converti en dette bancaire (${fmt(need)}).`, 'bad');
    addHappiness(-0.15);
  }

  /* ---------- Énergie, moral, santé ---------- */
  const h = housing(S);
  const strain = ((S.job ? (hours.job || 0) * S.job.strain : 0)
    + (hours.biz || 0) * 1.05 + (hours.study || 0) * 0.85 + (hours.network || 0) * 0.7) * 0.62;
  const freeHours = Math.max(0, maxHours() - totalHours);
  const recovery = (6 + freeHours * 0.9 + (hours.sport || 0) * 0.5) * h.rest * (0.7 + S.health / 300);
  S.energy = clamp(S.energy + recovery - strain, 0, S.maxEnergy);

  let mood = (h.happy * 0.4 - 0.7) / D;
  if (S.flags.includes('couple')) mood += 1.2 / D;
  if (S.energy < 30) mood -= 3 / D;
  if (netWorth(S) > 300000) mood += 0.6 / D;
  if (S.job && !S.companies.length) mood -= 0.4 / D;
  if (monthlyBusinessProfit(S) > 3000) mood += 0.8 / D;
  if (S.companies.some(c => c.cash < 0)) mood -= 1.5 / D;
  addHappiness(mood);

  let hp = 0;
  if (S.energy < 25) hp -= 2.2 / D;
  if (totalHours > CONFIG.baseHours + 2) hp -= (totalHours - CONFIG.baseHours - 2) * 0.035;
  if (S.age > 40) hp -= 0.25 / D;
  if (S.age > 55) hp -= 0.35 / D;
  if (S.happiness > 70) hp += 0.4 / D;
  S.health = clamp(S.health + hp, 0, 100);

  S.marketMood += (1 - S.marketMood) * 0.008;
  if (S.contrarian) { S.contrarian--; if (!S.contrarian) S.companies.forEach(c => c.hype = 1.1); }

  tickFamily(S);

  /* ---------- Objectifs, temps, fin ---------- */
  GOALS.forEach(g => {
    if (!S.goals.includes(g.id) && g.check(S)) {
      S.goals.push(g.id);
      addLog(S, `🏆 Objectif atteint : ${g.name}`, 'good');
    }
  });

  S.day++;
  S.age = CONFIG.startAge + Math.floor(S.day / DAYS_PER_YEAR);
  if (S.day % 7 === 0 || S.calendar.length < 4) refreshCalendar();
  if (S.day % 30 === 0) {
    S.history.push({ d: S.day, nw: Math.round(netWorth(S)) });
    if (S.history.length > 700) S.history.shift();
  }

  if (S.health <= 0) { gameOver("Ton corps a lâché. Tu as gagné de l'argent et perdu le reste."); return false; }
  if (S.money <= 0 && netWorth(S) < CONFIG.bankruptcyLimit) { gameOver("Faillite personnelle. Les dettes ont eu le dernier mot."); return false; }
  if (S.age >= CONFIG.retireAge) { gameOver("Tu prends ta retraite. L'heure du bilan."); return false; }

  return true;
}

/* ---------- Vie de l'équipe ---------- */

function tickStaff(c) {
  const span = spanOfControl(c);
  const over = Math.max(0, c.staff.length - span);
  const founder = planEntry('biz', c.uid);
  const managed = founder && founder.role === 'manage';
  const toxic = c.staff.filter(e => e.trait === 'toxique').length;

  c.staff.forEach(e => {
    const t = getTrait(e.trait);
    e.days++;

    // le salaire face au marché est le premier moteur du moral
    const fair = marketSalary(e.role, e.skill) * S.wageIndex;
    const payGap = clamp((e.salary / fair - 1) * 60, -35, 30);
    let target = 55 + payGap + (e.equity ? 25 : 0) + (c.payMod - 1) * 40;
    target -= over * 3.5;
    target -= toxic * 4;
    if (managed) target += 10;
    if (c.staff.some(x => x.role === 'manager' && x !== e)) target += 6;
    target += (c.quality - 50) / 8;

    e.morale = clamp(e.morale + (target - e.morale) * 0.02 + t.morale, 0, 100);

    // montée en compétence sur le terrain
    if (e.morale > 45) e.skill = clamp(e.skill + (t.id === 'debutant' ? 0.022 : 0.008) * (1 - e.skill / 100), 0, 100);

    // démission
    if (e.morale < 22) {
      const p = (22 - e.morale) * 0.0012;
      if (Math.random() < p) {
        c.staff = c.staff.filter(x => x !== e);
        addLog(S, `${e.name} démissionne de ${c.name}. Moral au plus bas depuis des semaines.`, 'bad');
      }
    }
  });
}

/* ---------- Marché du travail ---------- */

function tickRecruiting(c) {
  Object.entries(c.openings).forEach(([roleId, o]) => {
    const ref = marketSalary(roleId, 50) * S.wageIndex;
    const attractive = clamp(o.salary / ref, 0.4, 2.2);
    const fame = 1 + S.reputation / 150 + Math.min(0.5, c.clients / Math.max(1, marketSize(c)));
    const p = 0.045 * attractive * fame;
    if (Math.random() < p) {
      const quality = clamp((attractive - 0.6) / 1.3 + rand(-0.15, 0.15), 0.02, 0.98);
      const cand = makeCandidate(roleId, quality);
      // un candidat ne postule pas s'il demande beaucoup plus que l'offre
      if (cand.ask <= o.salary * 1.25) {
        cand.ask = Math.min(cand.ask, Math.round(o.salary * 1.1));
        c.applicants.push(cand);
        if (c.applicants.length > 12) c.applicants.shift();
      }
    }
  });
  // les candidats ne patientent pas éternellement
  c.applicants.forEach(a => a.waited++);
  const gone = c.applicants.filter(a => a.waited > 45);
  if (gone.length) {
    c.applicants = c.applicants.filter(a => a.waited <= 45);
    if (gone.some(g => g.revealed && g.skill > 65)) addLog(S, `${c.name} : un bon candidat s'est lassé d'attendre ta réponse.`, 'warn');
  }
}

/* ================= Avance du temps ================= */

function advance(days) {
  if (S.over || S.scene) return;
  for (let i = 0; i < days; i++) {
    if (!tick()) return;

    // un événement auquel tu es inscrit a lieu aujourd'hui
    const today = S.calendar.find(e => e.signed && !e.done && e.day === S.day);
    if (today) { save(); return promptEvent(today); }

    const evt = rollEvent();
    if (evt) { save(); return showEvent(evt); }
  }
  save();
  render();
}

function rollEvent() {
  // Certaines choses n'attendent pas le tirage au sort
  if (S.forcedEvent) {
    const forced = EVENTS.find(e => e.id === S.forcedEvent);
    S.forcedEvent = null;
    if (forced) {
      if (forced.dynamic) {
        const d = forced.dynamic(S);
        if (d) { forced._text = d.text; forced._ref = d.ref; return forced; }
      } else { forced._text = forced.text; forced._ref = null; return forced; }
    }
  }
  if (Math.random() > CONFIG.eventChance) return null;
  const pool = EVENTS.filter(e => {
    // Un événement ponctuel n'arrive qu'une fois ; un événement récurrent
    // (crise, tension sur les salaires…) ne peut pas revenir tous les mois.
    if (!e.global && S.seen[e.id]) return false;
    if (e.global) {
      const last = S.seenAt[e.id];
      const cooldown = e.cooldown || 900;
      if (last !== undefined && S.day - last < cooldown) return false;
    }
    try { return e.cond(S); } catch (_) { return false; }
  });
  if (!pool.length) return null;
  const e = pick(pool);
  if (e.dynamic) {
    const d = e.dynamic(S);
    if (!d) return null;
    e._text = d.text;
    e._ref = d.ref;
  } else { e._text = e.text; e._ref = null; }
  S.seen[e.id] = true;
  S.seenAt[e.id] = S.day;
  return e;
}

function resolveChoice(evt, index) {
  const ch = evt.choices[index];
  const eff = ch.effects || {};

  if (eff.money) S.money += eff.money;
  if (eff.debt) S.debt += eff.debt;
  if (eff.energy) S.energy = clamp(S.energy + eff.energy, 0, S.maxEnergy);
  if (eff.health) S.health = clamp(S.health + eff.health, 0, 100);
  if (eff.happiness) addHappiness(eff.happiness);
  if (eff.reputation) S.reputation = clamp(S.reputation + eff.reputation, 0, 100);
  if (ch.flag && !S.flags.includes(ch.flag)) S.flags.push(ch.flag);
  addLog(S, `${evt.title} → ${ch.label}`, 'info');
  if (ch.custom) ch.custom(S, evt._ref);

  PENDING = null;
  save();
  render();
}

function gameOver(reason) {
  S.over = true;
  S.overReason = reason;
  save();
  renderGameOver();
}

/* ================= Sauvegarde ================= */

function save() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (_) {}
}
function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    S = JSON.parse(raw);
    return S;
  } catch (_) { return null; }
}
function wipe() {
  localStorage.removeItem(SAVE_KEY);
  S = null; PENDING = null;
}

function skillName(k) {
  return { business: 'Business', marketing: 'Marketing', tech: 'Tech', social: 'Social', finance: 'Finance' }[k];
}

/* =========================================================
   VIE SOCIALE — calendrier, sorties, luxe, soirées
   ========================================================= */

/* ---------- Calendrier ---------- */

// Garde toujours une soixantaine de jours d'événements devant soi.
function refreshCalendar() {
  S.calendar = S.calendar.filter(e => e.day >= S.day);
  const horizon = S.day + 75;
  let last = S.calendar.length ? Math.max(...S.calendar.map(e => e.day)) : S.day + 2;
  while (last < horizon) {
    last += Math.round(rand(4, 11));
    const pool = VENUES.filter(v => {
      const rep = (v.req.reputation || 0) <= S.reputation + 12;
      return rep;
    });
    if (!pool.length) break;
    const v = pick(pool);
    S.calendar.push({
      uid: 'e' + Math.random().toString(36).slice(2, 8),
      venue: v.id,
      day: last,
      signed: false
    });
  }
  S.calendar.sort((a, b) => a.day - b.day);
}

function getVenue(id) { return VENUES.find(v => v.id === id); }
function getParty(id) { return PARTIES.find(p => p.id === id); }
function getLuxury(id) { return LUXURY.find(l => l.id === id); }

function venueOpen(v) {
  return Object.entries(v.req || {}).every(([k, val]) =>
    k === 'reputation' ? S.reputation >= val : S.skills[k] >= val);
}

function signUp(uid) {
  const e = S.calendar.find(x => x.uid === uid);
  if (!e) return;
  const v = getVenue(e.venue);
  if (!venueOpen(v)) return toast("Tu n'as pas le profil pour entrer.");
  if (S.money < v.cost) return toast("Tu n'as pas de quoi payer l'entrée.");
  e.signed = !e.signed;
  if (e.signed) addLog(S, `Inscrit : ${v.name}, dans ${e.day - S.day} jours.`, 'info');
  render();
}

/* ---------- Se rendre à un événement ---------- */

function openScene(kind, id) {
  const def = kind === 'party' ? getParty(id) : getVenue(id);
  const guests = [];
  const n = def.crowd;

  // placement en cercle irrégulier pour éviter la grille
  for (let i = 0; i < n; i++) {
    const g = makeGuest(def.prestige);
    const a = (i / n) * Math.PI * 2 + rand(-0.25, 0.25);
    const r = rand(24, 34);
    g.x = clamp(50 + Math.cos(a) * r * 1.15, 12, 88);
    g.y = clamp(52 + Math.sin(a) * r * 0.85, 20, 84);
    guests.push(g);
  }
  // on croise parfois une connaissance
  if (S.contacts.length && Math.random() < 0.45) {
    const k = pick(S.contacts);
    const g = guests[0];
    g.name = k.name; g.look = k.look || lookFor(k.id);
    g.known = k.id; g.level = k.level;
  }

  S.scene = {
    kind, id,
    room: def.room,
    title: def.name,
    guests,
    talked: 0,
    log: [],
    prestige: def.prestige
  };
  save();
  renderScene();
}

function attendEvent(uid) {
  const e = S.calendar.find(x => x.uid === uid);
  if (!e) return;
  const v = getVenue(e.venue);
  if (S.money < v.cost) return toast("Tu n'as pas de quoi payer l'entrée.");
  if (S.energy < v.hours * 3) return toast("Tu es trop épuisé pour y aller.");
  S.money -= v.cost;
  S.energy = clamp(S.energy - v.hours * 3, 0, S.maxEnergy);
  e.done = true;
  e.signed = false;
  addLog(S, `Tu te rends à « ${v.name} »${v.cost ? ` (${fmt(v.cost)})` : ''}.`, 'info');
  openScene('venue', v.id);
}

function throwParty(id) {
  const p = getParty(id);
  if (S.money < p.cost) return toast("Cette soirée dépasse tes moyens.");
  if (housingTier(S) < p.minHousing) return toast("Ton logement actuel ne permet pas de recevoir autant de monde.");
  if (S.energy < p.hours * 3) return toast("Tu n'as plus l'énergie d'organiser ça.");
  S.money -= p.cost;
  S.energy = clamp(S.energy - p.hours * 3, 0, S.maxEnergy);
  S.partyCount++;
  addHappiness(p.happy);
  S.reputation = clamp(S.reputation + p.rep, 0, 100);
  if (p.staffMorale) {
    S.companies.forEach(c => c.staff.forEach(e => e.morale = clamp(e.morale + p.staffMorale, 0, 100)));
    addLog(S, `Toutes tes équipes repartent gonflées à bloc.`, 'good');
  }
  addLog(S, `Tu organises : ${p.name} (${fmt(p.cost)}).`, 'good');
  openScene('party', p.id);
}

function leaveScene() {
  const sc = S.scene;
  if (sc) addLog(S, `Tu rentres. ${sc.talked} conversation${sc.talked > 1 ? 's' : ''} ce soir-là.`, 'info');
  S.scene = null;
  save();
  render();
}

/* ---------- Conversations ---------- */

// Chance de réussite d'une approche : ta compétence contre le niveau
// de l'interlocuteur, ajustée par ta réputation et ta forme du moment.
function approachOdds(guest, approach) {
  const skill = S.skills[approach.skill];
  const base = 0.16 + (skill + approach.bonus) / 130;
  const gap = (guest.level - skill) / 190;
  const rep = S.reputation / 320;
  const shape = (S.energy / S.maxEnergy - 0.5) * 0.12 + (S.happiness / 100 - 0.5) * 0.08;
  return clamp(base - gap + rep + shape + guest.mood * 0.12, 0.05, 0.94);
}

function talkTo(guestId, approachId) {
  const sc = S.scene;
  if (!sc) return;
  const g = sc.guests.find(x => x.id === guestId);
  if (!g || g.talked) return;
  const ap = APPROACHES.find(a => a.id === approachId);
  const odds = approachOdds(g, ap);
  const win = Math.random() < odds;
  g.talked = true;
  sc.talked++;

  const t = guestType(g);
  let outcome = win ? ap.win : ap.lose;
  let reward = '';

  if (win) {
    gainSkill({ social: 0.35 }, 1, 'field');
    switch (t.gives) {
      case 'contact': {
        const k = makeContact(Math.max(15, g.level - 15));
        k.name = g.name; k.level = g.level; k.look = g.look;
        k.relation = clamp(22 + S.skills.social / 5, 0, 60);
        S.contacts.push(k);
        reward = `${g.name} entre dans ton carnet d'adresses.`;
        break;
      }
      case 'money': {
        const c = biggest(S);
        if (c && c.equity > 0.35) {
          const cash = Math.round(valuation(c) * 0.09 * (0.5 + g.level / 110));
          c.equity -= 0.07; c.cash += cash;
          reward = `Il investit ${fmt(cash)} dans ${c.name} contre 7% du capital.`;
        } else {
          const k = makeContact(g.level); k.name = g.name; k.kind = 'investor'; k.look = g.look; k.relation = 30;
          S.contacts.push(k);
          reward = `Pas de deal ce soir, mais il te laisse son numéro.`;
        }
        break;
      }
      case 'clients': {
        const c = biggest(S);
        if (c) {
          const n = Math.max(1, Math.round(capacity(c) * 0.1 * (0.5 + g.level / 100)));
          c.clients += n;
          reward = `${n} nouveau${n > 1 ? 'x' : ''} client${n > 1 ? 's' : ''} pour ${c.name}.`;
        } else {
          S.reputation = clamp(S.reputation + 3, 0, 100);
          reward = `Il retient ton nom pour le jour où tu auras quelque chose à vendre.`;
        }
        break;
      }
      case 'candidate': {
        const c = biggest(S);
        if (c) {
          const cand = makeCandidate(pick(ROLES).id, clamp(g.level / 100, 0.2, 0.95));
          cand.name = g.name; cand.look = g.look; cand.revealed = true;
          c.applicants.push(cand);
          reward = `${g.name} envoie sa candidature chez ${c.name} (niveau ${cand.skill}).`;
        } else {
          reward = `Il te dit de le rappeler quand tu auras une boîte à faire tourner.`;
        }
        break;
      }
      case 'reputation': {
        const r = 3 + Math.round(g.level / 12);
        S.reputation = clamp(S.reputation + r, 0, 100);
        reward = `L'article sortira le mois prochain. +${r} de réputation.`;
        break;
      }
      case 'skill': {
        const sk = pick(t.topics);
        gainSkill({ [sk]: 2 + g.level / 25 }, 1, 'mentor', g.level - 4);
        reward = `Vingt minutes de conversation valent six mois de lecture. (${skillName(sk)})`;
        break;
      }
      case 'intel': {
        const c = biggest(S);
        if (c) { c.quality = clamp(c.quality + 4, 0, 100); reward = `Ce qu'il laisse échapper sur son propre business te sert immédiatement.`; }
        else reward = `Tu apprends beaucoup sur ce marché sans rien lâcher du tien.`;
        break;
      }
      default:
        addHappiness(8);
        reward = `Une vraie bonne soirée. Ça faisait longtemps.`;
    }
  } else {
    g.mood -= 0.2;
    if (Math.random() < 0.3) S.reputation = clamp(S.reputation - 1, 0, 100);
  }

  sc.log.unshift({ name: g.name, text: outcome, reward, win });
  save();
  renderScene();
}

/* ---------- Actifs de luxe ---------- */

function buyLuxury(id) {
  const l = getLuxury(id);
  if (S.luxury.includes(id)) return toast("Tu le possèdes déjà.");
  if (S.money < l.price) return toast("Pas les moyens. Pas encore.");
  S.money -= l.price;
  S.luxury.push(id);
  S.reputation = clamp(S.reputation + l.rep, 0, 100);
  addHappiness(l.joy);
  addLog(S, `Tu t'offres : ${l.name} (${fmt(l.price)}).`, 'good');
  if (l.housing) addLog(S, `Tu peux désormais y habiter depuis l'onglet Train de vie.`, 'info');
  render();
}

function sellLuxury(id) {
  const l = getLuxury(id);
  if (!S.luxury.includes(id)) return;
  const price = Math.round(l.price * l.resale);
  S.money += price;
  S.luxury = S.luxury.filter(x => x !== id);
  S.reputation = clamp(S.reputation - Math.round(l.rep * 0.6), 0, 100);
  addHappiness(-l.joy * 0.4);
  if (S.housingId === id) S.housingId = 'appart';
  addLog(S, `Tu revends ${l.name} pour ${fmt(price)}.`, 'info');
  render();
}

function luxuryUpkeep(s) {
  return s.luxury.reduce((a, id) => a + getLuxury(id).upkeep, 0);
}
function luxuryValue(s) {
  return s.luxury.reduce((a, id) => { const l = getLuxury(id); return a + l.price * l.resale; }, 0);
}
function luxuryRep(s) {
  return s.luxury.reduce((a, id) => a + getLuxury(id).rep, 0);
}
