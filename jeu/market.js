/* =========================================================
   EMPIRE — Les segments de clientèle
   Jusqu'ici un marché était un nombre et un client valait un
   client. Or on ne vend pas la même chose au même prix aux
   mêmes gens : le grand public veut que ce soit pas cher, les
   professionnels veulent que ça marche, les grands comptes
   veulent qu'on réponde au téléphone.
   Choisir à qui l'on parle est la première décision d'une
   entreprise — et la plus difficile à changer ensuite.
   ========================================================= */

const SEGMENTS = [
  {
    id: 'masse', name: 'Grand public', icon: 'fa-users', color: '#38bdf8',
    price: 0.78,        // ce qu'ils acceptent de payer par rapport au marché
    need: 34,           // qualité en dessous de laquelle ils fuient
    rev: 0.86,          // revenu par client
    churn: 1.35,        // ils partent plus vite
    cac: 0.62,          // mais ils coûtent moins cher à acquérir
    cap: 2.2,           // et on les sert en libre-service, par milliers
    absorb: 1.3,        // et ils signent tout de suite
    chan: { organic: 1.25, paid: 1.2, influence: 1.15, outbound: 0.35 },
    desc: "Beaucoup de monde, peu d'argent chacun, aucune fidélité. Le volume fait tout.",
    play: "Il faut un produit simple, un prix bas et une machine d'acquisition qui tourne."
  },
  {
    id: 'pro', name: 'Professionnels', icon: 'fa-briefcase', color: '#f97316',
    price: 1.12,
    need: 55,
    rev: 1.9,
    churn: 0.78,
    cac: 1.35,
    cap: 1,
    absorb: 1,
    chan: { organic: 1, paid: 0.85, influence: 0.9, outbound: 1.35 },
    desc: "Ils paient si ça leur fait gagner du temps ou de l'argent. Et ils comparent.",
    play: "Le produit doit tenir ses promesses. La prospection paie mieux que la publicité."
  },
  {
    id: 'premium', name: 'Grands comptes', icon: 'fa-crown', color: '#e8c46a',
    price: 1.55,
    need: 76,
    rev: 5.2,
    churn: 0.42,
    cac: 2.6,
    cap: 0.26,          // chacun exige un service que rien ne remplace
    absorb: 0.4,        // et les cycles de vente durent des mois
    chan: { organic: 0.6, paid: 0.4, influence: 0.85, outbound: 1.9 },
    desc: "Peu de clients, des contrats énormes, une exigence sans pitié et des cycles longs.",
    play: "Sans un produit irréprochable et une vraie force commerciale, n'y va pas."
  }
];

function getSegment(id) { return SEGMENTS.find(s => s.id === id); }

/* Comment un marché se répartit selon le type d'entreprise. */
const TYPE_MIX = {
  freelance:  { masse: 0.15, pro: 0.60, premium: 0.25 },
  creator:    { masse: 0.88, pro: 0.10, premium: 0.02 },
  dropship:   { masse: 0.92, pro: 0.07, premium: 0.01 },
  agence:     { masse: 0.10, pro: 0.58, premium: 0.32 },
  dtc:        { masse: 0.80, pro: 0.15, premium: 0.05 },
  saas:       { masse: 0.42, pro: 0.46, premium: 0.12 },
  foodtruck:  { masse: 0.94, pro: 0.06, premium: 0.00 },
  resto:      { masse: 0.72, pro: 0.20, premium: 0.08 },
  immo:       { masse: 0.55, pro: 0.28, premium: 0.17 },
  studio:     { masse: 0.90, pro: 0.08, premium: 0.02 },
  ia:         { masse: 0.20, pro: 0.48, premium: 0.32 },
  holding:    { masse: 0.05, pro: 0.35, premium: 0.60 }
};

function typeMix(c) { return TYPE_MIX[c.typeId] || { masse: 0.5, pro: 0.35, premium: 0.15 }; }

/* Le segment visé. « tous » = on ne choisit pas, et on prend
   la moyenne — c'est confortable et ça ne gagne jamais. */
function focusOf(c) { return c.focus || 'tous'; }

/* Les coefficients effectifs de la société, selon son positionnement. */
function segFactors(c) {
  const f = focusOf(c);
  if (f !== 'tous') {
    const s = getSegment(f);
    return { price: s.price, need: s.need, rev: s.rev, churn: s.churn, cac: s.cac,
      cap: s.cap, absorb: s.absorb, chan: s.chan, share: typeMix(c)[f], seg: s };
  }
  // Moyenne pondérée : on est acceptable partout, excellent nulle part.
  // Et surtout, « parler à tout le monde » ne veut pas dire qu'on atteint
  // tout le monde : un discours qui ne vise personne n'accroche jamais
  // qu'une partie de chaque segment. On en perd un tiers d'entrée.
  const mix = typeMix(c);
  const w = (k) => SEGMENTS.reduce((a, s) => a + mix[s.id] * s[k], 0);
  // Capacité et vitesse de signature sont des débits : on ne fait pas la
  // moyenne de deux vitesses, on fait la moyenne des temps passés. Sinon
  // on encaisserait le chiffre d'un grand compte au coût de service d'un
  // particulier — ce qui n'arrive jamais.
  const h = (k) => 1 / SEGMENTS.reduce((a, s) => a + mix[s.id] / s[k], 0);
  const chan = {};
  CHANNELS.forEach(ch => { chan[ch.id] = SEGMENTS.reduce((a, s) => a + mix[s.id] * s.chan[ch.id], 0); });
  return {
    price: w('price'), need: w('need'), rev: w('rev') * 0.86,
    churn: w('churn') * 1.1, cac: w('cac') * 1.22,
    cap: h('cap'), absorb: h('absorb'), chan, share: 0.66, seg: null
  };
}

/* Le marché réellement adressable une fois le positionnement choisi. */
function segMarketShare(c) { return segFactors(c).share; }

/* La qualité attendue par ceux à qui l'on parle. En dessous,
   ils ne restent pas — quel que soit le prix. */
function qualityGap(c) {
  const f = segFactors(c);
  return c.quality - f.need;
}

/* Pénalité de rétention quand le produit est en dessous des attentes. */
function segChurnPenalty(c) {
  const gap = qualityGap(c);
  if (gap >= 0) return 1;
  return clamp(1 + Math.pow(-gap / 26, 1.7), 1, 3.4);
}

/* Et surtout : on ne signe pas. Un client exigeant ne devient pas
   client d'un produit qui ne fait pas le travail — il regarde la
   démo, il dit qu'il revient vers vous, et il ne revient pas.
   Plus le segment est exigeant, plus la falaise est raide. */
function segAcqPenalty(c) {
  const gap = qualityGap(c);
  if (gap >= 0) return 1;
  return clamp(Math.pow(1 + gap / 42, 2), 0.05, 1);
}

/* ---------------------------------------------------------
   CHANGER DE POSITIONNEMENT
   Ça se fait, et ça coûte : on perd les clients qui n'étaient
   pas là pour ça, et il faut du temps pour se refaire une
   réputation auprès des nouveaux.
   --------------------------------------------------------- */

/* Monter en gamme coûte plus cher que descendre : il faut refaire le
   produit avant de pouvoir refaire le discours. Et sauter une marche
   — du grand public aux grands comptes — c'est changer de métier. */
const SEG_RANK = { masse: 0, tous: 1, pro: 2, premium: 3 };

function repositionCost(c, to) {
  const from = focusOf(c);
  if (from === to) return 0;
  const step = SEG_RANK[to] - SEG_RANK[from];
  const dist = 1 + Math.abs(step) * 0.35 + (step > 0 ? step * 0.3 : 0);
  return Math.round((projectedRevenue(c) * 0.9 + getType(c).fixedCost * 3) * dist);
}

function reposition(uid, to) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c) return;
  const from = focusOf(c);
  if (from === to) return;
  const cost = repositionCost(c, to);
  if (c.cash < cost) return toast(`Repositionner ${c.name} coûte ${fmt(cost)} : refonte du produit, du discours et des tarifs.`);

  c.cash -= cost;
  // ceux qui étaient venus pour l'ancienne promesse s'en vont
  const keep = from === 'tous' || to === 'tous' ? 0.62 : 0.34;
  const lost = Math.round(c.clients * (1 - keep));
  c.clients = Math.max(0, c.clients - lost);
  c.focus = to;
  c.repositioned = S.day;
  c.hype = Math.max(1, (c.hype || 1) * 0.9);

  const s = to === 'tous' ? null : getSegment(to);
  addLog(S,
    `${c.name} se repositionne ${s ? `sur « ${s.name.toLowerCase()} »` : 'sans cible précise'} pour ${fmt(cost)}. ` +
    `${num(lost)} clients partent — ils n'étaient pas venus pour ça.`,
    'warn');
  render();
}

/* ---------------------------------------------------------
   AFFICHAGE
   --------------------------------------------------------- */

function renderPositioning(c) {
  const cur = focusOf(c);
  const f = segFactors(c);
  const gap = qualityGap(c);
  const pen = segChurnPenalty(c);

  return `
  <h4><i class="fas fa-bullseye"></i> À qui tu vends</h4>
  <p class="row-sub">
    Un marché n'est pas une masse uniforme. Choisir un segment réduit le nombre de clients
    possibles mais change tout le reste : le prix qu'ils acceptent, le revenu qu'ils apportent,
    leur fidélité, ce qu'ils exigent du produit, et les canaux qui les touchent.
  </p>

  ${gap < 0 ? `<div class="alert"><i class="fas fa-triangle-exclamation"></i>
    Ton produit est à ${Math.round(c.quality)} alors que ${cur === 'tous' ? 'ta clientèle moyenne' : getSegment(cur).name.toLowerCase()}
    en attend ${Math.round(f.need)}. Tes clients partent ${((pen - 1) * 100).toFixed(0)} % plus vite que la normale.
    Monte la qualité, ou vise plus bas.</div>` : ''}

  <div class="segs">
    ${[{ id: 'tous', name: 'Sans cible précise', icon: 'fa-circle-nodes', color: '#94a3b8',
        desc: "Tu parles à tout le monde, donc à personne en particulier. Confortable, jamais gagnant.",
        play: "Acceptable au départ. Un concurrent focalisé finira par te prendre chaque segment." }]
      .concat(SEGMENTS).map(s => {
      const on = cur === s.id;
      const mix = s.id === 'tous' ? 0.66 : typeMix(c)[s.id];
      const size = Math.round(marketSize(c) / segMarketShare(c) * mix);
      const cost = repositionCost(c, s.id);
      const ready = s.id === 'tous' || c.quality >= s.need - 8;
      return `
      <div class="seg ${on ? 'on' : ''} ${ready ? '' : 'risky'}" style="--c:${s.color}">
        <div class="seg-head">
          <i class="fas ${s.icon}"></i>
          <div><b>${s.name}</b><span class="row-sub">${num(size)} clients possibles</span></div>
          ${on ? '<span class="chip ok">ta cible</span>' : ''}
        </div>
        <p class="row-sub">${s.desc}</p>
        ${s.id !== 'tous' ? `
        <div class="seg-stats">
          <span title="prix acceptable"><i class="fas fa-tag"></i> ×${s.price.toFixed(2)}</span>
          <span title="revenu par client"><i class="fas fa-coins"></i> ×${s.rev.toFixed(2)}</span>
          <span title="fidélité"><i class="fas fa-heart"></i> churn ×${s.churn.toFixed(2)}</span>
          <span title="coût d'acquisition"><i class="fas fa-bullhorn"></i> ×${s.cac.toFixed(2)}</span>
          <span title="qualité exigée" class="${c.quality >= s.need ? 'ok' : 'ko'}"><i class="fas fa-gem"></i> ${s.need} min.</span>
          <span title="clients servis par la même équipe"><i class="fas fa-headset"></i> capacité ×${s.cap.toFixed(2)}</span>
        </div>
        <p class="row-sub"><i class="fas fa-lightbulb"></i> ${s.play}</p>` : `<p class="row-sub"><i class="fas fa-lightbulb"></i> ${s.play}</p>`}
        ${on ? '' : `<button class="btn btn-sm ${ready ? '' : 'btn-ghost'}" data-act="reposition" data-id="${c.uid}" data-seg="${s.id}">
          Se repositionner — ${fmt(cost)}
        </button>`}
      </div>`;
    }).join('')}
  </div>`;
}
