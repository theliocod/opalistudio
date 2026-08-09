/* =========================================================
   EMPIRE — Finances et guide
   Un endroit pour voir d'où vient l'argent et où il part,
   et un guide qui dit quoi faire ensuite.
   ========================================================= */

/* ---------------------------------------------------------
   PETITS GRAPHIQUES SVG
   --------------------------------------------------------- */

function sparkPath(values, w, h, min, max) {
  if (values.length < 2) return '';
  const span = Math.max(1e-6, max - min);
  return values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / span) * h;
    return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

/* Graphique en courbes, une ou plusieurs séries */
function lineChart(series, opts = {}) {
  const w = 100, h = opts.height || 40;
  const all = series.flatMap(s => s.values);
  if (all.length < 2) return '<p class="row-sub">Pas encore assez d\'historique.</p>';
  let min = Math.min(0, ...all), max = Math.max(...all, 1);
  if (opts.symmetric) { const m = Math.max(Math.abs(min), Math.abs(max)); min = -m; max = m; }
  const zeroY = h - ((0 - min) / Math.max(1e-6, max - min)) * h;

  return `
  <div class="chart">
    <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      ${min < 0 ? `<line x1="0" y1="${zeroY}" x2="${w}" y2="${zeroY}" class="chart-zero"/>` : ''}
      ${series.map(s => `
        <path d="${sparkPath(s.values, w, h, min, max)}" fill="none"
              stroke="${s.color}" stroke-width="${s.width || 1.3}"
              ${s.dash ? 'stroke-dasharray="2 2"' : ''}/>`).join('')}
    </svg>
    <div class="chart-legend">
      ${series.map(s => `<span><i style="background:${s.color}"></i>${s.name}</span>`).join('')}
      <span class="chart-scale">${fmt(max)}</span>
    </div>
  </div>`;
}

/* Graphique en barres empilées : la composition des coûts */
function stackChart(rows, opts = {}) {
  const total = rows.reduce((a, r) => a + Math.max(0, r.value), 0);
  if (total <= 0) return '<p class="row-sub">Aucune dépense pour l\'instant.</p>';
  return `
  <div class="stack">
    <div class="stack-bar">
      ${rows.filter(r => r.value > 0).map(r => `
        <div style="width:${(r.value / total * 100).toFixed(1)}%;background:${r.color}"
             title="${r.name} : ${fmt(r.value)}"></div>`).join('')}
    </div>
    <div class="stack-legend">
      ${rows.filter(r => r.value > 0).map(r => `
        <span><i style="background:${r.color}"></i>${r.name}
          <b>${fmt(r.value)}</b> <em>${Math.round(r.value / total * 100)}%</em></span>`).join('')}
    </div>
  </div>`;
}

/* ---------------------------------------------------------
   ONGLET FINANCES
   --------------------------------------------------------- */

const COST_COLORS = {
  ads: '#f97316', payroll: '#2f6fed', fixed: '#8b5cf6',
  variable: '#e05a3a', rd: '#22c55e', support: '#facc15'
};

function monthsOfHistory(c, n) {
  return c.history.slice(-n);
}

function renderFinances() {
  const months = 24;

  // Consolidé : on aligne les historiques de toutes les sociétés sur les mêmes mois
  const allDays = [...new Set(S.companies.flatMap(c => c.history.map(h => h.d)))].sort((a, b) => a - b).slice(-months);
  const consol = allDays.map(d => {
    let rev = 0, cost = 0, profit = 0;
    S.companies.forEach(c => {
      const h = c.history.find(x => x.d === d);
      if (h) { rev += h.rev; cost += h.cost; profit += h.profit; }
    });
    return { d, rev, cost, profit };
  });

  const nwSeries = (S.history || []).slice(-months).map(h => h.nw);
  const totalRev = S.companies.reduce((a, c) => a + projectedRevenue(c), 0);
  const totalCost = S.companies.reduce((a, c) => a + projectedCosts(c), 0);
  const totalProfit = S.companies.reduce((a, c) => a + projectedProfit(c), 0);
  const life = totalLifeCost(S) + luxuryUpkeep(S);
  const debtCost = S.debt ? S.debt * CONFIG.debtInterest * 30 + Math.max(200, S.debt * 0.012) : 0;
  const perso = (S.job ? S.job.salary : 0) - life - debtCost;

  return `
  <div class="cols">
   <div class="col">
    <section class="card">
      <h2><i class="fas fa-chart-column"></i> Vue d'ensemble</h2>
      <div class="fin-top">
        <div><span>Chiffre d'affaires</span><b>${fmt(totalRev)}</b><em>par mois</em></div>
        <div><span>Charges</span><b class="neg">${fmt(totalCost)}</b><em>par mois</em></div>
        <div><span>Résultat</span><b class="${totalProfit >= 0 ? 'pos' : 'neg'}">${fmt(totalProfit)}</b><em>par mois</em></div>
        <div><span>Reste personnel</span><b class="${perso >= 0 ? 'pos' : 'neg'}">${fmt(perso)}</b><em>hors dividendes</em></div>
      </div>
      ${consol.length > 2 ? lineChart([
        { name: 'Chiffre d\'affaires', values: consol.map(x => x.rev), color: '#f97316', width: 1.6 },
        { name: 'Charges', values: consol.map(x => x.cost), color: '#ef4444' },
        { name: 'Résultat', values: consol.map(x => x.profit), color: '#22c55e' }
      ], { height: 44, symmetric: false }) + `<p class="row-sub">Sur les ${consol.length} derniers mois, toutes sociétés confondues.</p>`
      : '<p class="row-sub">Lance une entreprise et laisse passer quelques mois pour voir apparaître tes comptes.</p>'}
    </section>

    <section class="card">
      <h2><i class="fas fa-money-bill-transfer"></i> Où part l'argent ce mois-ci</h2>
      ${stackChart([
        { name: 'Publicité', value: S.companies.reduce((a, c) => a + adSpendMonthly(c), 0), color: COST_COLORS.ads },
        { name: 'Salaires', value: S.companies.reduce((a, c) => a + payrollMonthly(c), 0), color: COST_COLORS.payroll },
        { name: 'Charges fixes', value: S.companies.reduce((a, c) => a + getType(c).fixedCost * Math.pow(c.level, 1.35), 0), color: COST_COLORS.fixed },
        { name: 'Coûts variables', value: S.companies.reduce((a, c) => a + projectedRevenue(c) * getType(c).varCost * (c.costMod || 1), 0), color: COST_COLORS.variable },
        { name: 'R&D', value: S.companies.reduce((a, c) => a + c.rd, 0), color: COST_COLORS.rd },
        { name: 'Support', value: S.companies.reduce((a, c) => a + c.support, 0), color: COST_COLORS.support }
      ])}
    </section>

    <section class="card">
      <h2><i class="fas fa-user"></i> Ton budget personnel</h2>
      <table class="table">
        <tr><td>Salaire</td><td class="right ${S.job ? 'pos' : 'muted'}">${S.job ? '+' + fmt(S.job.salary) : '—'}</td></tr>
        <tr><td>Logement</td><td class="right neg">-${fmt(housing(S).cost)}</td></tr>
        ${S.lifeCost ? `<tr><td>Charges de famille</td><td class="right neg">-${fmt(S.lifeCost)}</td></tr>` : ''}
        ${luxuryUpkeep(S) ? `<tr><td>Entretien du train de vie</td><td class="right neg">-${fmt(luxuryUpkeep(S))}</td></tr>` : ''}
        ${debtCost ? `<tr><td>Dette personnelle (${fmt(S.debt)})</td><td class="right neg">-${fmt(debtCost)}</td></tr>` : ''}
        <tr class="total"><td>Solde mensuel</td><td class="right ${perso >= 0 ? 'pos' : 'neg'}">${fmt(perso)}</td></tr>
      </table>
      ${nwSeries.length > 2 ? lineChart([{ name: 'Patrimoine net', values: nwSeries, color: '#fb923c', width: 1.6 }], { height: 36 }) : ''}
    </section>
   </div>

   <div class="col">
    ${S.companies.length ? S.companies.map(c => {
      const h = monthsOfHistory(c, months);
      const rev = projectedRevenue(c), cost = projectedCosts(c), profit = projectedProfit(c);
      const marge = rev > 0 ? profit / rev * 100 : 0;
      const t = getType(c);
      return `
      <section class="card">
        <h2><i class="fas ${t.icon}"></i> ${c.name}</h2>
        <div class="fin-top small">
          <div><span>CA</span><b>${fmt(rev)}</b></div>
          <div><span>Résultat</span><b class="${profit >= 0 ? 'pos' : 'neg'}">${fmt(profit)}</b></div>
          <div><span>Marge nette</span><b class="${marge >= 15 ? 'pos' : marge >= 0 ? '' : 'neg'}">${marge.toFixed(0)}%</b></div>
          <div><span>Trésorerie</span><b class="${c.cash < 0 ? 'neg' : ''}">${fmt(c.cash)}</b></div>
        </div>
        ${h.length > 2 ? lineChart([
          { name: 'CA', values: h.map(x => x.rev), color: '#f97316', width: 1.6 },
          { name: 'Résultat', values: h.map(x => x.profit), color: '#22c55e' },
          { name: 'Trésorerie', values: h.map(x => x.cash), color: '#38bdf8', dash: true }
        ], { height: 40 }) : '<p class="row-sub">Les comptes apparaîtront après un mois d\'activité.</p>'}
        ${stackChart([
          { name: 'Publicité', value: adSpendMonthly(c), color: COST_COLORS.ads },
          { name: 'Salaires', value: payrollMonthly(c), color: COST_COLORS.payroll },
          { name: 'Fixes', value: t.fixedCost * Math.pow(c.level, 1.35), color: COST_COLORS.fixed },
          { name: 'Variables', value: rev * t.varCost * (c.costMod || 1), color: COST_COLORS.variable },
          { name: 'R&D', value: c.rd, color: COST_COLORS.rd },
          { name: 'Support', value: c.support, color: COST_COLORS.support }
        ])}
      </section>`;
    }).join('') : `
      <section class="card empty">
        <i class="fas fa-chart-pie"></i>
        <h2>Aucune société</h2>
        <p class="muted">Tes comptes s'afficheront ici dès que tu auras lancé quelque chose.</p>
      </section>`}
   </div>
  </div>`;
}

/* ---------------------------------------------------------
   GUIDE — ce qu'il est raisonnable de faire maintenant
   Chaque conseil sait dire s'il est déjà réglé.
   --------------------------------------------------------- */

const GUIDE_STEPS = [
  {
    id: 'plan',
    done: s => plannedHours(s) >= 6,
    title: "Remplis ton emploi du temps",
    text: "Tu ne fais presque rien de tes journées. Va dans « Vie & planning » et alloue des heures : un emploi pour manger, du sport et du social pour tenir, du réseautage pour rencontrer du monde.",
    tab: 'vie'
  },
  {
    id: 'job',
    done: s => s.job || monthlyBusinessProfit(s) > 1500,
    title: "Trouve un emploi pour financer le début",
    text: "Sans revenu, ton compte descend chaque jour. Un salaire te paie le temps d'apprendre et de réunir un capital.",
    tab: 'carriere'
  },
  {
    id: 'skill',
    done: s => Object.values(s.skills).some(v => v >= 22),
    title: "Monte une compétence au-dessus de 22",
    text: "Chaque type d'entreprise demande un niveau minimum. Commence par une formation gratuite ou peu chère, et donne-lui des heures dans ton planning.",
    tab: 'carriere'
  },
  {
    id: 'found',
    done: s => s.companies.length > 0,
    title: "Lance ta première entreprise",
    text: "Le freelance ne coûte que 200 € et n'a aucun prérequis : c'est la porte d'entrée. Le salariat ne te rendra jamais riche.",
    tab: 'business'
  },
  {
    id: 'role',
    done: s => !s.companies.length || s.plan.some(p => p.act === 'biz' && p.hours >= 3),
    title: "Consacre des heures à ta société",
    text: "Une entreprise sans fondateur dedans n'avance pas. Donne-lui au moins 3 heures par jour et choisis ton poste : vente au début, produit ensuite.",
    tab: 'vie'
  },
  {
    id: 'budget',
    done: s => !s.companies.length || s.companies.some(c => adSpendMonthly(c) > 0),
    title: "Mets un budget d'acquisition",
    text: "Sans publicité ni prospection, tes clients n'arrivent qu'au compte-gouttes. Commence petit, et surveille le panneau « Est-ce que ta publicité rapporte ? ».",
    tab: 'business'
  },
  {
    id: 'roi',
    done: s => !s.companies.length || s.companies.every(c => adSpendMonthly(c) === 0 || acquisitionReturn(c) >= 1),
    urgent: true,
    title: "Ta publicité te fait perdre de l'argent",
    text: "Sur au moins une de tes sociétés, un client coûte plus cher qu'il ne rapportera. Baisse le budget, monte tes prix si ta qualité le permet, ou fais rester tes clients plus longtemps.",
    tab: 'business'
  },
  {
    id: 'capacity',
    done: s => !s.companies.some(c => c.clients >= capacity(c) * 0.95),
    urgent: true,
    title: "Ta capacité est saturée",
    text: "Tu payes pour des clients que tu ne peux pas servir : ils repartent aussitôt et ta qualité baisse. Monte ton niveau d'infrastructure ou recrute aux opérations.",
    tab: 'business'
  },
  {
    id: 'cash',
    done: s => !s.companies.some(c => c.cash < 0),
    urgent: true,
    title: "Une société est en trésorerie négative",
    text: "Au bout de 90 jours, c'est le dépôt de bilan. Injecte du cash depuis l'onglet Capital, ou coupe les budgets.",
    tab: 'business'
  },
  {
    id: 'quality',
    done: s => !s.companies.some(c => c.quality < 45 && c.days > 120),
    title: "Ton produit se dégrade",
    text: "Une qualité basse fait fuir les clients, rend ta publicité moins efficace et t'interdit de monter les prix. Mets un budget R&D ou passe en poste « Produit ».",
    tab: 'business'
  },
  {
    id: 'hire',
    done: s => s.companies.some(c => c.staff.length > 0) || !s.companies.some(c => projectedProfit(c) > 6000),
    title: "Recrute ton premier salarié",
    text: "Tu gagnes assez pour embaucher. Ouvre un poste dans l'onglet Recrutement, fixe un salaire au-dessus du marché pour attirer du monde, et fais passer un entretien avant de signer.",
    tab: 'business'
  },
  {
    id: 'network',
    done: s => s.contacts.length >= 3,
    title: "Construis un réseau",
    text: "Passé 88 dans une compétence, seuls des mentors te feront progresser. Alloue des heures au réseautage, et sors : les événements du téléphone sont la façon la plus rapide de rencontrer du monde.",
    tab: 'reseau'
  },
  {
    id: 'health',
    done: s => s.health > 45 && s.energy > 25,
    urgent: true,
    title: "Tu te crames",
    text: "En dessous de 25 d'énergie, tout ce que tu fais perd en efficacité, et ta santé descend. Réduis tes heures, mets du sport, prends un meilleur logement.",
    tab: 'vie'
  },
  {
    id: 'invest',
    done: s => portfolioValue(s) > 0 || s.money < 80000,
    title: "Fais travailler ton argent",
    text: "Tu laisses dormir des liquidités. Un ETF rapporte environ 8 % par an sans rien faire — sur trente ans, c'est un multiple.",
    tab: 'patrimoine'
  }
];

function guideAdvice() {
  const urgent = GUIDE_STEPS.filter(g => g.urgent && !g.done(S));
  const next = GUIDE_STEPS.filter(g => !g.urgent && !g.done(S));
  return { urgent, next: next.slice(0, 2), doneCount: GUIDE_STEPS.filter(g => g.done(S)).length };
}

function renderGuide() {
  if (S.guideOff) return '';
  const { urgent, next, doneCount } = guideAdvice();
  const items = [...urgent, ...next];
  if (!items.length) return '';

  return `
  <section class="card guide">
    <h2><i class="fas fa-compass"></i> Quoi faire maintenant
      <button class="btn btn-sm btn-ghost guide-off" data-act="guideOff" title="Masquer le guide">
        <i class="fas fa-xmark"></i>
      </button>
    </h2>
    <div class="guide-list">
      ${items.map(g => `
        <div class="guide-item ${g.urgent ? 'urgent' : ''}">
          <i class="fas ${g.urgent ? 'fa-triangle-exclamation' : 'fa-arrow-right'}"></i>
          <div>
            <b>${g.title}</b>
            <span>${g.text}</span>
            <button class="btn btn-sm" data-act="goTab" data-id="${g.tab}">Y aller</button>
          </div>
        </div>`).join('')}
    </div>
    <p class="row-sub">${doneCount} / ${GUIDE_STEPS.length} points acquis.</p>
  </section>`;
}
