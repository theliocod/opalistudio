/* =========================================================
   EMPIRE — La vie qu'on a à côté
   Un conjoint qui a sa propre patience, des enfants qui
   grandissent, des amis qui s'éloignent si on ne les voit
   plus. Tout cela se nourrit d'heures, et les heures sont
   exactement ce qui manque quand on construit.
   ========================================================= */

const PARTNER_TRAITS = [
  { id: 'patient', name: 'Patient', patience: 1.45, boost: 1.0,
    desc: "Comprend que tu construises quelque chose. Jusqu'à un certain point." },
  { id: 'ambitieux', name: 'Ambitieuse et prise', patience: 1.25, boost: 1.15,
    desc: "Elle a sa propre carrière, elle ne compte pas tes heures — mais elle compte les siennes." },
  { id: 'exigeant', name: 'Exigeant', patience: 0.6, boost: 1.3,
    desc: "Demande de la présence, et le rend au centuple quand il l'obtient." },
  { id: 'complice', name: 'Complice', patience: 1.1, boost: 1.25,
    desc: "S'intéresse à ce que tu montes, te conseille, te remet en place quand tu déraisonnes." },
  { id: 'fragile', name: 'Fragile', patience: 0.75, boost: 1.35,
    desc: "A besoin d'être rassuré souvent. Quand ça va, ça va très bien." }
];

function partnerTrait(p) { return PARTNER_TRAITS.find(t => t.id === p.trait) || PARTNER_TRAITS[0]; }

function makePartner() {
  const id = 'p' + Math.random().toString(36).slice(2, 8);
  return {
    id,
    name: randomName(),
    look: lookFor(id),
    trait: pick(PARTNER_TRAITS).id,
    relation: 70,
    married: false,
    met: S.day,
    lastCrisis: 0
  };
}

function makeChild() {
  const id = 'k' + Math.random().toString(36).slice(2, 8);
  return {
    id,
    name: pick(FIRST_NAMES),
    look: lookFor(id),
    born: S.day,
    bond: 60
  };
}

function childAge(k) { return Math.floor((S.day - k.born) / DAYS_PER_YEAR); }

function initFamily(s) {
  if (!s.family) s.family = { partner: null, children: [], friends: 55 };
  return s.family;
}

/* ---------------------------------------------------------
   HEURES CONSACRÉES
   --------------------------------------------------------- */

function familyHours() {
  const e = planEntry('family');
  return e ? e.hours : 0;
}

/* Ce qu'il faudrait donner par jour pour que ça tienne */
function familyNeed(s) {
  const f = initFamily(s);
  let need = 0;
  if (f.partner) need += 1.4 / partnerTrait(f.partner).patience;
  need += f.children.reduce((a, k) => a + (childAge(k) < 14 ? 0.9 : 0.5), 0);
  return need;
}

/* ---------------------------------------------------------
   ÉVOLUTION QUOTIDIENNE
   --------------------------------------------------------- */

function tickFamily(s) {
  const f = initFamily(s);
  const hours = familyHours();
  const social = (s.plan.find(p => p.act === 'social') || {}).hours || 0;
  const need = familyNeed(s);
  const overwork = Math.max(0, plannedHours(s) - CONFIG.baseHours);

  /* ---- Le conjoint ---- */
  if (f.partner) {
    const t = partnerTrait(f.partner);
    const given = hours + social * 0.35;
    // Un écart entre ce qu'il attend et ce qu'il reçoit se paie tous les jours
    let drift = (given - need) * 0.10;
    drift -= overwork * 0.022 / t.patience;
    if (s.happiness < 30) drift -= 0.02;
    if (f.partner.relation > 80) drift *= 0.6;      // difficile d'aller plus haut
    f.partner.relation = clamp(f.partner.relation + drift, 0, 100);

    // Ce que la relation te rend
    const r = f.partner.relation;
    if (r > 60) {
      addHappiness((r - 60) / 100 * 0.09 * t.boost);
      s.energy = clamp(s.energy + (r - 60) / 100 * 0.5, 0, energyCeiling(s));
    } else if (r < 35) {
      addHappiness(-(35 - r) / 100 * 0.14);
    }

    // La rupture ne tombe pas du ciel : elle s'annonce, en deux temps
    if (r < 22 && s.day - f.partner.lastCrisis > 120 && Math.random() < 0.004) {
      f.partner.lastCrisis = s.day;
      queueFamilyEvent('crise_couple');
    } else if (r < 42 && overwork > 1 && s.day - (f.partner.lastWarn || 0) > 260 && Math.random() < 0.005) {
      f.partner.lastWarn = s.day;
      queueFamilyEvent('conjoint_ultimatum');
    }
  }

  /* ---- Les enfants ---- */
  f.children.forEach(k => {
    const share = f.children.length ? hours / f.children.length : 0;
    const want = childAge(k) < 14 ? 0.9 : 0.5;
    k.bond = clamp(k.bond + (share - want) * 0.09 - overwork * 0.01, 0, 100);
    if (k.bond > 65) addHappiness((k.bond - 65) / 100 * 0.05);
    else if (k.bond < 30) addHappiness(-(30 - k.bond) / 100 * 0.07);
  });

}

/* Certains moments de vie doivent arriver tout de suite, pas dans trois mois */
function queueFamilyEvent(id) {
  S.forcedEvent = id;
}

/* ---------------------------------------------------------
   ACTIONS
   --------------------------------------------------------- */

function proposeMarriage() {
  const f = initFamily(S);
  if (!f.partner || f.partner.married) return;
  if (f.partner.relation < 55) return toast("Ce n'est vraiment pas le moment de demander ça.");
  const ring = Math.round(clamp(netWorth(S) * 0.01, 1500, 40000));
  if (S.money < ring) return toast(`Il te faudrait au moins ${fmt(ring)} pour faire ça correctement.`);
  S.money -= ring;
  f.partner.married = true;
  f.partner.relation = clamp(f.partner.relation + 18, 0, 100);
  addHappiness(26);
  S.reputation = clamp(S.reputation + 2, 0, 100);
  addLog(S, `Tu épouses ${f.partner.name}. ${fmt(ring)} de bague et de fête.`, 'good');
  render();
}

function breakUp() {
  const f = initFamily(S);
  if (!f.partner) return;
  const p = f.partner;
  if (p.married) {
    const loss = Math.round(netWorth(S) * rand(0.3, 0.45));
    const fromCash = Math.min(S.money, loss);
    S.money -= fromCash;
    let rest = loss - fromCash;
    // s'il faut aller chercher plus loin, on vend des placements
    Object.keys(S.portfolio).forEach(id => {
      if (rest <= 0) return;
      const val = S.portfolio[id] * S.prices[id];
      const take = Math.min(val, rest);
      S.portfolio[id] -= take / S.prices[id];
      rest -= take;
    });
    if (rest > 0) S.debt += rest;
    addLog(S, `Divorce prononcé. ${fmt(loss)} quittent ton patrimoine.`, 'bad');
  } else {
    addLog(S, `Tu te sépares de ${p.name}.`, 'warn');
  }
  addHappiness(-22);
  f.partner = null;
  S.flags = S.flags.filter(x => x !== 'couple');
  render();
}

function haveChild() {
  const f = initFamily(S);
  f.children.push(makeChild());
  S.lifeCost = (S.lifeCost || 0) + 700;
  if (!S.flags.includes('parent')) S.flags.push('parent');
  addHappiness(24);
  const k = f.children[f.children.length - 1];
  addLog(S, `${k.name} vient de naître. Coût de vie +700 €/mois, et deux heures de moins par jour.`, 'good');
  render();
}

/* ---------------------------------------------------------
   AFFICHAGE
   --------------------------------------------------------- */

function renderFamily() {
  const f = initFamily(S);
  const hours = familyHours();
  const need = familyNeed(S);
  const short = hours < need - 0.3;

  if (!f.partner && !f.children.length) {
    return `
    <section class="card">
      <h2><i class="fas fa-heart"></i> Ta vie personnelle</h2>
      <p class="muted">Tu es seul. Les rencontres se font en sortant : mets des heures sur « Vie sociale »
      et vas aux événements. Pour l'instant, tes amis sont ta seule attache.</p>
      <div class="metric" style="margin-top:12px"><span>Amitiés</span><b>${Math.round(friendsScore(S))}/100</b></div>
      ${bar(friendsScore(S), 100, 'happy')}
      <p class="row-sub">${(S.friends || []).length ? `${S.friends.length} ami${S.friends.length > 1 ? 's' : ''} — ils sont dans l'onglet Réseau.` : "Tu n'as plus personne à appeler un dimanche soir."}</p>
    </section>`;
  }

  const p = f.partner;
  const t = p ? partnerTrait(p) : null;

  return `
  <section class="card">
    <h2><i class="fas fa-heart"></i> Ta vie personnelle</h2>
    ${short ? `<div class="alert"><i class="fas fa-triangle-exclamation"></i>
      Tu donnes ${hours}h par jour aux tiens, il en faudrait environ ${need.toFixed(1)}h.
      La relation se dégrade un peu chaque jour.</div>` : ''}

    ${p ? `
    <div class="fam-row">
      <span class="mini-av">${personAvatar(p, 54)}</span>
      <div class="fam-main">
        <b>${p.name}</b>
        <span class="row-sub">${t.name}${p.married ? ' · marié' : ' · en couple'} depuis ${Math.floor((S.day - p.met) / 360)} an(s)</span>
        <div class="metric"><span>Relation</span><b class="${p.relation > 60 ? 'pos' : p.relation > 30 ? 'warn' : 'neg'}">${Math.round(p.relation)}/100</b></div>
        ${bar(p.relation, 100, p.relation > 45 ? 'happy' : 'health')}
        <span class="row-sub">${t.desc}</span>
        <div class="btn-row">
          ${!p.married ? `<button class="btn btn-sm" data-act="marry"><i class="fas fa-ring"></i> Demander en mariage</button>` : ''}
          <button class="btn btn-sm btn-ghost" data-act="breakup">Mettre fin à la relation</button>
        </div>
      </div>
    </div>` : ''}

    ${f.children.length ? `
    <h4 style="margin-top:16px">Tes enfants</h4>
    <div class="kids">
      ${f.children.map(k => `
        <div class="kid">
          <span class="mini-av">${personAvatar(k, 46)}</span>
          <div>
            <b>${k.name}</b>
            <span class="row-sub">${childAge(k)} ans</span>
            ${bar(k.bond, 100, k.bond > 45 ? 'happy' : 'health')}
            <span class="row-sub">${k.bond > 70 ? "Vous êtes proches." : k.bond > 40 ? "Ça va, sans plus." : "Il te connaît à peine."}</span>
          </div>
        </div>`).join('')}
    </div>` : ''}

    <div class="metric" style="margin-top:14px"><span>Amitiés</span><b>${Math.round(friendsScore(S))}/100</b></div>
    ${bar(friendsScore(S), 100, 'happy')}
    <p class="row-sub">${(S.friends || []).length ? `${S.friends.length} ami${S.friends.length > 1 ? 's' : ''}, à entretenir depuis l'onglet Réseau.` : "Plus personne. Ça se paie tous les jours."}</p>
  </section>`;
}
