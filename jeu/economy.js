/* =========================================================
   EMPIRE — La conjoncture
   Jusqu'ici le monde était plat : le marché revenait toujours
   à la normale et rien n'arrivait de l'extérieur. Or le moment
   où l'on lève, où l'on recrute, où l'on achète et où l'on
   vend compte au moins autant que ce qu'on fait.
   Un cycle en cinq phases, des secteurs qui ont leur propre
   vie, et des signaux qu'on peut apprendre à lire.
   ========================================================= */

const CYCLE_PHASES = [
  {
    id: 'reprise', name: 'Reprise', icon: 'fa-seedling', color: '#22c55e',
    demand: 0.94, funding: 0.85, valuation: 0.9, wage: 0.96, rate: 0.004,
    hiring: 1.15, property: 0.8, min: 300, max: 700,
    desc: "L'argent revient doucement, les gens sont encore prudents, et les bons profils sont disponibles.",
    play: "Le meilleur moment pour recruter et pour acheter de la pierre."
  },
  {
    id: 'expansion', name: 'Expansion', icon: 'fa-arrow-trend-up', color: '#38bdf8',
    demand: 1.08, funding: 1.1, valuation: 1.15, wage: 1.05, rate: 0,
    hiring: 1, property: 1.1, min: 400, max: 900,
    desc: "Tout monte. La demande est là, les fonds signent, les salaires commencent à grimper.",
    play: "Le moment de pousser les budgets et de prendre des parts de marché."
  },
  {
    id: 'euphorie', name: 'Euphorie', icon: 'fa-fire', color: '#f97316',
    demand: 1.16, funding: 1.45, valuation: 1.55, wage: 1.22, rate: 0.008,
    hiring: 0.72, property: 1.35, min: 180, max: 420,
    desc: "Les valorisations n'ont plus grand-chose à voir avec les comptes. Personne ne veut être le premier à s'arrêter.",
    play: "Lève maintenant, vends maintenant. Ça ne durera pas."
  },
  {
    id: 'retournement', name: 'Retournement', icon: 'fa-arrow-trend-down', color: '#facc15',
    demand: 0.96, funding: 0.6, valuation: 0.78, wage: 1.06, rate: 0.014,
    hiring: 1.05, property: 0.7, min: 150, max: 320,
    desc: "Les tours de table traînent, les acheteurs négocient, et tout le monde fait semblant d'y croire encore.",
    play: "Sécurise ta trésorerie. Ce n'est pas le moment de dépendre d'une levée."
  },
  {
    id: 'crise', name: 'Crise', icon: 'fa-cloud-bolt', color: '#ef4444',
    demand: 0.8, funding: 0.28, valuation: 0.55, wage: 0.9, rate: 0.02,
    hiring: 1.4, property: 0.55, min: 220, max: 520,
    desc: "Les budgets se coupent, les clients partent, et les fonds ne répondent plus. Les meilleurs profils cherchent du travail.",
    play: "Survivre suffit. Et si tu as du cash, tout est à moitié prix."
  }
];

/* Après chaque phase, celle qui suit — avec une part de hasard. */
const CYCLE_NEXT = {
  reprise: ['expansion', 'expansion', 'expansion', 'retournement'],
  expansion: ['euphorie', 'euphorie', 'retournement'],
  euphorie: ['retournement', 'retournement', 'crise'],
  retournement: ['crise', 'crise', 'reprise'],
  crise: ['reprise', 'reprise', 'reprise', 'retournement']
};

const SECTORS = [
  { id: 'tech', name: 'Technologie', icon: 'fa-microchip', vol: 0.42 },
  { id: 'commerce', name: 'Commerce', icon: 'fa-bag-shopping', vol: 0.26 },
  { id: 'service', name: 'Services', icon: 'fa-briefcase', vol: 0.18 },
  { id: 'food', name: 'Restauration', icon: 'fa-utensils', vol: 0.22 }
];

function phaseOf(id) { return CYCLE_PHASES.find(p => p.id === id) || CYCLE_PHASES[1]; }

function initEco(s) {
  if (!s.eco) {
    s.eco = {
      phase: 'expansion', since: 0, until: 520,
      sectors: { tech: 1, commerce: 1, service: 1, food: 1 },
      bubble: null, history: []
    };
  }
  return s.eco;
}

function ecoPhase(s = S) { return phaseOf(initEco(s).phase); }
function ecoSector(s, sectorId) { return (initEco(s).sectors[sectorId] || 1); }

/* Le secteur d'une société, pour savoir quelle vague la porte. */
function sectorOfCompany(c) { return SECTOR_OF[c.typeId] || 'service'; }

/* ---------------------------------------------------------
   CE QUE LA CONJONCTURE CHANGE
   --------------------------------------------------------- */

function ecoDemand(s = S) { return ecoPhase(s).demand; }
function ecoFunding(s = S) { return ecoPhase(s).funding; }
function ecoValuation(s = S) { return ecoPhase(s).valuation; }
function ecoRate(s = S) { return ecoPhase(s).rate; }
function ecoHiring(s = S) { return ecoPhase(s).hiring; }
function ecoProperty(s = S) { return ecoPhase(s).property; }

/* Le multiplicateur qui s'applique à une société donnée :
   la conjoncture générale, plus la vague de son secteur. */
function ecoFor(c, s = S) {
  return ecoDemand(s) * ecoSector(s, sectorOfCompany(c));
}

/* ---------------------------------------------------------
   LES SIGNAUX
   On ne prévient jamais qu'une crise arrive. On laisse des
   indices : c'est au joueur de les lire.
   --------------------------------------------------------- */

function ecoSignals(s = S) {
  const e = initEco(s);
  const p = phaseOf(e.phase);
  const elapsed = s.day - e.since;
  const late = elapsed / Math.max(1, e.until - e.since);
  const out = [];

  if (p.id === 'euphorie')
    out.push({ t: 'bad', txt: "Des sociétés sans revenus lèvent à des multiples absurdes. Ça finit toujours pareil." });
  if (p.id === 'expansion' && late > 0.7)
    out.push({ t: 'warn', txt: "Les salaires montent plus vite que la productivité. Le cycle vieillit." });
  if (p.id === 'retournement')
    out.push({ t: 'warn', txt: "Les tours de table prennent trois mois de plus qu'avant." });
  if (p.id === 'crise' && late > 0.6)
    out.push({ t: 'good', txt: "Les premiers acheteurs reviennent sur les actifs décotés." });
  if (p.id === 'reprise')
    out.push({ t: 'good', txt: "Les bons profils sont encore disponibles, et pas chers." });
  if (late > 0.85)
    out.push({ t: 'warn', txt: "Ce cycle dure depuis longtemps. Il ne durera pas éternellement." });

  const hot = Object.entries(e.sectors).filter(([, v]) => v > 1.2);
  hot.forEach(([id, v]) => out.push({
    t: v > 1.45 ? 'bad' : 'good',
    txt: `${SECTORS.find(x => x.id === id).name} : la vague porte (×${v.toFixed(2)})${v > 1.45 ? ", et ça ressemble à une bulle" : ''}.`
  }));
  const cold = Object.entries(e.sectors).filter(([, v]) => v < 0.82);
  cold.forEach(([id, v]) => out.push({
    t: 'warn', txt: `${SECTORS.find(x => x.id === id).name} : le secteur est en creux (×${v.toFixed(2)}).`
  }));

  return out;
}

/* ---------------------------------------------------------
   LA MÉCANIQUE DU CYCLE
   --------------------------------------------------------- */

function tickEco(s) {
  const e = initEco(s);

  // les vagues sectorielles, plus lentes et plus amples que le cycle
  SECTORS.forEach(sec => {
    const cur = e.sectors[sec.id] || 1;
    const pull = (1 - cur) * 0.0022;
    const noise = rand(-1, 1) * sec.vol * 0.0035;
    let v = cur + pull + noise;

    // une bulle sectorielle : ça monte trop, puis ça casse
    if (!e.bubble && v > 1.3 && Math.random() < 0.004) {
      e.bubble = { sector: sec.id, until: s.day + Math.round(rand(140, 300)) };
      addLog(s, `Tout le monde ne parle plus que de ${SECTORS.find(x => x.id === sec.id).name.toLowerCase()}. Les valorisations décollent.`, 'warn');
    }
    if (e.bubble && e.bubble.sector === sec.id) {
      v += 0.0016;
      if (s.day > e.bubble.until) {
        v *= 0.62;
        addLog(s, `La bulle sur ${SECTORS.find(x => x.id === sec.id).name.toLowerCase()} éclate. Ceux qui n'avaient que de la promesse disparaissent.`, 'bad');
        e.bubble = null;
      }
    }
    e.sectors[sec.id] = clamp(v, 0.55, 1.85);
  });

  // le marché du jour, tel que le voit une entreprise moyenne
  s.marketMood = ecoDemand(s) * (1 + rand(-0.012, 0.012));

  // changement de phase
  if (s.day >= e.until) {
    const next = pick(CYCLE_NEXT[e.phase]);
    const np = phaseOf(next);
    e.phase = next;
    e.since = s.day;
    e.until = s.day + Math.round(rand(np.min, np.max));
    e.history.push({ d: s.day, phase: next });
    if (e.history.length > 40) e.history.shift();
    addLog(s, `📉 Conjoncture : ${np.name.toLowerCase()}. ${np.desc}`, next === 'crise' ? 'bad' : next === 'euphorie' ? 'warn' : 'info');
    if (next === 'crise') s.forcedEvent = 'eco_crise';
    if (next === 'euphorie') s.forcedEvent = 'eco_euphorie';
  }

  // la crise fait aussi mal aux gens : chômage, moral collectif
  const p = phaseOf(e.phase);
  if (p.id === 'crise') addHappiness(-0.02);
  if (p.id === 'euphorie') addHappiness(0.012);
}

/* ---------------------------------------------------------
   AFFICHAGE
   --------------------------------------------------------- */

function renderEco() {
  const e = initEco(S);
  const p = ecoPhase(S);
  const elapsed = S.day - e.since;
  const total = Math.max(1, e.until - e.since);
  const signals = ecoSignals(S);

  return `
  <section class="card wide eco">
    <h2><i class="fas fa-chart-line"></i> La conjoncture</h2>
    <div class="eco-now" style="--c:${p.color}">
      <div class="eco-phase">
        <i class="fas ${p.icon}"></i>
        <div>
          <b>${p.name}</b>
          <span class="row-sub">depuis ${Math.round(elapsed / 30)} mois</span>
        </div>
      </div>
      <p class="row-sub">${p.desc}</p>
      <p class="row-sub eco-play"><i class="fas fa-lightbulb"></i> ${p.play}</p>
      <div class="eco-track">
        ${CYCLE_PHASES.map(x => `
          <span class="eco-step ${x.id === p.id ? 'on' : ''}" style="--c:${x.color}" title="${x.name}">
            <i class="fas ${x.icon}"></i>
          </span>`).join('')}
      </div>
    </div>

    <div class="eco-grid">
      <div><span>Demande</span><b class="${p.demand >= 1 ? 'pos' : 'neg'}">×${p.demand.toFixed(2)}</b></div>
      <div><span>Appétit des fonds</span><b class="${p.funding >= 1 ? 'pos' : 'neg'}">×${p.funding.toFixed(2)}</b></div>
      <div><span>Valorisations</span><b class="${p.valuation >= 1 ? 'pos' : 'neg'}">×${p.valuation.toFixed(2)}</b></div>
      <div><span>Salaires</span><b class="${p.wage <= 1 ? 'pos' : 'neg'}">×${p.wage.toFixed(2)}</b></div>
      <div><span>Taux d'emprunt</span><b class="${p.rate <= 0 ? 'pos' : 'neg'}">${p.rate >= 0 ? '+' : ''}${(p.rate * 100).toFixed(1)} pt</b></div>
      <div><span>Recrutement</span><b class="${p.hiring >= 1 ? 'pos' : 'neg'}">×${p.hiring.toFixed(2)}</b></div>
    </div>

    <h4 class="chart-title">Les secteurs</h4>
    <div class="eco-sectors">
      ${SECTORS.map(sec => {
        const v = e.sectors[sec.id];
        return `
        <div class="eco-sector">
          <span><i class="fas ${sec.icon}"></i> ${sec.name}</span>
          <b class="${v >= 1.08 ? 'pos' : v <= 0.92 ? 'neg' : ''}">×${v.toFixed(2)}</b>
          ${bar(clamp((v - 0.55) / 1.3 * 100, 0, 100), 100, v >= 1 ? 'happy' : 'health')}
        </div>`;
      }).join('')}
    </div>

    ${signals.length ? `
    <h4 class="chart-title">Ce qu'on entend</h4>
    <div class="eco-signals">
      ${signals.map(s => `<div class="eco-sig ${s.t}"><i class="fas fa-quote-left"></i> ${s.txt}</div>`).join('')}
    </div>` : ''}
  </section>`;
}
