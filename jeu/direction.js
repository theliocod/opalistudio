/* =========================================================
   EMPIRE — La direction déléguée
   Jusqu'ici tout passait par toi : chaque salaire, chaque
   promotion, chaque recrutement, chaque palier. À cinq
   salariés c'est normal. À cinquante, c'est le goulot.
   Un DG est une personne — avec un niveau, un salaire et
   des parts — qui fait tourner la maison à ta place. Bien,
   si tu as choisi la bonne. Et il garde l'opérationnel : le
   prix, la cible, l'acquisition et le capital restent des
   décisions de conseil. Les tiennes.
   ========================================================= */

/* ---------------------------------------------------------
   QUI DIRIGE
   --------------------------------------------------------- */

function ownCeo(c) {
  if (!c.ceo) return null;
  const e = c.staff.find(x => x.id === c.ceo.id);
  return e || null;
}

/* Le DG d'une société : le sien, ou celui du groupe s'il en a un. */
function ceoOf(c) {
  const own = ownCeo(c);
  if (own) return { e: own, c, group: false };
  const g = S.group && S.group.ceo;
  if (!g) return null;
  const gc = S.companies.find(x => x.uid === g.uid);
  const ge = gc && gc.staff.find(x => x.id === g.id);
  if (!ge) return null;
  return { e: ge, c: gc, group: true };
}

function hasCeo(c) { return !!ceoOf(c); }

/* Ce que vaut un DG, de 0,2 à 1 : son niveau, son moral, et un
   DG de groupe est étiré sur plusieurs maisons. */
function ceoPower(c) {
  const d = ceoOf(c);
  if (!d) return 0;
  let p = (d.e.skill / 100) * (0.55 + d.e.morale / 220);
  if (d.group) p *= 0.82;
  return clamp(p, 0.2, 1);
}

/* Les salariés qu'on peut nommer : un senior solide au minimum. */
function ceoCandidates(c) {
  return c.staff.filter(e => (e.grade === undefined ? marketGrade(e.skill) : e.grade) >= 2 && e.skill >= 60 && e.trait !== 'toxique');
}

function ceoTerms(c, e) {
  const salary = Math.round(Math.max(e.salary, marketSalary(e.role, e.skill) * S.wageIndex * GRADES[4].pay / GRADES[marketGrade(e.skill)].pay) * 1.2 / 50) * 50;
  const equity = e.skill >= 85 ? 0.04 : 0.03;
  return { salary, equity };
}

function appointCeo(uid, staffId) {
  const c = S.companies.find(x => x.uid === uid);
  const e = c && c.staff.find(x => x.id === staffId);
  if (!e) return;
  if (ownCeo(c)) return toast(`${c.name} a déjà un DG.`);
  if (!ceoCandidates(c).includes(e)) return toast(`${e.name} n'a pas encore l'étoffe : il faut un senior de niveau 60 au moins.`);
  const t = ceoTerms(c, e);
  if (c.equity - t.equity < 0.1) return toast("Tu descendrais sous 10 % du capital.");
  e.grade = 4;
  e.salary = t.salary;
  e.equity = +((e.equity || 0) + t.equity).toFixed(4);
  c.equity = +(c.equity - t.equity).toFixed(4);
  e.morale = clamp(e.morale + 25, 0, 100);
  e.lastPromo = S.day;
  e.passed = 0;
  c.ceo = { id: e.id, since: S.day, equity: t.equity, log: [] };
  c.culture = clamp(initCulture(c) + 4, 0, 100);
  addLog(S, `${e.name} prend la direction de ${c.name} : ${fmt(t.salary)} par mois et ${Math.round(t.equity * 100)} % du capital. ` +
    `À partir de maintenant, les salaires, les promotions, les recrutements et les paliers passent par ${e.name.split(' ')[0]}. ` +
    `Tu n'as plus besoin d'y passer tes journées.`, 'good');
  render();
}

/* Chercher dehors : un cabinet, trois profils, et une note salée. */
function ceoSearchFee(c) {
  return Math.round(marketSalary('manager', 80) * S.wageIndex * 3 / 100) * 100;
}

function searchCeo(uid) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  if (ownCeo(c)) return toast(`${c.name} a déjà un DG.`);
  const fee = ceoSearchFee(c);
  if (c.cash < fee) return toast(`Un cabinet de chasse coûte ${fmt(fee)}.`);
  c.cash -= fee;
  c.applicants = c.applicants.filter(a => !a.ceo);
  for (let i = 0; i < 3; i++) {
    const cand = makeCandidate('manager', rand(0.95, 1.2));
    cand.skill = clamp(Math.max(cand.skill, Math.round(rand(68, 92))), 5, 99);
    cand.ask = Math.round(marketSalary('manager', cand.skill) * S.wageIndex * GRADES[4].pay * rand(1.1, 1.35) / 50) * 50;
    cand.revealed = true;
    cand.ceo = true;
    cand.waited = -60;          // ils restent deux mois de plus que les autres
    c.applicants.push(cand);
  }
  addLog(S, `${c.name} mandate un cabinet pour trouver un DG (${fmt(fee)}). Trois profils arrivent, tous chers, tous sérieux.`, 'info');
  render();
}

function hireCeo(uid, candId) {
  const c = S.companies.find(x => x.uid === uid);
  const cand = c && c.applicants.find(a => a.id === candId && a.ceo);
  if (!cand) return;
  if (ownCeo(c)) return toast(`${c.name} a déjà un DG.`);
  if (c.cash < cand.ask * 3) return toast(`Il faut ${fmt(cand.ask * 3)} de trésorerie pour l'accueillir.`);
  const equity = cand.skill >= 85 ? 0.04 : 0.03;
  if (c.equity - equity < 0.1) return toast("Tu descendrais sous 10 % du capital.");
  c.cash -= cand.ask;
  const e = hireFrom(cand);
  e.grade = 4;
  e.equity = equity;
  e.lastPromo = S.day;
  c.equity = +(c.equity - equity).toFixed(4);
  c.staff.push(e);
  c.applicants = c.applicants.filter(a => !a.ceo);
  c.ceo = { id: e.id, since: S.day, equity, log: [] };
  addLog(S, `${e.name} arrive à la direction de ${c.name} : ${fmt(e.salary)} par mois, ${Math.round(equity * 100)} % du capital, niveau ${Math.round(e.skill)}. ` +
    `On ne le connaît pas encore. Lui non plus.`, 'good');
  render();
}

function dismissCeo(uid) {
  const c = S.companies.find(x => x.uid === uid);
  const e = c && ownCeo(c);
  if (!e) return;
  const cost = e.salary * 3;
  if (c.cash < cost) return toast(`Trois mois d'indemnités : ${fmt(cost)}.`);
  c.cash -= cost;
  if (S.group && S.group.ceo && S.group.ceo.id === e.id) S.group.ceo = null;
  c.ceo = null;
  e.morale = clamp(e.morale - 30, 0, 100);
  c.staff.forEach(x => x.morale = clamp(x.morale - 5, 0, 100));
  c.culture = clamp(initCulture(c) - 3, 0, 100);
  addLog(S, `Tu retires la direction de ${c.name} à ${e.name}. Il garde ses parts, son titre et une rancune. ` +
    `Tout repasse par toi.`, 'warn');
  render();
}

/* ---------------------------------------------------------
   LE DG DE GROUPE
   Un DG assez bon pour tenir une maison peut en tenir
   plusieurs — moins bien chacune, et plus cher.
   --------------------------------------------------------- */

function groupCeoCandidates() {
  if (groupLevel(S) < 2) return [];
  return S.companies.map(c => ({ c, e: ownCeo(c) })).filter(x => x.e && x.e.skill >= 75);
}

function nameGroupCeo(uid) {
  const c = S.companies.find(x => x.uid === uid);
  const e = c && ownCeo(c);
  if (!e) return;
  if (groupLevel(S) < 2) return toast("Il faut un groupe de niveau 2 pour une direction commune.");
  if (e.skill < 75) return toast(`${e.name} n'a pas le niveau pour tenir plusieurs maisons (75 minimum).`);
  S.group.ceo = { uid: c.uid, id: e.id, since: S.day };
  e.salary = Math.round(e.salary * 1.5 / 50) * 50;
  e.morale = clamp(e.morale + 10, 0, 100);
  addLog(S, `${e.name} devient DG du groupe : ${fmt(e.salary)} par mois. Il tient désormais toutes les sociétés qui n'ont pas leur propre DG — ` +
    `un peu moins bien chacune.`, 'good');
  render();
}

function unnameGroupCeo() {
  if (!S.group || !S.group.ceo) return;
  const c = S.companies.find(x => x.uid === S.group.ceo.uid);
  const e = c && c.staff.find(x => x.id === S.group.ceo.id);
  S.group.ceo = null;
  if (e) { e.salary = Math.round(e.salary / 1.5 / 50) * 50; e.morale = clamp(e.morale - 12, 0, 100); }
  addLog(S, `Fin de la direction commune${e ? ` : ${e.name} redescend sur sa seule société` : ''}.`, 'warn');
  render();
}

/* ---------------------------------------------------------
   CE QUE LE DG FAIT, TOUS LES JOURS ET TOUS LES MOIS
   --------------------------------------------------------- */

function tickDirection(c) {
  // le DG est parti ? la maison le sent tout de suite
  if (c.ceo && !ownCeo(c)) {
    c.ceo = null;
    c.staff.forEach(x => x.morale = clamp(x.morale - 8, 0, 100));
    c.hype = Math.max(1, (c.hype || 1) * 0.92);
    addLog(S, `${c.name} n'a plus de DG. Tout repasse par toi — et l'équipe l'a remarqué.`, 'bad');
  }
  if (S.group && S.group.ceo) {
    const gc = S.companies.find(x => x.uid === S.group.ceo.uid);
    if (!gc || !gc.staff.find(x => x.id === S.group.ceo.id)) {
      S.group.ceo = null;
      addLog(S, `Le DG du groupe n'est plus là. Chaque société se retrouve seule.`, 'bad');
    }
  }

  const d = ceoOf(c);
  if (!d) return;
  const power = ceoPower(c);
  const ceo = d.e;
  const acts = [];

  /* --- tous les jours : les gens qui ont une offre ailleurs --- */
  c.staff.forEach(e => {
    if (!e.offer || e === ceo) return;
    if (S.day - e.offer.day < 2) return;             // il laisse passer deux jours, le temps de savoir
    if (Math.random() > 0.35 + power * 0.65) return;  // un DG moyen est parfois trop lent
    // il promeut si c'est possible, il s'aligne une fois — jamais deux :
    // un DG qui se laisse prendre en otage apprend à toute la maison comment faire
    if (nextGrade(e)) { delete e.offer; promote(c.uid, e.id, true); acts.push(`retient ${e.name} par une promotion`); }
    else if (e.skill >= 60 && !(e.counters > 0) && c.cash > e.offer.amount * 4) { counterKeep(c.uid, e.id, true); acts.push(`s'aligne pour garder ${e.name}`); }
    else { leaveFor(c, e, e.offer.from, e.offer.amount); acts.push(`laisse partir ${e.name}`); }
  });

  /* --- une fois par mois, le reste --- */
  if (c.days % 30 !== 15) { if (acts.length) ceoNote(c, ceo, acts); return; }

  const t = getType(c);
  const payroll = payrollMonthly(c);
  const rev = projectedRevenue(c);
  const cap = capacity(c);
  const churnM = dailyChurn(c) * DAYS_PER_MONTH;
  const span = spanOfControl(c);
  const tight = c.cash < payroll * 2;

  /* salaires : un bon DG réaligne avant que les gens ne demandent ;
     un DG moyen le fait en retard, et un peu trop cher */
  if (!tight) {
    c.staff.filter(e => e !== ceo && fairPay(e) > e.salary * 1.1).forEach(e => {
      if (Math.random() > power) return;
      raiseTo(c.uid, e.id, true);
      if (power < 0.55) e.salary = Math.round(e.salary * 1.06 / 50) * 50;
      acts.push(`réaligne ${e.name}`);
    });
  }

  /* promotions */
  c.staff.filter(e => e !== ceo && nextGrade(e) && c.cash > promoteCost(c, e) * 6).forEach(e => {
    if (Math.random() > power) return;
    promote(c.uid, e.id, true);
    acts.push(`promeut ${e.name} ${gradeOf(e).name.toLowerCase()}`);
  });

  /* ce qui manque : il regarde où ça coince */
  const want = [];
  if (c.clients > cap * 0.85) want.push('ops');
  if (churnM > 0.07) want.push('support');
  if (c.staff.length > span - 1) want.push('manager');
  if (c.quality < 72) want.push('product');
  const roomForPay = payroll < rev * 0.55 && !tight;

  ROLES.forEach(r => {
    const wanted = want.includes(r.id);
    if (wanted && !c.openings[r.id] && roomForPay) {
      c.openings[r.id] = { salary: Math.round(marketSalary(r.id, 50) * S.wageIndex * (1 + power * 0.18) / 50) * 50 };
      acts.push(`ouvre un poste ${r.name.toLowerCase()}`);
    }
    if (!wanted && c.openings[r.id] && c.openings[r.id].byCeo !== false) delete c.openings[r.id];
  });

  /* il fait passer les entretiens lui-même, et il signe */
  if (roomForPay) {
    c.applicants.filter(a => !a.ceo && !a.revealed && want.includes(a.role)).slice(0, 3).forEach(a => a.revealed = true);
    want.forEach(role => {
      const best = c.applicants.filter(a => !a.ceo && a.revealed && a.role === role)
        .sort((a, b) => b.skill - a.skill)[0];
      if (!best) return;
      const ref = marketSalary(role, best.skill) * S.wageIndex;
      if (best.ask > ref * (1.05 + power * 0.25)) return;    // il ne surpaie pas
      if (best.skill < 35 + power * 20) return;             // et il ne prend pas n'importe qui
      if (c.cash < best.ask * 3) return;
      c.cash -= Math.round(best.ask * 0.5);
      c.staff.push(hireFrom(best));
      c.applicants = c.applicants.filter(a => a.id !== best.id);
      acts.push(`recrute ${best.name} (${getRole(role).name.toLowerCase()}, niveau ${best.skill})`);
    });
  }

  /* les gens toxiques : il tranche là où tu hésitais */
  c.staff.filter(e => e !== ceo && e.trait === 'toxique' && e.morale < 45).forEach(e => {
    if (Math.random() > power * 0.6) return;
    c.cash -= e.salary * 2;
    c.staff = c.staff.filter(x => x !== e);
    acts.push(`se sépare de ${e.name}`);
  });

  /* l'infrastructure, quand ça déborde */
  const upCost = Math.round(t.upgradeCost * Math.pow(1.55, c.level - 1));
  if (c.clients > cap * 0.8 && c.cash > upCost * 4 && Math.random() < power) {
    c.cash -= upCost; c.level++;
    acts.push(`passe la maison au niveau ${c.level}`);
  }

  /* les budgets opérationnels — jamais l'acquisition, jamais le prix */
  if (c.quality >= 95 && c.rd > t.fixedCost * 0.3) { c.rd = Math.round(t.fixedCost * 0.3); acts.push(`ramène la R&D à ${fmt(c.rd)}`); }
  else if (c.quality < 80 && c.rd < t.fixedCost && !tight) { c.rd = Math.round(t.fixedCost); acts.push(`monte la R&D à ${fmt(c.rd)}`); }
  if (churnM > 0.08 && !tight) {
    const target = Math.min(rev * 0.06, c.support * 1.3 + 500);
    if (target > c.support) { c.support = Math.round(target / 50) * 50; acts.push(`monte le support à ${fmt(c.support)}`); }
  } else if (churnM < 0.035 && c.support > 0) { c.support = Math.round(c.support * 0.85 / 50) * 50; }

  if (acts.length) ceoNote(c, ceo, acts);
}

function ceoNote(c, ceo, acts) {
  const first = ceo.name.split(' ')[0];
  const txt = acts.length <= 3 ? acts.join(', ') : `${acts.slice(0, 3).join(', ')} et ${acts.length - 3} autre${acts.length > 4 ? 's' : ''}`;
  if (c.ceo) { c.ceo.log.unshift({ d: S.day, txt }); if (c.ceo.log.length > 6) c.ceo.log.length = 6; }
  addLog(S, `${first} (${c.name}) ${txt}.`, 'info');
}

/* ---------------------------------------------------------
   AFFICHAGE
   --------------------------------------------------------- */

function renderDirection(c) {
  const d = ceoOf(c);
  const own = ownCeo(c);

  if (d) {
    const p = ceoPower(c);
    const since = Math.floor((S.day - ((own && c.ceo.since) || (S.group.ceo && S.group.ceo.since) || S.day)) / 30);
    const log = own ? (c.ceo.log || []) : [];
    const gc = groupCeoCandidates().some(x => x.c === c);
    const isGroup = S.group && S.group.ceo && S.group.ceo.id === d.e.id;
    return `
    <div class="direction on">
      <div class="direction-head">
        <span class="mini-av">${personAvatar(d.e, 44)}</span>
        <div>
          <b>${d.e.name} ${isGroup ? '— DG du groupe' : d.group ? '— par la direction du groupe' : '— DG'}</b>
          <span class="row-sub">Niveau ${Math.round(d.e.skill)} · moral ${Math.round(d.e.morale)} · ${since} mois en poste · ${fmt(d.e.salary)}/mois${own && c.ceo.equity ? ` · ${Math.round(c.ceo.equity * 100)} % du capital` : ''}</span>
        </div>
        <div class="ceo-power"><span>Poigne</span><b class="${p >= 0.75 ? 'pos' : p < 0.5 ? 'neg' : ''}">${Math.round(p * 100)} %</b></div>
      </div>
      <p class="row-sub">Salaires, promotions, offres extérieures, recrutements là où ça coince, paliers et budgets opérationnels : c'est lui.
      Le prix, la cible, l'acquisition et le capital restent des décisions de conseil — les tiennes.
      ${p < 0.5 ? '<b class="neg">Avec cette poigne-là, il agit une fois sur deux et paie un peu trop cher.</b>' : ''}</p>
      ${log.length ? `<div class="ceo-log">${log.map(l => `<div><em>j${l.d}</em> ${l.txt}</div>`).join('')}</div>` : ''}
      <div class="btn-row">
        ${own && !isGroup && gc ? `<button class="btn btn-sm btn-primary" data-act="groupCeo" data-id="${c.uid}"><i class="fas fa-sitemap"></i> En faire le DG du groupe</button>` : ''}
        ${own && isGroup ? `<button class="btn btn-sm btn-ghost" data-act="ungroupCeo"><i class="fas fa-sitemap"></i> Fin de la direction commune</button>` : ''}
        ${own ? `<button class="btn btn-sm btn-danger" data-act="dismissCeo" data-id="${c.uid}">Lui retirer la direction (${fmt(d.e.salary * 3)})</button>` : ''}
      </div>
    </div>`;
  }

  const cands = ceoCandidates(c);
  const ext = c.applicants.filter(a => a.ceo);
  return `
  <div class="direction">
    <div class="direction-head">
      <i class="fas fa-user-tie"></i>
      <div>
        <b>Tu diriges toi-même</b>
        <span class="row-sub">Chaque salaire, chaque promotion, chaque recrutement, chaque palier passe par toi. ${c.staff.length >= 10 ? '<b class="warn">À cette taille, c\'est toi le goulot.</b>' : ''}</span>
      </div>
    </div>
    ${cands.length ? `
    <h4>Déléguer la direction à quelqu'un de la maison</h4>
    <div class="ceo-picks">
      ${cands.sort((a, b) => b.skill - a.skill).slice(0, 4).map(e => {
        const t = ceoTerms(c, e);
        return `<div class="ceo-pick">
          <span class="mini-av">${personAvatar(e, 34)}</span>
          <div><b>${e.name}</b><span class="row-sub">${gradeOf(e).name}, niveau ${Math.round(e.skill)}, ${getTrait(e.trait).name.toLowerCase()}</span></div>
          <button class="btn btn-sm" data-act="appointCeo" data-id="${c.uid}" data-eid="${e.id}">Nommer — ${fmt(t.salary)}/mois + ${Math.round(t.equity * 100)} %</button>
        </div>`;
      }).join('')}
    </div>` : `<p class="row-sub">Personne dans l'équipe n'a encore l'étoffe (senior, niveau 60). Fais grandir quelqu'un, ou cherche dehors.</p>`}
    ${ext.length ? `
    <h4>Les profils du cabinet</h4>
    <div class="ceo-picks">
      ${ext.map(a => `<div class="ceo-pick">
          <span class="mini-av">${personAvatar(a, 34)}</span>
          <div><b>${a.name}</b><span class="row-sub">niveau ${a.skill}, ${getTrait(a.trait).name.toLowerCase()} — demande ${fmt(a.ask)}/mois + ${a.skill >= 85 ? 4 : 3} %</span></div>
          <button class="btn btn-sm btn-primary" data-act="hireCeo" data-id="${c.uid}" data-cid="${a.id}">Recruter</button>
        </div>`).join('')}
    </div>` : `<div class="btn-row"><button class="btn btn-sm" data-act="searchCeo" data-id="${c.uid}"><i class="fas fa-magnifying-glass"></i> Chercher un DG à l'extérieur — ${fmt(ceoSearchFee(c))}</button></div>`}
  </div>`;
}

function renderGroupDirection() {
  if (groupLevel(S) < 2) return '';
  const g = S.group.ceo;
  if (g) {
    const gc = S.companies.find(x => x.uid === g.uid);
    const e = gc && gc.staff.find(x => x.id === g.id);
    if (!e) return '';
    const covered = S.companies.filter(c => !ownCeo(c)).length;
    return `<div class="metric"><span><i class="fas fa-user-tie"></i> DG du groupe : ${e.name}</span><b>${covered} société${covered > 1 ? 's' : ''} tenue${covered > 1 ? 's' : ''}</b></div>
      <p class="row-sub">Il dirige toutes les sociétés qui n'ont pas leur propre DG, à 82 % de sa poigne. Les autres gardent le leur.</p>`;
  }
  const cands = groupCeoCandidates();
  return `<p class="row-sub"><i class="fas fa-user-tie"></i> <b>Direction commune :</b> ${cands.length
    ? `un de tes DG peut tenir toutes les maisons sans DG. Va dans l'onglet Équipe de sa société.`
    : `il te faut d'abord un DG de niveau 75 dans une de tes sociétés.`}</p>`;
}
