/* =========================================================
   EMPIRE — Moteur de jeu
   État, règles économiques, résolution du tour.
   ========================================================= */

const SAVE_KEY = 'empire_save_v1';

let S = null;          // état global de la partie
let PENDING = null;    // événement en attente de choix

/* ------------------ Helpers généraux ------------------ */

function fmt(n) {
  n = Math.round(n);
  const sign = n < 0 ? '-' : '';
  const a = Math.abs(n);
  if (a >= 1000000000) return sign + (a / 1000000000).toFixed(2).replace('.', ',') + ' Md€';
  if (a >= 1000000) return sign + (a / 1000000).toFixed(2).replace('.', ',') + ' M€';
  if (a >= 10000) return sign + Math.round(a / 1000) + ' k€';
  return sign + a.toLocaleString('fr-FR') + ' €';
}

function fmtFull(n) {
  return Math.round(n).toLocaleString('fr-FR') + ' €';
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function rand(a, b) { return a + Math.random() * (b - a); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const MONTH_NAMES = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function dateLabel(s) {
  return `${MONTH_NAMES[s.months % 12]} — ${s.age} ans`;
}

function addLog(s, text, type = 'info') {
  s.log.unshift({ month: s.months, age: s.age, text, type });
  if (s.log.length > 220) s.log.pop();
}

function getType(c) { return BUSINESS_TYPES.find(t => t.id === c.typeId); }

function biggest(s) {
  if (!s.companies.length) return null;
  return s.companies.slice().sort((a, b) => b.clients * (getType(b).revPerClient) - a.clients * (getType(a).revPerClient))[0];
}

/* ------------------ Création de partie ------------------ */

function createCompany(type, name) {
  return {
    uid: 'c' + Math.random().toString(36).slice(2, 9),
    typeId: type.id,
    name: name || type.name,
    level: 1,
    employees: 0,
    marketing: 0,
    quality: 40,
    clients: 0,
    cash: 0,
    equity: 1,
    monthsAlive: 0,
    lastRevenue: 0,
    lastCosts: 0,
    lastProfit: 0,
    negMonths: 0,
    priceMod: 1,
    salaryMod: 1,
    hype: 1,
    focus: false,
    improved: false
  };
}

function newGame(name, originId) {
  const o = ORIGINS.find(x => x.id === originId);
  S = {
    name: name || 'Alex',
    originId: o.id,
    months: 0,
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
    jobMonths: 0,
    companies: [],
    portfolio: {},          // assetId -> nombre de parts
    prices: {},             // assetId -> prix courant
    housingId: 'parents',
    lifeCost: 0,
    actions: CONFIG.actionsPerMonth,
    flags: o.flags.slice(),
    focusBonus: 0,
    marketMood: 1,
    exits: [],
    goals: [],
    log: [],
    over: false,
    overReason: '',
    history: []
  };
  ASSETS.forEach(a => S.prices[a.id] = a.price);
  addLog(S, `${S.name}, ${CONFIG.startAge} ans. ${o.name}. Tout commence maintenant.`, 'info');
  addLog(S, o.perk, 'info');
  save();
  return S;
}

/* ------------------ Calculs économiques ------------------ */

function capacity(c) {
  const t = getType(c);
  return t.capPerLevel * c.level + t.empCap * c.employees;
}

function skillMultiplier(c) {
  const t = getType(c);
  const avg = t.skill.reduce((a, k) => a + S.skills[k], 0) / t.skill.length;
  return 1 + avg / 90;
}

function projectedRevenue(c) {
  const t = getType(c);
  return c.clients * t.revPerClient * c.priceMod * S.marketMood;
}

function payroll(c) {
  const t = getType(c);
  // plus l'équipe grossit, plus elle coûte cher à coordonner
  return c.employees * t.empSalary * c.salaryMod * (1 + c.employees / 260);
}

function projectedCosts(c) {
  const t = getType(c);
  return t.fixedCost * c.level
    + payroll(c)
    + c.marketing
    + projectedRevenue(c) * t.varCost;
}

// part de marché occupée (0 → 1)
function marketShare(c) {
  const t = getType(c);
  return clamp(c.clients / t.market, 0, 1);
}

// profit mensuel net d'impôt sur les sociétés
function projectedProfit(c) {
  const p = projectedRevenue(c) - projectedCosts(c);
  return p > 0 ? p * 0.75 : p;
}

function valuation(c) {
  const t = getType(c);
  const annual = Math.max(0, projectedProfit(c)) * 12;
  const base = annual * t.multiple * (c.hype || 1);
  const clientValue = c.clients * t.revPerClient * 2.5;
  const floor = t.cost * 0.35;
  return Math.max(floor, base * 0.75 + clientValue * 0.25);
}

function monthlyBusinessProfit(s) {
  return s.companies.reduce((a, c) => a + Math.max(0, c.lastProfit) * c.equity, 0);
}

function portfolioValue(s) {
  return Object.entries(s.portfolio).reduce((a, [id, qty]) => a + qty * s.prices[id], 0);
}

function netWorth(s) {
  const comp = s.companies.reduce((a, c) => a + valuation(c) * c.equity + c.cash * c.equity, 0);
  return s.money - s.debt + comp + portfolioValue(s);
}

function housing(s) { return HOUSING.find(h => h.id === s.housingId); }

function totalLifeCost(s) {
  return housing(s).cost + (s.lifeCost || 0);
}

/* ------------------ Actions du joueur ------------------ */

function energyCost(base) {
  const mult = S.flags.includes('grinder') ? 0.75 : 1;
  return Math.round(base * mult);
}

function spend(actions, energy) {
  if (S.actions < actions) { toast("Tu n'as plus de temps ce mois-ci."); return false; }
  const e = energyCost(energy);
  if (S.energy < e) { toast("Tu es épuisé. Il te faut du repos."); return false; }
  S.actions -= actions;
  S.energy -= e;
  return true;
}

// Le bonheur a des rendements décroissants : plus tu es déjà heureux,
// moins une soirée de plus change quelque chose.
function addHappiness(v) {
  if (v > 0) v *= Math.max(0.15, 1 - S.happiness / 115);
  else if (S.flags.includes('resilient')) v *= 0.6;
  S.happiness = clamp(S.happiness + v, 0, 100);
}

function efficiency() {
  return (1 + (S.focusBonus || 0)) * (0.7 + S.energy / 330) * (0.85 + S.happiness / 660);
}

function gainSkill(obj, mult = 1) {
  const bonus = S.flags.includes('educated') ? 1.25 : 1;
  Object.entries(obj).forEach(([k, v]) => {
    // rendements décroissants : plus tu es bon, plus c'est dur de progresser
    const decay = Math.max(0.12, 1 - Math.pow(S.skills[k] / 100, 1.6));
    S.skills[k] = clamp(S.skills[k] + v * mult * bonus * efficiency() * decay, 0, 100);
  });
}

const ACTIONS = {
  overtime() {
    if (!S.job) return toast("Tu n'as pas d'emploi.");
    if (!spend(1, 18)) return;
    const bonus = Math.round(S.job.salary * 0.35);
    S.money += bonus;
    addHappiness(-3);
    addLog(S, `Heures supplémentaires : +${fmt(bonus)}.`, 'info');
    render();
  },
  network() {
    if (!spend(1, 12)) return;
    gainSkill({ social: 1.6, business: 0.5 });
    S.reputation = clamp(S.reputation + rand(1, 3.5), 0, 100);
    if (Math.random() < 0.22 + S.skills.social / 400) {
      const kind = Math.random();
      if (kind < 0.45 && S.companies.length) {
        const c = pick(S.companies);
        const n = Math.max(1, Math.round(capacity(c) * 0.04));
        c.clients += n;
        addLog(S, `Soirée networking : ${n} nouveaux clients pour ${c.name}.`, 'good');
      } else {
        const m = Math.round(rand(500, 3000));
        S.money += m;
        addLog(S, `Une mise en relation te rapporte une mission ponctuelle : +${fmt(m)}.`, 'good');
      }
    } else {
      addLog(S, "Tu enchaînes les rencontres. Rien de concret, mais le réseau se construit.", 'info');
    }
    render();
  },
  rest() {
    if (S.actions < 1) return toast("Plus de temps ce mois-ci.");
    S.actions -= 1;
    S.energy = clamp(S.energy + 26, 0, S.maxEnergy);
    addHappiness(4);
    S.health = clamp(S.health + 2, 0, 100);
    addLog(S, "Tu coupes vraiment. Ça fait du bien.", 'info');
    render();
  },
  sport() {
    if (!spend(1, 8)) return;
    S.health = clamp(S.health + 7, 0, 100);
    S.maxEnergy = clamp(S.maxEnergy + 1, 60, 130);
    addHappiness(3);
    addLog(S, "Séances de sport régulières ce mois-ci. Le corps suit.", 'good');
    render();
  },
  fun() {
    if (S.actions < 1) return toast("Plus de temps ce mois-ci.");
    const cost = 300 + Math.round(housing(S).cost * 0.1);
    if (S.money < cost) return toast("Pas assez d'argent pour sortir.");
    S.actions -= 1;
    S.money -= cost;
    addHappiness(11);
    S.energy = clamp(S.energy + 4, 0, S.maxEnergy);
    gainSkill({ social: 0.4 });
    addLog(S, `Sorties et amis (${fmt(cost)}). Tu recharges autre chose que ton compte en banque.`, 'info');
    render();
  },
  vacation() {
    if (S.actions < 2) return toast("Il te faut 2 points de temps.");
    const cost = 2500;
    if (S.money < cost) return toast("Pas les moyens de partir.");
    S.actions -= 2;
    S.money -= cost;
    S.energy = S.maxEnergy;
    addHappiness(22);
    S.health = clamp(S.health + 8, 0, 100);
    addLog(S, "Deux semaines loin de tout. Tu reviens neuf.", 'good');
    render();
  },
  quitJob() {
    if (!S.job) return;
    addLog(S, `Tu démissionnes de ton poste de ${S.job.name}.`, 'warn');
    S.job = null;
    S.jobMonths = 0;
    render();
  }
};

function applyForJob(jobId) {
  const j = JOBS.find(x => x.id === jobId);
  if (!spend(1, 10)) return;
  const missing = Object.entries(j.req || {}).filter(([k, v]) => S.skills[k] < v);
  if (missing.length) {
    addLog(S, `Candidature refusée chez « ${j.name} » : niveau insuffisant.`, 'bad');
    return render();
  }
  const chance = 0.55 + S.reputation / 250 + S.skills.social / 300;
  if (Math.random() < chance) {
    S.job = { id: j.id, name: j.name, salary: j.salary, energy: j.energy, gain: j.gain };
    S.jobMonths = 0;
    addLog(S, `Embauché : ${j.name}, ${fmt(j.salary)} net par mois.`, 'good');
  } else {
    addLog(S, `Entretien raté pour « ${j.name} ». Ils ont pris quelqu'un d'autre.`, 'bad');
    addHappiness(-2);
  }
  render();
}

function doTraining(id) {
  const t = TRAININGS.find(x => x.id === id);
  if (t.req && Object.entries(t.req).some(([k, v]) => S.skills[k] < v)) return toast("Tu n'as pas le niveau requis.");
  if (S.money < t.cost) return toast("Pas assez d'argent.");
  if (!spend(t.time, t.energy)) return;
  S.money -= t.cost;
  gainSkill(t.gain);
  addLog(S, `Formation : ${t.name}${t.cost ? ` (${fmt(t.cost)})` : ''}.`, 'good');
  render();
}

function setHousing(id) {
  const h = HOUSING.find(x => x.id === id);
  if (h.cost > 1000 && S.money < h.cost * 2) return toast("Il te faut au moins 2 mois de loyer d'avance.");
  S.housingId = id;
  addLog(S, `Déménagement : ${h.name} (${fmt(h.cost)}/mois).`, 'info');
  render();
}

/* ------------------ Entreprises ------------------ */

function foundCompany(typeId, name) {
  const t = BUSINESS_TYPES.find(x => x.id === typeId);
  let cost = t.cost;
  if (t.id === 'saas' && S.flags.includes('builder')) cost = Math.round(cost / 2);
  if (Object.entries(t.req || {}).some(([k, v]) => S.skills[k] < v)) return toast("Compétences insuffisantes.");
  if (S.money < cost) return toast("Capital insuffisant.");
  if (!spend(1, 14)) return;
  S.money -= cost;
  const c = createCompany(t, name && name.trim() ? name.trim() : t.name);
  c.cash = Math.round(cost * 0.4); // une partie du capital reste en trésorerie
  c.marketing = Math.round(getType(c).fixedCost * 0.5);
  S.companies.push(c);
  addLog(S, `Création de « ${c.name} » (${fmt(cost)} investis).`, 'good');
  render();
}

function focusCompany(uid) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  if (c.focus) return toast("Tu t'es déjà consacré à cette entreprise ce mois-ci.");
  if (!spend(1, 15)) return;
  c.focus = true;
  addLog(S, `Tu passes le mois à fond sur ${c.name}.`, 'info');
  render();
}

function improveProduct(uid) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  if (c.improved) return toast("Produit déjà travaillé ce mois-ci.");
  if (!spend(1, 18)) return;
  const t = getType(c);
  const skill = t.skill.reduce((a, k) => a + S.skills[k], 0) / t.skill.length;
  const gain = (5 + skill / 8) * efficiency();
  c.quality = clamp(c.quality + gain, 0, 100);
  c.improved = true;
  addLog(S, `${c.name} : produit amélioré (+${Math.round(gain)} de qualité).`, 'good');
  render();
}

function prospect(uid) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  if (!spend(1, 16)) return;
  const gain = Math.max(1, Math.round(capacity(c) * 0.06 * (0.5 + S.skills.social / 100) * efficiency()));
  c.clients += gain;
  addLog(S, `${c.name} : prospection intensive, +${gain} clients.`, 'good');
  render();
}

function setMarketing(uid, value) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  c.marketing = Math.max(0, Math.round(value));
  render();
}

function hire(uid, n = 1) {
  const c = S.companies.find(x => x.uid === uid);
  const t = getType(c);
  const cost = Math.round(t.empSalary * c.salaryMod * 1.5);
  if (c.cash < cost) return toast("Trésorerie de l'entreprise insuffisante (recrutement + charges).");
  c.cash -= cost;
  c.employees += n;
  addLog(S, `${c.name} : recrutement (${c.employees} salarié${c.employees > 1 ? 's' : ''}).`, 'info');
  render();
}

function fire(uid) {
  const c = S.companies.find(x => x.uid === uid);
  if (c.employees <= 0) return;
  const t = getType(c);
  c.cash -= Math.round(t.empSalary * c.salaryMod);
  c.employees--;
  c.quality = clamp(c.quality - 3, 0, 100);
  addLog(S, `${c.name} : licenciement (indemnités payées).`, 'warn');
  render();
}

function upgradeCompany(uid) {
  const c = S.companies.find(x => x.uid === uid);
  const t = getType(c);
  const cost = Math.round(t.upgradeCost * Math.pow(1.55, c.level - 1));
  if (c.cash < cost) return toast(`Il faut ${fmt(cost)} en trésorerie d'entreprise.`);
  c.cash -= cost;
  c.level++;
  addLog(S, `${c.name} passe au niveau ${c.level} (capacité augmentée).`, 'good');
  render();
}

function transfer(uid, amount) {
  const c = S.companies.find(x => x.uid === uid);
  amount = Math.round(amount);
  if (amount > 0) { // entreprise -> perso (dividendes)
    const max = Math.floor(c.cash);
    const a = Math.min(amount, max);
    if (a <= 0) return toast("Trésorerie vide.");
    c.cash -= a;
    const net = Math.round(a * c.equity * 0.7); // flat tax 30%
    S.money += net;
    addLog(S, `${c.name} : ${fmt(a)} de dividendes, ${fmt(net)} nets après impôts et part des associés.`, 'info');
  } else { // perso -> entreprise
    const a = Math.min(-amount, Math.floor(S.money));
    if (a <= 0) return toast("Pas assez d'argent personnel.");
    S.money -= a;
    c.cash += a;
    addLog(S, `${c.name} : apport en compte courant de ${fmt(a)}.`, 'info');
  }
  render();
}

function sellCompany(uid) {
  const c = S.companies.find(x => x.uid === uid);
  const price = Math.round((valuation(c) + c.cash) * c.equity);
  S.money += price;
  S.exits.push({ name: c.name, price, month: S.months });
  S.companies = S.companies.filter(x => x.uid !== uid);
  S.reputation = clamp(S.reputation + 6, 0, 100);
  addLog(S, `Cession de ${c.name} pour ${fmt(price)}.`, 'good');
  render();
}

function raiseFunds(uid) {
  const c = S.companies.find(x => x.uid === uid);
  if (c.lastProfit <= 0 && c.clients < 10) return toast("Aucun investisseur ne suivra avec ces chiffres.");
  const pct = 0.18;
  const bonus = S.flags.includes('connected') ? 1.25 : 1;
  const cash = Math.round(valuation(c) * pct * bonus * (0.8 + S.skills.finance / 200));
  if (c.equity - pct < 0.15) return toast("Tu ne peux pas descendre sous 15% du capital.");
  c.equity -= pct;
  c.cash += cash;
  addLog(S, `Levée de fonds sur ${c.name} : ${fmt(cash)} contre ${Math.round(pct * 100)}% du capital (tu gardes ${Math.round(c.equity * 100)}%).`, 'good');
  render();
}

/* ------------------ Placements ------------------ */

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

/* ------------------ Emprunt ------------------ */

// ce que la banque accepte de te prêter au total
function debtCeiling(s) {
  return Math.max(15000, netWorth(s) * 0.5 + monthlyBusinessProfit(s) * 24 + (s.job ? s.job.salary * 20 : 0));
}

function borrow(amount) {
  const maxDebt = debtCeiling(S);
  if (S.debt + amount > maxDebt) return toast(`La banque refuse : plafond d'endettement à ${fmt(maxDebt)}.`);
  S.debt += amount;
  S.money += amount;
  addLog(S, `Emprunt de ${fmt(amount)} accordé.`, 'warn');
  render();
}

function repay(amount) {
  const a = Math.min(amount, S.debt, S.money);
  if (a <= 0) return toast("Rien à rembourser.");
  S.debt -= a;
  S.money -= a;
  addLog(S, `Remboursement de ${fmt(a)}. Dette restante : ${fmt(S.debt)}.`, 'info');
  render();
}

/* ------------------ Résolution du mois ------------------ */

function endMonth() {
  if (S.over) return;

  let income = 0, outcome = 0;

  // --- Salaire
  if (S.job) {
    income += S.job.salary;
    S.energy = Math.max(0, S.energy - energyCost(S.job.energy));
    gainSkill(S.job.gain, 1);
    S.jobMonths++;
    if (S.jobMonths % 14 === 0) {
      S.job.salary = Math.round(S.job.salary * 1.06);
      addLog(S, `Augmentation : ton salaire passe à ${fmt(S.job.salary)}.`, 'good');
    }
  }

  // --- Entreprises
  S.companies.forEach(c => {
    const t = getType(c);
    c.monthsAlive++;

    // acquisition : une base organique (bouche-à-oreille) + l'effet de la publicité
    const marketingPower = 0.3 + Math.pow(c.marketing / 900, 0.72);
    const acq = t.acqBase
      * marketingPower
      * skillMultiplier(c)
      * (0.55 + c.quality / 110)
      * S.marketMood
      * (c.focus ? 1.35 : 1)
      * (1 + S.reputation / 220)
      * (c.hype || 1)
      * (1 - marketShare(c))      // le marché sature : les derniers clients sont les plus durs
      * rand(0.85, 1.15);

    const cap = capacity(c);
    let churn = t.churn * (1.3 - c.quality / 180);
    if (c.clients > cap) churn += ((c.clients - cap) / Math.max(1, c.clients)) * 0.55;
    churn = clamp(churn, 0.01, 0.75);

    c.clients = Math.max(0, c.clients * (1 - churn) + acq);
    c.clients = Math.min(c.clients, cap * 1.2, t.market);

    const revenue = projectedRevenue(c);
    const costs = projectedCosts(c);
    const profit = projectedProfit(c);   // net d'impôt sur les sociétés
    c.lastRevenue = revenue;
    c.lastCosts = costs;
    c.lastProfit = profit;
    c.cash += profit;

    // usure de la qualité
    if (!c.improved) c.quality = clamp(c.quality - 1.6, 0, 100);
    if (c.clients > cap) c.quality = clamp(c.quality - 3, 0, 100);
    if (c.hype && c.hype > 1) c.hype = Math.max(1, c.hype - 0.03);

    // aléa sectoriel
    if (Math.random() < t.risk * 0.12) {
      c.clients *= rand(0.6, 0.85);
      addLog(S, `${c.name} : coup dur sectoriel, perte de clients.`, 'bad');
    }

    // trésorerie négative
    if (c.cash < 0) {
      c.negMonths++;
      if (c.negMonths === 1) addLog(S, `⚠️ ${c.name} est en trésorerie négative. Injecte du cash ou réduis les coûts.`, 'warn');
      if (c.negMonths >= 3) {
        addLog(S, `💀 ${c.name} dépose le bilan. Tout est perdu.`, 'bad');
        addHappiness(-14);
        S.reputation = clamp(S.reputation - 6, 0, 100);
        S.companies = S.companies.filter(x => x.uid !== c.uid);
      }
    } else c.negMonths = 0;

    c.focus = false;
    c.improved = false;
  });

  // --- Coût de vie & dettes
  const life = totalLifeCost(S);
  outcome += life;
  if (S.debt > 0) {
    const interest = S.debt * CONFIG.debtInterest;
    const principal = Math.min(S.debt, Math.max(200, S.debt * 0.012));
    S.debt = Math.max(0, S.debt - principal);
    outcome += interest + principal;
  }

  S.money += income - outcome;

  // --- Loyers immobiliers
  const immo = ASSETS.find(a => a.id === 'immobilier');
  if (S.portfolio.immobilier) {
    const rent = S.portfolio.immobilier * S.prices.immobilier * immo.yield;
    S.money += rent;
    if (rent > 50) addLog(S, `Loyers perçus : ${fmt(rent)}.`, 'good');
  }

  // --- Marchés financiers
  ASSETS.forEach(a => {
    const shock = (S.marketMood - 1) * 0.10;
    const move = a.drift + shock * (a.vol > 0.02 ? 1 : 0.2) + (Math.random() * 2 - 1) * a.vol;
    S.prices[a.id] = Math.max(5, S.prices[a.id] * (1 + move));
  });

  // --- Filet de sécurité familial
  if (S.money < 0 && S.flags.includes('safetynet')) {
    S.money += 1500;
    S.flags = S.flags.filter(f => f !== 'safetynet');
    addLog(S, "Tes parents t'avancent 1 500€. Une seule fois, ils te l'ont dit.", 'info');
  }

  // --- Découvert automatique
  if (S.money < 0) {
    const need = -S.money;
    S.debt += need * 1.05;
    S.money = 0;
    addLog(S, `Découvert de ${fmt(need)} converti en dette bancaire (frais inclus).`, 'bad');
    addHappiness(-4);
  }

  // --- Santé, énergie, moral
  const h = housing(S);
  let regen = h.energy + 10 + S.health / 8;
  if (S.happiness < 30) regen -= 6;
  if (S.flags.includes('parent')) regen -= 3;
  S.energy = clamp(S.energy + regen, 0, S.maxEnergy);

  let mood = h.happy * 0.4 - 0.7;
  if (S.flags.includes('couple')) mood += 1.2;
  if (S.energy < 30) mood -= 3;
  if (netWorth(S) > 300000) mood += 0.6;
  if (S.job && S.companies.length === 0) mood -= 0.4;
  if (monthlyBusinessProfit(S) > 3000) mood += 0.8;   // réussir, ça remonte le moral
  if (S.companies.some(c => c.cash < 0)) mood -= 1.5; // une boîte qui coule, ça ronge
  addHappiness(mood);

  let hp = 0;
  if (S.energy < 25) hp -= 2.2;
  if (S.age > 40) hp -= 0.25;
  if (S.age > 55) hp -= 0.35;
  if (S.happiness > 70) hp += 0.4;
  S.health = clamp(S.health + hp, 0, 100);

  // --- Humeur de marché qui revient à la normale
  S.marketMood += (1 - S.marketMood) * 0.22;

  // --- Objectifs
  GOALS.forEach(g => {
    if (!S.goals.includes(g.id) && g.check(S)) {
      S.goals.push(g.id);
      addLog(S, `🏆 Objectif atteint : ${g.name}`, 'good');
    }
  });

  // --- Récapitulatif du mois
  const bizNet = S.companies.reduce((a, c) => a + c.lastProfit, 0);
  const parts = [];
  if (income) parts.push(`salaire +${fmt(income)}`);
  if (bizNet) parts.push(`entreprises ${bizNet >= 0 ? '+' : ''}${fmt(bizNet)}`);
  parts.push(`train de vie -${fmt(outcome)}`);
  addLog(S, `Bilan du mois : ${parts.join(', ')}. Liquidités : ${fmt(S.money)}.`,
    (income + bizNet - outcome) >= 0 ? 'info' : 'warn');

  // --- Avancement du temps
  S.months++;
  S.age = CONFIG.startAge + Math.floor(S.months / 12);
  S.actions = CONFIG.actionsPerMonth;
  S.history.push({ m: S.months, nw: Math.round(netWorth(S)) });
  if (S.history.length > 600) S.history.shift();

  // --- Fin de partie
  if (S.health <= 0) return gameOver("Ton corps a lâché. Tu as gagné de l'argent et perdu le reste.");
  if (S.money <= 0 && netWorth(S) < CONFIG.bankruptcyLimit) return gameOver("Faillite personnelle. Les dettes ont eu le dernier mot.");
  if (S.age >= CONFIG.retireAge) return gameOver("Tu prends ta retraite. L'heure du bilan.");

  // --- Événement du mois
  const evt = rollEvent();
  save();
  if (evt) showEvent(evt); else render();
}

function rollEvent() {
  if (Math.random() > CONFIG.eventChance) return null;
  const pool = EVENTS.filter(e => {
    if (S.seen && S.seen[e.id] && !e.global) return false;
    try { return e.cond(S); } catch (_) { return false; }
  });
  if (!pool.length) return null;
  const e = pick(pool);
  S.seen = S.seen || {};
  S.seen[e.id] = true;
  return e;
}

function resolveChoice(evt, index) {
  const ch = evt.choices[index];
  const eff = ch.effects || {};
  const soft = S.flags.includes('resilient') ? 0.6 : 1;

  if (eff.money) S.money += eff.money;
  if (eff.debt) S.debt += eff.debt;
  if (eff.energy) S.energy = clamp(S.energy + eff.energy, 0, S.maxEnergy);
  if (eff.health) S.health = clamp(S.health + (eff.health < 0 ? eff.health * soft : eff.health), 0, 100);
  if (eff.happiness) addHappiness(eff.happiness);
  if (eff.reputation) S.reputation = clamp(S.reputation + eff.reputation, 0, 100);
  ['business', 'marketing', 'tech', 'social', 'finance'].forEach(k => {
    if (eff[k]) S.skills[k] = clamp(S.skills[k] + eff[k], 0, 100);
  });
  if (eff.skills) gainSkill(eff.skills);
  if (ch.flag && !S.flags.includes(ch.flag)) S.flags.push(ch.flag);
  addLog(S, `${evt.title} → ${ch.label}`, 'info');
  if (ch.custom) ch.custom(S);

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

/* ------------------ Sauvegarde ------------------ */

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
  S = null;
  PENDING = null;
}
