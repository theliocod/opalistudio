/* =========================================================
   EMPIRE — Les carrières
   Un salarié n'est pas une ligne de charges avec un niveau.
   Il a une ancienneté, un titre, une idée de ce qu'il vaut
   et de ce qu'il deviendra. Si tu ne lui donnes rien à
   viser, quelqu'un d'autre le fera — et il partira avec ce
   qu'il sait, parfois pour te le vendre en face.
   ========================================================= */

/* ---------------------------------------------------------
   LES ÉCHELONS
   Le titre n'est pas décoratif : il change ce que la personne
   produit, ce qu'elle coûte, et ce qu'elle attend de la suite.
   --------------------------------------------------------- */

const GRADES = [
  { id: 0, name: 'Junior',    short: 'Jr',   perf: 0.82, pay: 1,    span: 0, need: 0,  wait: 0,
    desc: "Il apprend. Il coûte peu et il rend peu, pour l'instant." },
  { id: 1, name: 'Confirmé',  short: 'Conf', perf: 1,    pay: 1.28, span: 0, need: 42, wait: 420,
    desc: "Il fait le travail sans qu'on le regarde. C'est déjà beaucoup." },
  { id: 2, name: 'Senior',    short: 'Sr',   perf: 1.22, pay: 1.65, span: 1, need: 62, wait: 900,
    desc: "Il fait le travail et il forme les autres à le faire." },
  { id: 3, name: 'Lead',      short: 'Lead', perf: 1.45, pay: 2.15, span: 3, need: 76, wait: 1500,
    desc: "Il porte un pan entier de la boîte. Sans lui, ça se voit tout de suite." },
  { id: 4, name: 'Directeur', short: 'Dir',  perf: 1.7,  pay: 2.9,  span: 6, need: 86, wait: 2400,
    desc: "Il décide à ta place sur son domaine, et il a souvent raison." }
];

/* Quelqu'un dont on n'a jamais fixé le titre porte celui que son
   niveau lui vaut sur le marché — pas celui d'un débutant. */
function gradeOf(e) {
  const g = e.grade === undefined ? marketGrade(e.skill) : e.grade;
  return GRADES[clamp(g, 0, 4)];
}

/* Le grade que le marché accorde spontanément à ce niveau : c'est déjà
   ce que reflète un salaire de marché. Tout ce qui est au-dessus est
   une décision que tu prends — et qui se paie. */
function marketGrade(skill) {
  return skill >= 84 ? 3 : skill >= 70 ? 2 : skill >= 48 ? 1 : 0;
}

/* Ce que la personne devrait toucher aujourd'hui, dehors, à son grade.
   Le prix de marché tient déjà compte du niveau ; le titre ne pèse que
   pour ce qu'il ajoute au-dessus. */
function fairPay(e) {
  const ratio = gradeOf(e).pay / GRADES[marketGrade(e.skill)].pay;
  return marketSalary(e.role, e.skill) * S.wageIndex * ratio;
}

/* Le grade qu'elle pourrait légitimement viser. */
function nextGrade(e) {
  const g = (e.grade || 0) + 1;
  if (g > 4) return null;
  const n = GRADES[g];
  if (e.skill < n.need) return null;
  if (e.days < n.wait) return null;
  return n;
}

/* Depuis combien de temps elle attend, en mois. */
function waitingMonths(e) {
  return Math.max(0, Math.round((S.day - (e.lastPromo || 0)) / DAYS_PER_MONTH));
}

/* ---------------------------------------------------------
   LA CULTURE
   Ce n'est pas une valeur affichée sur un mur. C'est la
   somme de ce que tu as fait à ceux qui sont restés :
   promotions tenues, salaires justes, gens toxiques gardés
   ou sortis, départs que tu as laissés arriver.
   --------------------------------------------------------- */

function initCulture(c) {
  if (c.culture === undefined) c.culture = 55;
  if (!c.alumni) c.alumni = [];
  return c.culture;
}

function cultureLabel(v) {
  if (v >= 80) return { t: 'good', txt: "On se bat pour entrer ici, et personne ne veut en partir." };
  if (v >= 62) return { t: 'good', txt: "Les gens restent, recommandent, et parlent bien de toi dehors." };
  if (v >= 45) return { t: 'info', txt: "Une boîte comme une autre. On y vient pour le salaire, on en part pour le salaire." };
  if (v >= 28) return { t: 'warn', txt: "Ça se sait dans le métier. Les bons candidats posent des questions." };
  return { t: 'bad', txt: "Réputation d'employeur détestable. Tu recrutes ce que personne ne veut." };
}

/* Ce que la culture change : qui postule, et qui reste. */
function cultureHiring(c) { return clamp(0.55 + initCulture(c) / 90, 0.55, 1.75); }
function cultureRetention(c) { return clamp(1.5 - initCulture(c) / 80, 0.35, 1.5); }

/* ---------------------------------------------------------
   PROMOUVOIR
   --------------------------------------------------------- */

function promoteCost(c, e) {
  const n = nextGrade(e);
  if (!n) return 0;
  const ratio = n.pay / GRADES[marketGrade(e.skill)].pay;
  return Math.round(Math.max(e.salary * 1.06, marketSalary(e.role, e.skill) * S.wageIndex * ratio));
}

function promote(uid, eid) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const e = c.staff.find(x => x.id === eid);
  if (!e) return;
  const n = nextGrade(e);
  if (!n) return toast(`${e.name} n'est pas prêt : il lui faut ${GRADES[(e.grade || 0) + 1] ? `un niveau de ${GRADES[(e.grade || 0) + 1].need} et ${Math.round(GRADES[(e.grade || 0) + 1].wait / 30)} mois d'ancienneté` : 'rien de plus, il est au sommet'}.`);

  const pay = promoteCost(c, e);
  e.grade = (e.grade || 0) + 1;
  e.salary = pay;
  e.lastPromo = S.day;
  e.morale = clamp(e.morale + 26, 0, 100);
  e.passed = 0;
  c.culture = clamp(initCulture(c) + 3.5, 0, 100);
  addLog(S, `${e.name} passe ${n.name} chez ${c.name} : ${fmt(pay)} par mois. ` +
    `Toute l'équipe a vu que ça pouvait arriver.`, 'good');
  // les autres regardent
  c.staff.forEach(x => { if (x !== e) x.morale = clamp(x.morale + 3, 0, 100); });
  render();
}

/* Refuser explicitement — ça se paie tout de suite, et plus tard. */
function passOver(uid, eid) {
  const c = S.companies.find(x => x.uid === uid);
  const e = c && c.staff.find(x => x.id === eid);
  if (!e) return;
  // On ne remet pas le compteur à zéro : il attend toujours, et il
  // sait maintenant que l'attente peut ne mener nulle part.
  e.passed = (e.passed || 0) + 1;
  e.morale = clamp(e.morale - 16, 0, 100);
  c.culture = clamp(initCulture(c) - 2.5, 0, 100);
  addLog(S, `Tu expliques à ${e.name} que ce n'est pas le moment. Il hoche la tête. ` +
    `C'est la ${e.passed}${e.passed > 1 ? 'e' : 're'} fois.`, 'warn');
  render();
}

/* Aligner un salaire sur le marché sans changer de titre. */
function raiseTo(uid, eid) {
  const c = S.companies.find(x => x.uid === uid);
  const e = c && c.staff.find(x => x.id === eid);
  if (!e) return;
  const fair = Math.round(fairPay(e));
  if (fair <= e.salary) return toast(`${e.name} est déjà payé au-dessus du marché.`);
  const gap = fair - e.salary;
  e.salary = fair;
  e.morale = clamp(e.morale + 14, 0, 100);
  c.culture = clamp(initCulture(c) + 1.2, 0, 100);
  addLog(S, `Tu réalignes le salaire de ${e.name} sur le marché : +${fmt(gap)} par mois. ` +
    `Il ne t'avait rien demandé — c'est précisément pour ça que ça compte.`, 'good');
  render();
}

/* ---------------------------------------------------------
   LA CHASSE
   Personne ne travaille dans le vide. Quand quelqu'un est bon,
   sous-payé et sans perspective, le téléphone finit par sonner.
   --------------------------------------------------------- */

/* Le risque qu'un salarié se fasse débaucher, par jour. */
function poachRisk(c, e) {
  const fair = fairPay(e);
  const under = clamp(fair / Math.max(1, e.salary) - 1, 0, 1.2);   // sous-payé
  const stuck = nextGrade(e) ? clamp(waitingMonths(e) / 30, 0, 1.2) : 0;
  const seen = clamp((e.skill - 55) / 45, 0, 1);                    // on ne chasse que les bons
  if (seen <= 0) return 0;

  let r = seen * (0.25 + under * 1.5 + stuck * 0.9 + (e.passed || 0) * 0.35);
  r *= clamp(1.3 - e.morale / 90, 0.25, 1.3);
  r *= cultureRetention(c);
  r *= e.equity ? 0.45 : 1;                                         // on ne quitte pas ses parts
  r *= ecoHiring(S) > 1.1 ? 0.7 : 1.25;                             // en crise, on ne bouge pas
  // Un très bon élément qu'on laisse stagner et sous-payer reçoit un
  // appel tous les trois ou quatre mois. Quelqu'un de correct, tous
  // les deux ans. Quelqu'un de moyen, jamais.
  return clamp(r * 0.012, 0, 0.014);
}

/* Ce qu'il faut mettre pour le retenir quand il a une offre. */
function counterOffer(e) {
  return Math.round(Math.max(fairPay(e), e.salary) * rand(1.18, 1.34));
}

function tickCareers(c) {
  initCulture(c);

  c.staff.forEach(e => {
    // Reprise d'une partie d'avant les carrières : on donne à chacun le
    // titre que son niveau justifie, et on ne le considère pas comme
    // ayant attendu dix ans dès la première seconde.
    if (e.grade === undefined) e.grade = marketGrade(e.skill);
    if (e.lastPromo === undefined) e.lastPromo = S.day - Math.min(e.days, 300);

    /* --- l'attente pèse sur le moral --- */
    const n = nextGrade(e);
    if (n) {
      const m = waitingMonths(e);
      if (m > 8) e.morale = clamp(e.morale - (m - 8) * 0.006, 0, 100);
    }
    // et un salaire décroché du marché finit toujours par se voir
    const under = fairPay(e) / Math.max(1, e.salary);
    if (under > 1.15) e.morale = clamp(e.morale - (under - 1.15) * 0.35, 0, 100);

    /* --- l'offre extérieure --- */
    if (!e.offer && Math.random() < poachRisk(c, e)) {
      e.offer = { day: S.day, amount: counterOffer(e), from: poacherName(c) };
      S.forcedEvent = 'debauchage';
      S.poached = { uid: c.uid, id: e.id };
      addLog(S, `${e.name} demande à te parler. Il a une proposition ailleurs.`, 'warn');
    }
    // s'il a une offre et que tu ne fais rien, il part
    if (e.offer && S.day - e.offer.day > 12) {
      leaveFor(c, e, e.offer.from, e.offer.amount);
    }
  });

  /* --- la culture dérive vers ce que tu fais vraiment --- */
  if (c.staff.length) {
    const avgMorale = c.staff.reduce((a, e) => a + e.morale, 0) / c.staff.length;
    const underpaid = c.staff.filter(e => fairPay(e) > e.salary * 1.12).length / c.staff.length;
    const toxic = c.staff.filter(e => e.trait === 'toxique').length / c.staff.length;
    const target = clamp(avgMorale * 0.7 + 25 - underpaid * 30 - toxic * 35, 0, 100);
    c.culture = clamp(c.culture + (target - c.culture) * 0.0035, 0, 100);
  }
}

const POACHERS = ["un concurrent direct", "une boîte américaine", "un ancien collègue devenu fondateur",
  "un cabinet qui recrute pour un fonds", "une scale-up qui vient de lever", "le leader du secteur"];

function poacherName(c) {
  const known = (c.rivals || []).filter(r => r.known);
  if (known.length && Math.random() < 0.5) return pick(known).name;
  return pick(POACHERS);
}

/* ---------------------------------------------------------
   LE DÉPART
   Quelqu'un qui part emporte trois choses : ce qu'il faisait,
   ce qu'il savait de toi, et l'exemple qu'il donne aux autres.
   --------------------------------------------------------- */

function leaveFor(c, e, where, amount) {
  c.staff = c.staff.filter(x => x !== e);
  delete e.offer;
  initCulture(c);
  c.alumni.push({ name: e.name, role: e.role, skill: e.skill, grade: e.grade || 0, day: S.day, where });

  // les autres voient partir quelqu'un de bon, et se posent des questions
  c.staff.forEach(x => x.morale = clamp(x.morale - (e.skill > 70 ? 7 : 3), 0, 100));
  c.culture = clamp(c.culture - (e.skill > 70 ? 3 : 1), 0, 100);

  addLog(S, `${e.name} (${gradeOf(e).name.toLowerCase()}, niveau ${Math.round(e.skill)}) part chez ${where}` +
    `${amount ? ` pour ${fmt(amount)}` : ''}. Il connaissait tes clients et tes chiffres.`, 'bad');

  // les meilleurs ne se contentent pas toujours d'un autre salaire
  if (e.skill > 60 && (e.passed || 0) >= 1 && Math.random() < 0.45) {
    spawnRevengeRival(c, e);
  }
}

/* Un très bon élément qu'on a fait attendre trop longtemps
   ne va pas toujours chez le voisin. Parfois il monte la sienne,
   et il sait exactement où tu es fragile. */
function spawnRevengeRival(c, e) {
  if (!c.rivals) c.rivals = [];
  const kind = RIVAL_KINDS.find(k => k.id === 'funded') || RIVAL_KINDS[0];
  const r = {
    id: 'ex-' + e.id,
    name: `${e.name.split(' ').slice(-1)[0]} & Co`,
    kind: kind.id,
    strength: clamp(e.skill / 130, 0.25, 0.8),
    quality: Math.round(clamp(e.skill * 0.9, 30, 92)),
    price: 0.88,
    aggression: 0.85,
    clients: Math.round(c.clients * rand(0.03, 0.09)),
    known: true,
    grudge: 0.5,         // il ne t'a pas quitté, il est parti contre toi
    founder: e.name
  };
  c.rivals.push(r);
  c.clients = Math.max(0, Math.round(c.clients * 0.94));
  addLog(S, `⚔️ ${e.name} n'est pas allé chez un concurrent : il en a monté un. ` +
    `${r.name} démarre avec ${num(r.clients)} de tes clients et il connaît chacun de tes défauts.`, 'bad');
}

/* Retenir quelqu'un qui a une offre. */
function counterKeep(uid, eid) {
  const c = S.companies.find(x => x.uid === uid);
  const e = c && c.staff.find(x => x.id === eid);
  if (!e || !e.offer) return;
  const amount = e.offer.amount;
  if (c.cash < amount * 2) return toast(`Il faudrait au moins ${fmt(amount * 2)} de trésorerie pour tenir cet engagement.`);
  e.salary = amount;
  e.morale = clamp(e.morale + 20, 0, 100);
  e.counters = (e.counters || 0) + 1;
  delete e.offer;
  // Retenir à coups de salaire marche une fois. La deuxième, il sait
  // qu'il n'obtient rien sans menacer de partir — et ça se sait.
  if (e.counters > 1) c.culture = clamp(initCulture(c) - 4, 0, 100);
  addLog(S, `Tu t'alignes : ${e.name} reste pour ${fmt(amount)}. ` +
    (e.counters > 1 ? "C'est la deuxième fois. L'équipe a compris comment on obtient une augmentation ici." :
      "Il reste, et il sait ce qu'il vaut désormais."), 'info');
  render();
}

function letGo(uid, eid) {
  const c = S.companies.find(x => x.uid === uid);
  const e = c && c.staff.find(x => x.id === eid);
  if (!e || !e.offer) return;
  leaveFor(c, e, e.offer.from, e.offer.amount);
  render();
}

/* ---------------------------------------------------------
   AFFICHAGE
   --------------------------------------------------------- */

function gradeChip(e) {
  const g = gradeOf(e);
  return `<span class="grade g${g.id}" title="${g.desc}">${g.name}</span>`;
}

function careerLine(c, e) {
  const n = nextGrade(e);
  const fair = fairPay(e);
  const under = fair > e.salary * 1.08;
  const waited = waitingMonths(e);

  if (e.offer) {
    return `<div class="career alert-offer">
      <b><i class="fas fa-fire"></i> ${e.offer.from} lui propose ${fmt(e.offer.amount)}</b>
      <span class="row-sub">Il te laisse quelques jours. Ensuite il ne redemandera pas.</span>
      <div class="career-acts">
        <button class="btn btn-sm btn-primary" data-act="counter" data-id="${c.uid}" data-eid="${e.id}">S'aligner — ${fmt(e.offer.amount)}</button>
        <button class="btn btn-sm btn-ghost" data-act="letgo" data-id="${c.uid}" data-eid="${e.id}">Le laisser partir</button>
      </div>
    </div>`;
  }

  const bits = [];
  if (n) bits.push(`<button class="btn btn-sm btn-primary" data-act="promote" data-id="${c.uid}" data-eid="${e.id}">
      Promouvoir ${n.name} — ${fmt(promoteCost(c, e))}</button>
    <button class="btn btn-sm btn-ghost" data-act="passover" data-id="${c.uid}" data-eid="${e.id}">Pas maintenant</button>`);
  if (under) bits.push(`<button class="btn btn-sm" data-act="raise" data-id="${c.uid}" data-eid="${e.id}">
      Réaligner — ${fmt(fair)}</button>`);
  if (!bits.length) return '';

  return `<div class="career ${n ? 'ready' : ''}">
    <b>${n ? `<i class="fas fa-arrow-up"></i> Prêt pour ${n.name}` : `<i class="fas fa-scale-unbalanced"></i> Payé sous le marché`}</b>
    <span class="row-sub">
      ${n ? `Niveau ${Math.round(e.skill)}, ${Math.round(e.days / 30)} mois d'ancienneté.
             ${waited > 10 ? `Il attend depuis ${waited} mois.` : ''}
             ${(e.passed || 0) ? `Tu l'as déjà passé ${e.passed} fois.` : ''}` : ''}
      ${under ? `Le marché le paierait ${fmt(fair)}, tu le paies ${fmt(e.salary)}.` : ''}
    </span>
    <div class="career-acts">${bits.join('')}</div>
  </div>`;
}

function renderCulture(c) {
  const v = initCulture(c);
  const l = cultureLabel(v);
  const risky = c.staff.filter(e => poachRisk(c, e) > 0.0018);
  return `
  <div class="culture ${l.t}">
    <div class="culture-top">
      <span><i class="fas fa-people-group"></i> Culture d'entreprise</span>
      <b>${Math.round(v)}</b>
    </div>
    ${bar(v, 100, v >= 55 ? 'happy' : 'health')}
    <p class="row-sub">${l.txt}</p>
    <p class="row-sub">
      Elle change qui postule chez toi (×${cultureHiring(c).toFixed(2)} de candidatures)
      et qui accepte de rester quand on l'appelle ailleurs.
    </p>
    ${risky.length ? `<p class="row-sub warn"><i class="fas fa-triangle-exclamation"></i>
      ${risky.length === 1 ? `${risky[0].name} est` : `${risky.length} personnes sont`} en train de te filer entre les doigts :
      sous-payé${risky.length > 1 ? 's' : ''} ou sans perspective.</p>` : ''}
    ${(c.alumni || []).length ? `<p class="row-sub"><i class="fas fa-door-open"></i>
      ${c.alumni.length} départ${c.alumni.length > 1 ? 's' : ''} depuis le début. Le métier est petit : ça se raconte.</p>` : ''}
  </div>`;
}
