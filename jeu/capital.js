/* =========================================================
   EMPIRE — L'argent des autres
   Trois façons de financer une entreprise qu'on ne peut pas
   financer soi-même : ouvrir son capital à des fonds qui ont
   un nom et un caractère, emprunter à une banque qui regarde
   les comptes, ou faire jouer les sociétés d'un même groupe
   les unes pour les autres.
   Chacune se paie autrement.
   ========================================================= */

/* ---------------------------------------------------------
   LES TOURS DE TABLE
   On ne lève pas ce qu'on veut quand on veut : chaque étage
   a ses conditions d'entrée, et personne ne saute une marche.
   --------------------------------------------------------- */

const ROUNDS = [
  {
    id: 'amorcage', name: 'Amorçage', short: 'Seed', order: 1, icon: 'fa-seedling',
    need: { clients: 12, days: 120 },
    dilution: [0.10, 0.20],
    horizon: 540, multiple: 3.5,
    desc: "On finance une intuition et une petite traction. Personne ne regarde encore la rentabilité."
  },
  {
    id: 'seriea', name: 'Série A', short: 'A', order: 2, icon: 'fa-chart-line',
    need: { revenue: 20000, growth: 0.35, days: 400 },
    dilution: [0.15, 0.25],
    horizon: 600, multiple: 3,
    desc: "On finance une machine qui tourne : un canal d'acquisition qui marche, une équipe, une rétention tenable."
  },
  {
    id: 'serieb', name: 'Série B', short: 'B', order: 3, icon: 'fa-rocket',
    need: { revenue: 150000, growth: 0.3, days: 720 },
    dilution: [0.12, 0.20],
    horizon: 640, multiple: 2.6,
    desc: "On finance une prise de marché. À ce stade, on t'achète surtout ta capacité à dépenser vite et bien."
  },
  {
    id: 'seriec', name: 'Série C', short: 'C', order: 4, icon: 'fa-building-columns',
    need: { revenue: 700000, growth: 0.22, days: 1080 },
    dilution: [0.08, 0.16],
    horizon: 720, multiple: 2.1,
    desc: "On finance une position dominante, souvent avant une introduction en bourse ou une grosse cession."
  }
];

function roundById(id) { return ROUNDS.find(r => r.id === id); }

/* Le prochain tour possible pour cette société */
function nextRound(c) {
  const done = (c.rounds || []).length;
  return ROUNDS[done] || null;
}

/* Ce qui manque pour être crédible. Un tableau vide = tu peux y aller. */
function roundGaps(c) {
  const r = nextRound(c);
  if (!r) return [{ label: "Tu as déjà fait tous les tours possibles.", ok: false }];
  const gaps = [];
  const n = r.need;
  if (n.clients && c.clients < n.clients)
    gaps.push({ label: `${num(c.clients)} clients sur ${num(n.clients)} attendus`, ok: false });
  if (n.revenue && c.lastRevenue < n.revenue)
    gaps.push({ label: `${fmt(c.lastRevenue)} de CA mensuel sur ${fmt(n.revenue)} attendus`, ok: false });
  if (n.growth && (c.growth || 0) < n.growth)
    gaps.push({ label: `croissance de ${Math.round((c.growth || 0) * 100)}% sur ${Math.round(n.growth * 100)}% attendus`, ok: false });
  if (n.days && c.days < n.days)
    gaps.push({ label: `${Math.round(c.days / 30)} mois d'existence sur ${Math.round(n.days / 30)} attendus`, ok: false });
  return gaps;
}

/* ---------------------------------------------------------
   LES FONDS
   Chacun a une façon de négocier, une somme qu'il met, ce
   qu'il apporte en plus de l'argent et ce qu'il exigera
   ensuite. On ne prend pas le même argent selon la vie qu'on
   veut avoir dans les cinq années qui suivent.
   --------------------------------------------------------- */

const FUNDS = [
  {
    id: 'montaigne', name: 'Cercle Montaigne', kind: 'angels', icon: 'fa-user-tie',
    stages: ['amorcage', 'seriea'], hardball: 0.12, size: 0.65, patience: 6, board: false,
    perk: 'reseau',
    tag: "Business angels",
    desc: "Six entrepreneurs qui ont revendu leur boîte. Petit chèque, conditions douces, un carnet d'adresses qui ouvre des portes."
  },
  {
    id: 'kairos', name: 'Kairos Ventures', kind: 'vc', icon: 'fa-bolt',
    stages: ['amorcage', 'seriea', 'serieb'], hardball: 0.3, size: 1, patience: 4, board: true,
    perk: 'reputation',
    tag: "Capital-risque généraliste",
    desc: "Le fonds que tout le monde connaît. Il paie correctement, siège au conseil, et son nom sur ta table de capitalisation vaut de la crédibilité."
  },
  {
    id: 'northbridge', name: 'Northbridge Capital', kind: 'growth', icon: 'fa-arrow-trend-up',
    stages: ['seriea', 'serieb', 'seriec'], hardball: 0.45, size: 1.35, patience: 3, board: true,
    perk: 'operations',
    tag: "Fonds de croissance",
    desc: "Gros chèques, gros objectifs. Ils installent leurs méthodes chez toi et ne supportent pas un trimestre mou."
  },
  {
    id: 'vantage', name: 'Vantage Partners', kind: 'agressif', icon: 'fa-chess-rook',
    stages: ['seriea', 'serieb', 'seriec'], hardball: 0.6, size: 1.6, patience: 2, board: true,
    perk: 'guerre',
    tag: "Fonds agressif",
    desc: "Ils mettent plus que tout le monde et négocient plus dur que tout le monde. Avec eux tu iras vite, dans la direction qu'ils auront choisie."
  },
  {
    id: 'rivage', name: 'Fonds Rivage', kind: 'patient', icon: 'fa-anchor',
    stages: ['amorcage', 'seriea', 'serieb'], hardball: 0.2, size: 0.75, patience: 8, board: false,
    perk: 'calme',
    tag: "Family office",
    desc: "L'argent d'une famille, investi sur vingt ans. Ils ne te presseront jamais, mais ils ne remettront pas au pot chaque année non plus."
  },
  {
    id: 'altair', name: 'Altaïr Industries', kind: 'corporate', icon: 'fa-industry',
    stages: ['seriea', 'serieb', 'seriec'], hardball: 0.25, size: 1.2, patience: 5, board: true,
    perk: 'strategique',
    tag: "Investisseur stratégique",
    desc: "Un groupe de ton secteur. Il paie cher parce qu'il t'ouvre ses clients — et parce qu'il compte bien te racheter en entier un jour."
  }
];

function getFund(id) { return FUNDS.find(f => f.id === id); }

/* Appétit d'un fonds pour cette société, de 0 à 1. */
function fundInterest(c, f, round) {
  if (!f.stages.includes(round.id)) return 0;
  let k = 0.35;
  k += clamp((c.growth || 0) / 1.2, -0.2, 0.35);
  k += clamp(c.quality / 400, 0, 0.25);
  k += S.reputation / 400;
  k += S.skills.social / 500;
  k += clamp(marketSize(c) / 400000, 0, 0.2);       // un grand marché rassure
  k -= clamp((marketPressure(c) - 0.5) * 0.6, -0.15, 0.3);
  if (f.kind === 'corporate' && (SECTOR_OF[c.typeId] === 'tech')) k += 0.1;
  if (f.kind === 'agressif') k -= 0.1;              // ils ne suivent pas tout le monde
  if ((c.investors || []).some(i => i.fundId === f.id)) k += 0.2;   // ils te connaissent déjà
  return clamp(k, 0, 1);
}

/* ---------------------------------------------------------
   LES OFFRES
   Un tour de table, c'est du temps et de l'énergie : on va
   voir des gens, et certains ne rappellent pas.
   --------------------------------------------------------- */

function openRound(uid) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const r = nextRound(c);
  if (!r) return toast("Il n'y a plus de tour à faire sur cette société.");
  if (roundGaps(c).length) return toast("Tes chiffres ne tiennent pas encore pour ce tour.");
  if (c.offers && c.offers.length) return toast("Tu as déjà des term sheets sur la table.");
  if (!spendEnergy(12)) return;

  const candidates = FUNDS
    .map(f => ({ f, k: fundInterest(c, f, r) }))
    .filter(x => x.k > 0 && Math.random() < x.k);

  if (!candidates.length) {
    c.roadshowFail = S.day;
    addLog(S, `${c.name} : personne ne donne suite. Le dossier n'a convaincu aucun fonds.`, 'bad');
    return render();
  }

  // Plus il y a de monde autour de la table, mieux tu es payé.
  const tension = clamp(1 + (candidates.length - 1) * 0.07, 1, 1.25);
  c.offers = candidates
    .sort((a, b) => b.k - a.k)
    .slice(0, 3)
    .map(x => makeOffer(c, r, x.f, x.k, tension));

  addLog(S, `${c.name} : ${c.offers.length} term sheet${c.offers.length > 1 ? 's' : ''} sur la table pour le tour ${r.name}.`, 'good');
  render();
}

function makeOffer(c, r, f, interest, tension) {
  const real = valuation(c) + Math.max(0, c.cash);

  // Un fonds ne paie jamais ce que tu penses valoir. Ta réputation,
  // ta finance et le nombre de prétendants réduisent l'écart.
  const discount = f.hardball * (1 - S.skills.finance / 260) * (1 - S.reputation / 400);
  const pre = Math.max(getType(c).cost, real * clamp(1 - discount, 0.45, 1.1) * tension * rand(0.95, 1.06));

  const pct = clamp(rand(r.dilution[0], r.dilution[1]) * f.size * rand(0.92, 1.08), 0.05, 0.42);
  const amount = Math.round(pre * pct / (1 - pct));

  return {
    id: 'o' + Math.random().toString(36).slice(2, 7),
    fundId: f.id,
    roundId: r.id,
    pre: Math.round(pre),
    amount,
    pct: +pct.toFixed(3),
    board: f.board && pct > 0.12,
    tries: 0,
    interest
  };
}

/* Négocier, c'est risquer de tout perdre. On peut y aller deux fois. */
function negotiateOffer(uid, offerId) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const o = (c.offers || []).find(x => x.id === offerId);
  if (!o) return;
  const f = getFund(o.fundId);
  if (o.tries >= 2) return toast("Tu as déjà poussé deux fois. Insister ferait mauvais genre.");
  if (!spendEnergy(5)) return;
  o.tries++;

  const rivals = c.offers.length - 1;
  const chance = clamp(
    0.3 + S.skills.finance / 220 + S.skills.social / 320 + rivals * 0.12
    + (o.interest - 0.5) * 0.3 - f.hardball * 0.5 - (o.tries - 1) * 0.2,
    0.08, 0.88
  );

  if (Math.random() < chance) {
    const gain = rand(0.08, 0.22) * (1 + rivals * 0.15);
    o.pre = Math.round(o.pre * (1 + gain));
    o.amount = Math.round(o.pre * o.pct / (1 - o.pct));
    addLog(S, `${f.name} remonte sa valorisation de ${Math.round(gain * 100)}% sur ${c.name}.`, 'good');
  } else if (Math.random() < 0.3 + f.hardball * 0.4) {
    c.offers = c.offers.filter(x => x.id !== offerId);
    addLog(S, `${f.name} retire son offre sur ${c.name}. On ne négocie pas avec eux comme ça.`, 'bad');
  } else {
    o.pct = +clamp(o.pct + 0.02, 0.05, 0.45).toFixed(3);
    o.amount = Math.round(o.pre * o.pct / (1 - o.pct));
    addLog(S, `${f.name} ne bouge pas sur le prix et demande ${Math.round(o.pct * 100)}% du capital.`, 'warn');
  }
  render();
}

function acceptOffer(uid, offerId) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const o = (c.offers || []).find(x => x.id === offerId);
  if (!o) return;
  const f = getFund(o.fundId);
  const r = roundById(o.roundId);

  if (c.equity - o.pct < 0.12) return toast("Tu descendrais sous 12% du capital. Ce n'est plus ta société.");

  c.equity = +(c.equity - o.pct).toFixed(4);
  c.cash += o.amount;
  c.rounds = c.rounds || [];
  c.rounds.push({ roundId: r.id, fundId: f.id, pre: o.pre, amount: o.amount, pct: o.pct, day: S.day });
  c.investors = c.investors || [];
  c.investors.push({
    fundId: f.id,
    pct: o.pct,
    day: S.day,
    board: o.board,
    baseRevenue: Math.max(1000, c.lastRevenue),
    target: r.multiple,
    horizon: r.horizon,
    patience: f.patience,
    checked: S.day
  });
  if (o.board) c.board = true;
  c.offers = [];

  applyFundPerk(c, f, o);
  S.reputation = clamp(S.reputation + (f.kind === 'angels' ? 2 : 5), 0, 100);
  addHappiness(8);
  addLog(S,
    `${c.name} boucle son tour ${r.name} : ${fmt(o.amount)} de ${f.name} sur une valorisation de ${fmt(o.pre)}. Tu gardes ${Math.round(c.equity * 100)}%.`,
    'good');
  render();
}

function declineRound(uid) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  c.offers = [];
  addLog(S, `${c.name} : tu refuses de lever. Tu restes maître chez toi.`, 'info');
  render();
}

/* Ce qu'un fonds apporte en plus du virement */
function applyFundPerk(c, f, o) {
  switch (f.perk) {
    case 'reseau': {
      for (let i = 0; i < 2; i++) {
        const k = makeContact(45);
        k.relation = 35;
        S.contacts.push(k);
      }
      addLog(S, `${f.name} te présente deux personnes de son cercle.`, 'good');
      break;
    }
    case 'reputation':
      c.hype = Math.max(c.hype || 1, 1.25);
      addLog(S, `Le nom de ${f.name} circule : ton marché te regarde autrement.`, 'good');
      break;
    case 'operations':
      c.staff.forEach(e => e.skill = clamp(e.skill + 4, 0, 99));
      c.costMod = Math.max(0.82, (c.costMod || 1) * 0.94);
      addLog(S, `${f.name} envoie ses opérationnels remettre tes process d'équerre.`, 'good');
      break;
    case 'guerre':
      c.channelBoost = { channel: 'paid', mult: 1.35, days: 360 };
      addLog(S, `${f.name} veut que l'argent parte vite : ils te mettent leur agence média pendant un an.`, 'good');
      break;
    case 'calme':
      addHappiness(6);
      break;
    case 'strategique':
      c.marketBonus = (c.marketBonus || 1) * 1.15;
      c.strategic = f.id;
      addLog(S, `${f.name} t'ouvre son réseau de distribution : ton marché adressable s'élargit.`, 'good');
      break;
  }
}

/* ---------------------------------------------------------
   CE QUE LES INVESTISSEURS ATTENDENT ENSUITE
   L'argent pris aujourd'hui devient une exigence demain.
   --------------------------------------------------------- */

/* Où en est la société par rapport à ce qui a été promis, de 0 à ~2 */
function investorProgress(c, inv) {
  const elapsed = clamp((S.day - inv.day) / inv.horizon, 0.05, 1.4);
  const expected = 1 + (inv.target - 1) * elapsed;
  const actual = c.lastRevenue / inv.baseRevenue;
  return actual / expected;
}

function boardMood(c) {
  const inv = (c.investors || []).filter(i => i.board);
  if (!inv.length) return null;
  const worst = inv.reduce((a, i) => (i.patience < a.patience ? i : a), inv[0]);
  return worst;
}

function tickCapital(c) {
  tickLoans(c);
  if (c.days % 30 === 0) c.talentBonus = groupTalentBonus(c, S);

  // Le conseil se réunit tous les trois mois, pas tous les jours.
  (c.investors || []).forEach(inv => {
    if (S.day - inv.checked < 90) return;
    inv.checked = S.day;
    const f = getFund(inv.fundId);
    const p = investorProgress(c, inv);

    if (p < 0.65) {
      inv.patience = Math.max(-2, inv.patience - 1);
      // Seul un investisseur qui siège au conseil peut te mettre au pied du
      // mur. Un business angel mécontent se contente de te le dire.
      const quiet = inv.board && S.day - (inv.lastBoard || 0) > 200;
      if (inv.patience <= 0 && quiet) { S.forcedEvent = 'board_sortie'; inv.lastBoard = S.day; }
      else if (inv.patience <= 1 && quiet) { S.forcedEvent = 'board_ceo'; inv.lastBoard = S.day; }
      else if (inv.patience <= 2 && quiet) { S.forcedEvent = 'board_pression'; inv.lastBoard = S.day; }
      else addLog(S, `${c.name} : ${f.name} trouve la trajectoire trop lente.`, 'warn');
    } else if (p > 1.15) {
      inv.patience = Math.min(f.patience, inv.patience + 0.5);
      // Un fonds content ouvre ses portes
      if (Math.random() < 0.25) {
        const k = makeContact(50); k.relation = 30;
        S.contacts.push(k);
        addLog(S, `${f.name} est ravi de ${c.name} et te présente ${k.name}.`, 'good');
      }
    }
  });
}

/* ---------------------------------------------------------
   LA DETTE D'ENTREPRISE
   La banque ne regarde ni ton rêve ni ta croissance : elle
   regarde douze mois de comptes. En échange elle ne prend
   pas une action, et c'est tout l'intérêt.
   --------------------------------------------------------- */

const LOAN_KINDS = [
  {
    id: 'bancaire', name: 'Prêt bancaire', icon: 'fa-building-columns', term: 60, grace: 0,
    desc: "Amortissable sur cinq ans, prélevé chaque mois quoi qu'il arrive."
  },
  {
    id: 'innovation', name: 'Avance innovation', icon: 'fa-flask', term: 84, grace: 24,
    desc: "Deux ans sans rembourser le capital, taux réduit. Réservé aux sociétés qui financent vraiment de la R&D."
  }
];

function getLoanKind(id) { return LOAN_KINDS.find(k => k.id === id); }
function companyDebt(c) { return (c.loans || []).reduce((a, l) => a + l.principal, 0); }
function loanMonthly(c) { return (c.loans || []).reduce((a, l) => a + (l.graceLeft > 0 ? l.principal * l.rate / 12 : l.monthly), 0); }

/* Ce que la banque accepte de prêter, et à quel prix */
function loanCapacity(c) {
  if (c.days < 300) return 0;
  const ebitda = Math.max(0, c.avgProfit || 0) * 12;
  if (ebitda <= 0) return 0;
  // Une banque prête sur la capacité de remboursement, pas sur la trésorerie
  // du jour : c'est le résultat des douze derniers mois qui décide.
  const topline = Math.max(0, c.avgRevenue || 0) * 12;
  const max = ebitda * 2.6 + topline * 0.12;
  return Math.max(0, Math.round(max - companyDebt(c)));
}

function loanRate(c, kindId) {
  const t = getType(c);
  const lev = companyDebt(c) / Math.max(1, Math.max(0, c.avgProfit || 0) * 12);
  let r = 0.055 + t.risk * 0.02 + clamp(lev, 0, 3) * 0.015 - S.skills.finance / 2500;
  if (kindId === 'innovation') r -= 0.025;
  return +clamp(r, 0.018, 0.14).toFixed(4);
}

function innovationEligible(c) {
  return c.rd > 0 && c.rd >= getType(c).fixedCost * 0.5 && c.days >= 300;
}

function takeLoan(uid, kindId, amount) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const kind = getLoanKind(kindId);
  const cap = loanCapacity(c);
  if (cap <= 0) return toast("La banque veut douze mois de comptes bénéficiaires avant de prêter quoi que ce soit.");
  if (kindId === 'innovation' && !innovationEligible(c))
    return toast("L'avance innovation demande un budget R&D significatif et soutenu.");
  amount = Math.round(Math.min(amount, cap));
  if (amount < 1000) return toast("Montant trop faible pour monter un dossier.");

  const rate = loanRate(c, kindId);
  const n = kind.term;
  const i = rate / 12;
  const monthly = Math.round(amount * i / (1 - Math.pow(1 + i, -n)));

  c.loans = c.loans || [];
  c.loans.push({
    id: 'l' + Math.random().toString(36).slice(2, 7),
    kindId, principal: amount, borrowed: amount,
    rate, monthly, term: n, graceLeft: kind.grace, missed: 0, day: S.day
  });
  c.cash += amount;
  addLog(S,
    `${c.name} : ${kind.name.toLowerCase()} de ${fmt(amount)} accordé à ${(rate * 100).toFixed(2)}% sur ${Math.round(n / 12)} ans, ${fmt(monthly)} par mois.`,
    'good');
  render();
}

function repayLoanEarly(uid, loanId) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const l = (c.loans || []).find(x => x.id === loanId);
  if (!l) return;
  const penalty = Math.round(l.principal * 0.03);
  const total = Math.round(l.principal + penalty);
  if (c.cash < total) return toast(`Solder ce prêt coûte ${fmt(total)}, pénalité comprise.`);
  c.cash -= total;
  c.loans = c.loans.filter(x => x.id !== loanId);
  addLog(S, `${c.name} solde son prêt par anticipation : ${fmt(total)}, dont ${fmt(penalty)} d'indemnité.`, 'info');
  render();
}

/* Les intérêts sont une charge, ils passent par le compte de résultat.
   Le remboursement du capital n'en est pas une : il sort de la
   trésorerie sans jamais apparaître dans le profit. C'est exactement
   ce qui surprend le plus quand on s'endette. */
function loanInterestMonthly(c) {
  return (c.loans || []).reduce((a, l) => a + l.principal * l.rate / 12, 0);
}

function tickLoans(c) {
  if (!c.loans || !c.loans.length) return;
  const D = DAYS_PER_MONTH;

  c.loans.forEach(l => {
    if (l.graceLeft > 0) {
      if (S.day % D === 0) l.graceLeft--;
      return;
    }
    const principalDue = Math.max(0, l.monthly - l.principal * l.rate / 12) / D;
    if (c.cash < principalDue) {
      l.missed++;
      if (l.missed === 30) addLog(S, `⚠️ ${c.name} : une échéance de prêt n'est plus honorée. La banque s'en aperçoit.`, 'warn');
      if (l.missed === 90) {
        l.rate = clamp(l.rate * 1.6, 0, 0.25);
        S.reputation = clamp(S.reputation - 4, 0, 100);
        addLog(S, `${c.name} : la banque déclasse ton dossier et alourdit le taux.`, 'bad');
      }
      return;
    }
    c.cash -= principalDue;
    l.principal = Math.max(0, l.principal - principalDue);
    if (l.missed > 0) l.missed = Math.max(0, l.missed - 1);
  });

  const done = c.loans.filter(l => l.principal <= 0.5);
  if (done.length) {
    done.forEach(l => addLog(S, `${c.name} : ${getLoanKind(l.kindId).name.toLowerCase()} intégralement remboursé.`, 'good'));
    c.loans = c.loans.filter(l => l.principal > 0.5);
  }
}

/* ---------------------------------------------------------
   LE GROUPE
   Deux sociétés côte à côte ne font rien l'une pour l'autre.
   Un groupe, si. Encore faut-il le structurer, et ça se paie.
   --------------------------------------------------------- */

const GROUP_TIERS = [
  {
    level: 1, name: 'Direction commune', icon: 'fa-sitemap',
    need: { companies: 2, business: 25 }, cost: 25000,
    desc: "Une seule direction, une seule comptabilité, des contrats groupés.",
    effect: "−7% de charges fixes sur toutes tes sociétés."
  },
  {
    level: 2, name: 'Services mutualisés', icon: 'fa-network-wired',
    need: { companies: 3, business: 45, finance: 35 }, cost: 180000,
    desc: "Marketing, support et administration servent toutes les sociétés à la fois.",
    effect: "−14% de charges fixes, et tes sociétés se passent des clients entre elles."
  },
  {
    level: 3, name: 'Groupe intégré', icon: 'fa-building-shield',
    need: { companies: 4, business: 62, finance: 55 }, cost: 900000,
    desc: "Trésorerie centralisée, mobilité interne, marque commune.",
    effect: "−20% de charges fixes, ventes croisées renforcées, et une société en manque de trésorerie est renflouée par ses sœurs."
  }
];

function groupLevel(s = S) { return (s.group && s.group.level) || 0; }
function nextGroupTier(s = S) { return GROUP_TIERS.find(t => t.level === groupLevel(s) + 1) || null; }

function groupTierGaps(s = S) {
  const t = nextGroupTier(s);
  if (!t) return [];
  const gaps = [];
  if (s.companies.length < t.need.companies)
    gaps.push(`${s.companies.length} société(s) sur ${t.need.companies}`);
  if (t.need.business && s.skills.business < t.need.business)
    gaps.push(`business ${Math.round(s.skills.business)} sur ${t.need.business}`);
  if (t.need.finance && s.skills.finance < t.need.finance)
    gaps.push(`finance ${Math.round(s.skills.finance)} sur ${t.need.finance}`);
  return gaps;
}

function structureGroup() {
  const t = nextGroupTier(S);
  if (!t) return toast("Ton groupe est déjà au maximum de son intégration.");
  if (groupTierGaps(S).length) return toast("Tu n'as pas encore de quoi structurer ce niveau.");
  if (S.money < t.cost) return toast(`Il faut ${fmt(t.cost)} pour monter cette structure.`);
  S.money -= t.cost;
  S.group = S.group || { level: 0 };
  S.group.level = t.level;
  S.group.day = S.day;
  S.reputation = clamp(S.reputation + 3, 0, 100);
  addLog(S, `Tu structures ton groupe : ${t.name.toLowerCase()}. ${t.effect}`, 'good');
  render();
}

/* Ce que le groupe fait gagner sur les charges fixes */
function groupCostFactor(s = S) {
  const lvl = groupLevel(s);
  if (!lvl || s.companies.length < 2) return 1;
  return [1, 0.93, 0.86, 0.80][lvl];
}

/* Ventes croisées : les clients d'une société profitent aux autres,
   d'autant plus qu'elles s'adressent au même monde. */
function groupAcqFactor(c, s = S) {
  const lvl = groupLevel(s);
  if (lvl < 2 || s.companies.length < 2) return 1;
  const mine = SECTOR_OF[c.typeId];
  const others = s.companies.filter(x => x.uid !== c.uid).reduce((a, x) => {
    const affinity = SECTOR_OF[x.typeId] === mine ? 1 : 0.4;
    return a + x.clients * affinity;
  }, 0);
  if (others <= 0) return 1;
  // Ce qui compte n'est pas le nombre absolu de clients des sœurs, mais leur
  // poids face au tien : une société modeste dans un grand groupe reçoit
  // beaucoup, la locomotive du groupe ne reçoit presque rien.
  const share = others / (others + Math.max(1, c.clients));
  return 1 + share * (lvl === 3 ? 0.45 : 0.25);
}

/* Trésorerie centralisée : au niveau 3, une société en difficulté
   est renflouée par celles qui vont bien, avant qu'il soit trop tard. */
function groupCashPooling(s = S) {
  if (groupLevel(s) < 3) return;
  const needy = s.companies.filter(c => c.cash < 0);
  if (!needy.length) return;
  needy.forEach(c => {
    const donors = s.companies.filter(x => x.uid !== c.uid && x.cash > 0);
    let need = -c.cash;
    donors.sort((a, b) => b.cash - a.cash).forEach(d => {
      if (need <= 0) return;
      const give = Math.min(d.cash * 0.5, need);
      d.cash -= give; c.cash += give; need -= give;
    });
    if (c.cash >= 0 && c.negDays > 0) {
      addLog(S, `Trésorerie de groupe : ${c.name} est renflouée par ses sœurs.`, 'info');
      c.negDays = 0;
    }
  });
}

/* Talents : au niveau 3, les meilleurs circulent et tirent les autres. */
function groupTalentBonus(c, s = S) {
  if (groupLevel(s) < 3) return 0;
  const best = s.companies
    .filter(x => x.uid !== c.uid)
    .reduce((a, x) => Math.max(a, x.staff.reduce((m, e) => Math.max(m, e.skill), 0)), 0);
  return clamp((best - 55) / 12, 0, 4);
}

/* ---------------------------------------------------------
   AFFICHAGE
   --------------------------------------------------------- */

function capTable(c) {
  const rows = [{ name: 'Toi', pct: c.equity, cls: 'accent' }];
  c.staff.filter(e => e.equity).forEach(e => rows.push({ name: e.name, pct: e.equity }));
  // Un fonds qui a remis au pot deux fois n'apparaît qu'une ligne
  (c.investors || []).forEach(i => {
    const line = rows.find(r => r.fundId === i.fundId);
    if (line) { line.pct += i.pct; line.board = line.board || i.board; }
    else rows.push({ fundId: i.fundId, name: getFund(i.fundId).name, pct: i.pct, board: i.board });
  });
  const known = rows.reduce((a, r) => a + r.pct, 0);
  if (known < 0.995) rows.push({ name: 'Autres investisseurs', pct: 1 - known });
  return rows;
}

function renderRounds(c) {
  const r = nextRound(c);
  const gaps = r ? roundGaps(c) : [];
  const done = c.rounds || [];

  const historique = done.length ? `
    <div class="round-hist">
      ${done.map(d => {
        const rr = roundById(d.roundId), f = getFund(d.fundId);
        return `<div class="round-done">
          <i class="fas ${rr.icon}"></i>
          <b>${rr.name}</b>
          <span class="row-sub">${f.name} · ${fmt(d.amount)} sur ${fmt(d.pre)} · ${Math.round(d.pct * 100)}%</span>
        </div>`;
      }).join('')}
    </div>` : '';

  if (c.offers && c.offers.length) {
    return `
    <h4><i class="fas fa-file-signature"></i> Term sheets sur la table</h4>
    <p class="row-sub">Négocier peut faire monter le prix, ou faire partir le fonds. Deux tentatives par offre.</p>
    ${c.offers.map(o => {
      const f = getFund(o.fundId);
      const post = o.pre + o.amount;
      return `
      <div class="offer">
        <div class="offer-head">
          <i class="fas ${f.icon}"></i>
          <div>
            <b>${f.name}</b>
            <span class="row-sub">${f.tag}</span>
          </div>
          <b class="accent">${fmt(o.amount)}</b>
        </div>
        <p class="row-sub">${f.desc}</p>
        <div class="offer-terms">
          <span><i class="fas fa-tag"></i> Pré-money ${fmt(o.pre)}</span>
          <span><i class="fas fa-chart-pie"></i> ${Math.round(o.pct * 100)}% du capital</span>
          <span><i class="fas fa-scale-balanced"></i> Post-money ${fmt(post)}</span>
          ${o.board ? '<span class="warn"><i class="fas fa-gavel"></i> siège au conseil</span>' : '<span class="ok"><i class="fas fa-feather"></i> pas de siège au conseil</span>'}
        </div>
        <p class="row-sub">Après ce tour tu détiendrais <b>${Math.round((c.equity - o.pct) * 100)}%</b>.
        ${f.patience >= 6 ? "Ils te laisseront le temps." : f.patience <= 2 ? "Ils regarderont tes chiffres de très près." : "Ils attendront une trajectoire nette."}</p>
        <div class="btn-row">
          <button class="btn btn-sm btn-primary" data-act="offerOk" data-id="${c.uid}" data-sid="${o.id}">Signer</button>
          <button class="btn btn-sm btn-ghost" data-act="offerNeg" data-id="${c.uid}" data-sid="${o.id}" ${o.tries >= 2 ? 'disabled' : ''}>Négocier${o.tries ? ` (${o.tries}/2)` : ''}</button>
        </div>
      </div>`;
    }).join('')}
    <button class="btn btn-sm btn-ghost" data-act="roundSkip" data-id="${c.uid}">Tout refuser</button>
    ${historique}`;
  }

  if (!r) return `<h4><i class="fas fa-flag-checkered"></i> Financement</h4>
    <p class="row-sub">Tu es allé au bout des tours de table possibles. La suite se joue en bourse ou en cession.</p>${historique}`;

  return `
    <h4><i class="fas ${r.icon}"></i> Prochain tour : ${r.name}</h4>
    <p class="row-sub">${r.desc}</p>
    ${gaps.length
      ? `<div class="alert"><i class="fas fa-triangle-exclamation"></i> Il te manque : ${gaps.map(g => g.label).join(' · ')}.</div>`
      : `<p class="row-sub ok">Tes chiffres tiennent. Un tour prend de l'énergie, et rien ne garantit qu'un fonds réponde.</p>`}
    <button class="btn btn-sm ${gaps.length ? 'btn-ghost' : 'btn-primary'}" data-act="openRound" data-id="${c.uid}" ${gaps.length ? 'disabled' : ''}>
      <i class="fas fa-phone"></i> Ouvrir un tour de table
    </button>
    ${historique}`;
}

function renderLoans(c) {
  const cap = loanCapacity(c);
  const loans = c.loans || [];
  const inno = innovationEligible(c);

  return `
  <h4><i class="fas fa-building-columns"></i> Dette bancaire</h4>
  ${loans.length ? loans.map(l => {
    const k = getLoanKind(l.kindId);
    const paid = 1 - l.principal / l.borrowed;
    return `
    <div class="loan">
      <div class="metric"><span><i class="fas ${k.icon}"></i> ${k.name}</span><b>${fmt(l.principal)} restants</b></div>
      ${bar(paid * 100, 100, 'happy')}
      <span class="row-sub">${(l.rate * 100).toFixed(2)}% · ${l.graceLeft > 0
        ? `différé encore ${l.graceLeft} mois, tu ne paies que les intérêts`
        : `${fmt(l.monthly)} par mois dont ${fmt(l.principal * l.rate / 12)} d'intérêts`}${l.missed > 10 ? ` · <b class="neg">${l.missed} jours d'impayé</b>` : ''}</span>
      <button class="btn btn-sm btn-ghost" data-act="loanEarly" data-id="${c.uid}" data-sid="${l.id}">Solder par anticipation</button>
    </div>`;
  }).join('') : ''}

  ${cap > 0 ? `
    <p class="row-sub">La banque irait jusqu'à <b>${fmt(cap)}</b> au vu de tes douze derniers mois.
    Elle ne prend pas de capital, mais l'échéance tombe même les mauvais mois — et le remboursement du capital
    sort de la trésorerie sans jamais apparaître dans ton profit.</p>
    <div class="btn-row">
      ${[0.35, 0.7, 1].map(f => `<button class="btn btn-sm" data-act="loan" data-id="${c.uid}" data-kind="bancaire" data-amount="${Math.round(cap * f)}">Emprunter ${fmt(cap * f)}</button>`).join('')}
    </div>
    <p class="row-sub">Taux proposé : ${(loanRate(c, 'bancaire') * 100).toFixed(2)}% sur 5 ans.</p>
    ${inno ? `
      <div class="btn-row">
        <button class="btn btn-sm btn-ghost" data-act="loan" data-id="${c.uid}" data-kind="innovation" data-amount="${Math.round(cap * 0.7)}">
          <i class="fas fa-flask"></i> Avance innovation ${fmt(cap * 0.7)} à ${(loanRate(c, 'innovation') * 100).toFixed(2)}%
        </button>
      </div>
      <p class="row-sub">Deux ans sans rembourser le capital : c'est ce qui sauve une société qui investit avant d'encaisser.</p>`
      : `<p class="row-sub muted">Une avance innovation demanderait un budget R&D au moins égal à la moitié de tes charges fixes.</p>`}
  ` : `<p class="row-sub muted">Aucune banque ne suivra tant que la société n'a pas douze mois d'existence et un résultat positif installé.</p>`}`;
}

function renderGroup() {
  if (S.companies.length < 2) return '';
  const lvl = groupLevel(S);
  const cur = GROUP_TIERS.find(t => t.level === lvl);
  const next = nextGroupTier(S);
  const gaps = groupTierGaps(S);

  return `
  <section class="card wide">
    <h2><i class="fas fa-sitemap"></i> Ton groupe</h2>
    ${cur
      ? `<div class="metric"><span><i class="fas ${cur.icon}"></i> ${cur.name}</span><b class="accent">niveau ${cur.level}</b></div>
         <p class="row-sub">${cur.effect}</p>`
      : `<p class="row-sub">Tes ${S.companies.length} sociétés vivent chacune de leur côté : mêmes charges, mêmes outils, mêmes erreurs, en double.</p>`}
    ${next ? `
      <div class="group-next">
        <b><i class="fas ${next.icon}"></i> ${next.name} — ${fmt(next.cost)}</b>
        <span class="row-sub">${next.desc}</span>
        <span class="row-sub ok">${next.effect}</span>
        ${gaps.length
          ? `<div class="alert"><i class="fas fa-lock"></i> Il te manque : ${gaps.join(' · ')}.</div>`
          : ''}
        <button class="btn btn-sm ${gaps.length ? 'btn-ghost' : 'btn-primary'}" data-act="groupUp" ${gaps.length || S.money < next.cost ? 'disabled' : ''}>
          Structurer ce niveau
        </button>
      </div>` : '<p class="row-sub ok">Ton groupe est intégré au maximum.</p>'}
  </section>`;
}
